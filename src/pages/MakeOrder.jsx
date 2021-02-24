import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import {useDispatch, useSelector} from 'react-redux';
import {addItemToBasket, increaseItemCount, setBasketVenue} from '../redux/actions/Order'

import Back from '@components/Back/Back'
import Basket from '@components/Restaurant/Basket';
import ClearBasketModal from '@components/Restaurant/ClearBasketModal';
import OrderCard from '@components/Order/OrderCard';
import {Redirect} from "react-router-dom";

const MakeOrder = (props) => {
  const dispatch = useDispatch();

  let lang = useSelector(({User}) => User.lang);
  let basket = useSelector(({Order}) => Order.basketItems)
  let tokenType = useSelector(({User}) => User.tokenType)
  let constraints = useSelector(({Order}) => Order.constraints)

  console.log('MAKEORDER ', props)
  const [clearBasketModal, setClearBasketModal] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [])

  if (basket.length === 0) return <Redirect to='/main'></Redirect>
  if (tokenType === "GUEST") return <Redirect to='/main'></Redirect>
  return (
    <Wrapper>
      <MContainer>
        <Back text={"В ресторан"}/>
        <Container>
          <OrderCard constraints={constraints}/>
          <Basket {...props} clearBasketModal={clearBasketModal} setClearBasketModal={setClearBasketModal} lang={lang}/>
          <ClearBasketModal clearBasketModal={clearBasketModal} setClearBasketModal={setClearBasketModal}/>
        </Container>
      </MContainer>
    </Wrapper>
  )
}

export {MakeOrder};


const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  @media(max-width: 1180px) {
    justify-content: center;
  }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
`;

const MContainer = styled.div`
  width: 1180px;
  margin: 0 20px;
  height: 100%;
`;
