import React, {useState} from 'react';
import styled from 'styled-components';

import delete_adr from '@assets/delete_adr.png';
import edit from '@assets/edit.png';

import AddressModal from '@components/Account/AddressModal';

const Addresses = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Wrapper>
      <AddressModal isOpen={isOpen} setIsOpen={setIsOpen}/>
      <TopHeader>
        Адреса доставки
      </TopHeader>
      <Container>
        {Array(4).fill(0).map((e, index) => (
        <>
          <TitleAdr>
            <span>{index + 1}.</span>
            <span style={{color: '#969595', marginLeft: 18}}>Адрес №{index + 1}</span>
          </TitleAdr>
          <InputContainer>
            <InputAdr/>
            <InputImage src={edit} onClick={() => setIsOpen(true)} data-trash="true"/>
            <InputImage src={delete_adr} style={{width: 15, height: 23}}/>
          </InputContainer>
        </>
        ))}
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
        <Button>
          Добавить
        </Button>
        </div>
      </Container>
    </Wrapper>
  )
}

export {Addresses};

const InputImage = styled.img`
  width: 20px;
  height: 20px;
  margin: 0 5px;
`;

const InputContainer = styled.div`
  display: flex;
  margin-top: 10px;
  margin-left: 30px;
  align-items: center;
`;

const InputAdr = styled.input`
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  color: #404040;
  border: none;
  outline: none;
  width: 342px;
  max-width: 100%;
  border-bottom: 1px solid #C4C4C4;
`;

const TitleAdr = styled.div`
  font-weight: normal;
  font-size: 20px;
  line-height: 24px;
  color: #000003;
  margin-top: 24px;
`;

const Container = styled.div`
  margin-top: 25px;
  width: 100%;
  min-height: 500px;
  background: #fff;
  border-radius: 5px;
  padding: 20px 30px;
  position: relative;
  @media(max-width: 700px) {
    padding: 20px 10px
  }
`;

const Button = styled.div`
  width: 150px;
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
