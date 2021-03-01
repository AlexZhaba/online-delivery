import React, {useState, useEffect, useRef} from 'react';
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
import { parse } from '@babel/core';
// SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const ImageSwiper = ({banners}) => {
  const [sw, setSw] = useState(null);
  const [size, setSize] = useState('1024');

  const SwiperRef = useRef(null);

  useEffect(() => {
    if (banners) {
      const handleResize = (event) => {
        let temp = false;
        Object.keys(banners[0].image).forEach(size => {
          
            if (parseInt(size) <= parseInt(SwiperRef.current.clientWidth)) {
              setSize(size);
              temp = true;
          
          }
        })
      };
      window.removeEventListener('resize', handleResize)
      window.addEventListener('resize', handleResize)
      handleResize();
    }
  }, [banners])
  if (!banners) return <div></div>;
  // console.log('banners: ', banners)
  return (
    <SwiperContainer>
      <SwiperButton style={{left: -20}}  onClick={() => sw.slidePrev()} grey={banners ? banners.length === 1 : banners}>
        <img src={swiperArrow} style={{transform: "rotate(180deg)"}}/>
      </SwiperButton>
      <SwiperButton style={{right: -20}} onClick={() => sw.slideNext()} grey={banners ? banners.length === 1 : banners}>
        <img src={swiperArrow}/>
      </SwiperButton>
      <Swiper
        ref={SwiperRef}
        sliderPerView={1}
        touchReleaseOnEdges={true}
        grabCursor={true}
        speed={500}
        onSwiper={(swiper) => setSw(swiper)}
      >
        {banners && banners.map(banner => (
          <SwiperSlide>
            <a href={banner.url} target={banner.target}>
          <SwiperItem style={{backgroundImage: `url(${banner.image[size]})`}}>
            {/*<img src={imageBurger}/>*/}
          </SwiperItem>
          </a>
        </SwiperSlide>  
        ))}
        {/* <SwiperSlide>
          <SwiperItem style={{backgroundImage: `url(${imageBurger})`}}>
          </SwiperItem>
        </SwiperSlide>
        <SwiperSlide>
          <SwiperItem style={{backgroundImage: `url(${imageBreakfast})`}}>
          </SwiperItem>
        </SwiperSlide> */}
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
  z-index: 8;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: $primary;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${props => props.grey ? "filter: grayscale(1);" : ""}
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