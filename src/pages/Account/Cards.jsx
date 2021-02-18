import React from 'react';
import styled from 'styled-components';

import creditCard from '@assets/creditCard.png';
import delete_adr from '@assets/delete_adr.png';
import edit from '@assets/edit.png';


const Cards = (props) => {
  return (
    <Wrapper>
      <TopHeader>
        Карты
      </TopHeader>
      <Container>
        <ListWrapper>
        {Array(5).fill(0).map((e, index) => (
          <ListContainer>
            <span style={{marginRight: 34, width: 30}}>{index + 1}.</span>
            <img src={creditCard}/>
            <span style={{margin: "0 20px"}}>8600 **** **** 1234</span>
            <InputImage src={edit} data-trash="true"/>
            <InputImage src={delete_adr} style={{width: 15, height: 23}}/>
          </ListContainer>
        ))}
        </ListWrapper>
      </Container>
    </Wrapper>
  )
}

export {Cards};

const InputImage = styled.img`
  width: 20px;
  height: 20px;
  margin: 0 5px;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 26px;
  font-weight: normal;
  font-size: 20px;
  line-height: 24px;
`;

const Container = styled.div`
  margin-top: 25px;
  width: 100%;
  min-height: 500px;
  /* box-shadow: 0 0 1px red; */
  background: #fff;
  border-radius: 5px;
  padding: 35px 70px;
  position: relative;
  @media(max-width: 700px) {
    padding: 20px 10px
  }
`;

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
