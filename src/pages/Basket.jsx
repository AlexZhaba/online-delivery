import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import ModalMaxCartPrice from '@components/Restaurant/ModalMaxCartPrice'
import ModalMinCartPrice from '@components/Restaurant/ModalMinCartPrice'

import {NavLink, Redirect} from 'react-router-dom';

import Back from '@components/Back/Back'

import {useDispatch, useSelector} from 'react-redux';
import { decreaseItemCount, fetchOrderConstraints, increaseItemCount } from '../redux/actions/Order'


import trash from '@assets/trash_full.png'
import Add from '@assets/add.png';
import Delete from '@assets/delete.png';


const BasketMobile = () => {
  const dispatch = useDispatch();

  let [maxCartOpen, setMaxCartOpen] = useState(false);
  let [minCartOpen, setMinCartOpen] = useState(false);

  let basket = useSelector(({Order}) => Order.basketItems);
  let basketVenue = useSelector(({Order}) => Order.basketVenue);
  let constraints = useSelector(({Order}) => Order.constraints);
  let lang = useSelector(({User}) => User.lang)
  let lat = useSelector(({User}) => User.lat);
  let lon = useSelector(({User}) => User.lon);
  let token = useSelector(({User}) => User.token)

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [])

  useEffect(() => {
    if (basket.length !== 0 && token) {
      dispatch(fetchOrderConstraints())
    }
  }, [basket, lon, lat, token])

  const onIncreaseCount = (item) => {
    if (item.count + 1 <= item.max_order_size) {
      dispatch(increaseItemCount(item))
    }
  }

  const onDecreaseCount = (item) => {
    console.log('ITEM:',item)
    dispatch(decreaseItemCount(item))
  }

  console.log('basket:', basket)
  if (basket.length === 0) return <Redirect to='/main'></Redirect>
  return (
    <Wrapper>
      <ModalMaxCartPrice constraints={constraints} isOpen={maxCartOpen} setIsOpen={setMaxCartOpen}/>
      <ModalMinCartPrice constraints={constraints} isOpen={minCartOpen} setIsOpen={setMinCartOpen}/>
      <TrashImg src={trash}/>
      <div style={{width: "100%"}}>
        <Back text={basketVenue.name[lang]} margin={"32px 0px 24px 10px"} toRed ={`/restaurant/${basketVenue.guid}`}/>
      </div>
      <Container>
        <Title>Ваш заказ</Title>
        {basket.map(item => {
          return (
            <ItemContainer>
              <ItemImage src={item.image_url ? item.image_url : "https://diabetno.ru/wp-content/uploads/2020/07/pp_image_7236_22yecuiyctplaceholder.png"}/>
              <ItemInfoContainer>
                <ItemName>
                  {item.name[lang]}
                </ItemName>
                <BottomInfo style={{display: 'flex'}}>
                  <ItemPrice>
                    {item.portion.price.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} {item.portion.currency}
                  </ItemPrice>
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
                </BottomInfo>
              </ItemInfoContainer>
              {/* https://diabetno.ru/wp-content/uploads/2020/07/pp_image_7236_22yecuiyctplaceholder.png */}
            </ItemContainer>
          )
        })}
        <NavLink style={{display: "flex", justifyContent: 'center', marginTop: 20}} to='/makeOrder'>
          <Button>
            Заказать
          </Button>
        </NavLink>
        {/* {JSON.stringify(constraints)} */}
      </Container>
    </Wrapper>
  )
}

export {BasketMobile};

const Button = styled.div`
  margin-top: 20px;
  width: 100%;
  padding: 10px 0;
  background: ${props => props.theme.primary};
  transition: .2s all;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #FFFFFF;
  cursor: pointer;
  text-align: center;
  border-radius: 5px;
  :hover {
    transition: .2s all;
    background: ${props => props.theme.primaryDark};
  }
`;

const AdditionPrice = styled.div`
  font-size: 16px;
  line-height: 19px;
  text-align: right;
  color: #808080;
`;

const AdditionContainer = styled.div`
  margin-top: 20px;
  border-top: 1px solid #F2F2F2;
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
`;

const AdditionTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  line-height: 21px;
`;

const BottomInfo = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ItemPrice = styled.div`
  font-size: 16px;
  line-height: 19px;
  color: #808080;
`;

const ItemName = styled.div`
  font-weight: bold;
  font-size: 16px;
  line-height: 21px;
  width: 100%;
`;

const ItemInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-left: 20px;
  flex: 1;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 80px;
`;

const ItemContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #000000;
`;

const Wrapper = styled.div`
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
`;

const TrashImg = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Container = styled.div`
  display: flex;
  width: calc(100% - 20px);
  max-width: 700px;
  flex-direction: column;
  /* height: calc(100% + 200px); */
  
`;

const CountContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CountButton = styled.div`
  background: ${props => props.theme.primary};
  width: 20px;
  height: 20px;
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
  width: 10px;
  user-select: none;
`;

const CountValue = styled.div`
  font-weight: 500;
  font-size: 21px;
`;
