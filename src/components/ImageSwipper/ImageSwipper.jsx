import React, {useState} from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

import imageBurger from '@assets/slider/burger.png';
import imageBreakfast from '@assets/slider/breakfast.png'
import swiperArrow from '@assets/swiperArrow.png'
// SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const ImageSwiper = () => {
  const [sw, setSw] = useState(null);
  return (
    <SwiperContainer>
      <SwiperButton style={{left: -20}}  onClick={() => sw.slidePrev()}>
        <img src={swiperArrow} style={{transform: "rotate(180deg)"}}/>
      </SwiperButton>
      <SwiperButton style={{right: -20}} onClick={() => sw.slideNext()}>
        <img src={swiperArrow}/>
      </SwiperButton>
      <Swiper
        sliderPerView={1}
        touchReleaseOnEdges={true}
        grabCursor={true}
        speed={500}
        onSwiper={(swiper) => setSw(swiper)}
      >
        <SwiperSlide>
          <SwiperItem style={{backgroundImage: `url(${imageBurger})`}}>
            {/*<img src={imageBurger}/>*/}
          </SwiperItem>
        </SwiperSlide>
        <SwiperSlide>
          <SwiperItem style={{backgroundImage: `url(${imageBreakfast})`}}>
            {/*<img src={imageBreakfast}/>*/}
          </SwiperItem>
        </SwiperSlide>
      </Swiper>
    </SwiperContainer>
  )
}

const SwiperContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  border-radius: 5px;
  width: 100%;
`;

const SwiperButton = styled.div`
  top: 50%;
  transform: translateY(-50%);
  position: absolute;
  z-index: 10;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: $primary;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  img {
    padding: 5px;
    box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.25);
    background: ${props => props.theme.primary};
    border-radius: 50%;
    width: 24px;
    height: 24px;
  }
`;

const SwiperItem = styled.div`
  border-radius: 5px;
  height: 250px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export default ImageSwiper;