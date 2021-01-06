import React, {useEffect, useState, useMemo} from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
let FoodSection = () => {
  let [sliderPerView, setSlidesPerView] = useState(5);
  const keyValue = useMemo(() => Date.now(), [sliderPerView])
  useEffect(() => {
    let handleResize
    window.addEventListener('resize', (event) => {
      let width = parseInt(event.currentTarget.innerWidth);
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
    })
  }, []);
  //TODO: Adaptive
  return (
    <Wrapper>

        <WrapperItem>Все</WrapperItem>

        <WrapperItem>Плов</WrapperItem>

        <WrapperItem>Суши</WrapperItem>

        <WrapperItem>Шашлык</WrapperItem>

        <WrapperItem>Итальянская</WrapperItem>

        <WrapperItem>Бургеры</WrapperItem>

        <WrapperItem>Обеды</WrapperItem>

        <WrapperItem>Завтраки</WrapperItem>

        <WrapperItem>Русская</WrapperItem>

        <Button>

          <ButtonBurger>
            <BurgerI style={{width: '100%'}}/>
            <BurgerI style={{width: '60%'}}/>
            <BurgerI style={{width: '30%'}}/>
          </ButtonBurger>
          <span>Сортировка</span>
        </Button>
    </Wrapper>
  )
}

export default FoodSection;

const Wrapper = styled.div`
  display: flex;
  margin-top: 55px;
  margin-bottom: 55px;
  align-items: center;
  width: 100%;
  padding: 3px 0px;
  overflow-x: hidden;
  @media(max-width: 970px) {
    overflow-x: scroll;
  }
`;

const WrapperItem = styled.div`
  flex-shrink: 0;
  padding: 7px 5px;
  margin: 0 5px;
  border-radius: 30px;
  transition: .15s all;
  &:hover {
      transition: .15s all;
      cursor: pointer;
      background: ${props => props.theme.primary};
      color: #fff;
    }
`;

const Button = styled.div`
  flex-shrink: 0;
  border-radius: 5px;
  padding: 16px 16px;
  height: 41px;
  display: flex;
  align-items: center;
  background: ${props => props.theme.primary};
  color: #fff;
  transition: .3s all;
`;

const ButtonBurger = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 5px;
`;

const BurgerI = styled.div`
  height: 1px;
  margin: 2px 0;
  background: white;
`;