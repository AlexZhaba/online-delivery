import React, {useState, useEffect} from 'react';
import styled, { keyframes, css } from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {clearBasket, decreaseItemCount, increaseItemCount} from '../../redux/actions/Order'
import Add from '@assets/add.png';
import Delete from '@assets/delete.png';

import trash from '@assets/trash_full.png';

import lightning from '@assets/lightning.png';

const Basket = ({clearBasketModal, setClearBasketModal}) => {
  const dispatch = useDispatch();
  const basket = useSelector(({Order}) => Order.basketItems);


  const onIncreaseCount = (item) => {
    console.log('item = ', item)
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

  return (
    <Wrapper>
      <GlobalContainer>
        <TitleContainer>
          Мой заказ
        </TitleContainer>
        {
          basket.length !== 0 && <TrashImg src={trash} onClick={handleClearBasket} data-trash="trash"/>
        }
        <ListContainer>
          {basket.map(item => {
            return <ListItem>
                      <div style={{flex: 1}}>
                      {item.name.ru}
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
                        {item.portions[0].price}
                      </ListItemPrice>
                   </ListItem>
          })}
        </ListContainer>
        <DeliveryContainer>
          <DeliveryText>
            Доставка
            <img src={lightning} style={{marginLeft: 5}}/>
          </DeliveryText>
          <DelliverySum>
            50 000 сум
          </DelliverySum>
        </DeliveryContainer>
        <BottomContainer>
          <TimeContainer>
            <TimeTitle>Время доставки</TimeTitle>
            <TimeValue>35-40 мин </TimeValue>
          </TimeContainer>
          <TimeContainer>
            <TimeTitle>Итого</TimeTitle>
            <TimeValue>150 000 сум </TimeValue>
          </TimeContainer>
        </BottomContainer>
        <MakeButton>
          Оформить заказ
        </MakeButton>
      </GlobalContainer>
    </Wrapper>
  )
}

export default Basket;

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
  padding: 12px 0px;
  border-top: 1.5px solid #C4C4C4;
  margin-top: 65px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1.5px solid #C4C4C4;
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
  font-size: 17px;
  line-height: 20px;
  font-weight: 500;
  color: #000003;
`;

const Wrapper = styled.div`
  position: sticky;
  top: 180px;
  min-width: 380px;
  min-height: 350px; 
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
  font-size: 17px;
`;

const CountContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
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
