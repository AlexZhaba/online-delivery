import React, {useEffect, useState} from 'react';
import AppWrapper from '@shared/styled/AppWrapper.jsx';
import Wrapper from './components/shared/styled/Wrapper';
import { ThemeProvider } from "styled-components"
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
//components
import {MobileFooter, DesktopFooter} from '@components/Footer/Footer.jsx';
import {MobileHeader, DesktopHeader} from './components/Header/Header.jsx';
import {DesktopRestaurant} from "./pages/Restaurant";

//pages
import {MobileMain} from './pages/Main';
import {MobileNew, DesktopNew} from './pages/New'

import DesktopMain from './pages/Main';
let MobileLayout = () => {
  return (
    <Wrapper>
      <MobileHeader/>
      {/*<MobileMain/>*/}
      <BrowserRouter>
        <Switch>
          <Route
            path='/restaurant/:id'
            exact
            render={(props) => <DesktopRestaurant {...props}/>}
          />
        </Switch>
      </BrowserRouter>
      <MobileFooter/>
    </Wrapper>
  )
}

let DeskTopLayout = () => {
  return (
    <Wrapper>
      <BrowserRouter>
        <DesktopHeader/>
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
  shadow: '0 0 15px #cdcdcd',
  primary: "rgb(255, 44, 85)",
  primaryDark: "#d12e4e"
}

const App = () => {
  return (
    <ThemeProvider theme={isMobile() ? {userAgent: "mobile", ...Theme} : {userAgent: "desktop", ...Theme}}>
      <AppWrapper>
        {isMobile() ? 
          <MobileLayout/>
        :
          <DeskTopLayout/>
        }
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
