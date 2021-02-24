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
  const lang  = useSelector(({User}) => User.lang);
  let SortButton = useRef(null);
  useEffect(() => {
    document.addEventListener('click', (event) => {
      if (SortButton.current && SortButton.current.contains(event.target)) {
        // setOpenSort(true)
      } else {
        setOpenSort(false)
      }
    })
  }, [])
  useEffect(() => {
    const handle = (event) => {
      let width = parseInt(window.innerWidth);
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
    };
    window.addEventListener('resize', handle)
    window.addEventListener('scroll', () => {
      setOpenSort(false)
    })
    handle()
  }, []);

  const handleSelectSort = (sortVenues) => {
    setOpenSort(false)
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
  console.log('sortVenues', sortVenues)
  // useEffect(( ) => {
  //   if (!Array.isArray(venues)) dispatch(fetchVenues());
  // }, [sortVenues])
  //TODO: Adaptive
  console.log('activeCategory:', activeCategory)
  return (
      <GlobalWrapper>
        <div style={{position: 'relative', display: activeCategory !== null ? "none" : "", flexShrink: 0}} ref={SortButton}
             id="sortButton">
          <Button onClick={(event) => {
            // event.stopPropagation();
            setOpenSort(!openSort);
          }}>
            <ButtonBurger>
              <BurgerI style={{width: '100%'}}/>
              <BurgerI style={{width: '60%'}}/>
              <BurgerI style={{width: '30%'}}/>
            </ButtonBurger>
            <span>{sliderPerView !==2 && "Сортировка"}</span>
          </Button>
          <SortWrapper openSort={openSort}>
            <SortTitle>Сначала показать</SortTitle>
            <label className="container" style={{fontSize: 17, marginTop: 10}}
                   onClick={() => handleSelectSort("distance")}>
              <span>Ближайшие</span>
              <input type="radio" name="radio2" checked={sortVenues === "distance"} value="option1"/>
              <span className="checkmark"></span>
            </label>
            <label className="container" style={{fontSize: 17}} onClick={() => handleSelectSort("popularity")}>
              <span>Популярные</span>
              <input type="radio" name="radio2" checked={sortVenues === "popularity"} value="option2"/>
              <span className="checkmark"></span>
            </label>
            <label className="container" style={{fontSize: 17}} onClick={() => handleSelectSort("price-low-to-high")}>
              <span>Сначала недорогие</span>
              <input type="radio" name="radio2" checked={sortVenues === "price-low-to-high"} value="option3"/>
              <span className="checkmark"></span>
            </label>
            <label className="container" style={{fontSize: 17}} onClick={() => handleSelectSort("price-high-to-low")}>
              <span>Сначала дорогие</span>
              <input type="radio" name="radio2" checked={sortVenues === "price-high-to-low"} value="option4"/>
              <span className="checkmark"></span>
            </label>
          </SortWrapper>
          {/*}*/}
        </div>
    <Wrapper>
      <WrapperItem onClick={handleRemoveCategory} isActive={activeCategory === null}>Все</WrapperItem>
        {categories && categories.map((category, index) => {
          return <WrapperItem key={index} onClick={() => handleSelectCategory(category.guid)} isActive={activeCategory === category.guid}>{category.title[lang]}</WrapperItem>
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


    </Wrapper>
    </GlobalWrapper>
  )
}

export default FoodSection;

const GlobalWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SortSelect = styled.input`
  margin-top: 15px;
  margin-right: 5px;
`;

const SortWrapper = styled.div`
  position: absolute;
  z-index: 9;
  cursor: default;
  top: calc(100% + 20px);
  left: 0;
  overflow: hidden;
  padding: ${props => props.openSort ? "20px" : "0px 20px"};
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
  //flex-shrink: 0;
  width: 100%;
  overflow: auto;
  // width: auto;
  padding: 3px 0px;
  //@media(max-width: 970px) {
  //  overflow-x: scroll;
  //}
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
  min-width: 142px;
  position: relative;
  margin-right: 30px;
  flex-shrink: 0;
  :hover {
    cursor: pointer;
    background: ${props => props.theme.primaryDark};
  }
  @media(max-width: 600px) {
    min-width: 50px;
    width: 40px;
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