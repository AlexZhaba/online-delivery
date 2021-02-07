import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


import agreement from '@assets/agreement.png';

const FAQElement = ({text, id}) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (id) {
      console.dir(document.getElementById(id))
      // console.dir(document.getElementById(id).offsetParent)
      // console.log(document.getElementById(id).offsetParent.sc/rollHeight)
    }
  }, [])
  return (
    <FAQContainer>
      <FAQTop>
        <FAQButton>
          <ButtonEl isOpen={isOpen}/>
          <ButtonEl isOpen={true}/>
        </FAQButton>
        <div  onClick={() => setIsOpen(!isOpen)} style={{cursor: "pointer"}}>
          {text}
        </div>
      </FAQTop>
      <FAQAnswer isOpen={isOpen} id={id}>
      В отличии от lorem ipsum, текст рыба на русском языке наполнит любой макет непонятным смыслом и придаст неповторимый колорит советских времен.
      </FAQAnswer>
    </FAQContainer> 
  )
}

const Cooperation = (props) => {

  return (
    <Wrapper>
      <MContainer>
        <TopContainer>
          <LeftContainer>
            <LeftTitle>
              Сотрудничество со столик
            </LeftTitle>
            <SubTitle>
            По своей сути рыбатекст является альтернативой традиционному lorem ipsum, который вызывает у некторых людей недоумение при попытках прочитать рыбу текст. В отличии от lorem ipsum, текст рыба на русском языке наполнит любой макет непонятным смыслом и придаст неповторимый колорит советских времен.
            <br/><br/><br/>
            В отличии от lorem ipsum, текст рыба на русском языке наполнит любой макет непонятным смыслом и придаст неповторимый колорит советских времен.

            
            </SubTitle>
            <Button>
              Заполнить анкету
            </Button>
          </LeftContainer>
          <RightContainer>
            <Picture src={agreement}/>
          </RightContainer>
        </TopContainer>  
        <FAQWrapper>
          <FAQElement text="Как работает столик?" id={"FAQ_1"}/>
          <FAQElement text="Как работает столик?" id={"FAQ_2"}/>
          <FAQElement text="Как работает столик?" id={"FAQ_3"}/>
        </FAQWrapper>
      </MContainer>
    </Wrapper>
  )
}

const FAQAnswer = styled.div`
  line-height: 26px;
  font-size: 18px;
  font-style: normal;
  font-weight: normal;
  color: #404040;
  margin-left: 36px;
  transition: .2s all;
  ${props => props.isOpen ? `margin-top: 24px;` : ""}
  ${props => props.isOpen ? `height: ${document.getElementById(props.id).scrollHeight}px; ` : "height: 0px;"}
  overflow: hidden;
  @media(max-width: 600px) {
    font-size: 16px;
  }
`;

const FAQButton = styled.div`
  width: 12px;
  height: 12px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 24px;
  position: relative;
`;

const ButtonEl = styled.div`
  width: 100%;
  height: 2px;
  position: absolute;
  left: 50%;
  top: 50%;
  transition: .2s all;
  background: ${props => props.theme.primary};
  ${props => props.isOpen ? "transform: rotate(0deg)" : "transform: rotate(90deg)"};
`;

const FAQWrapper = styled.div`
  width: 100%;
  margin-top: 70px;
`;

const FAQTop = styled.div`
  line-height:  35px;
  font-size: 24px;
  color: #404040;
  font-weight: 600;
  
  cursor: pointer;
  display: flex;
  align-items: center;
  @media(max-width: 600px) {
    font-size: 20px;
  }
`;

const FAQContainer = styled.div`
  line-height:  35px;
  font-size: 24px;
  color: #404040;
  font-weight: 600;
  padding-bottom: 38px;
  padding-top: 36px;
  
  border-bottom: 1px solid #EBEBEB;
  
`;


const Button = styled.div`
  margin-top: 20px;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #fff;
  background: ${props => props.theme.primary};
  width: 300px;
  text-align: center;
  border-radius: 5px;
  padding: 13px 0px;
  transition: .2s all;
  cursor: pointer;
  :hover {
    transition: .2s all;
    background: ${props => props.theme.primaryDark};
  }
  @media(max-width: 500px) {
    width: 100%;
  }
`;

const Picture = styled.img`
  /* width: 570px; */
  width: 100%;
  display: flex;
  max-width: 570px;
  @media(max-width: 1000px) {
    display: none;
  }
`;

const TopContainer = styled.div`
  margin-top: 45px;
  display: flex;
  @media(max-width: 1000px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const RightContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  @media(max-width: 800px) {
    margin-bottom: 10px;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  margin-right: 50px;
  @media(max-width: 800px) {
    order: 2;
    margin-right: 0px;
  }
`;

const LeftTitle = styled.div`
  font-size: 24px;
  line-height: 29px;
  font-weight: bold;
  line-height: 146.9%;
  color: #282828;
`;

const SubTitle = styled.div`
  margin-top: 25px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 26px;
  color: #404040;
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

export {Cooperation};