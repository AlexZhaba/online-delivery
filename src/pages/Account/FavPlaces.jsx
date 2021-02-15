import React from 'react';
import styled from 'styled-components';

import testFav from '@assets/testFav.png';

import redHeart from '@assets/redHeart.png';


const FavPlaces = (props) => {
  return (
    <Wrapper>
      <TopHeader>
        Любимые места
      </TopHeader>
      <Container>
        {Array(9).fill(0).map(e => {
          return (
            <VenuesWrapper>
              <VenueImage src={testFav}/>
              <VenueTitle>
                Ресторан
              </VenueTitle>
              <VenueSubTitle>
              Европейские обеды комплексы
              </VenueSubTitle>
            </VenuesWrapper>
          )
        })}
      </Container>
      <div style={{display: 'flex', justifyContent: "center", marginTop: 50}}>
        <Button>
          Показать ещё
        </Button>
      </div>
    </Wrapper>
  )
}

export {FavPlaces};


const Button = styled.div`
  width: 300px;
  padding: 13px 0;
  background: ${props => props.theme.primary};
  transition: .2s all;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #FFFFFF;
  cursor: pointer;
  text-align: center;
  border-radius: 5px;
  :hover {
    transition: .2s all;
    background: ${props => props.theme.primaryDark};
  }
`;

const Wrapper = styled.div`
`;

const VenuesWrapper = styled.div`
  box-shadow: 0 0 15px #cdcdcd;
  border-radius: 5px;
  cursor: pointer;
  position: relative;

  ::before {
    content: '';
    position: absolute;
    top: 13px;
    right: 13px;
    background-image: url('${redHeart}');
    background-repeat: no-repeat;
    background-position: center;
    width: 22px;
    height: 22px;
  }
`;

const VenueImage = styled.img`
  width: 100%;
`;

const VenueTitle = styled.div`
  margin-top: 12px;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  color: #404040;
  padding-left: 15px;
  @media(max-width: 500px) {
    font-size: 11.6667px;
  line-height: 14px;
  }
`;

const VenueSubTitle = styled.div`
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  color: #969595;
  margin-top: 6px;
  padding: 15px;
  padding-top: 0;
  @media(max-width: 500px) {
    font-size: 9.33333px;
    line-height: 11px;
  }
`;
const TopHeader = styled.div`
  height: 60px;
  font-weight: bold;
  font-size: 42px;
  line-height: 51px;
  color: #282828;
  display: flex;
  align-items: center;
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
  /* box-shadow: 0 0 15px #cdcdcd; */
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 25px;
  row-gap: 50px;
  @media(max-width: 1100px) {
    grid-template-columns: 1fr 1fr;
  }
  @media(max-width: 900px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media(max-width: 700px) {
    grid-template-columns: 1fr 1fr;
    row-gap: 10px;
    column-gap: 10px;
  }
`;