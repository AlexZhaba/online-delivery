import React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import BackImage from "@assets/backImage.png";
const Back = ({text}) => {
  return (
    <BackWrapper>
      <BackText>
        <NavLink to='/main'>
          {text}
        </NavLink>
      </BackText>
    </BackWrapper>  
  )
}

export default Back;
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
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  color: #000;
  //display: flex;
  //align-items: center;
`