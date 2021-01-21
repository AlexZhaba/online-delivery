import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Back from '@components/Back/Back.jsx';
import axios from 'axios';

import {DesktopRestaurantName} from '@components/Restaurant/RestaurantName.jsx';
import List from '@components/Restaurant/ListCategories.jsx';
import Basket from "../components/Restaurant/Basket";
import ProductsList from "../components/Restaurant/ProductsList";

import {config} from '../config';

const DesktopRestaurant = (props) => {
  const [menu, setMenu] = useState(null);
  const [venue, setVenue] = useState(null);
  console.log('props= ',props)
  useEffect(() => {
    //onClick={() => document.getElementById('root').scrollIntoView({behavior: "smooth"})}
    document.getElementById('root').scrollIntoView();
  }, [])
  useEffect(() => {
    axios.get(`${config.API}/venues/${props.match.params.id}/menus`, {
      headers: {
        "Authorization": 
        "Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTMwMzA5MjAsImp0aSI6ImI5ZTJmODJmLTM1MjctNDE1NS05N2E0LTk2YjVkZDg2YTlkZCIsImlhdCI6MTYxMDQzODkyMCwiaXNzIjoic3RvbGlrYXBwLmNvbSIsInN1YiI6ImRlNjMwZjdmLTJiYmQtNGE3Ny05NmFlLTI5OGZkODViYWFmMiJ9.sHt7PTNsP4aT9IKIeOd2vjwBeAP_SS7WvJ34Z_HFXJDrQ6l4MBVDwVumKd59ozjS9ngeJkjjYEpSLCWQBDIGk7WPtZJNctkQU6wgwAMvoNSs6IWFZv_RCCoSSYwtyWjnE5Mk5YVuHOReBvNg1YyVXQWQWad5cRhhCcPSZLERwwbvEWS7KcUd4u14KR57vyEqoAXr4WqB5xGm9csedL0vUtjvQlgFDrgToY-5GciVuj15w1pLWN1f7Tp3rb7ROCPhmUgIYpUEcCy52Qge_RH9EV-OmsrSRkmxogvgOFJnMMvbd8HJHJrf6xJsybQD5N7BWzQdCzyN58upPzJ_rbo_Lg"
      }
    }).then(response => {
      console.log('response = ', response);
      response.data.forEach(menu => {
        console.log(menu.online)
        if (menu.online) {
          console.log('MENU =', menu)
          setMenu(menu);
        }
      })
    })
  }, []);
  useEffect(() => {
    axios.get(`${config.API}/venues/${props.match.params.id}`, {
      headers: {
        "Authorization": 
        "Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTMwMzA5MjAsImp0aSI6ImI5ZTJmODJmLTM1MjctNDE1NS05N2E0LTk2YjVkZDg2YTlkZCIsImlhdCI6MTYxMDQzODkyMCwiaXNzIjoic3RvbGlrYXBwLmNvbSIsInN1YiI6ImRlNjMwZjdmLTJiYmQtNGE3Ny05NmFlLTI5OGZkODViYWFmMiJ9.sHt7PTNsP4aT9IKIeOd2vjwBeAP_SS7WvJ34Z_HFXJDrQ6l4MBVDwVumKd59ozjS9ngeJkjjYEpSLCWQBDIGk7WPtZJNctkQU6wgwAMvoNSs6IWFZv_RCCoSSYwtyWjnE5Mk5YVuHOReBvNg1YyVXQWQWad5cRhhCcPSZLERwwbvEWS7KcUd4u14KR57vyEqoAXr4WqB5xGm9csedL0vUtjvQlgFDrgToY-5GciVuj15w1pLWN1f7Tp3rb7ROCPhmUgIYpUEcCy52Qge_RH9EV-OmsrSRkmxogvgOFJnMMvbd8HJHJrf6xJsybQD5N7BWzQdCzyN58upPzJ_rbo_Lg"
      }
    }).then(response => {
      console.log('VENUE = ', response.data)
      setVenue(response.data);
    })
  }, [])
  return (
    <Wrapper>
      <MContainer>
        <Back text="Все рестораны"/>
        <DesktopRestaurantName venue={venue}/>
        <List menu={menu}/>
        <Container>
          <div>
            <Input placeholder="Поиск блюд..."/>
            <Button>Найти</Button>
            <ProductsList menu={menu}/>
          </div>
          <Basket/>
        </Container>
      </MContainer>
    </Wrapper>
  )
}

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  @media(max-width: 1180px) {
    justify-content: center;
  }
`;

const Input = styled.input`
  border: 1px solid ${props => props.theme.primary};
  border-radius: 6px;
  outline: none;
  padding: 10px 20px;
  max-width: 500px;
  width: calc(100% - 120px);
  margin-right: 18px;
  font-size: 14px;
  &::placeholder {
    color: black;
  }
`;

const Button = styled.div`
  color: #fff;
  background: ${props => props.theme.primary};
  border: 1px solid ${props => props.theme.primary};
  padding: 10px 25px;
  border-radius: 6px;
  font-size: 14px;
  display: inline-block;
  cursor: pointer;
  font-weight: 500;
  transition: .2s all;
  :hover {
    background: #fff;
    color: #000;
    transition: .2s all;
  }
  @media(max-width: 750px) {
    //display: none;
  }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const MContainer = styled.div`
  width: 1180px;
  margin: 0 20px;
  height: 100%;
`;

export {DesktopRestaurant};