import React from 'react';
import styled from 'styled-components';

import ItemsList from "@components/ItemsList/ItemsList";
import BackImage from "@assets/backImage.png";
import {NavLink} from "react-router-dom";

const MobileNew = (props) => {
  return (
    <div>
      MobileNew
    </div>
  )
}


const DesktopNew = (props) => {
  return (
    <Wrapper>
      <MContainer>
        <BackWrapper>
          <BackText>
            <NavLink to='/main'>
              Главная
            </NavLink>
          </BackText>
        </BackWrapper>

        <BigText>
          Новинки
        </BigText>
        <ItemsList/>
      </MContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const BackText = styled.div`
  cursor: pointer;
  position: relative;
  display: inline-block;
  transition: .3s all;
  margin-left: 18px;
  ::before {
    content: '';
    position: absolute;
    top: 0;
    transform: translateY(1px);
    left: -20px;
    //background: red;
    background-image: url("${BackImage}");
    background-repeat: no-repeat;
    transition: .3s all;
    width: 10px;
    height: 100%;
  }
  :hover {
    & {
      transform: translate(-5px, 0px);
      transition: .3s all;
    }
  }
`;

const BackWrapper = styled.div`
  margin: 32px 0;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #000;
  //display: flex;
  //align-items: center;
`

const BigText = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 42px;
  line-height: 51px;
  //vertical-align: center;
  color: #282828;
  margin-bottom: 40px;
  @media(max-width: 1065px) {
    & {
      display: flex;
      justify-content: center;
      font-size: 24px;
    }
  }
`

const MContainer = styled.div`
  width: 1180px;
  margin: 0 20px;
  height: 100%;
`;

export {MobileNew, DesktopNew};