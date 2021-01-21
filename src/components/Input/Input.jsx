import React from 'react';

import styled from "styled-components";

import mapPoint from "@assets/mapPoint.png";
import arrow from "@assets/arrow.png";

let Input = ({borderColor = null, flex = null, marginLeft = null, style = null}) => {
  return (
    <InputWrapper borderColor={borderColor} flex={flex} marginLeft={marginLeft} style={style}>
      <div>
        <img src={mapPoint} className="header__mapPoint"/>
      </div>
      <InputEl placeholder="Адрес доставки"/>
      <Select>
        <span>Сейчас</span>
        <img src={arrow} style={{marginLeft: 5}}/>
      </Select>
    </InputWrapper>
  )
}

const InputEl = styled.input`
  flex: 1;
  outline: none;
  height: calc(100% - 2px);
  border: none;
`;
const InputWrapper = styled.div`
  ${(props) => props.borderColor ? `border: 2px solid ${props.borderColor};` : `border: 2px solid ${props.theme.primary};`}
  ${(props) => props.flex ? `flex: ${props.flex};` : "flex: 1;"}
  height: 40px;
  display: flex;
  background: #fff;
  align-items: center;
  margin: 0 60px;
  ${props => props.marginLeft !== null ? `margin-left: ${props.marginLeft} !important;` : ``}
  border-radius: 5px;
  @media(max-width: 1150px) {
    margin: 0 10px;
    margin-left: 20px;
  }
  @media(max-width: 970px) {
    margin: 0;
    margin-left: 15px;
  }
  @media (max-width: 620px) {
    margin: 0 5px;
    margin-right: 0px;
  }
`;

const Select = styled.div`
  margin-right: 15px;
  display: flex;
`;

export default Input;