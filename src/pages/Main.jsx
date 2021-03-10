import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import DiscountsSwiper from "@components/DiscountsSwiper/DiscountsSwiper";
import FoodSection from "@components/FoodSection/FoodSection";
import ImageSwiper from "@components/ImageSwipper/ImageSwipper";
import ItemsList from "@components/ItemsList/ItemsList";
import TitlePicture from "@components/TitlePicture/TitlePicture";
import Loader from '@components/Loader/Loader';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import {fetchCategories, fetchVenues, fetchCollections, fetchBanners,
  setActiveVenue, setActiveMenu, fetchVenueById, fetchMenuById, setRestaurantLoading, fetchSearchVenues } from "../redux/actions/Menus";
import { useHistory } from "react-router-dom";
import basketIcon from '@assets/basketIcon.png';

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

const DesktopMain = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const venues = useSelector(({Menus}) => Menus.venues)
  const venuesLoad = useSelector(({Menus}) => Menus.venuesLoad)
  const categories = useSelector(({Menus}) => Menus.categories);
  const collections = useSelector(({Menus}) => Menus.collections);
  const restaurantLoading = useSelector(({Menus}) => Menus.restaurantLoading);

  const banners = useSelector(({Menus}) => Menus.banners);
  const city = useSelector(({User}) => User.city);
  let token = useSelector(({User}) => User.token);
  let totalPrice = useSelector(({Order}) => Order.totalPrice)
  let basket = useSelector(({Order}) => Order.basketItems)

  useEffect(() => {  
    if (city && token) {
      if (!Array.isArray(venues)) dispatch(fetchVenues());
      if (!Array.isArray(collections)) dispatch(fetchCollections());
      dispatch(fetchCategories())
      dispatch(fetchBanners());
    }
  }, [city, token])
  useEffect(() => {
    console.log('VENUES = ', venues)
  }, [venues])

  const handleOpenRestaurant = (guid) => {
    dispatch(setActiveVenue(null))
    dispatch(setActiveMenu(null));
    dispatch(setRestaurantLoading(true))
    dispatch(fetchVenueById(guid));
    dispatch(fetchMenuById(guid));
    
  }
  useEffect(() => {
    if (typeof restaurantLoading === "string") {
      dispatch(setRestaurantLoading(null));
      history.push(`restaurant/${restaurantLoading}`);

    }
  }, [restaurantLoading])

  const handleSearch = () => {
    if (document.getElementById('search__rest').value === "") {
      dispatch(fetchVenues())
    }
    else {
      dispatch(fetchSearchVenues(document.getElementById('search__rest').value))
      document.getElementById('search__rest').value = ""
    }
  }

  return (
    <Wrapper>
      {basket.length !== 0 && props.match.path !== "/makeOrder"  &&

        <MobileWrapper onClick={() => history.push('/basket')}>
            <BasketIcon src={basketIcon}/>
            <span>{totalPrice.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}</span>
        </MobileWrapper>

        }
      <MContainer>
        <TitlePicture/>
        <DiscountsSwiper collections={collections} />
        <BigTitle  style={{marginTop: 50}}>
          Рестораны
        </BigTitle>
        <div style={{width: '100%', display: 'flex', alignItems: "center", marginTop: 20}}>
          <Input placeholder="Название ресторана, кухни или блюда..." id="search__rest"/>
          <Button onClick={handleSearch}>Найти</Button>
        </div>
        <FoodSection categories={categories}/>
        <ImageSwiper banners={banners}/>
        <ItemsList venues={venues} venuesLoad={venuesLoad} history={history} handleOpenRestaurant={handleOpenRestaurant}/>
        <div style={{marginTop: 24}}/>
        {/* <ImageSwiper/> */}
        {/* <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
          <MoreButton>Показать ещё</MoreButton>
        </div> */}
      </MContainer>
    </Wrapper>
  );
}

const MobileMain = DesktopMain;

export default DesktopMain;
export {DesktopMain, MobileMain};


const BasketIcon = styled.img`
  margin-right: 20px;
  width: 20px;
  height: 20px;
`;


const MobileWrapper = styled.div`
  position: fixed;
  left: 0px;
  bottom: 0;
  width: 100%;
  /* right: 20px; */
  height: 60px;
  z-index: 9;
  display: none;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: 500;
  font-size: 18px;
  background: ${props => props.theme.primary};
  transition: .2s all;
  @media(max-width: 970px) {
    display: flex;
  }
  :hover {
    cursor: pointer;
    transition: .2s all;
    background: ${props => props.theme.primaryDark};
  }
`;

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
  :hover {
    transition: .3s all;
    /* background: blue; */
    background: ${props => props.theme.primaryDark};
  }
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