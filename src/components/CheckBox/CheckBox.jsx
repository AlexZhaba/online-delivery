
import React, {useState} from 'react';
import styled from "styled-components";
import boxoff from '@assets/boxoff.png';
import boxon from '@assets/boxon.png';
const CheckBox = ({selected, setSelected}) => {
  return (
    <Wrapper src={selected ? boxon : boxoff } onClick={() => setSelected(!selected)}/>
  )
}

export default CheckBox;

const Wrapper = styled.img`
  cursor: pointer;
  width: 20px;
  height: 20px;
`;