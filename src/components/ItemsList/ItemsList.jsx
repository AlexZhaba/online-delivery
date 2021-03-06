import React, { useEffect } from 'react';
import styled from 'styled-components';
import {NavLink} from "react-router-dom";
import Loader from "@components/Loader/Loader";
import {useSelector, useDispatch} from 'react-redux';

import pasta from '@assets/food/pasta.jpg'
import greyStar from '@assets/greyStar.png';
import greyTime from '@assets/greyTime.png';
import heart from '@assets/heart.png'
import heartFilled from '@assets/heart-filled.png'
import { addFavouriteVenue } from '../../redux/actions/User';
import axios from 'axios';

const Item = ({venue, index, venuesLoad, lang, handleOpenRestaurant}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    
  }, [])
  return (
    <div onClick={() => handleOpenRestaurant(venue.guid)}>
    <ItemContainer venuesLoad={venuesLoad} online={venue.online}>
      <Heart>
        <HeartImg src={heart} style={{width: 30, height: 27}} onClick={(event) => {
          event.stopPropagation();
          // alert('good')
          dispatch(addFavouriteVenue(venue.guid))
        }}/>
      </Heart>
      <ItemImg style={{backgroundImage: `url(${ venue.featured_image_urls ? venue.featured_image_urls[0] : "https://diabetno.ru/wp-content/uploads/2020/07/pp_image_7236_22yecuiyctplaceholder.png"})`}}>
      </ItemImg>
      <ItemBottom>
        <BottomName>{venue.name[lang]}</BottomName>
        <BottomSub>{venue.description[lang]}</BottomSub>
        <BottomData>
          <BottomItem>
            <img src={greyStar}/>
            <span>{venue.rating}</span>
          </BottomItem>
          <BottomItem>
            <img src={greyTime}/>
            <span>4,5</span>
          </BottomItem>
          <BottomItem>
            <span style={{margin: 0}}>от {venue.check_value.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} {venue.check_currency}</span>
          </BottomItem>
        </BottomData>
      </ItemBottom>
    </ItemContainer>
    </div>
  )
}

let ItemsList = ({venues, venuesLoad, history, handleOpenRestaurant}) => {
  const dispatch = useDispatch();


  console.log('venues =',venues);
  console.log('venuesLoad:',venuesLoad)

  const lang = useSelector(({User}) => User.lang);

  //onClick={ () => history.push(`restaurant/${venue.guid}`)}
  if (!venues) return <LoaderContainer>
    <Loader/>
  </LoaderContainer>
  return (
    <Wrapper>
      {(venues && venuesLoad) && <LoaderShadow>
        <Loader/>
      </LoaderShadow>}
      {(venues) && venues.map((venue, index) => <Item venue={venue} index={index} venuesLoad={venuesLoad} lang={lang} handleOpenRestaurant={handleOpenRestaurant}/>
        // useEffect(() => {
        //   console.log('left')
        // }, [])
        // return (
        //   <div onClick={() => handleOpenRestaurant(venue.guid)}>
        //   <ItemContainer venuesLoad={venuesLoad} online={venue.online}>
        //     <Heart>
        //       <img src={heart} style={{width: 30, height: 27}} onClick={(event) => {
        //         event.stopPropagation();
        //         // alert('good')
        //         dispatch(addFavouriteVenue(venue.guid))
        //       }}/>
        //     </Heart>
        //     <ItemImg style={{backgroundImage: `url(${ venue.featured_image_urls ? venue.featured_image_urls[0] : "https://diabetno.ru/wp-content/uploads/2020/07/pp_image_7236_22yecuiyctplaceholder.png"})`}}>
        //     </ItemImg>
        //     <ItemBottom>
        //       <BottomName>{venue.name[lang]}</BottomName>
        //       <BottomSub>{venue.description[lang]}</BottomSub>
        //       <BottomData>
        //         <BottomItem>
        //           <img src={greyStar}/>
        //           <span>{venue.rating}</span>
        //         </BottomItem>
        //         <BottomItem>
        //           <img src={greyTime}/>
        //           <span>4,5</span>
        //         </BottomItem>
        //         <BottomItem>
        //           <span style={{margin: 0}}>от {venue.check_value.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} {venue.check_currency}</span>
        //         </BottomItem>
        //       </BottomData>
        //     </ItemBottom>
        //   </ItemContainer>
        //   </div>
        // )
      )}


    </Wrapper>
  )
}

const HeartImg = styled.img`
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  //width: calc(300% + 30px);
  width: 100%;
  margin-top: 20px;
`;

const LoaderShadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  //margin-top: 100px;
  z-index: 3;
  display: flex;
  justify-content: center;
  //align-items: center;
  //background: rgba(0, 0, 0, 0.2);
`;

const Wrapper = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 30px;
  row-gap: 30px;
  position: relative;
  @media (max-width: 1030px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 670px) {
    grid-template-columns: 1fr;  
  }
`;

const ItemContainer = styled.div`
  height: 320px;
  cursor: pointer;
  box-shadow: 0 0 15px #cdcdcd;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: .3s all ease-in-out;
  ${props => !props.online ? "filter: grayscale(100%);" : ""}
  :hover {
    /* transform: translateY(-7px); */
    transform: scale(1.04);
    transition: .3s all ease-in-out;
  }
  ${props => {
    if (props.venuesLoad || !props.online) {
      return `
        ::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 5px;
          z-index: 5;
        }
      `
    }
  }}
`;

const Heart = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
`;

const ItemImg = styled.div`
  flex: 1;
  background: white;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 5px;
`;

const ItemBottom = styled.div`
  /* height: 114px; */
  width: 100%;
  padding: 20px;
`;

const BottomName = styled.div`
  font-weight: bold;
  font-size: 22px;
`;

const BottomSub = styled.div`
  margin-top: 7px;
  font-size: 14px;
  color: rgb(136, 136, 136);
`;

const BottomData = styled.div`
  width: 100%;
  height: 30px;
  margin-top: 5px;
  display: flex;
  align-items: center;
`;

const BottomItem = styled.div`
  margin-right: 20px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  & > :first-child {
    margin-right: 5px;
  }
`;
export default ItemsList;