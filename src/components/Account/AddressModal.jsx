import React, { useEffect, useRef } from 'react';
import styled from 'styled-components'
import {clearBasket} from '../../redux/actions/Order';
import {useDispatch} from 'react-redux';

import lightning from '@assets/lightning.png';
import modal_add from '@assets/modal_add.png';

const AddressModal = ({isOpen, setIsOpen}) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch()
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

  const handleClear = () => {
    console.log(typeof clearBasket)
    dispatch(clearBasket());
    setIsOpen(false);
  }
  console.log('isOpen:',isOpen)
  return (
    <ModalWrapper modal={isOpen}>
    <ModalContainer  modal={isOpen} ref={modalRef}>
      <Cross src={modal_add} onClick={() => setIsOpen(false)}/>
      <FlexContainer>
        <div style={{width: '100%'}}>
        <TitleInput >
          Адрес доставки 
        </TitleInput>  
        <Input placeholder="г.Ташкент, улица Чехова" style={{maxWidth: '100%'}}/> 
        </div>
      </FlexContainer>
      <FlexContainer style={{ marginTop: 30}}>
        <FlexItem>
        <TitleInput>
          Дом
        </TitleInput>  
        <Input placeholder=""/>  
        </FlexItem>
        <FlexItem>
        <TitleInput>
          Подъезд
        </TitleInput>  
        <Input placeholder=""/>  
        </FlexItem>
        <FlexItem>
        <TitleInput>
          Этаж
        </TitleInput>  
        <Input placeholder=""/>  
        </FlexItem>
        <FlexItem>
        <TitleInput>
          Квартира
        </TitleInput>  
        <Input placeholder=""/>  
        </FlexItem>
      </FlexContainer>
      <ButtonClear onClick={handleClear}>
        Сохранено
      </ButtonClear>
    </ModalContainer>
  </ModalWrapper>
  
  )
}

export default AddressModal;

const Cross = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

const FlexItem = styled.div`
  /* margin-right: 25px; */
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