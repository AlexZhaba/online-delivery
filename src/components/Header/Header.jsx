import React from 'react';

import logo from '@assets/logo.png';
import mapPoint from "@assets/mapPoint.png";
import arrow from "@assets/arrow.png";

//styled
import Wrapper from './styled/Wrapper';
import Main from './styled/Main';
import InputWrapper from  './styled/InputWrapper';
import Input from './styled/Input';
import Select from './styled/Select';
import LogoImg from './styled/LogoImg';
//components
import HeaderBurger from './components/HeaderBurger';
import HeaderConnect from './components/HeaderConnect';
const MobileHeader = () => {
  return (
    <Wrapper>
      <Main>
        <HeaderBurger/>
        <LogoImg src={logo} className="header__logo"/>
        <InputWrapper>
          <div>
            <img src={mapPoint} className="header__mapPoint"/>
          </div>
          <Input placeholder="Адрес доставки"/>
          <Select>
            <span>Сейчас</span>
            <img src={arrow} style={{marginLeft: 5}}/>
          </Select>
        </InputWrapper>
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
        <LogoImg src={logo} className="header__logo"/>
        <InputWrapper>
          <div>
            <img src={mapPoint} className="header__mapPoint"/>
          </div>
          <Input placeholder="Адрес доставки"/>
          <Select>
            <span>Сейчас</span>
            <img src={arrow} style={{marginLeft: 5}}/>
          </Select>
        </InputWrapper>
        <HeaderConnect/>
      </Main>
    </Wrapper>
  );
}

export {MobileHeader, DesktopHeader};
