import React, {useRef, useEffect, useState} from 'react';

import styled from "styled-components";

import mapPoint from "@assets/mapPoint.png";
import arrow from "@assets/arrow.png";

let Input = ({borderColor = null, flex = null, marginLeft = null, style = null}) => {
  const [openTime, setOpenTime] = useState(false);
  let timeRef = useRef(null);
  useEffect(() => {
    document.addEventListener('click', (event) => {
      if (timeRef.current && timeRef.current.contains(event.target)) {
        setOpenTime(true)
      } else {
        setOpenTime(false)
      }
    })
  }, [])
  return (
    <InputWrapper borderColor={borderColor} flex={flex} marginLeft={marginLeft} style={style}>
      <div>
        <img src={mapPoint} className="header__mapPoint"/>
      </div>
      <InputEl placeholder="Адрес доставки"/>
      <div style={{position: 'relative'}}>
        <Select ref={timeRef} onClick={(event) => {
          event.stopPropagation();
          setOpenTime(!openTime);
        }}>
          <span>Сейчас</span>
          <img src={arrow} style={{marginLeft: 5}}/>
        </Select>
        <TimeWrapper openTime={openTime} onClick={(event) => event.stopPropagation()}>
          
        </TimeWrapper>
      </div>
    </InputWrapper>
  )
}

const TimeWrapper = styled.div`
  position: absolute;
  z-index: 4;
  cursor: default;
  top: calc(100% + 20px);
  left: 0;
  padding: ${props => props.openTime ? "20px" : "0px 20px"};
  overflow: hidden;
  width: 300px;
  height: ${props => props.openTime ? "190px" : "0px"};
  background: #fff;
  transition: .2s all;
  box-shadow: ${props => props.openTime ? props.theme.shadow : ""};
`;

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
  position: relative;
  cursor: pointer;
`;

export default Input;