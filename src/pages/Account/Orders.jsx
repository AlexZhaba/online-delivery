import React, {useEffect} from 'react';
import styled from 'styled-components';

//image
import carDelivery from '@assets/car-delivery.png';
import check from '@assets/check.png';
import cultery from '@assets/cultery.png';
import finish from '@assets/finish.png';

import {useSelector, useDispatch} from 'react-redux';
import { fetchDelivery } from '../../redux/actions/User';

const Orders = (props) => {
  const dispatch = useDispatch();

  let token = useSelector(({User}) => User.token)
  let lang = useSelector(({User}) => User.lang)
  let deliveries = useSelector(({User}) => User.deliveries);
  useEffect(() => {
    if (token) {
      dispatch(fetchDelivery())
    }
  }, [token])

  return (
    <Wrapper>
      <TopHeader>
        <span>Заказы</span>
        <span>
          <span style={{fontSize: '28px'}}>{deliveries.length}</span>
          <span style={{color: "#969595", fontSize: 20, marginLeft: 12, fontWeight: 'normal'}}>заказа</span>
        </span>
      </TopHeader>
      {deliveries.map((delivery, index) => {
        return (
          <Container>
            <Title>
              <span>Заказ {index +1}</span>
            </Title>
            <MainWrapper>
              
                {/* <DataWrapper>
                  <DataContainer>
                    <Text style={{fontSize: 18}}>  
                    {new Date(delivery.created_at).getHours()}:{new Date(delivery.created_at).getMinutes()} &nbsp;
                    {new Date(delivery.created_at).getDate()}:{new Date(delivery.created_at).getUTCMonth()}:{new Date(delivery.created_at).getFullYear()}</Text>
                  </DataContainer>
                  <DataContainer>
                    <Text style={{fontWeight: 'bold'}}>{delivery.venue_name[lang]}</Text>
                  </DataContainer>
                </DataWrapper>
                <DataWrapper>
                  <DataContainer>
                    <Text>Пеке с лососем</Text>
                  </DataContainer>
                  <DataContainer>
                    <Text style={{fontWeight: 'bold'}}>250 р</Text>
                  </DataContainer>
                </DataWrapper>
                <DataWrapper>
                  <DataContainer>
                    <Text>Ролл Филадельфия</Text>
                  </DataContainer>
                  <DataContainer>
                    <Text style={{fontWeight: 'bold'}}>520 р</Text>
                  </DataContainer>
                </DataWrapper>
                <DataWrapper style={{marginTop: 20}}> 
                  <DataContainer>
                    <Text style={{fontSize: 20}}>Доставка: 23р </Text>
                  </DataContainer>
                  <DataContainer>
                    <Text style={{fontWeight: 'bold', fontSize: 24}}>Итог: 770р</Text>
                  </DataContainer>
                </DataWrapper>*/}
                <Center style={{marginTop: 40}}>
                  <Status>{delivery.current_status}</Status>
                </Center>
                <StepWrapper>
                  <StepContainer>
                    <StepImage src={check}/>
                  </StepContainer>
                  
                  <StepContainer>
                    <StepImage src={cultery}/>
                  </StepContainer>

                  <StepContainer>
                    <StepImage src={carDelivery}/>
                  </StepContainer>

                  <StepContainer>
                    <StepImage src={finish}/>
                  </StepContainer>
                  
                </StepWrapper>
                <Center style={{marginTop: 60}}>
                  <Button>Связаться с нами</Button>
                </Center>
            </MainWrapper>
          </Container>
        )
      })}
    </Wrapper>
  )
}

export {Orders};

const StepImage = styled.img`

`;

const Button = styled.div`
  width: 300px;
  border: 1px solid ${props => props.theme.primary};
  border-radius: 5px;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: ${props => props.theme.primary};
  width: 300px;
  padding: 13px 0;
  text-align: center;
  transition: .2s all;
  :hover {
    cursor: pointer;
    transition: .2s all;
    background: ${props => props.theme.primary};
    color: #FFF;
  }
`;

const StepWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`;

const StepContainer = styled.div`
  width: 40px;
  height: 40px;

`;

const Center = styled.div`
  display: flex;
  justify-content: center;
`;

const Status = styled.div`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: ${props => props.theme.primary};
`;

const Text = styled.div`
  font-weight: normal;
  font-size: 22px;
  line-height: 26px;
  color: #404040;
  margin-bottom: 8px;
`;

const MainWrapper = styled.div`
  padding: 35px 70px;
  padding-top: 14px;
`;

const DataWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`; 

const DataContainer = styled.div`
  min-width: 230px;
  
`;

const Wrapper = styled.div`
`;

const TopHeader = styled.div`
  height: 60px;
  font-weight: bold;
  font-size: 42px;
  line-height: 51px;
  color: #282828;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media(max-width: 700px) {
    font-size: 18px;
    line-height: 22px;
    height: auto;
    margin-left: 10px;

  }
`;

const Container = styled.div`
  margin-top: 25px;
  width: 100%;
  min-height: 500px;
  background: #fff;
  border-radius: 5px;
  /* padding: 35px 70px; */
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  padding: 35px 70px;
  color: #282828;
  display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
  border: 1px solid #EAEAEA;
`;