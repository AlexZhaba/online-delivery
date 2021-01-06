import React from 'react';
import AppWrapper from '@shared/styled/AppWrapper.jsx';
import Wrapper from './components/shared/styled/Wrapper';
import { ThemeProvider } from "styled-components"

//components
import {MobileFooter, DesktopFooter} from '@components/Footer/Footer.jsx';
import {MobileHeader, DesktopHeader} from './components/Header/Header.jsx';
import Main from './components/Main/Main';

let MobileLayout = () => {
  return (
    <Wrapper>
      <DesktopHeader/>
      <Main/>
      <DesktopFooter/>
    </Wrapper>
  )
}

let DeskTopLayout = () => {
  return (
    <Wrapper>
      <DesktopHeader/>
      <Main/>
      <DesktopFooter/>
    </Wrapper>
  )
}

let isMobile = () => navigator.userAgent.match(/Android|webOS|iPhone|iPod|Blackberry/i);

const Theme = {
  headerHeight: '120px',
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
