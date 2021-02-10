import React, {useEffect, useState, useMemo, useRef} from 'react';
import styled from 'styled-components';
import {fetchVenues, fetchVenuesByCategory, setActiveCategory, setSortVenues, setVenuesByCategory} from "../../redux/actions/Menus";
import {useDispatch, useSelector} from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';



let FoodSection = ({categories}) => {
  const dispatch = useDispatch();
  let [sliderPerView, setSlidesPerView] = useState(5);
  const [openSort, setOpenSort] = useState(false);
  const sortVenues = useSelector(({Menus}) => Menus.sortVenues);
  const venues = useSelector(({Menus}) => Menus.venues)
  const activeCategory = useSelector(({Menus}) => Menus.activeCategory);
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
    dispatch(fetchVenues());
  }

  const handleSelectCategory = (categoryId) => {
    dispatch(fetchVenuesByCategory(categoryId))
  }
  const handleRemoveCategory = () => {
    dispatch(setActiveCategory(null))
    dispatch(fetchVenues());
  }
  // useEffect(( ) => {
  //   if (!Array.isArray(venues)) dispatch(fetchVenues());
  // }, [sortVenues])
  //TODO: Adaptive
  console.log('activeCategory:', activeCategory)
  return (
    <Wrapper>
      <WrapperItem onClick={handleRemoveCategory} isActive={activeCategory === null}>Все</WrapperItem>
        {categories && categories.map(category => {
          return <WrapperItem onClick={() => handleSelectCategory(category.guid)} isActive={activeCategory === category.guid}>{category.title.ru}</WrapperItem>
        })}
        {/* <WrapperItem>Все</WrapperItem>

        <WrapperItem>Плов</WrapperItem>

        <WrapperItem>Суши</WrapperItem>

        <WrapperItem>Шашлык</WrapperItem>

        <WrapperItem>Итальянская</WrapperItem>

        <WrapperItem>Бургеры</WrapperItem>

        <WrapperItem>Обеды</WrapperItem>

        <WrapperItem>Завтраки</WrapperItem>

        <WrapperItem>Русская</WrapperItem> */}
        <div style={{position: 'relative', display: activeCategory !== null ? "none" : ""}} ref={SortButton} id="sortButton">
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
          <SortWrapper openSort={openSort} >
              <SortTitle>Сначала показать</SortTitle>
              <label class="container" style={{fontSize: 17, marginTop: 10}} onClick={() => handleSelectSort("distance")}>
                <span>Ближайшие</span>
                <input type="radio" name="radio2" checked={sortVenues === "distance"}/>
                <span class="checkmark"></span>
              </label>
                  <label class="container" style={{fontSize: 17}} onClick={() => handleSelectSort("popularity")}>
                <span>Популярные</span>
                <input type="radio" name="radio2" checked={sortVenues === "popularity"}/>
                <span class="checkmark" ></span>
              </label>
              <label class="container" style={{fontSize: 17}} onClick={() => handleSelectSort("price-low-to-high")}>
                <span>Сначала недорогие</span>
                <input type="radio" name="radio2" checked={sortVenues === "price-low-to-high"}/>
                <span class="checkmark"></span>
              </label>
              <label class="container" style={{fontSize: 17}}  onClick={() => handleSelectSort("price-high-to-low")}>
                <span>Сначала дорогие</span>
                <input type="radio" name="radio2" checked={sortVenues === "price-high-to-low"}/>
                <span class="checkmark"></span>
              </label>
            {/* <div>
              <SortSelect type="radio" id="huey" name="drone" value="huey" onChange={() => handleSelectSort("distance")}
                     checked={sortVenues === "distance"}/>
              <label for="huey" style={{cursor: "pointer"}}>Ближайшие</label>
            </div>

            <div>
              <SortSelect type="radio" id="dewey" name="drone" value="dewey" onChange={() => handleSelectSort("popularity")}
                     checked={sortVenues === "popularity"}
              />
              <label for="dewey" style={{cursor: "pointer"}}>Популярные</label>
            </div>

            <div>
              <SortSelect type="radio" id="louie" name="drone" value="louie" onChange={() => handleSelectSort("price-low-to-high")}
                     checked={sortVenues === "price-low-to-high"}
              />
              <label for="louie" style={{cursor: "pointer"}}>Недорогие</label>
            </div>
            <div>
              <SortSelect type="radio" id="louie1" name="drone" value="louie1" onChange={() => handleSelectSort("price-high-to-low")}
                     checked={sortVenues === "price-high-to-low"}
              />
              <label htmlFor="louie1" style={{cursor: "pointer"}}>Дорогие</label>
            </div> */}
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
  box-shadow: ${props => props.openSort ? "0 0 15px #cdcdcd" : ""};
  border-radius: 5px;
`;

const SortTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #282828;
`;

const Wrapper = styled.div`
  display: flex;
  margin-top: 55px;
  margin-bottom: 55px;
  height: 50px;
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
  padding: 10px 15px;
  margin: 0 5px;
  border-radius: 25px;
  transition: .15s all;
  &:hover {
      transition: .15s all;
      cursor: pointer;
      background: ${props => props.theme.primary};
      color: #fff;
    }
  ${props => props.isActive ? `
    background: ${props.theme.primary};
    color: #fff;
  ` : ``}
`;

const Button = styled.div`
  flex-shrink: 0;
  border-radius: 5px;
  padding: 15px 15px;
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