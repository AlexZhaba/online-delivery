import React from 'react';
import styled from 'styled-components';
const Basket = (props) => {
  return (
    <Wrapper>

    </Wrapper>
  )
}

export default Basket;

const Wrapper = styled.div`
  min-width: 380px;
  min-height: 500px; 
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  margin-left: 20px;
  @media(max-width: 1180px) {
    min-width: 0;
    margin-left: 0;
  }
`;