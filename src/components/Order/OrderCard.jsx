import React, {useState} from 'react';
import styled from 'styled-components';

import arrowBottom from '@assets/arrowBottom.png';

import ModalNewCard from './ModalNewCard';
import ModalMakeOrder from './ModalMakeOrder';
import {useDispatch, useSelector} from "react-redux";
import {clearBasket, fetchMakeOrder, fetchOrderConstraints} from "../../redux/actions/Order";
const OrderInput = ({text, style}) => (
  <div class="group" style={style}>      
    <input type="text" class="input__order" required/>
    <span class="highlight"></span>
    <span class="bar"></span>
    <label className="order__label">{text}</label>
  </div>
)

const OrderCard = ({constraints}) => {
  const dispatch = useDispatch();

  const [openNewCard, setOpenNewCard] = useState(false);
  const [isOrderMade, setIsOrderMade] = useState(false);

  let [openTime, setOpenTime] = useState(false);
  let [selectedTime, setSelectedTime] = useState(0);
  let [orderType, setOrderType] = useState('delivery');

  let basketVenue = useSelector(({Order}) => Order.basketVenue);
  let totalPrice = useSelector(({Order}) => Order.totalPrice)
  let basket = useSelector(({Order}) => Order.basketItems);

  if (!constraints) return <div></div>

  const setDelivery = () => {
    setSelectedTime(0);
    setOrderType('delivery')
    dispatch(fetchOrderConstraints('delivery'))
  }

  const setTakeaway = () => {
    setSelectedTime(0);
    setOrderType('takeaway')
    dispatch(fetchOrderConstraints('takeaway'))
  }

  const handleMakeOrder = () => {

    const date = new Date();

    // const event = new Date('05 October 2011 14:48 UTC');
    const event = new Date(`${date.getDate()} ${date.getMonth()} ${date.getFullYear()} ${constraints.hours[selectedTime]} UTC`);
    console.log(`${date.getDate()} ${date.getMonth()} ${date.getFullYear()} ${constraints.hours[selectedTime]} UTC`)

    const cart = {
      venue_guid: basketVenue.guid,
      order_type: orderType,
      order_price: totalPrice,
      currency: basket[0].portion.currency,
      time: event.toISOString(),
      asap: selectedTime === 0,
      user_card_guid: "",
      user_notes: "Положите огурчик, пожалуйста :)",
      payment_method: 0,
      user_address_guid: "",
      address: {
        name: "Г.Ташкент, улица Большого Рога, дом 32, квартира 21",
        lat: 41.2995,
        lon: 69.2401,
        notes: "Будьте тише!"
      },
      items: basket.map(item => {
        return {
          item_guid: item.guid,
          name: item.name,
          description: item.portion.metric,
          price: item.portion.price,
          packaging_price: item.packaging_price,
          count: item.count,
          portion_id: item.portion.id,
          portion_name: item.portion.name,
          modifier_options: item.modifer_groups.map(option => {
            return {
              guid: option.guid,
              name: option.name,
              price: option.price
            }
          })
        }
      })
    }
    dispatch(fetchMakeOrder(cart))
    dispatch(clearBasket())
    setIsOrderMade(true)
    // console.log(cart)
  }

  console.log(constraints.hours)
  return ( 
    <Wrapper>
      <ModalNewCard openNewCard={openNewCard} setOpenNewCard={setOpenNewCard}/>
      <ModalMakeOrder isOrderMade={isOrderMade} setIsOrderMade={setIsOrderMade}/>
      <MainTitle>
          Оформление заказа
        </MainTitle>
      <OrderWrapper>
        {/*<Title>Подтверждение номера телефона</Title>*/}
        {/*<NumberContainer>*/}
        {/*  <div>*/}
        {/*    <OrderInput text="Телефон"/>*/}
        {/*    <OrderInput text="Код из СМС(4 цифры)" style={{marginTop: 30}}/>*/}
        {/*  </div>*/}
        {/*  <div>*/}
        {/*    <CodeButton>*/}
        {/*        Получить код*/}
        {/*    </CodeButton>*/}
        {/*  </div>*/}
        {/*</NumberContainer>*/}
        <Title style={{marginBottom: 30}}>Тип доставки</Title>
        <label class="container" onClick={() => setDelivery()}>
          <span>Доставка курьером</span>
          <input type="radio" name="radio1" defaultChecked/>
          <span class="checkmark"></span>
        </label>
        <label class="container" onClick={() => setTakeaway()}>
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
        <DateSelect onClick={() => setOpenTime(!openTime)}>
          <span>{constraints.hours ? 
            selectedTime === 0 ? "Как можно быстрее" : constraints.hours[selectedTime] : ""}
          </span>
          <SelectImg src={arrowBottom}/>
          {openTime && 
          <DataWrapper>
              {constraints.hours && constraints.hours.map((e, index) => {
                if (index === 0) return <DataItem onClick={() => setSelectedTime(index)}>Как можно быстрее</DataItem>
                return (
                  <DataItem onClick={() => setSelectedTime(index)}>
                    {e}
                  </DataItem>
                )
              })}
            </DataWrapper>
          }
        </DateSelect>
        
        <Title style={{marginTop: 30, marginBottom: 30}}>Способы оплаты</Title>
        {constraints.payment_option === 0 &&
          <label className="container">
            <span>Наличными курьером</span>
            <input type="radio" name="radio"/>
            <span className="checkmark"></span>
          </label>
        }
        {constraints.payment_option === 1 &&
          <label className="container">
            <span>Картой онлайн</span>
            <input type="radio" name="radio" defaultChecked data-trash="true"/>
            <span className="checkmark"></span>
            <ButtonCard style={{transform: 'translateY(-5px)'}} onClick={() => setOpenNewCard(true)} data-trash="true">Добавить
              карту</ButtonCard>
        </label>
        }
        {constraints.payment_option === 2 &&
          <>
            <label class="container">
              <span>Картой онлайн</span>
              <input type="radio" name="radio" defaultChecked data-trash="true"/>
              <span class="checkmark"></span>
              <ButtonCard style={{transform: 'translateY(-5px)'}} onClick={() => setOpenNewCard(true)} data-trash="true">Добавить
                карту</ButtonCard>
            </label>
              <label class="container">
              <span>Наличными курьером</span>
              <input type="radio" name="radio"/>
              <span class="checkmark"></span>
            </label>
          </>
        }
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
        {/* <OrderInput text="Промокод" style={{width: 200, marginTop: 30}}/> */}
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
          <OrderButton onClick={() => handleMakeOrder()} data-trash="true">
            Заказать
          </OrderButton>
        </ButtonContainer>
      </OrderWrapper>
    </Wrapper>
  )
}

export default OrderCard;

const DataWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: -2px;
  width: calc(100% + 4px);
  /* height: 200px; */
  max-height: 400px;
  overflow: auto;
  z-index: 2;
  background: white;
  border: 2px solid ${props => props.theme.primary};
  /* background: red; */
`;

const DataItem = styled.div`
  width: 100%;
  padding: 10px 0;
  font-size: 20px;
  text-align: center;
  transition: .2s all;
  :hover {
    cursor: pointer;
    background: ${props => props.theme.primary};
    color: #FFF;
    transition: .2s all;
  }
`;

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
  margin-top: 30px;
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
  position: relative;
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
  @media(max-width: 700px) {
    font-size: 25px;
    margin-top: -20px;
  }
`;

const Title = styled.div`
  font-family: "Stem";
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  line-height: 37px;
  color: #000;
  @media(max-width: 700px) {
    font-size: 20px;
  }
`;

const OrderWrapper = styled.div`
  /* background: red; */
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.15);
  width: 100%;
  padding: 30px;
`;