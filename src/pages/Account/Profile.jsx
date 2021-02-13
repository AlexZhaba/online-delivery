import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import selectArrow from '@assets/selectArrow.png';

const SelProfile = ({date, children}) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    document.addEventListener("click", (event) => {
      setIsOpen(false);
    })
  }, [])
  return (
    <SexWrapper style={{marginRight: 12}}>
      <SelectContainer onClick={(event) => {
          setIsOpen(!isOpen)
          event.stopPropagation();
        }}>
        <span style={{padding: "0 10px", minWidth: 40, textAlign: 'center'}}>{date}</span>
        <ArrowContainer>
          <img src={selectArrow}/>
        </ArrowContainer>
        <Dropdown style={{display: isOpen ? "flex" : "none"}} onClick={(event) => {
          setIsOpen(false);
          event.stopPropagation();
        }}>
          {children}
        </Dropdown>
      </SelectContainer>
    </SexWrapper>
  )
}

const Profile = (props) => {
  const [sex, setSex] = useState("WOMAN"); // WOMAN OR MAN
  
  const [date, setDate] = useState('дд')
  const [month, setMonth] = useState('мм');
  const [year, setYear] = useState('гггг');
  let currentTime = new Date()

  return (
    <Wrapper>
      <TopHeader>
        Мой аккаунт
      </TopHeader>
      <Container>
        <Title>Личные данные</Title>
        <SubTitle>Имя</SubTitle>
        <ProfileInput/>

        <SubTitle>Дата рождения</SubTitle>
        <SexWrapper>
          <SelProfile date={date}>
            {Array(31).fill(0).map((e, index) => <DropdownItem onClick={(event) => {
              setDate(index + 1);
              // event.stopPropagation();
            }}>{index + 1}</DropdownItem>)}          
          </SelProfile>
          <SelProfile date={month}>
            {Array(12).fill(0).map((e, index) => <DropdownItem onClick={(event) => {
              setMonth(index + 1);
              // event.stopPropagation();
            }}>{index + 1}</DropdownItem>)}          
          </SelProfile>
          <SelProfile date={year}>
            {Array(100).fill(0).map((e, index) => <DropdownItem onClick={(event) => {
              setYear(index + 1 + (currentTime.getFullYear() - 100));
              // event.stopPropagation();
            }}>{index + 1 + (currentTime.getFullYear() - 100)}</DropdownItem>)}          
          </SelProfile>
        </SexWrapper>
        <SubTitle>Пол</SubTitle>
        <SexWrapper>
          <SexContainer active={sex === "WOMAN"} onClick={() => setSex("WOMAN")}>Жен</SexContainer>
          <SexContainer active={sex === "MAN"}   onClick={() => setSex("MAN")}  >Муж</SexContainer>
        </SexWrapper>

        <SubTitle>Номер телефона</SubTitle>
        <ProfileInput/>

        <SubTitle>E-mail</SubTitle>
        <ProfileInput/>
        <Button>
          Сохранить
        </Button>
      </Container>
    </Wrapper>
  )
}

export {Profile};

const Button = styled.div`
  margin-top: 38px;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #FFF;
  background: ${props => props.theme.primary};
  border-radius: 5px;
  text-align: center;
  width: 300px;
  padding: 13px 0;
  transition: .2s all;
  :hover {
    cursor: pointer;
    transition: .2s all;
    background: ${props => props.theme.primaryDark};
  }
`;

const Dropdown = styled.div`
  position: absolute;
  left: -1px;
  top: 100%;
  width: calc(100% + 2px);
  height: 200px;
  overflow-y: scroll;
  background: #FFF;
  z-index: 2;
  border: 1px solid ${props => props.active ? props.theme.primary : "#969595"};
  border-radius: 2px;
  display: flex;
  flex-direction: column;
`;

const DropdownItem = styled.div`
  flex-shrink: 0;
  height: 20px;
  padding: 2px 0px;
  font-size: 16px;
  text-align: center;

  :hover {
    background: ${props => props.theme.primary};
    color: #fff;
  }
`;

const Wrapper = styled.div`
`;

const SexWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  position: relative;
`;

const SexContainer = styled.div`
  padding: 6px 8px;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: ${props => props.active ? props.theme.primary : "#969595"};
  border: 1px solid ${props => props.active ? props.theme.primary : "#969595"};
  border-radius: 2px;
  margin-right: 12px;
  :hover {
    cursor: pointer;
  }
`;

const ArrowContainer = styled.div`
  height: 100%;
  /* padding: 4.5px 5px; */
  margin-right: 4px;
  padding-left: 4px;
  display: flex;
  align-items: center;
  border-left: 1px solid ${props => props.active ? props.theme.primary : "#969595"};
`;

const SelectContainer = styled(SexContainer)`
  height: 30px;
  padding: 0;
  margin-right: 0px;
  font-size: 16px;
  display: flex;
  position: relative;
  align-items: center;
`;

const ProfileInput = styled.input`
  outline: none;
  border: none;
  border-bottom: 1px solid #EAEAEA;
  padding-bottom: 3px;
  font-weight: 300;
  font-size: 18px;
  line-height: 22px;
  color: #000;
`;

const SubTitle = styled.div`
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  color: #969595;
  margin-top: 30px;
  margin-bottom: 5px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  color: #282828;
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