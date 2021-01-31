import React from 'react';
import styled from 'styled-components';

import EntryLogo from '@assets/EntryLogo.png';
import EntryPhone from '@assets/EntryPhone.png';

const EntryModal = ({entry, setEntry}) => {
  return (
    <ModalWrapper modal={entry} onClick={() => setEntry(null)}>
      <ModalContainer  modal={entry} onClick={(event) => {
        event.preventDefault();
        event.stopPropagation()
      }}>
        <Header>
          <Logo src={EntryLogo}/>
          <PhoneContainer>71 207 34 34</PhoneContainer>
        </Header>
        <MainBody>
          <InputName>Ваше имя</InputName>
          <Input placeholder="Имя"/>
          <InputName>Номер телефона</InputName>
          <CodeContainer>
          <Input placeholder="+998 12 345 67 89" style={{margin: 0}}/>
            <Button>
              Получить код
            </Button>
          </CodeContainer>
          <InputName>Введите код</InputName>
          <Input placeholder="111111"/>
          <div style={{justifyContent: 'center', display: 'flex'}}>
            <Entry>
              Войти
            </Entry>
          </div>
        </MainBody>
      </ModalContainer>
    </ModalWrapper>
  )
}

const CodeContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  @media(max-width: 500px) {
    flex-direction: column;
    align-items: none;
  }
`;

const Logo = styled.img`
  @media(max-width: 500px) {
    width: 90px;
  }
`;

const ModalWrapper = styled.div`
  opacity: ${props => props.modal ? "1" : "0"};
  visibility: ${props => props.modal ? "visible" : "hidden"};
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: .2s all;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100vh;
`;

const ModalContainer = styled.div`
  width: 570px;
  // min-height: ${props => props.modal ? "443px" : "0px"};
  transition: .5s all;
  opacity: ${props => props.modal ? "1" : "0"};
  background: white;
  position: relative;
  border-radius: 5px;
  margin: 0 10px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  @media(max-width: 500px) {
    padding: 20px;
  }
  
`;
const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const PhoneContainer = styled.div`
  font-weight: normal;
  font-size: 20px;
  line-height: 24px;
  color: #404040;
  position: relative;
  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: -25px;
    width: 20px;
    height: 20px;
    background-image: url('${EntryPhone}');
    background-repeat: no-repeat;
    background-position: center;
  }
  @media(max-width: 500px) {
    font-size: 16px;
    line-height: 20px;
  }
`;

const MainBody = styled.div`
  display: flex;
  flex-direction: column;
  @media(max-width: 500px) {
    justify-content: center;
  }
`;

const InputName = styled.div`
  margin-top: 18px;
  font-weight: 300;
  font-size: 16px;
  line-height: 20px;
  color: #404040;
  @media(max-width: 500px) {
    display: flex;
    justify-content: center;
  }
`;

const Button = styled.div`
  padding: 15px 13px;
  color: ${props => props.theme.primary};
  border-radius: 5px;
  border: 1px solid ${props => props.theme.primary};
  font-size: 16px;
  margin-left: 5px;
  color: ${props => props.theme.primary};
  transition: .2s all;
  :hover {
    cursor: pointer;
    background: ${props => props.theme.primary};
    color: #fff;
    transition: .2s all;
  }
  @media(max-width: 500px) {
    margin-left: 0;
    margin-top: 8px;
    width: 100%;
    text-align: center;
  }
`;

const Entry = styled(Button)`
  margin-top: 30px;
  background: ${props => props.theme.primary};
  color: #fff;
  text-align: center;
  width: 215px;
  :hover {
    background: ${props => props.theme.primaryDark}
  }
`;

const Input = styled.input`
  margin-top: 8px;
  outline: none;
  padding: 15px 24px;
  font-weight: 300;
  font-size: 16px;
  line-height: 20px;
  min-width: 140px;
  color: #404040;
  border: 1px solid #D2D2D2;
  border-radius: 5px;
  // width: 100%;
  flex: 1;
  transition: .2s all;
  :focus {
    transition: .2s all;
    border: 1px solid #404040;
  }
  @media(max-width: 500px) {
    width: 100%;
  }
`;

export default EntryModal;