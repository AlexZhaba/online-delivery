import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import Burger from '../styled/Burger';
import BurgerItem from '../styled/BurgerItem';

import {NavLink} from 'react-router-dom';

import logo from '@assets/logo.png';
import cancel from '@assets/cancel.png';
import phone from '@assets/phone.png';
import {setToken, setTokenType, setUserGUID} from "../../../redux/actions/User";
import {useCookies} from "react-cookie";
import {useDispatch, useSelector} from "react-redux";
const BurgerMenu = ({isOpen, setIsOpen, profile, setEntry}) => {
  let dispatch = useDispatch();
  let barRef = useRef(null);
  let [cookies, setCookie, removeCookie] = useCookies([])
  let tokenType = useSelector(({User}) => User.tokenType);

  useEffect(() => {
    let handle = (event) => {
      if (typeof event.target.dataset.trash !=="undefined") return;
      if (barRef.target && barRef.current.contains(event.target)) {

      } else setIsOpen(false)
    };
    window.removeEventListener('click', handle)
    window.addEventListener('click', handle)
  }, [barRef])
  let handleExit = () => {
    // setCookies('token', '');
    removeCookie('token', {path: '/', maxAge: 2592000});
    removeCookie('tokenType', {path: '/', maxAge: 2592000});
    dispatch(setUserGUID(null))
    dispatch(setToken(null))
    dispatch(setTokenType(null))
  }
  return (
    <Wrapper isOpen={isOpen}>
      <Sidebar isOpen={isOpen} ref={barRef}>
        <SidebarTop>
          <NavLink to='/main' onClick={() => setIsOpen(false)}>
            <img src={logo} style={{width: 100}}/>
          </NavLink>
          <img src={cancel} style={{width: 18, height: 18}} onClick={() => setIsOpen(false)} style={{cursor: "pointer"}}/>
        </SidebarTop>
        {
          !(profile && tokenType === "USER") && <Button onClick={ () => {
            setEntry(true)
            setIsOpen(false)
          }}>Войти</Button>
        }
        { 
          (profile && tokenType === "USER") &&
          <SidebarMenu>
            <MenuItemName>

                {profile.first_name} {profile.last_name}

            </MenuItemName>
            <MenuItem>
              <NavLink to='/account/profile' onClick={() => setIsOpen(false)} >
                Аккаунт
              </NavLink >
            </MenuItem>
            <MenuItem>
              <NavLink to='/account/points' onClick={() => setIsOpen(false)}>
                Мои баллы 2000
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to='/account/orders' onClick={() => setIsOpen(false)}>
                Заказы
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to='/account/addresses' onClick={() => setIsOpen(false)}>
                Адрес доставки
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to='/account/favPlaces' onClick={() => setIsOpen(false)}>
                Любимые заведения
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to='/account/cards' onClick={() => setIsOpen(false)}>
                Карты
              </NavLink>
            </MenuItem>
            <MenuItem onClick={() => {
              handleExit()
              setIsOpen(false)
            }}>
                Выйти
            </MenuItem>
          </SidebarMenu>
        }
        <div style={{marginTop: 40}}>
          <NavLink to='/cooperation'>
            <QuickInfo>
              Ресторанам
            </QuickInfo>
          </NavLink>
          <NavLink to='/cooperation'>
            <QuickInfo>
              Курьерам
            </QuickInfo>
          </NavLink>
        </div>
        <SidebarBottom>
          Связаться с нами <img src={phone} style={{marginLeft: 5}}/>
        </SidebarBottom>
      </Sidebar>
    </Wrapper>
  )
}

const QuickInfo = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 29px;
  text-align: center;
  color: #404040;
`;

const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;

const MenuItem = styled.div`
  font-size: 17px;
  color: #404040;
  margin: 5px 0;
  margin-left: 20px;
  line-height: 36px;
  transition: .2s all;
  cursor: pointer;
  :hover {
    transition: .2s all;
    color: ${props => props.theme.primary};
  }
`;

const MenuItemName = styled(MenuItem)`
  font-size: 22px;
  color: ${props => props.theme.primary};
`;

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
  margin-top: 30px;
  color: #fff;
  background: ${(props) => props.theme.primary};
  padding: 13px 53px;
  border-radius: 5px;
  cursor: pointer;
`;

const Sidebar = styled.div`
  transform: translateX(${({isOpen}) => isOpen ? `0px` : `-70vw`});
  width: 70vw;
  height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-between; */
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
  height: 54px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`;

const HeaderBurger = ({profile, setEntry}) => {
  let [isOpen, setIsOpen] = useState(false);
  return (
    <>
    <Burger onClick={() =>setIsOpen(true) } data-trash="true">
      <BurgerItem data-trash="true"/>
      <BurgerItem data-trash="true"/>
      <BurgerItem data-trash="true"/>
    </Burger>    
    <BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} profile={profile} setEntry={setEntry}/>
    
    </>
  )
}

export default HeaderBurger;
