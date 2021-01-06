import React from 'react';
import styled from 'styled-components';

import headerPhone from '@assets/headerPhone.png'
import headerLang from '@assets/headerLang.png'
import headerBasket from '@assets/headerBasket.png'
import headerUser from '@assets/headerUser.png'

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

const HeaderConnect = () => (
  <HeaderRight>
    <RightItem>
      <img src={headerPhone}/>
      <span>71 207 34 34</span>
    </RightItem>
    <RightItem>
      <img src={headerLang}/>
      <span>Рус</span>
    </RightItem>
    <RightItem>
      <img src={headerBasket}/>
      <span>0 сумм</span>
    </RightItem>
    <RightItem>
      <img src={headerUser}/>
      <span>Войти</span>
    </RightItem>
  </HeaderRight>
)

export default HeaderConnect;
