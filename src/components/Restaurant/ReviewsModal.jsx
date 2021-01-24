import React, {useState} from 'react';
import styled from 'styled-components';

import smallStar_red from '@assets/smallStar_red.png';

const ModiferModal = ({reviewModal, setReviewModal, openItem}) => {
  return (
    <ModalWrapper modal={reviewModal}>
        <ModalContainer  modal={reviewModal}>
          <Cross onClick={() => setReviewModal(null)}>
            <CrossEl style={{transform: "rotate(45deg)"}}/>
            <CrossEl style={{transform: "rotate(-45deg) translate(2px, -1px)"}}/>
          </Cross>
          <Top>
            <Title>Отзывы</Title>
            <RatingContainer>
              <TopImage src={smallStar_red}/>
              <TopImage src={smallStar_red}/>
              <TopImage src={smallStar_red}/>
              <TopImage src={smallStar_red}/>
              <TopImage src={smallStar_red}/>
            </RatingContainer>
            <Rating>4,5</Rating>
            <Rating>отзывов - 361</Rating>
          </Top>
          <ReviewsWrapper>
          {Array(9).fill(0).map(e => (
            <ReviewContainer>
              <ReviewContent>
                <ReviewTop>
                  <ReviewName>
                    Марина
                  </ReviewName>
                  <ReviewDate>
                    6 июля 2020 13:55
                  </ReviewDate>
                </ReviewTop>
                <ReviewText>
                  В отличии от lorem ipsum, текст рыба на русском языке
                  В отличии от lorem ipsum, текст рыба на русском языке
                  В отличии от lorem ipsum, текст рыба на русском языке
                  В отличии от lorem ipsum, текст рыба на русском языке

                </ReviewText>
              </ReviewContent>
              <ReviewRating>
                <TopImage src={smallStar_red}/>
                <TopImage src={smallStar_red}/>
                <TopImage src={smallStar_red}/>
                <TopImage src={smallStar_red}/>
                <TopImage src={smallStar_red}/>
              </ReviewRating>
            </ReviewContainer>
          ))}
          </ReviewsWrapper>
        </ModalContainer>
      </ModalWrapper>
  )
}

export default ModiferModal;

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
  width: 911px;
  margin: 0 20px;
  // min-height: ${props => props.modal ? "443px" : "0px"};
  transition: .5s all;
  opacity: ${props => props.modal ? "1" : "0"};
  background: white;
  position: relative;
  border-radius: 5px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

`;

const Cross = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  display: flex;
  width: 30px;
  height: 30px;
  flex-direction: column;
  cursor: pointer;
  justify-content: center;
  :hover {
    & > div {
      transition: .3s all;
      transform: none !important;
    }
  }
`;

const CrossEl = styled.div`
  width: 100%;
  height: 2px;
  transform-origin: center;
  background: #080808;
  transition: .3s all;
`;

const Top = styled.div`
  width: 100%;
  color: #282828;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  @media(max-width: 750px) {
    justify-content: center;
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 36px;
  @media(max-width: 750px) {
    font-size: 24px;
  }

`;

const RatingContainer = styled.div`
  margin-left: 20px;
  height: 100%;
  display: flex;
  align-items: center;
  transform: translateY(2px);
`;

const TopImage = styled.img`
  margin-left: 5px;
`;

const Rating = styled.div`
  color: #6D6D6D;
  font-weight: 600;
  font-size: 16px;
  // line-height: 20px;
  margin-left: 25px;
  transform: translateY(4px);
`;

const ReviewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
  max-height: 600px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 2px;
    background: #EDECEC;
    overflow: visible;
  }
  &::-webkit-scrollbar-thumb  {
   background: ${props => props.theme.primary};
   width: 5px;

  }
`;


const ReviewContainer = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  @media(max-width: 750px) {
    flex-direction: column;
    justify-content: flex-start;
    padding-right: 10px;
  }
`;

const ReviewContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ReviewRating = styled.div`
  width: 150px;
  display: flex;
  align-items: center;
  @media(max-width: 750px) {
    margin-top: 10px;
  }
  
`;

const ReviewTop = styled.div`
  display: flex;
  align-items: center;
  vertical-align: middle;
`;

const ReviewName = styled.div`
  font-size: 20px;
  line-height: 24px;
  color: #414040;
  font-weight: 600;
`;

const ReviewDate = styled.div`
  margin-left: 13px;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  color: #6D6D6D
`;

const ReviewText = styled.div`
  margin-top: 9px;
  font-weight: normal;
  font-size: 18px;
  flex: 1;
  color: #404040;
  @media(max-width: 750px) {
    font-size: 16px;
  }
`;