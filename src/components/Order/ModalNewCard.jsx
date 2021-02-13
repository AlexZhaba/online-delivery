import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'
import {clearBasket} from '../../redux/actions/Order';
import {useDispatch} from 'react-redux';

import lightning from '@assets/lightning.png';
const ModalNewCard = ({openNewCard, setOpenNewCard}) => {
  const [card, setCard] = useState('');
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [CVC, setCVC]   = useState('');
  const modalRef = useRef(null);
  const dispatch = useDispatch()
  useEffect(() => {
    const handle = (event) => {
      if (typeof event.target.dataset.trash !=="undefined") return;
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenNewCard(false);
      } 
    }
    document.removeEventListener('click', handle, true)
    document.addEventListener('click', handle);
  }, [])

  const handleClear = () => {
    console.log(typeof clearBasket)
    dispatch(clearBasket());
    setOpenNewCard(false);
  }

  const handleCard = (event) => {
    if (event.target.value.length < card.length) {
      setCard(event.target.value.replaceAll(' ', '').replace(/\d{4}(?=.)/g, '$& '));
      return;
    }
    if (!isNaN(parseInt(event.target.value[event.target.value.length - 1])) || event.target.value === "")
      setCard(event.target.value.replaceAll(' ', '').replace(/\d{4}(?=.)/g, '$& '))
  }

  const handleDate = (event) => {
    if (event.target.value.length < date.length) {
      if (event.target.value.length === 3) setDate(event.target.value.replace('/', ''));
        else setDate(event.target.value);
    } else {
      // console.log(isNaN(parseInt(event.target.value[event.target.value.length - 1])), ' ', event.target.value === "");
      console.log((!isNaN(parseInt(event.target.value[event.target.value.length - 1]))))
      if ((!isNaN(parseInt(event.target.value[event.target.value.length - 1]))) || event.target.value === "") {
        if ((event.target.value.length) === 2) setDate(event.target.value.substring(0, 2) + '/') 
        else if ((event.target.value.length) === 3) setDate(event.target.value.substring(0, 2) + '/' + event.target.value[event.target.value.length - 1])
        else setDate(event.target.value);
      }
    }
  }

  const handleCVC = (event) => {
    if (!isNaN(parseInt(event.target.value[event.target.value.length - 1])) || event.target.value === "")
      setCVC(event.target.value);
  }

  return (
    <ModalWrapper modal={openNewCard}>
    <ModalContainer  modal={openNewCard} ref={modalRef}>
      <Cross onClick={() => setOpenNewCard(false)}>
        <CrossEl style={{transform: "rotate(45deg)"}}/>
        <CrossEl style={{transform: "rotate(-45deg) translate(2px, -1px)"}}/>
      </Cross>
      <Title>Добавление карты</Title>
      <CardWrapper>
        <CardTop>
          <CardInput placeholder="Номер карты" id="card" maxLength={19} value={card} onChange={(event) => handleCard(event)}/>
          <CardInput placeholder="мм/гг" id="date" value={date} onChange={(event) => handleDate(event)} maxLength={5}/>
          <CardInput placeholder="Имя держателя (как на карте)" id="name"/>
          <CardInput placeholder="CVC" maxLength={3} onChange={(event) => handleCVC(event)} value={CVC}/>
        </CardTop>
        <CardBottom>
          <BottomLine/>
          <CardInput placeholder="CVC" maxLength={3} style={{width: 85, margin: 18, }} onChange={(event) => handleCVC(event)} value={CVC}/>
        </CardBottom>
      </CardWrapper>
      <Button onClick={() => setOpenNewCard(false)}>
        Добавить
      </Button>
    </ModalContainer>
  </ModalWrapper>
  
  )
}

export default ModalNewCard;

const Cross = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  display: flex;
  width: 30px;
  height: 30px;
  flex-direction: column;
  cursor: pointer;
  justify-content: center;
  :hover {
    & > div {
      transition: .3s all;
      transform: none !important;
    }
  }
  @media(max-width: 400px) {
    right: 10px;
  }
`;

const CrossEl = styled.div`
  width: 100%;
  height: 2px;
  transform-origin: center;
  background: #080808;
  transition: .3s all;
`;


const Button = styled.div`
  margin-top: 100px;
  background: ${props => props.theme.primary};
  color: #fff;
  font-size: 14px;
  border-radius: 5px;
  padding: 15px 0px;
  text-align: center;
  min-width: 220px;
  transition: .2s all;
  :hover {
    cursor: pointer;
    transition: .2s all;
    background: ${props => props.theme.primaryDark};
  }
`;

const ModalWrapper = styled.div`
  opacity: ${props => props.modal ? "1" : "0"};
  visibility: ${props => props.modal ? "visible" : "hidden"};
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: .2s all;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100vh;
`;

const ModalContainer = styled.div`
  /* width: 200px; */
  width: 700px;
  max-height: calc(100vh - 100px);
  /* height: 500px; */
  // min-height: ${props => props.modal ? "443px" : "0px"};
  /* width: 300px; */
  transition: .5s all;
  opacity: ${props => props.modal ? "1" : "0"};
  background: white;
  position: relative;
  border-radius: 5px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  margin: 0 10px;
`;


const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
`;

const CardWrapper = styled.div`
  position: relative;
  z-index: 2;
`;

const CardTop = styled.div`
  margin-top: 60px;
  position: relative;
  background: rgb(243, 244, 246);
  box-shadow: 0px 4px 16px rgb(0, 0, 0, 0.15);
  width: 350px;
  height: 210px;
  border-radius: 15px;
  transform: translateX(-40px);
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px 30px;
  & > :last-child  {
    display: none;
  }
  @media(max-width: 750px) {
    transform: none;
    height: 260px;
    & > :last-child  {
      display: block;
    }
  }
`;


const CardBottom = styled(CardTop)`
  margin: 0;
  position: absolute;
  padding: 0;
  top: 0;
  left: 0;
  transform: translate(85px, 110px);
  z-index: 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  & > :last-child  {
    display: block;
  }
  @media(max-width: 750px) {
    display: none;
  }
`;

const BottomLine = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 65px;
  background: rgb(86, 76, 77);
`;

const CardInput = styled.input`
  padding: 12px;
  font-size: 13px;
  outline: none;
  background: rgb(243, 244, 246);
  border: 1px solid rgb(191, 195, 207);
  color: #000;
`;