import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components'
import {clearBasket} from '../../redux/actions/Order';
import {useDispatch} from 'react-redux';

import CircleLoader from '@components/Loader/CircleLoader';


import lightning from '@assets/lightning.png';
import modal_add from '@assets/modal_add.png';

const NewCardModal = ({isOpen, setIsOpen, getCode, isLoad, page, verifyData, verifyCode, addPin}) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch()

  let [date, setDate] = useState('');
  let [card, setCard] = useState('');
  
  let [code, setCode] = useState('');
  let [pin, setPin] = useState('');

  useEffect(() => {
    const handle = (event) => {
      if (typeof event.target.dataset.trash !=="undefined") return;
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      } 
    }
    document.removeEventListener('click', handle, true)
    document.addEventListener('click', handle);
  }, [])

  console.log('isOpen:',isOpen)

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

  const handleCard = (event) => {
    if (event.target.value.length < card.length) {
      setCard(event.target.value.replaceAll(' ', '').replace(/\d{4}(?=.)/g, '$& '));
      return;
    }
    if (!isNaN(parseInt(event.target.value[event.target.value.length - 1])) || event.target.value === "")
      setCard(event.target.value.replaceAll(' ', '').replace(/\d{4}(?=.)/g, '$& '))
  }

  return (
    <ModalWrapper modal={isOpen}>
    <ModalContainer  modal={isOpen} ref={modalRef}>
      {
      isLoad && <LoaderWrapper>
                  <CircleLoader/>
                </LoaderWrapper>
      }
      <Cross src={modal_add} onClick={() => setIsOpen(false)}/>
      {page === 0 &&
        <>
          <FlexContainer>
            <FlexItem>
            <TitleInput >
              Номер карты
            </TitleInput>  
            <Input style={{maxWidth: '100%'}} value={card} onChange={(event) => handleCard(event)} maxLength={19}/> 
            </FlexItem>
          </FlexContainer>
          <FlexContainer style={{marginTop: 20}}>
            <FlexItem>
              <TitleInput >
                Срок действия
              </TitleInput>  
              <Input style={{maxWidth: '100%'}} value={date} onChange={(event) => handleDate(event)} maxLength={5}/> 
            </FlexItem>
          </FlexContainer>
          <ButtonClear onClick={() => getCode(card.replaceAll(' ', ''), date.replace('/', ''))}>
            Получить код
          </ButtonClear>
        </>
      }
      {page === 1 && 
      <>
      <TitleInput style={{textAlign: 'center'}}>
        Сообщение с кодом отправлено на {verifyData.phone}
      </TitleInput>
      <FlexContainer style={{justifyContent: 'center'}}>
        <FlexItem style={{maxWidth: 130}}> 
          <Input style={{maxWidth: '100%', textAlign: 'center'}} maxLength={6} value={code} onChange={event => setCode(event.target.value)} /> 
        </FlexItem>
      </FlexContainer>
      <ButtonClear onClick={() => verifyCode(code)} >
        Подтвердить код
      </ButtonClear>
      </>
      }
      {
        page === 2 &&
        <>
          <TitleInput style={{textAlign: 'center'}}>
            Добавьте пин-код для карты
          </TitleInput>
          <FlexContainer style={{justifyContent: 'center'}}>
            <FlexItem style={{maxWidth: 130}}> 
              <Input style={{maxWidth: '100%', textAlign: 'center'}} maxLength={4} value={pin} onChange={event => setPin(event.target.value)} /> 
            </FlexItem>
          </FlexContainer>
          <ButtonClear onClick={() => addPin(pin)} >
            Создать карту
          </ButtonClear>
        </>
      }
    </ModalContainer>
  </ModalWrapper>
  
  )
}

export default NewCardModal;

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

const Cross = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

const FlexItem = styled.div`
  /* margin-right: 25px; */
  flex: 1;
  @media(max-width: 500px) {
    /* margin-right: 0; */
  }
`;

const FlexContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  @media(max-width: 500px) {
    /* flex-direction: column; */
    flex-wrap: wrap;
  }
`;

const Input = styled.input`
  outline: none;
  border-radius: 5px;
  font-weight: 300;
  width: 100%;
  max-width: 70px;
  flex: 1;
  font-size: 16px;
  line-height: 20px;
  /* color: #969595; */
  color: #404040;
  border: 1px solid #D2D2D2;

  padding: 15px 21px;
`;

const TitleInput = styled.div`
  font-weight: 300;
  font-size: 16px;
  line-height: 20px;
  color: #404040;
  margin-bottom: 8px;
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
  // min-height: ${props => props.modal ? "443px" : "0px"};
  /* width: 300px; */
  width: 570px;
  transition: .5s all;
  opacity: ${props => props.modal ? "1" : "0"};
  background: white;
  position: relative;
  border-radius: 5px;
  padding: 30px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  margin: 0 10px;
`;

const ButtonClear = styled.div`
  margin-top: 25px;
  cursor: pointer;
  font-size: 14px;
  padding: 10px 20px;
  min-width: 150px;
  text-align: center;
  color: #fff;
  border-radius: 4px;
  background: ${props => props.theme.primary};
  border: 2px solid ${props => props.theme.primary};
  transition: .2s all;
  :hover {
    transition: .2s all;
    border: 2px solid ${props => props.theme.primaryDark};
    background: ${props => props.theme.primaryDark};
  }

`;