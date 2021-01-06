import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Burger from '../styled/Burger';
import BurgerItem from '../styled/BurgerItem';

import logo from '@assets/logoSmall.png';
import cancel from '@assets/cancel.png';
import phone from '@assets/phone.png';
const BurgerMenu = ({isOpen, setIsOpen}) => {
  return (
    <Wrapper isOpen={isOpen}>
      <Sidebar isOpen={isOpen}>
        <SidebarTop>
          <img src={logo}/>
          <img src={cancel} style={{width: 18, height: 18}} onClick={() => setIsOpen(false)} style={{cursor: "pointer"}}/>
        </SidebarTop>
        <Button>Войти</Button>
        <SidebarBottom>
          Связаться с нами <img src={phone} style={{marginLeft: 5}}/>
        </SidebarBottom>
      </Sidebar>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  height: 100vh;
  ${({isOpen}) => {
    return isOpen ? 'opacity: 1; filter: alpha(opacity=100);' : 'opacity: 0; filter: alpha(opacity=0);';
  }}
  ${({isOpen}) => {
    return isOpen ? `` : `visibility: hidden;`
  }}
  ${({isOpen}) => isOpen ? `background: rgba(0, 0, 0, 0.7);` : `background: rgba(0, 0, 0, 0.0);`}
  transition: .5s all;
  
  
`;

const Button = styled.div`
  color: #fff;
  background: ${(props) => props.theme.primary};
  padding: 13px 53px;
  border-radius: 5px;
`;

const Sidebar = styled.div`
  transform: translateX(${({isOpen}) => isOpen ? `0px` : `-230px`});
  width: 230px;
  height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transition: .5s all;
`;

const SidebarTop = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;

`;

const SidebarBottom = styled.div`
  margin-bottom: 50px;
  height: 54px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`;

const HeaderBurger = () => {
  let [isOpen, setIsOpen] = useState(false);
  return (
    <>
    <Burger onClick={() =>setIsOpen(true) }>
      <BurgerItem/>
      <BurgerItem/>
      <BurgerItem/>
    </Burger>    
    <BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen}/>
    
    </>
  )
}

export default HeaderBurger;
