import React from 'react';
import styled from 'styled-components';
import DiscountsSwiper from "@components/DiscountsSwiper/DiscountsSwiper";
import FoodSection from "@components/FoodSection/FoodSection";
import ImageSwiper from "@components/ImageSwipper/ImageSwipper";
import ItemsList from "@components/ItemsList/ItemsList";
import TitlePicture from "@components/TitlePicture/TitlePicture";

//styled
import Wrapper from './styled/Wrapper';
import MContainer from './styled/MContainer';
const MobileMain = () => {
  return (
    <Wrapper>
      <MContainer>
        <TitlePicture/>
        <DiscountsSwiper/>
        <BigTitle  style={{marginTop: 50}}>
          Рестораны
        </BigTitle>
        <div style={{width: '100%', display: 'flex', alignItems: "center", marginTop: 20}}>
          <Input placeholder="Название ресторана, кухни или блюда..."/>
          <Button>Найти</Button>
        </div>
        <FoodSection/>
        <ImageSwiper/>
        <ItemsList/>
        <div style={{marginTop: 24}}/>
        <ImageSwiper/>
        <ItemsList/>
        
        <MoreButton>Показать ещё</MoreButton>

      </MContainer>
    </Wrapper>
  );
}

const DesktopMain = () => {
  return (
    <Wrapper>
      <MContainer>
        <TitlePicture/>
        <DiscountsSwiper/>
        <BigTitle  style={{marginTop: 50}}>
          Рестораны
        </BigTitle>
        <div style={{width: '100%', display: 'flex', alignItems: "center", marginTop: 20}}>
          <Input placeholder="Название ресторана, кухни или блюда..."/>
          <Button>Найти</Button>
        </div>
        <FoodSection/>
        <ImageSwiper/>
        <ItemsList/>
        <div style={{marginTop: 24}}/>
        <ImageSwiper/>
        <ItemsList/>
        
        <MoreButton>Показать ещё</MoreButton>

      </MContainer>
    </Wrapper>
  );
}

export {DesktopMain, MobileMain};

const BigTitle = styled.div`
  font-size: 40px;
  font-weight: bold;
  color: #000;
`;

const Button = styled.div`
  background: ${props => props.theme.primary};
  color: #fff;
  height: 41px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-left: 16px;
  padding: 0px 26px;
  line-height: 10px;
  cursor: pointer;
  transition: .3s all;
`;

const Input = styled.input`
  padding-left: 20px;
  width: 480px;
  height: 41px;
  border-radius: 5px;
  border: 2px solid ${props => props.theme.primary};
  outline: none;
`;

const MoreButton = styled.div`
  width: 100%;
  height: 45px;
  color: #fff;
  margin-top: 45px;
  display: flex;
  font-size: 18px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  background: ${props => props.theme.primary};
  transition: .3s all;
  &:hover {
    cursor: pointer;
    transition: .3s all;
    background: ${props => props.theme.primaryDark};
  }
`;