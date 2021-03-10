import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import AppWrapper from '@shared/styled/AppWrapper.jsx';
import Wrapper from './components/shared/styled/Wrapper';
import { ThemeProvider } from "styled-components"
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Loader from '@components/Loader/Loader'

import { useCookies } from 'react-cookie';


//redux
import {useSelector, useDispatch} from 'react-redux'
import {userSignUp, getCity, setToken, fetchGuestToken, setTokenType, fetchProfile} from './redux/actions/User'

//components
import {MobileFooter, DesktopFooter} from '@components/Footer/Footer.jsx';
import {MobileHeader, DesktopHeader} from './components/Header/Header.jsx';
import {DesktopRestaurant} from "./pages/Restaurant";

//modals
import ModalSelectAddress from '@components/Modals/SelectAddress'

//pages
import {MobileMain} from './pages/Main';
import {MobileNew, DesktopNew} from './pages/New'
import {Cooperation} from './pages/Cooperation'
import {MakeOrder} from './pages/MakeOrder'
import DesktopMain from './pages/Main';
import {AccountContainer} from './pages/AccountContainer';
import {BasketMobile} from './pages/Basket';


import { fetchOrderConstraints } from './redux/actions/Order';
import { setSelectAddress } from './redux/actions/Modals';


let MobileLayout = () => {
  return (
    <Wrapper>
      <BrowserRouter history={createBrowserHistory()}>
        <DesktopHeader/>
        <div style={{marginBottom: 100}}/>
        <Switch>
          <Route
            path='/main'
            exact
            render={() => <DesktopMain/>}
          />
          <Route
            path='/new'
            exact
            render={DesktopNew}
          />
          <Route
            path='/restaurant/:id'
            exact
            render={(props) => <DesktopRestaurant {...props}/>}
          />
          <Route
            path='/cooperation'
            exact
            render={(props) => <Cooperation {...props}/>}
          />
          <Route
            path='/'
            render={() => <Redirect to='/main'></Redirect>}
          />
        </Switch>
      </BrowserRouter>
      <DesktopFooter/>
    </Wrapper>
  )
}

let DeskTopLayout = () => {
  const dispatch = useDispatch();

  let token = useSelector(({User}) => User.token)
  let tokenType = useSelector(({User}) => User.tokenType)
  let constraints = useSelector(({Order}) => Order.constraints)
  let basket = useSelector(({Order}) => Order.basketItems)
  
  //modals
  let selectAddress = useSelector(({Modals}) => Modals.selectAddress)

  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  useEffect(() => {
    if (cookies.token) {
      // alert(cookies.token)
      dispatch(setTokenType(cookies.tokenType)) 
      dispatch(setToken(cookies.token));
    }
  }, [])

  useEffect(() => {
    if (token === null && !cookies.token) {
      // alert(cookies.token)
      dispatch(fetchGuestToken())
    }
  }, [token])

  useEffect(() => {
    if (token) {
      dispatch(fetchProfile());
    }
  }, [token])

  useEffect(() => {
    if (basket.length !== 0 && token && !constraints) {
      dispatch(fetchOrderConstraints())
    }
  }, [basket, token])
  useEffect(() => {
    if (tokenType && token) {
      setCookie('tokenType', tokenType, {path: '/', maxAge: 2592000})
      setCookie('token', token, {path: '/', maxAge: 2592000})
    }
  }, [tokenType, token])


  const restaurantLoading = useSelector(({Menus}) => Menus.restaurantLoading);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position.coords.latitude, position.coords.longitude);
      dispatch(getCity(position.coords.latitude, position.coords.longitude))
    });
  }, [])

  return (
    <Wrapper>
      <LoadingRestaurantWrapper restaurantLoading={restaurantLoading}>
        <Loader/>
      </LoadingRestaurantWrapper>
      <ModalSelectAddress isOrderMade={selectAddress} setIsOrderMade={(selectAddress) => dispatch(setSelectAddress(selectAddress))}/>
      <BrowserRouter>
        <Route path='/' render={(props) => <DesktopHeader {...props}/>}/>
        
        <HeaderMargin/>
        
        <Switch>
          <Route
            path='/main'
            exact
            render={(props) => <DesktopMain {...props}/>}
          />
          <Route
            path='/new'
            exact
            render={DesktopNew}
          />
          <Route
            path='/restaurant/:id'
            exact
            render={(props) => <DesktopRestaurant {...props}/>}
          />
          <Route
            path='/makeOrder'
            exact
            render={(props) => <MakeOrder {...props}/>}
          />
          <Route
            path='/cooperation'
            exact
            render={() => <Cooperation/>}
          />
          <Route
            path='/account'
            render={(props) => <AccountContainer {...props}/>}
          />
          <Route
            path='/basket'
            render={(props) => <BasketMobile {...props}/>}
          />
          <Route
            path='/'
            render={() => <Redirect to='/main'></Redirect>}
          />
        </Switch>
      </BrowserRouter>
      <DesktopFooter/>
    </Wrapper>
  )
}

let isMobile = () => navigator.userAgent.match(/Android|webOS|iPhone|iPod|Blackberry/i);

const Theme = {
  headerHeight: '100px',
  shadow: '0 0 0 1px rgba(0, 0, 0, 0.1)',
  primary: "rgb(255, 44, 85)",
  primaryDark: "#d12e4e"
}


const App = () => {
  return (
    <ThemeProvider theme={isMobile() ? {userAgent: "mobile", ...Theme} : {userAgent: "desktop", ...Theme}}>
      <AppWrapper>
        {isMobile() ? 
          <DeskTopLayout/>
        :
          <DeskTopLayout/>
        }
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;

const HeaderMargin = styled.div`
  height: 100px;
  @media(max-width: 970px) {
    height: 70px;
  }
`;

const LoadingRestaurantWrapper = styled.div`
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  opacity: ${props => props.restaurantLoading ? "1" : "0"};
  visibility: ${props => props.restaurantLoading ? "visible" : "hidden"};
  height: 100vh;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: .3s all;
`;
