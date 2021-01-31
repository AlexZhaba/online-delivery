import React, {useEffect, useState, useMemo, useRef} from 'react';
import styled from 'styled-components';
import {fetchVenues, setSortVenues} from "../../redux/actions/Menus";
import {useDispatch, useSelector} from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';



let FoodSection = () => {
  const dispatch = useDispatch();
  let [sliderPerView, setSlidesPerView] = useState(5);
  const [openSort, setOpenSort] = useState(false);
  const sortVenues = useSelector(({Menus}) => Menus.sortVenues);
  const keyValue = useMemo(() => Date.now(), [sliderPerView])
  let SortButton = useRef(null);
  useEffect(() => {
    document.addEventListener('click', (event) => {
      if (SortButton.current && SortButton.current.contains(event.target)) {
        setOpenSort(true)
      } else {
        setOpenSort(false)
      }
    })
  }, [])
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

  const handleSelectSort = (sortVenues) => {
    dispatch(setSortVenues(sortVenues));
  }
  useEffect(( ) => {
    dispatch(fetchVenues());
  }, [sortVenues])
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
        <div style={{position: 'relative'}} ref={SortButton} id="sortButton">
          <Button onClick={(event) => {
            event.stopPropagation();
            setOpenSort(!openSort);
          }}>
            <ButtonBurger>
              <BurgerI style={{width: '100%'}}/>
              <BurgerI style={{width: '60%'}}/>
              <BurgerI style={{width: '30%'}}/>
            </ButtonBurger>
            <span>Сортировка</span>
          </Button>
          {/*{openSort &&*/}
          {/*  <SortWrapper style={{height: openSort ? "190px" : "0px", visibility: openSort ? "visible" : "hidden", paddingTop: openSort ? "" : "0px"}}>*/}
          <SortWrapper openSort={openSort}>
              <SortTitle>Сначала показать</SortTitle>
            <div>
              <SortSelect type="radio" id="huey" name="drone" value="huey" onChange={() => handleSelectSort("distance")}
                     checked={sortVenues === "distance"}/>
              <label for="huey">Ближайшие</label>
            </div>

            <div>
              <SortSelect type="radio" id="dewey" name="drone" value="dewey" onChange={() => handleSelectSort("popularity")}
                     checked={sortVenues === "popularity"}
              />
              <label for="dewey">Популярные</label>
            </div>

            <div>
              <SortSelect type="radio" id="louie" name="drone" value="louie" onChange={() => handleSelectSort("price-low-to-high")}
                     checked={sortVenues === "price-low-to-high"}
              />
              <label for="louie">Недорогие</label>
            </div>
            <div>
              <SortSelect type="radio" id="louie1" name="drone" value="louie1" onChange={() => handleSelectSort("price-high-to-low")}
                     checked={sortVenues === "price-high-to-low"}
              />
              <label htmlFor="louie1">Дорогие</label>
            </div>
          </SortWrapper>
          {/*}*/}
        </div>

    </Wrapper>
  )
}

export default FoodSection;

const SortSelect = styled.input`
  margin-top: 15px;
  margin-right: 5px;
`;

const SortWrapper = styled.div`
  position: absolute;
  z-index: 4;
  cursor: default;
  top: calc(100% + 20px);
  left: 0;
  padding: ${props => props.openSort ? "20px" : "0px 20px"};
  overflow: hidden;
  width: 300px;
  height: ${props => props.openSort ? "190px" : "0px"};
  background: #fff;
  transition: .2s all;
  box-shadow: ${props => props.openSort ? props.theme.shadow : ""};
`;

const SortTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #282828;
`;

const Wrapper = styled.div`
  display: flex;
  margin-top: 55px;
  margin-bottom: 55px;
  align-items: center;
  width: 100%;
  // width: auto;
  padding: 3px 0px;
  
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
  position: relative;
  background: ${props => props.theme.primary};
  color: #fff;
  transition: .3s all;
  position: relative;
  :hover {
    cursor: pointer;
    background: ${props => props.theme.primaryDark};
  }
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