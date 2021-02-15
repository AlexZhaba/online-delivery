import React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import BackImage from "@assets/backImage.png";
const Back = ({text, margin = "32px 0"}) => {
  return (
    <BackWrapper margin={margin}>
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
    @media(max-width: 700px) {
      width: 5px;
      left: -15px;
      top: -2px;
    }
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
  @media(max-width: 700px) {
    font-size: 12px;
    line-height: 15px;
  }
  font-size: 16px;
  line-height: 20px;
  color: #000;
  @media(max-width: 700px) {
    margin: ${props => props.margin};
    /* margin-left: 30px; */
  }
  //display: flex;
  //align-items: center;
`