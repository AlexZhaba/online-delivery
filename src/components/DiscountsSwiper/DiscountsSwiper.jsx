import React, {useEffect, useState, useMemo} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';
import 'swiper/swiper.scss';
import burger1 from '@assets/burger1.jpg'

const widthByCount = {
  
}

let DiscountsSwiper = ({collections}) => {
  const []
  const keyValue = useMemo(() => Date.now(), [sliderPerView])
  useEffect(() => {
    let handleResize
    window.addEventListener('resize', (event) => {
      let width = parseInt(event.currentTarget.innerWidth);
      
    })
  }, []);
  useEffect(() => {
    let width = window.innerWidth;
    if (width > 1000) {
      if (sliderPerView !== 5) setSlidesPerView(5);
    }
    if (width <= 1000) {
      if (sliderPerView !== 4) setSlidesPerView(4);
    }
    if (width <= 760) {
      if (sliderPerView !== 3) setSlidesPerView(3);
    }
    if (width <= 600) {
      if (sliderPerView !== 2) setSlidesPerView(2);
    }
  }, [])
  return (
    <Container>
      {
       collections && collections.map((collection, index) => {
         return (
      
               <ItemContainer image={collection.images ? collection.images["312"] : null}>
                 <ContainerText>
                   {collection.description.ru}
                 </ContainerText>
                 <ContainerDiscount>
                   {collection.short_text}
                 </ContainerDiscount>
               </ItemContainer>

         )
       })
      }
    </Container>
  )
}

const Container = styled.div`
  display: flex;
`;

const SwiperContainer = styled.div`
  margin-top: 40px;
  width: 100%;
`;

const ItemContainer = styled.div`
  height: 170px;
  max-width: 1200px;
  position: relative;
  border-radius: 5px;
  background-image: ${props => `url(${props.image})`};
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 15px;
  padding-left: 20px;
  
  ::before {
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

const ContainerText = styled.div`
  position: relative;
  z-index: 10;
  white-space: pre-line;
  font-size: 18px;
  line-height: 24px;
  font-weight: 500;
  color: #fff;
`;

const ContainerDiscount = styled.div`
  margin-top: 15px;
  z-index: 10;
  position: relative;
  padding: 12px 28px;
  font-weight: bold;
  color: #000;
  background: #fff;
  border-radius: 5px;
  font-size: 16px;
  line-height: 14px;
`;
export default DiscountsSwiper;