import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import DiscountsSwiper from "@components/DiscountsSwiper/DiscountsSwiper";
import FoodSection from "@components/FoodSection/FoodSection";
import ImageSwiper from "@components/ImageSwipper/ImageSwipper";
import ItemsList from "@components/ItemsList/ItemsList";
import TitlePicture from "@components/TitlePicture/TitlePicture";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import {fetchCategories, fetchVenues, fetchCollections} from "../redux/actions/Menus";

import {config} from '../config';
//styled
// const MobileMain = () => {
//   return (
//     <Wrapper>
//       <MContainer>
//         <TitlePicture/>
//         <DiscountsSwiper/>
//         <BigTitle  style={{marginTop: 50}}>
//           Рестораны
//         </BigTitle>
//         <div style={{width: '100%', display: 'flex', alignItems: "center", marginTop: 20}}>
//           <Input placeholder="Название ресторана, кухни или блюда..."/>
//           <Button>Найти</Button>
//         </div>
//         <FoodSection/>
//         <ImageSwiper/>
//         <ItemsList/>
//         <div style={{marginTop: 24}}/>
//         <ImageSwiper/>
//         <ItemsList/>
        
//         <MoreButton>Показать ещё</MoreButton>

//       </MContainer>
//     </Wrapper>
//   );
// }

const DesktopMain = () => {
  const dispatch = useDispatch();
  const venues = useSelector(({Menus}) => Menus.venues)
  const venuesLoad = useSelector(({Menus}) => Menus.venuesLoad)
  const categories = useSelector(({Menus}) => Menus.categories);
  const collections = useSelector(({Menus}) => Menus.collections)
  useEffect(() => {  
    if (!Array.isArray(venues)) dispatch(fetchVenues());
    if (!Array.isArray(collections)) dispatch(fetchCollections());
    dispatch(fetchCategories())
  }, [])
  useEffect(() => {
    console.log('VENUES = ', venues)
  }, [venues])
  return (
    <Wrapper>
      <MContainer>
        <TitlePicture/>
        <DiscountsSwiper collections={collections} />
        <BigTitle  style={{marginTop: 50}}>
          Рестораны
        </BigTitle>
        <div style={{width: '100%', display: 'flex', alignItems: "center", marginTop: 20}}>
          <Input placeholder="Название ресторана, кухни или блюда..."/>
          <Button>Найти</Button>
        </div>
        <FoodSection categories={categories}/>
        <ImageSwiper/>
        <ItemsList venues={venues} venuesLoad={venuesLoad}/>
        <div style={{marginTop: 24}}/>
        {/* <ImageSwiper/> */}
        <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
          <MoreButton>Показать ещё</MoreButton>
        </div>
      </MContainer>
    </Wrapper>
  );
}

const MobileMain = DesktopMain;

export default DesktopMain;
export {DesktopMain, MobileMain};

const BigTitle = styled.div`
  font-size: 40px;
  font-weight: bold;
  color: #000;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const MContainer = styled.div`
  width: 1180px;
  margin: 0 20px;

  height: 100%;
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
  width: 200px;
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
  transition: .2s all;
  &:hover {
    cursor: pointer;
    transition: .2s all;
    background: ${props => props.theme.primaryDark};
  }
`;