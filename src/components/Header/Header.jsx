import React from 'react';

import logo from '@assets/logo.png';
import mapPoint from "@assets/mapPoint.png";
import arrow from "@assets/arrow.png";
import {Link} from 'react-router-dom';
//styled
import Wrapper from './styled/Wrapper';
import Main from './styled/Main';
// import InputWrapper from  './styled/InputWrapper';
// import Input from './styled/Input';
// import Select from './styled/Select';
import LogoImg from './styled/LogoImg';
//components
import Input from "../Input/Input";
import HeaderBurger from './components/HeaderBurger';
import HeaderConnect from './components/HeaderConnect';
const MobileHeader = () => {
  return (
    <Wrapper>
      <Main>
        <HeaderBurger/>
        <LogoImg src={logo} className="header__logo"/>
        <Input/>
        <HeaderConnect/>
      </Main>
    </Wrapper>
  );
}

const DesktopHeader = () => {
  return (
    <Wrapper>
      <Main>
        <HeaderBurger/>
        <Link to='/main'>
          <LogoImg src={logo} className="header__logo"/>
        </Link>
        <Input/>
        <HeaderConnect/>
      </Main>
    </Wrapper>
  );
}

export {MobileHeader, DesktopHeader};
