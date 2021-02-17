import React, {useState} from 'react';
import styled from 'styled-components';

import arrowBottom from '@assets/arrowBottom.png';

import ModalNewCard from './ModalNewCard';
import ModalMakeOrder from './ModalMakeOrder';
const OrderInput = ({text, style}) => (
  <div class="group" style={style}>      
    <input type="text" class="input__order" required/>
    <span class="highlight"></span>
    <span class="bar"></span>
    <label className="order__label">{text}</label>
  </div>
)

const OrderCard = () => {
  const [openNewCard, setOpenNewCard] = useState(false);
  const [isOrderMade, setIsOrderMade] = useState(false);
  return ( 
    <Wrapper>
      <ModalNewCard openNewCard={openNewCard} setOpenNewCard={setOpenNewCard}/>
      <ModalMakeOrder isOrderMade={isOrderMade} setIsOrderMade={setIsOrderMade}/>
      <MainTitle>
          Оформление заказа
        </MainTitle>
      <OrderWrapper>
        <Title>Подтверждение номера телефона</Title>
        <NumberContainer>
          <div>
            <OrderInput text="Телефон"/>
            <OrderInput text="Код из СМС(4 цифры)" style={{marginTop: 30}}/>
          </div>
          <div>
            <CodeButton>
                Получить код
            </CodeButton>
          </div>
        </NumberContainer>
        <Title style={{marginTop: 30, marginBottom: 30}}>Тип доставки</Title>
        <label class="container">
          <span>Доставка курьером</span>
          <input type="radio" name="radio1" defaultChecked/>
          <span class="checkmark"></span>
        </label>
        <label class="container">
          <span>Самовызов</span>
          <input type="radio" name="radio1"/>
          <span class="checkmark"></span>
        </label>
        {/* <SelectContainer>
          <input type="radio" id="huey" name="drone" value="huey" defaultChecked/>
          <SelectLabel for="huey">Доставка курьером</SelectLabel>
        </SelectContainer>
        <SelectContainer>
          <input type="radio" id="huey1" name="drone" value="huey1"/>
          <SelectLabel for="huey1">Самовызов</SelectLabel>
        </SelectContainer> */}

        <Title style={{marginTop: 30}}>Адрес доставки</Title>
        <OrderInput text="Адрес доставки" style={{width: 470}}/>
        <AddressDetail>
          <OrderInput text="Подъезд" style={{width: 110, marginRight: 10}}/>
          <OrderInput text="Код двери" style={{width: 110, marginRight: 10}}/>
          <OrderInput text="Этаж" style={{width: 110, marginRight: 10}}/>
          <OrderInput text="Квартира" style={{width: 110, marginRight: 10}}/>
        </AddressDetail>
        <OrderInput text="Комментарий к заказу" style={{width: 470}}/>
        
        <Title style={{marginTop: 30}}>Время доставки</Title>
        <DateSelect>
          <span>Как можно быстрее</span>
          <SelectImg src={arrowBottom}/>
        </DateSelect>
        
        <Title style={{marginTop: 30, marginBottom: 30}}>Способы оплаты</Title>
        <label class="container">
        <span>Картой онлайн</span>
          <input type="radio" name="radio" defaultChecked data-trash="true"/>
          <span class="checkmark"></span>
          <ButtonCard style={{transform: 'translateY(-5px)'}} onClick={() => setOpenNewCard(true)} data-trash="true">Добавить карту</ButtonCard>
        </label>
        <label class="container">
          <span>Наличными курьером</span>
          <input type="radio" name="radio"/>
          <span class="checkmark"></span>
        </label>
        {/* <SelectContainer>
          <input type="radio" id="carta" name="payment" value="carta" defaultChecked/>
          <SelectLabel for="carta">
            <span>Картой онлайн</span>
          </SelectLabel>
          <ButtonCard>Добавить карту</ButtonCard>
        </SelectContainer>
        <SelectContainer>
          <input type="radio" id="nal" name="payment" value="nal"/>
          <SelectLabel for="nal">
            <span>Наличными курьером</span>
          </SelectLabel>
        </SelectContainer> */}
        <OrderInput text="Промокод" style={{width: 200, marginTop: 30}}/>
        {/* <DateWrapper>
          <DateTitle>Сегодня</DateTitle>
          <DateLine/>
          <DateContainer>
            <DateItem>14:00</DateItem>
            <DateItem>14:00</DateItem>
            <DateItem>14:00</DateItem>
            <DateItem>14:00</DateItem>
            <DateItem>14:00</DateItem>
            <DateItem>14:00</DateItem>
            <DateItem>14:00</DateItem>
            <DateItem>14:00</DateItem>
            <DateItem>14:00</DateItem>
            <DateItem>14:00</DateItem>
          </DateContainer>
        </DateWrapper> */}
        <ButtonContainer>
          <OrderButton onClick={() => setIsOrderMade(true)} data-trash="true">
            Заказать
          </OrderButton>
        </ButtonContainer>
      </OrderWrapper>
    </Wrapper>
  )
}

export default OrderCard;

const ButtonCard = styled.div`
  color: ${props => props.theme.primary};
  padding: 7px 16px;  
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  display: inline-block;
  border: 1px solid #FF2C55;
  border-radius: 5px;
  margin-left: 10px;
  transition: .3s all;

  :hover {
    cursor: pointer;
    transition: .3s all;
    background: ${props => props.theme.primary};
    color: #fff;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const OrderButton = styled.div`
  margin-top: 60px;
  background: #FF2C55;
  border-radius: 5px;
  padding: 9px 90px;
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;
  color: #fff;
  transition: .3s all;
  :hover {
    transition: .3s all;
    cursor: pointer;
    background: ${props => props.theme.primaryDark};
  }
`;

const DateSelect = styled.div`
  border: 2px solid #FF2C55;
  border-radius: 5px;
  width: 330px;
  max-width: 100%;
  font-weight: 350;
  font-size: 18px;
  line-height: 21px;
  padding: 12px 10px 12px 20px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SelectImg = styled.img`
  width: 17px;
  height: 10px;
`;

const DateWrapper = styled.div`
  width: 330px;
  height: 300px;
  padding: 13px 33px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;

`;

const DateTitle = styled.div`
  font-weight: 350;
  font-size: 20px;
  display: flex;
  justify-content: center;
  line-height: 23px;
  color: #000;
`;

const DateContainer = styled.div`
  overflow-y: scroll;
  height: 200px;
  width: 100%;

  &::-webkit-scrollbar {
    width: 2px;
    background: #EDECEC;
    overflow: visible;
  }

  &::-webkit-scrollbar-thumb  {
    background: ${props => props.theme.primary};
    width: 5px;
  }
`;

const DateItem = styled.div`
  margin: 8px 0px;
  font-weight: 350;
  width: 100%;
  text-align: center;
  font-size: 15px;
  line-height: 18px;
`;

const DateLine = styled.div`
  margin-top: 16px;
  width: 220px;
  border: 2px solid rgba(255, 44, 85, 0.47);
`;

const AddressDetail =  styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SelectContainer = styled.div`
  margin-top: 20px;
`;

const SelectLabel = styled.label`
  margin-left: 15px;
  font-weight: 350;
  font-size: 18px;
  line-height: 23px;
  cursor: pointer;
`;

const CodeButton = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #FFF;
  background: ${props => props.theme.primary};
  border-radius: 5px;
  padding: 12px 24px;
  transition: .3s all;
  margin-left: 12px;
  margin-top: 17px;
  :hover {
    transition: .3s all;
    cursor: pointer;
    background: ${props => props.theme.primaryDark};
  }
  @media(max-width: 520px) {
    margin: 0;
    margin-top: 10px;
    text-align: center;
  }
`;

const NumberContainer = styled.div`
  display: flex;
  @media(max-width: 520px) {
    flex-direction: column;
  }
`;

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
  padding: 30px;
`;