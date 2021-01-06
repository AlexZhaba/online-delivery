import React from 'react';
import styled from 'styled-components';
import mainTitle from '@assets/mainTitle.jpg'
import mapPoint from "@assets/mapPoint.png";
import arrow from "@assets/arrow.png";

const TitlePicture = () => {
  return (
    <MContainerWrapper style={{backgroundImage: `url(${mainTitle})`}}>
      <WrapperLeft>
        <BigText>Доставка еды <br/>в Ташкенте</BigText>
        <SubText>
          С сервисом Stolik вы можете легко и быстро
          забронировать столик или заказать доставку
          еды из ресторанов и кафе Ташкента
        </SubText>
        <InputWrapper style={{borderColor: "#fff", flex: 'none', marginLeft: 0}}>
          <div>
            <img src={mapPoint} className="header__mapPoint"/>
          </div>
          <Input placeholder="Адрес доставки"/>
          <Select>
            <span>Сейчас</span>
            <img src={arrow} style={{marginLeft: 5}}/>
          </Select>
        </InputWrapper>
      </WrapperLeft>
      <WrapperRight/>
    </MContainerWrapper>
  );
}

export default TitlePicture;

const MContainerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 380px;
  //background: blue;
  margin-top: 40px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 5px;
  display: flex;
  @media(max-width: 500px) {
    display: none;
  }
  &::before {
    content: '';
    background: linear-gradient(to bottom, rgba(0,0, 0,0.7) 0%,rgba(0,0,0,0.3) 100%);
    border-radius: 5px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
`;

const WrapperLeft = styled.div`
  z-index: 4;
  flex: 1;
  padding: 40px;
  //color: #fff;
  display: flex;
  flex-direction: column;
`;

const WrapperRight = styled.div`
  flex: 1;
  @media(max-width: 1000px) {
    flex: 0;      
  }
`;

const Input = styled.input`
  flex: 1;
  outline: none;
  height: calc(100% - 2px);
  border: none;
`;

const InputWrapper = styled.div`
  flex: 1;
  height: 40px;
  display: flex;
  background: #fff;
  align-items: center;
  border-radius: 5px;
  border: 2px solid ${props => props.theme.primary};
  margin: 0 60px;
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

const BigText = styled.div`
  z-index: 4;
  font-size: 50px;
  color: #FFF;
  margin-bottom: 30px;
  font-weight: bold;
`;

const SubText = styled.div`
  z-index: 4;
  font-size: 20px;
  color: #FFF;
  line-height: 28px;
  margin-bottom: 20px;
`;
