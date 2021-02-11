import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import Back from '@components/Back/Back'
import Basket from '@components/Restaurant/Basket';
import ClearBasketModal from '@components/Restaurant/ClearBasketModal';
import OrderCard from '@components/Order/OrderCard';
const MakeOrder = (props) => {
  console.log('MAKEORDER ', props)
  const [clearBasketModal, setClearBasketModal] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [])
  return (
    <Wrapper>
      <MContainer>
        <Back text={"В ресторан"}/>
        <Container>
          <OrderCard/>
          <Basket {...props} clearBasketModal={clearBasketModal} setClearBasketModal={setClearBasketModal}/>
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
`;

const MContainer = styled.div`
  width: 1180px;
  margin: 0 20px;
  height: 100%;
`;
