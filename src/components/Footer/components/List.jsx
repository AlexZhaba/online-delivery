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
      <a href="https://docs.google.com/forms/d/e/1FAIpQLSeifgRz5dDqZZdIkciJ3cmnkiTVnZOzFj-c61gRpgyzC6tHSQ/viewform?c=0&w=1">Ресторанам</a>
      <a href="https://t.me/stolikuz">Курьерам</a>
      <span>Пользовательское соглашение</span>
      {/* <span>Пресс-центр</span> */}
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
      <CenterFlex style={{width: "100%", justifyContent: 'flex-start', marginTop: 10, filter: "none"}}>
        <a href="https://www.facebook.com/stolik/" target="_blank"><img src={facebook} style={{marginRight: 10}}/></a>
        <a href="https://t.me/stolikuz" target="_blank"><img src={telegram} style={{marginRight: 10}}/></a>
        <a href="https://www.instagram.com/stolik.uz/?hl=ru" target="_blank"><img src={instagram}/></a>
      </CenterFlex>
    </ListItem>
    <ListItem>
      <span style={{fontWeight: 'bold'}}>Наше приложение</span>
      <CenterFlex href="https://play.google.com/store/apps/details?id=co.stolik.user" target="_blank">
        <img src={googlePlay}/>
        <span style={{marginLeft: 10}}>Google Play</span>
      </CenterFlex>
      <CenterFlex href="https://apps.apple.com/ru/app/stolik-%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7-%D0%B5%D0%B4%D1%8B-%D0%B2-%D1%82%D0%B0%D1%88%D0%BA%D0%B5%D0%BD%D1%82%D0%B5/id960550929" target="_blank">
        <img src={appStore}/>
        <span style={{marginLeft: 10}}>App store</span>
      </CenterFlex>
    </ListItem>
  </ContentList>
)

export default List;
