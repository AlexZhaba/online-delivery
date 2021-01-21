import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import DiscountsSwiper from "@components/DiscountsSwiper/DiscountsSwiper";
import FoodSection from "@components/FoodSection/FoodSection";
import ImageSwiper from "@components/ImageSwipper/ImageSwipper";
import ItemsList from "@components/ItemsList/ItemsList";
import TitlePicture from "@components/TitlePicture/TitlePicture";
import axios from 'axios';

import {config} from '../config';
//styled
const MobileMain = () => {
  return (
    <Wrapper>
      <MContainer>
        <TitlePicture/>
        <DiscountsSwiper/>
        <BigTitle  style={{marginTop: 50}}>
          Рестораны
        </BigTitle>
        <div style={{width: '100%', display: 'flex', alignItems: "center", marginTop: 20}}>
          <Input placeholder="Название ресторана, кухни или блюда..."/>
          <Button>Найти</Button>
        </div>
        <FoodSection/>
        <ImageSwiper/>
        <ItemsList/>
        <div style={{marginTop: 24}}/>
        <ImageSwiper/>
        <ItemsList/>
        
        <MoreButton>Показать ещё</MoreButton>

      </MContainer>
    </Wrapper>
  );
}

const DesktopMain = () => {
  let [venues, setVenues] = useState(null);
  useEffect(() => {
    axios.get(`${config.API}/venues?city_id=e3bb5e76-014c-4dcf-90f6-fc4b5e827558&sort=price-high-to-low&limit=10`, {
      headers: {
        "Authorization": 
        "Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTMwMzA5MjAsImp0aSI6ImI5ZTJmODJmLTM1MjctNDE1NS05N2E0LTk2YjVkZDg2YTlkZCIsImlhdCI6MTYxMDQzODkyMCwiaXNzIjoic3RvbGlrYXBwLmNvbSIsInN1YiI6ImRlNjMwZjdmLTJiYmQtNGE3Ny05NmFlLTI5OGZkODViYWFmMiJ9.sHt7PTNsP4aT9IKIeOd2vjwBeAP_SS7WvJ34Z_HFXJDrQ6l4MBVDwVumKd59ozjS9ngeJkjjYEpSLCWQBDIGk7WPtZJNctkQU6wgwAMvoNSs6IWFZv_RCCoSSYwtyWjnE5Mk5YVuHOReBvNg1YyVXQWQWad5cRhhCcPSZLERwwbvEWS7KcUd4u14KR57vyEqoAXr4WqB5xGm9csedL0vUtjvQlgFDrgToY-5GciVuj15w1pLWN1f7Tp3rb7ROCPhmUgIYpUEcCy52Qge_RH9EV-OmsrSRkmxogvgOFJnMMvbd8HJHJrf6xJsybQD5N7BWzQdCzyN58upPzJ_rbo_Lg"
      }
    }).then(response => {
      console.log('response = ', response);
      setVenues(response.data.venues);
    })
  }, []);
  return (
    <Wrapper>
      <MContainer>
        <TitlePicture/>
        <DiscountsSwiper/>
        <BigTitle  style={{marginTop: 50}}>
          Рестораны
        </BigTitle>
        <div style={{width: '100%', display: 'flex', alignItems: "center", marginTop: 20}}>
          <Input placeholder="Название ресторана, кухни или блюда..."/>
          <Button>Найти</Button>
        </div>
        <FoodSection/>
        <ImageSwiper/>
        <ItemsList venues={venues}/>
        <div style={{marginTop: 24}}/>
        {/* <ImageSwiper/> */}
        <ItemsList/>
        
        <MoreButton>Показать ещё</MoreButton>

      </MContainer>
    </Wrapper>
  );
}

export default DesktopMain;
export {DesktopMain, MobileMain};

const BigTitle = styled.div`
  font-size: 40px;
  font-weight: bold;
  color: #000;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const MContainer = styled.div`
  width: 1180px;
  margin: 0 20px;
  height: 100%;
`;

const Button = styled.div`
  background: ${props => props.theme.primary};
  color: #fff;
  height: 41px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-left: 16px;
  padding: 0px 26px;
  line-height: 10px;
  cursor: pointer;
  transition: .3s all;
`;

const Input = styled.input`
  padding-left: 20px;
  width: 480px;
  height: 41px;
  border-radius: 5px;
  border: 2px solid ${props => props.theme.primary};
  outline: none;
`;

const MoreButton = styled.div`
  width: 100%;
  height: 45px;
  color: #fff;
  margin-top: 45px;
  display: flex;
  font-size: 18px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  background: ${props => props.theme.primary};
  transition: .2s all;
  &:hover {
    cursor: pointer;
    transition: .2s all;
    background: ${props => props.theme.primaryDark};
  }
`;