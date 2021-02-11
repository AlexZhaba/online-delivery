import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import AppWrapper from '@shared/styled/AppWrapper.jsx';
import Wrapper from './components/shared/styled/Wrapper';
import { ThemeProvider } from "styled-components"
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Loader from '@components/Loader/Loader'

//redux
import {useSelector, useDispatch} from 'react-redux'
import {userSignUp} from './redux/actions/User'

//components
import {MobileFooter, DesktopFooter} from '@components/Footer/Footer.jsx';
import {MobileHeader, DesktopHeader} from './components/Header/Header.jsx';
import {DesktopRestaurant} from "./pages/Restaurant";

//pages
import {MobileMain} from './pages/Main';
import {MobileNew, DesktopNew} from './pages/New'
import {Cooperation} from './pages/Cooperation'
import {MakeOrder} from './pages/MakeOrder'
import DesktopMain from './pages/Main';

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
  const restaurantLoading = useSelector(({Menus}) => Menus.restaurantLoading);
  useEffect(() => {
    // dispatch(userSignUp("Alex", "+998901234567", "85808"))
  }, [])

  return (
    <Wrapper>
      <LoadingRestaurantWrapper restaurantLoading={restaurantLoading}>
        <Loader/>
      </LoadingRestaurantWrapper>
      <BrowserRouter>
        <Route path='/' render={(props) => <DesktopHeader {...props}/>}/>
        
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
