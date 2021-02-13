import React from 'react';
import styled from 'styled-components';

const FavPlaces = (props) => {
  return (
    <Wrapper>
      <TopHeader>
        Любимые места
      </TopHeader>
      <Container>
        123
      </Container>
    </Wrapper>
  )
}

export {FavPlaces};

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
`;

const Container = styled.div`
  margin-top: 25px;
  width: 100%;
  min-height: 500px;
  box-shadow: 0 0 15px #cdcdcd;
  border-radius: 5px;
  padding: 35px 70px;
`;