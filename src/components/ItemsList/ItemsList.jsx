import React from 'react';
import styled from 'styled-components';
import {NavLink} from "react-router-dom";

import pasta from '@assets/food/pasta.jpg'
import greyStar from '@assets/greyStar.png';
import greyTime from '@assets/greyTime.png';

import heart from '@assets/heart.png'

let ItemsList = ({venues}) => {
  console.log('venues =',venues);
  //onClick={() => document.getElementById('root').scrollIntoView()}
  return (
    <Wrapper>
      {venues && venues.map((venue, index) => {
        return (
          <NavLink to={`restaurant/${venue.guid}`}>
          <ItemContainer>
            <Heart>
              <img src={heart} style={{width: 30, height: 27}}/>
            </Heart>
            <ItemImg style={{backgroundImage: `url(${ venue.thumb_image_urls ? venue.thumb_image_urls : "https://diabetno.ru/wp-content/uploads/2020/07/pp_image_7236_22yecuiyctplaceholder.png"})`}}>
            </ItemImg>
            <ItemBottom>
              <BottomName>{venue.name.ru}</BottomName>
              <BottomSub>{venue.description.ru}</BottomSub>
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
                  <span style={{margin: 0}}>от 13 000 сум</span>
                </BottomItem>
              </BottomData>
            </ItemBottom>
          </ItemContainer>
          </NavLink>
        )
      })}


    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 30px;
  row-gap: 30px;
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
  :hover {
    transform: translateY(-7px);
    transition: .3s all ease-in-out;
  }
`;

const Heart = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
`;

const ItemImg = styled.div`
  flex: 1;
  background: red;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 5px;
`;

const ItemBottom = styled.div`
  height: 114px;
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