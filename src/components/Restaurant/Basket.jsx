import React, {useState, useEffect} from 'react';
import styled, { keyframes, css } from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {clearBasket, decreaseItemCount, increaseItemCount, setBasketSum, fetchOrderConstraints, setTotalPrice} from '../../redux/actions/Order'
import Add from '@assets/add.png';
import basketIcon from '@assets/basketIcon.png';
// import {withRouter} from 'react-router-dom';
import Delete from '@assets/delete.png';
import { NavLink, useHistory } from "react-router-dom";
import CircleLoader from '@components/Loader/CircleLoader';

import trash from '@assets/trash_full.png';

import lightning from '@assets/lightning.png';


const Basket = ({clearBasketModal, setClearBasketModal, ...props}) => {
  const dispatch = useDispatch();
  const history  = useHistory();
  let   {match, lang}  = props;
  let basketSum = useSelector(({Order}) => Order.basketSum);
  let [localPackage, setLocalPackage] = useState(0);
  let basketLoading = useSelector(({Order}) => Order.basketLoading);
  let lat = useSelector(({User}) => User.lat);
  let lon = useSelector(({User}) => User.lon);
  let token = useSelector(({User}) => User.token)
  let tokenType = useSelector(({User}) => User.tokenType)
  let constraints = useSelector(({Order}) => Order.constraints);
  let basket = useSelector(({Order}) => Order.basketItems);
  let totalPrice = useSelector(({Order}) => Order.totalPrice);
  // const [sum, setSum] = useState(0);

  const onIncreaseCount = (item) => {
    console.log(item)
    if (item.count + 1 <= item.max_order_size) {
      dispatch(increaseItemCount(item))
    }
  }

  const onDecreaseCount = (item) => {
    dispatch(decreaseItemCount(item))
  }

  const handleClearBasket = () => {
    setClearBasketModal(true)
  }

  useEffect(() => {
    if (basket.length !== 0) {
      let sum = 0;
      let packagePr = 0;
      basket.forEach(item => {
        let itemSum = 0;
        itemSum = item.portion.price;
        packagePr += item.packaging_price * item.count;
        item.modifer_groups.forEach(group => {
          itemSum += group.price;
        })
        sum += itemSum * item.count;
      })     
      dispatch(setBasketSum(sum))
      console.log('packagePr:',packagePr)
      setLocalPackage(packagePr)
      // setSum(sum);
    } else localStorage.setItem('basketVenue', '');
  }, [basket])

  useEffect(() => {
    if (constraints && basket.length !== 0) {
      dispatch(setTotalPrice(basketSum + (constraints.statements.delivery_fare || 0) + constraints.statements.service_charge + constraints.statements.packaging_charge + localPackage - constraints.statements.discount_value))
    }
  }, [basket, constraints])

  useEffect(() => {
    if (basket.length !== 0 && token) {
      dispatch(fetchOrderConstraints())
    }
  }, [basket, lon, lat, token])

  return (
    <Wrapper>
      {basket.length !== 0 && match.path !== "/makeOrder"  &&

        <MobileWrapper onClick={() => history.push('/makeOrder')}>
            <BasketIcon src={basketIcon}/>
            <span>168 000 сум</span>
        </MobileWrapper>
        
      }
      {basketLoading && <LoaderWrapper>
                          <CircleLoader/>
                          
                        </LoaderWrapper>}
      <GlobalContainer>
        <TitleContainer>
          Мой заказ
        </TitleContainer>
        {
          basket.length !== 0 && <TrashImg src={trash} onClick={handleClearBasket} data-trash="trash"/>
        }
        <ListContainer>
          {basket.map(item => {
            return (
              <>
            <ListItem>
              <div style={{flex: 5}}>
                <div>{item.name[lang]}</div>
              </div>
              <CountContainer>
                <CountButton onClick={() => onDecreaseCount(item)}>
                  <CountImage src={Delete}/>
                </CountButton>
                <CountValue>
                  {item.count}
                </CountValue>
                <CountButton onClick={() => onIncreaseCount(item)}>
                  <CountImage src={Add}/>
                </CountButton>
              </CountContainer> 
              <ListItemPrice>
                {item.portion.price} {item.portion.currency}
              </ListItemPrice>
            </ListItem>
            <div style={{fontSize: 12, marginTop: -10}}>
              <div>{item.portion && item.portion.name[lang]}</div>
              {item.modifer_groups && item.modifer_groups.map(group => {
                return <div>{group.name[lang]}</div>
              })}
            </div>
            </>
            )
          })}
        </ListContainer>
        {(basket.length !== 0 && constraints) &&
        <>
        <AdditionContainer>
          {constraints.statements.delivery_fare &&
            <DeliveryContainer>
              <DeliveryText>
                Доставка
                <img src={lightning} style={{marginLeft: 5}}/>
              </DeliveryText>
              <DelliverySum>
                {`${constraints.statements.delivery_fare} ${constraints.currency}`}
              </DelliverySum>
            </DeliveryContainer>
          }
          <AdditionSubstring>
            {constraints.statements.delivery_fare_notes && constraints.statements.delivery_fare_notes.ru}
          </AdditionSubstring>
          
          <DeliveryContainer>
            <DeliveryText>
              Стоимость упаковки
            </DeliveryText>
            <DelliverySum>
              {`${constraints.statements.packaging_charge + localPackage} ${constraints.currency}`}
            </DelliverySum>
          </DeliveryContainer>
          <AdditionSubstring>
            {constraints.statements.packaging_charge_notes && constraints.statements.packaging_charge_notes.ru}
          </AdditionSubstring>

          <DeliveryContainer>
            <DeliveryText>
              Обслуживание
            </DeliveryText>
            <DelliverySum>
              {`${constraints.statements.service_charge} ${constraints.currency}`}
            </DelliverySum>
          </DeliveryContainer>
          <AdditionSubstring>
            {constraints.statements.service_charge_notes && constraints.statements.service_charge_notes.ru}
          </AdditionSubstring>

          <DeliveryContainer>
            <DeliveryText>
              Скидка
            </DeliveryText>
            <DelliverySum>
              {`${constraints.statements.discount_value} ${constraints.currency}`}
            </DelliverySum>
          </DeliveryContainer>
          <AdditionSubstring>
            {constraints.statements.discount_value_notes && constraints.statements.discount_value_notes.ru}
          </AdditionSubstring>

        </AdditionContainer>
        <BottomContainer>
          <TimeContainer>
            <TimeTitle>Время доставки</TimeTitle>
            <TimeValue>{constraints.hours && constraints.hours[0]}</TimeValue>
          </TimeContainer>
          <TimeContainer>
            <TimeTitle>Итого</TimeTitle>
            <TimeValue>
              {/* {basketSum + (constraints.statements.delivery_fare || 0) + constraints.statements.service_charge + constraints.statements.packaging_charge + localPackage - constraints.statements.discount_value} */}
              {totalPrice}
              &nbsp;{basket[0].portion.currency}
              </TimeValue>
          </TimeContainer>
        </BottomContainer>
        { match.path !== "/makeOrder" && 
          <MakeButton onClick={() => {
            if (tokenType === "GUEST") document.getElementById('signin').click()
            else history.push('/makeOrder')
          }}>
            Оформить заказ
          </MakeButton>
        }
        </>
        }
      </GlobalContainer>
    </Wrapper>
  )
}

export default Basket;

const AdditionSubstring = styled.div`
  color: grey;
  margin-top: 0px;
  font-size: 12px;
`;

const AdditionContainer = styled.div`
  padding: 12px 0px;
  border-top: 1.5px solid #C4C4C4;
  margin-top: 65px;
  display: flex;
  flex-direction: column;
  border-bottom: 1.5px solid #C4C4C4;
`;

const LoaderWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BasketIcon = styled.img`
  margin-right: 20px;
  width: 20px;
  height: 20px;
`;


const MobileWrapper = styled.div`
  position: fixed;
  left: 0px;
  bottom: 0;
  width: 100%;
  /* right: 20px; */
  height: 60px;
  z-index: 3;
  display: none;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: 500;
  font-size: 18px;
  background: ${props => props.theme.primary};
  transition: .2s all;
  @media(max-width: 1180px) {
    display: flex;
  }
  :hover {
    cursor: pointer;
    transition: .2s all;
    background: ${props => props.theme.primaryDark};
  }
`;

const MakeButton = styled.div`
  margin-top: 17px;
  width: 100%;
  background: ${props => props.theme.primary};
  padding: 10px 0;
  color: #fff;
  transition: .2s all;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    background: ${props => props.theme.primaryDark};
    transition: .2s all;
  }
`;

const BottomContainer = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
`;

const TimeContainer = styled.div`
  font-size: 12px;
  line-height: 14px;  
  color: #000003;
`;

const TimeTitle = styled.div`

`;

const TimeValue = styled.div`
  margin-top: 5px;
  font-weight: bold;
  font-size: 20px;
  line-height: 25px;

`;

const DeliveryContainer = styled.div`
  padding: 6px 0px;
  display: flex;
  justify-content: space-between;
`;

const DeliveryText = styled.div`
  font-size: 14px;
  line-height: 16px;
  color: #000003;
  display: flex;
  align-items: center;
  font-weight: 500;
`;

const DelliverySum = styled.div`
  font-size: 15px;
  line-height: 20px;
  font-weight: 500;
  color: #000003;
`;

const Wrapper = styled.div`
  position: sticky;
  top: 180px;
  min-width: 380px;
  min-height: 320px; 
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  margin-left: 20px;
  overflow: hidden;
  padding: 22px 18px 14px 18px;
  @media(max-width: 1180px) {
    min-width: 0;
    max-width: 0;
    margin-left: 0;
    padding: 0;
  }
`;


const GlobalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  font-weight: bold;
  font-size: 20px;
  line-height: 25px;
  align-items: center;
  justify-content: center;
`;

const TrashImg = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  transition: .3s all;
  :hover {
    transform: translateY(-5px);
    transition: .3s all;

  }
`;

const ListContainer = styled.div`
  margin-top: 38px;
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const ListItem = styled.div`
  width: 100%;
  display: flex;
  color: #000003;
  margin: 10px 0px;
  align-items: center;
  font-size: 15px;
  font-weight: 500;
  line-height: 16px;
`;

const ListItemPrice = styled.div`
  line-height: 20px;
  color: #000003;
  font-size: 15px;
  flex: 4;
  display: flex;
  justify-content: flex-end;
`;

const CountContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 5;
  /* width: 100px; */
`;

const CountButton = styled.div`
  background: ${props => props.theme.primary};
  width: 21px;
  height: 21px;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: .2s all;
  margin: 0 5px;
  :hover {
    transition: .2s all;
    background: ${props => props.theme.primaryDark};
  }
`;

const CountImage = styled.img`
  width: 11px;
  user-select: none;
`;

const CountValue = styled.div`
  font-weight: 500;
  font-size: 21px;
  width: 30px;
  text-align: center;
`;
