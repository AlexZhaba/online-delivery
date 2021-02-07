import React from 'react';
import styled from 'styled-components';

const OrderInput = ({text}) => (
  <div class="group">      
    <input type="text" class="input__order" required/>
    <span class="highlight"></span>
    <span class="bar"></span>
    <label className="order__label">{text}</label>
  </div>
)

const OrderCard = () => {
  return (
    <Wrapper>
      <MainTitle>
          Оформление заказа
        </MainTitle>
      <OrderWrapper>
        <Title>Подтверждение номера телефона</Title>
        <OrderInput text="Телефон"/>
      </OrderWrapper>
    </Wrapper>
  )
}

export default OrderCard;

const Wrapper = styled.div`
  width: 100%;
`;

const MainTitle = styled.div`
  font-weight: bold;
  font-size: 35px;
  line-height: 55px;
  margin-bottom: 26px;
`;

const Title = styled.div`
  font-family: "Stem";
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  line-height: 37px;
  color: #000;
`;

const OrderWrapper = styled.div`
  /* background: red; */
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.15);
  width: 100%;
  height: 200px;
  padding: 30px;
`;