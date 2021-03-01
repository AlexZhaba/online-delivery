import React, { useEffect, useRef } from 'react';
import styled from 'styled-components'
import {clearBasket} from '../../redux/actions/Order';
import {useDispatch} from 'react-redux';


const ModalMaxCartPrice = ({isOpen, setIsOpen, constraints}) => {
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
  return (
    <ModalWrapper modal={isOpen}>
    <ModalContainer  modal={isOpen} ref={modalRef}>
      <TitleClear>
        Превышен лимит стоимости корзины
      </TitleClear>
      <Text>
        Стоимость корзины не должна превышать {constraints && `${constraints.max_cart_price} ${constraints.currency}`}
      </Text>
      <ButtonWrapper>
        <ButtonClear onClick={() => setIsOpen(false)}>
          Понятно
        </ButtonClear>
        
      </ButtonWrapper>
    </ModalContainer>
  </ModalWrapper>
  
  )
}

export default ModalMaxCartPrice;

const ModalWrapper = styled.div`
  opacity: ${props => props.modal ? "1" : "0"};
  visibility: ${props => props.modal ? "visible" : "hidden"};
  z-index: 11;
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
  transition: .5s all;
  opacity: ${props => props.modal ? "1" : "0"};
  background: white;
  position: relative;
  border-radius: 5px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 0 10px;
`;


const TitleClear = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Text = styled.div`
  margin-top: 20px;
  font-weight: 500;
  font-size: 15px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
  justify-content: flex-start;
`;

const ButtonCancel = styled.div`
  font-size: 14px;
  font-weight: 500;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  border: 2px solid ${props => props.theme.primary};
  transition: .2s all;
  :hover {
    transition: .2s all;
    background: #fff0f2;
  }
`;

const ButtonClear = styled.div`
  margin-left: 10px;
  cursor: pointer;
  font-size: 14px;
  padding: 10px 20px;
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