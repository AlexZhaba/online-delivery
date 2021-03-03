import React, {useState} from 'react';
import styled from 'styled-components';

import whiteStar from '@assets/whiteStar.png'
import whiteDelivery from '@assets/whiteDelivery.png';
import whiteTime from '@assets/whiteTime.png';
import whiteNavigate from '@assets/whiteNavigate.png';
import mainTitle from '@assets/mainTitle.png'

import ReviewsModal from '@components/Restaurant/ReviewsModal.jsx';

const DesktopRestaurantName = ({venue}) => {
  const [review, setReview] = useState(null);
  const [reviewModal, setReviewModal] = useState(false);
  return (
    <Wrapper image={venue ? venue.featured_image_urls ? venue.featured_image_urls[0] : "https://diabetno.ru/wp-content/uploads/2020/07/pp_image_7236_22yecuiyctplaceholder.png" : "https://diabetno.ru/wp-content/uploads/2020/07/pp_image_7236_22yecuiyctplaceholder.png"}>
      <ReviewsModal reviewModal={reviewModal} setReviewModal={setReviewModal}/>
      {venue &&
      <>
        <Comment>
          Бургеры, стейк хаус
        </Comment>
        <Name>
          {venue.name.ru}
        </Name>
        <Adress>
          {venue.address.ru}
        </Adress>
        <Text>
          {/* Burger & Lounage - заведение нового формата, где криль-бар, 
          стейк-хау и лаундж-бар соединены в одном проекте. Тут 
          вы можете насладится музыкой для ценителей и душевной 
          атмосферы */}
          {venue.description.ru}
        </Text>
        <CharacterWrapper>
          <Character onClick={() => setReviewModal(true)} style={{cursor: "pointer"}}>
            <CharacterImage src={whiteStar}/>
            {venue.rating}
          </Character>
          <Character>
            <CharacterImage src={whiteTime}/>
            25-35 мин
          </Character>
          <Character>
            от {venue.check_value.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} {venue.check_currency}
          </Character>
          <Character>
            <CharacterImage src={whiteDelivery} style={{marginRight: 7}}/>
            от {venue.check_value.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} {venue.check_currency}
          </Character>
        </CharacterWrapper>
      </>
      }
    </Wrapper>    
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 300px;
  margin-bottom: 40px;
  color: #FFF;
  background-image: url("${props => props.image}");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  //background-position: center;
  //background-;
  padding: 30px 45px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(to right,rgba(0,0,0, 0.4) 0%,rgba(0,0,0,0.3) 100%);
  }
  @media(max-width: 790px) {
    color: #080808;
    margin-bottom: 0;
    padding: 10px 20px;
    height: auto;
    &::before {
      background: white;
    }
  }
`;

const Comment = styled.div`
  font-size: 10px;
  margin-bottom: 10px;
  z-index: 5;
  position: relative;
`;

const Name = styled.div`
  font-size: 40px;
  position: relative;
  font-weight: bold;
  margin-bottom: 15px;
  @media(max-width: 790px) {
    font-size: 24px;
    margin-bottom: 0;
  }
`;

const Adress = styled.div`
  font-size: 10px;
  position: relative;
  margin-bottom: 25px;
  margin-left: 18px;
  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: -20px;
    height: 15px;
    width: 15px;
    background-image: url("${whiteNavigate}");
    background-repeat: no-repeat;
    transform: translateY(-2px);
    //background: red;
  }
  @media(max-width: 790px) {
    display: none;
  }
`;

const Text = styled.div`
  font-size: 14px;
  width: 460px;
  position: relative;
  line-height: 24px;
  margin-bottom: 20px;
  @media(max-width: 790px) {
    display: none;
  }
`;

const CharacterWrapper = styled.div`
  display: flex;
  position: relative;
  @media(max-width: 790px) {
    display: none;
  }
`;

const CharacterImage = styled.img`
  margin-right: 5px;
  width: 15px;
`;

const Character = styled.div`
  padding: 10px 25px;
  font-size: 15px;
  border: 1px solid white;
  border-radius: 20px;
  font-weight: 500;
  margin-right: 15px;
  display: flex;
  align-items: center;

`;
export {DesktopRestaurantName};



