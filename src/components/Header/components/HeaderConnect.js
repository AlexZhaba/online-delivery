import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {setLang} from '../../../redux/actions/User';

import headerPhone from '@assets/headerPhone.png'
import headerLang from '@assets/headerLang.png'
import headerBasket from '@assets/headerBasket.png'
import headerUser from '@assets/headerUser.png'

const HeaderConnect = ({setEntry}) => {
  const dispatch = useDispatch();

  const [openLang, setOpenLang] = useState(false);
  const lang = useSelector(({User}) => User.lang);
  const LangButton = useRef(null);
  useEffect(() => {
    document.addEventListener('click', (event) => {
      if (LangButton.current && LangButton.current.contains(event.target)) {
        // setOpenLang(true)
      } else {
        setOpenLang(false)
      }
    })
  }, [])

  const handleSelect = (lang) => {
    dispatch(setLang(lang));
  }
  return (
    <HeaderRight>
      <RightItem>
        <img src={headerPhone}/>
        <span>71 207 34 34</span>
      </RightItem>
      <RightItem onClick={() => {
          setOpenLang(!openLang)
        }} ref={LangButton}>
        <img src={headerLang}/>
        <span>
          {lang === "en" && "Eng"}
          {lang === "ru" && "Рус"}
          {lang === "uz" && "Uzb"}
        </span>
        <SortWrapper openSort={openLang} onClick={(event) => event.stopPropagation()}>
          <label class="container" style={{fontSize: 17, marginTop: 10}} onClick={() => handleSelect("en")}>
            <span>English</span>
            <input type="radio" name="radio2" checked={lang === "en"}/>
            <span class="checkmark"></span>
          </label>
              <label class="container" style={{fontSize: 17}} onClick={() => handleSelect("ru")}>
            <span>Русский</span>
            <input type="radio" name="radio2" checked={lang === "ru"}/>
            <span class="checkmark" ></span>
          </label>
          <label class="container" style={{fontSize: 17}} onClick={() => handleSelect("uz")}>
            <span>Uzbek</span>
            <input type="radio" name="radio2" checked={lang === "uz"}/>
            <span class="checkmark"></span>
          </label>
        </SortWrapper>
      </RightItem>
      <NavLink to='/makeOrder'>
        <RightItem>
            <img src={headerBasket}/>
            <span>0 сумм</span>
        </RightItem>
      </NavLink>
      <RightItem onClick={() => setEntry(true)} style={{cursor: "pointer"}}>
        <img src={headerUser}/>
        <span>Войти</span>
      </RightItem>
    </HeaderRight>
  ) 
}

const SortWrapper = styled.div`
  position: absolute;
  z-index: 4;
  cursor: default;
  top: calc(100% + 20px);
  left: 0;
  padding: ${props => props.openSort ? "10px 20px" : "0px 20px"};
  overflow: hidden;
  width: 150px;
  height: ${props => props.openSort ? "120px" : "0px"};
  background: #fff;
  transition: .2s all;
  box-shadow: ${props => props.openSort ? "0 0 0 1px rgb(0, 0, 0, 0.15)" : ""};
  border-radius: 5px;
`;

const SortTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #282828;
`;

const HeaderRight = styled.div`
  width: 470px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 1150px) {
    flex: 1;
  }
  @media (max-width: 970px) {
    display: none;
  }
`;

const RightItem = styled.div`
  margin-left: 25px;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  & > span {
    margin-left: 3px;
    line-height: 20px;
    height: 20px;
    font-weight: 500;
  }
  @media (max-width: 1150px) {
    flex-direction: column;
  }
`;


export default HeaderConnect;
