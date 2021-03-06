import React from 'react';
import styled from 'styled-components';
import {NavLink, BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import {useCookies} from 'react-cookie';

import {useDispatch, useSelector} from 'react-redux';
import { setToken, setTokenType, setUserGUID } from '../redux/actions/User';

import Back from '@components/Back/Back';

import {Profile} from './Account/Profile';
import {Points} from './Account/Points';
import {Orders} from './Account/Orders';
import {FavPlaces} from './Account/FavPlaces';
import {Cards} from './Account/Cards';
import {Addresses} from './Account/Addresses';

const AccountContainer = (props) => {
  const dispatch = useDispatch();


  let [cookies, setCookies, removeCookie] = useCookies([]);
  let {location} = props;
  
  let handleExit = () => {
    // setCookies('token', '');
    removeCookie('token', {path: '/', maxAge: 2592000});
    removeCookie('tokenType', {path: '/', maxAge: 2592000});
    dispatch(setUserGUID(null))
    dispatch(setToken(null))
    dispatch(setTokenType(null))
  }

  return (
    <Wrapper>
      <MContainer>
        <Back text="Все рестораны" margin="15px 0px 15px 10px"/>
        <Container>
          <RightContent>
            
              <Route
                path='/account/profile'
                render={() => <Profile/>}
              />
              <Route
                path='/account/points'
                render={() => <Points/>}
              />
              <Route
                path='/account/orders'
                render={() => <Orders/>}
              />
              <Route
                path='/account/favplaces'
                render={() => <FavPlaces/>}
              />
              <Route
                path='/account/cards'
                render={() => <Cards/>}
              />
              <Route
                path='/account/addresses'
                render={() => <Addresses/>}
              />
              <Route
                path='/account'
                exact
                render={() => <Redirect to='/account/profile'></Redirect>}
              />
            
          </RightContent>
          <LeftSidebar>
            <NavLink to='/account/profile'>
              <SidebarItem active={location.pathname === '/account/profile'}>Аккаунт</SidebarItem>
            </NavLink>
            <NavLink to='/account/points'>
              <SidebarItem active={location.pathname === '/account/points'}>Мои баллы</SidebarItem>
            </NavLink>
            <NavLink to='/account/orders'>
            <SidebarItem active={location.pathname === '/account/orders'}>Заказы</SidebarItem>
            </NavLink>
            <NavLink to='/account/addresses'>
            <SidebarItem active={location.pathname === '/account/addresses'}>Адрес доставки</SidebarItem>
            </NavLink>
            <NavLink to='/account/favplaces'>
            <SidebarItem active={location.pathname === '/account/favplaces'}>Любимые заведения</SidebarItem>
            </NavLink>
            <NavLink to='/account/cards'>
            <SidebarItem active={location.pathname === '/account/cards'}>Карты</SidebarItem>
            </NavLink>
            <SidebarItem onClick={handleExit}>Выход</SidebarItem>
          </LeftSidebar>
        </Container>
      </MContainer>
    </Wrapper>
  )
}

export {AccountContainer};

const Wrapper = styled.div`
  
  display: flex;
  justify-content: center;
  background: #F6F6F6;
  padding-bottom: 110px;
`;

const MContainer = styled.div`
  width: 1180px;
  margin: 0 20px;
  height: 100%;
  @media(max-width: 700px) {
    margin: 0;
    box-shadow: none;
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const RightContent = styled.div`
  flex: 1;
`;

const LeftSidebar = styled.div`
  margin-top: 85px;
  position: sticky;
  top: 120px;
  width: 370px;
  margin-left: 30px;
  height: 450px;
  background: #fff;
  border-radius: 5px;
  /* box-shadow: 0 0 15px #cdcdcd; */
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 20px;
  @media(max-width: 970px) {
    display: none;
  }
`;

const SidebarItem = styled.div`
  margin-left: 40px;
  width: 100%;
  font-size: 22px;
  line-height: 58px;
  font-weight: ${props => props.active ? "700" : "400"};
  color: ${props => props.active ? props.theme.primary: "#404040"};
  transition: .2s all;
  :hover {
    cursor: pointer;
    transition: .2s all;
    color: ${props => props.theme.primary};
  }
  :active{ 
    /* font-weight: 700; */
  }
`;