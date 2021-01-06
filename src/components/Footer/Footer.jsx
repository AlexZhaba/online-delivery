import React from 'react';

import logo from '@assets/logoBlack.png';  

import List from './components/List';

//styled-components
import Wrapper from './styled/Wrapper';
import Content from './styled/Content';
import ContentBottom from './styled/ContentBottom';



const MobileFooter = () => {
  return (
    <Wrapper>
      <Content>
        <img src={logo}/>
        <List/>
        <ContentBottom>
          <div></div>
          <div>All Rights Reserved.
            <a href='/'>Privacy</a>&nbsp;
            <a href='/'>Terms</a>&nbsp;
            <a href='/'>FAQ</a>&nbsp;
          </div>
        </ContentBottom>
      </Content>
    </Wrapper>
  )
}
  
const DesktopFooter = () => {
  return (
    <Wrapper>
      <Content>
        <img src={logo}/>
        <List/>
        <ContentBottom>
          <div>2020 Stolik</div>
          <div>All Rights Reserved.
            <a href='/'>Privacy</a>&nbsp;
            <a href='/'>Terms</a>&nbsp;
            <a href='/'>FAQ</a>&nbsp;
          </div>
        </ContentBottom>
      </Content>
    </Wrapper>
  )
}

export {MobileFooter, DesktopFooter};
