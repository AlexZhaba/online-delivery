import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Back from '@components/Back/Back.jsx';
import axios from 'axios';

import {DesktopRestaurantName} from '@components/Restaurant/RestaurantName.jsx';
import List from '@components/Restaurant/ListCategories.jsx';
import Basket from "../components/Restaurant/Basket";
import ProductsList from "../components/Restaurant/ProductsList";
import ClearBasketModal from '../components/Restaurant/ClearBasketModal';
import {config} from '../config';

import {useDispatch, useSelector} from "react-redux";
import {fetchMenuById, fetchVenueById, setActiveMenu, setActiveVenue} from "../redux/actions/Menus";


const DesktopRestaurant = (props) => {
  const dispatch = useDispatch();

  let menu = useSelector(({Menus}) => Menus.activeMenu);
  let venue = useSelector(({Menus}) => Menus.activeVenue);
  let lang = useSelector(({User}) => User.lang);
  let token = useSelector(({User}) => User.token);
  const [clearBasketModal, setClearBasketModal] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [])
  useEffect(() => {
    // dispatch(setActiveVenue(null))
    // dispatch(setActiveMenu(null));
    if (token) {
      dispatch(fetchVenueById(props.match.params.id));
      dispatch(fetchMenuById(props.match.params.id));
    }
  }, [token]);
  return (
    <Wrapper>
      <MContainer>
        <Back text="Все рестораны"/>
        <DesktopRestaurantName venue={venue}/>
        <List menu={menu} lang={lang}/>
        <Container>
          <div>
            <Input placeholder="Поиск блюд..."/>
            <Button>Найти</Button>
            <ProductsList menu={menu} lang={lang} venue={venue}/>
          </div>
          <Basket {...props} clearBasketModal={clearBasketModal} setClearBasketModal={setClearBasketModal} lang={lang}/>
          <ClearBasketModal clearBasketModal={clearBasketModal} setClearBasketModal={setClearBasketModal}/>
        </Container>
      </MContainer>
    </Wrapper>
  )
}




const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  /* height: calc(100% + 200px); */
  @media(max-width: 1180px) {
    justify-content: center;
  }
`;

const Input = styled.input`
  border: 1px solid ${props => props.theme.primary};
  border-radius: 6px;
  outline: none;
  padding: 10px 20px;
  max-width: 500px;
  width: calc(100% - 120px);
  margin-right: 18px;
  font-size: 14px;
  &::placeholder {
    color: black;
  }
`;

const Button = styled.div`
  color: #fff;
  background: ${props => props.theme.primary};
  border: 1px solid ${props => props.theme.primary};
  padding: 10px 25px;
  border-radius: 6px;
  font-size: 14px;
  display: inline-block;
  cursor: pointer;
  font-weight: 500;
  transition: .2s all;
  :hover {
    background: #fff;
    color: #000;
    transition: .2s all;
  }
  @media(max-width: 750px) {
    //display: none;
  }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  padding-bottom: 110px;
  display: flex;
  justify-content: center;
`;

const MContainer = styled.div`
  width: 1180px;
  margin: 0 20px;
  height: 100%;
`;

export {DesktopRestaurant};