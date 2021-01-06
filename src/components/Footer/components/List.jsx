import React from 'react';

import ContentList from '.././styled/ContentList';
import ListItem from '.././styled/ListItem';
import CenterFlex from '.././styled/CenterFlex'

//img 

import facebook from '@assets/facebook.png';  
import telegram from '@assets/telegram.png';  
import instagram from '@assets/instagram.png';  
import googlePlay from '@assets/googlePlay.png';  
import appStore from '@assets/appStore.png';  

const List = () => (
  <ContentList>
    <ListItem>
      <span>Ресторанам</span>
      <span>Курьерам</span>
      <span>Пользовательское соглашение</span>
      <span>Пресс-центр</span>
      <span>Контакты</span>
    </ListItem>
    <ListItem>
      <span style={{fontWeight: 'bold'}} >Мы принимаем платежы</span>
      <span>Visa</span>
      <span>MasterCard</span>
      <span>UzCard</span>
      <span>Humo</span>
    </ListItem>
    <ListItem>
      <span style={{fontWeight: 'bold'}}>Мы в соц. сетях</span>
      <CenterFlex style={{width: "100%", justifyContent: 'flex-start', marginTop: 10}}>
        <img src={facebook} style={{marginRight: 10}}/>
        <img src={telegram} style={{marginRight: 10}}/>
        <img src={instagram}/>
      </CenterFlex>
    </ListItem>
    <ListItem>
      <span style={{fontWeight: 'bold'}}>Наше приложение</span>
      <CenterFlex>
        <img src={googlePlay}/>
        <span style={{marginLeft: 10}}>Google Play</span>
      </CenterFlex>
      <CenterFlex>
        <img src={appStore}/>
        <span style={{marginLeft: 10}}>App store</span>
      </CenterFlex>
    </ListItem>
  </ContentList>
)

export default List;
