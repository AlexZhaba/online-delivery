import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

import axios from 'axios';

import creditCard from '@assets/creditCard.png';
import delete_adr from '@assets/delete_adr.png';
import edit from '@assets/edit.png';

import {useDispatch, useSelector} from 'react-redux';
import { fetchCreateCardWithPin, fetchDeleteCard, fetchListCards } from '../../redux/actions/User';

import NewCardModal from '@components/Account/NewCardModal';

const Cards = (props) => {
  const dispatch = useDispatch()

  let cards = useSelector(({User}) => User.cards);
  let token = useSelector(({User}) => User.token);

  let [isOpen, setIsOpen] = useState(false);
  let [isLoad, setIsLoad] = useState(false);
  let [verifyData, setVerifyData] = useState(null);
  let [card, setCard] = useState(null);


  let [page, setPage] = useState(0);

  const handle = () => {
    setIsOpen(true)
  }

  const getCode = (number, expire) => {
    setIsLoad(true)
    axios({
      method: "post",
      url: "https://checkout.test.paycom.uz/api",
      headers: {
        "X-Auth": "585ba89501362a830d245454",
      },
      data: {
        id: 1,
        method: "cards.create",
        params: {
          card: {
            number,
            expire
          },
          save: true
        }
      }
    }).then(({data}) => {
  
      axios({
        method: "post",
        url: "https://checkout.test.paycom.uz/api",
        headers: {
          "X-Auth": "585ba89501362a830d245454",
        },
        data: {
          id: 1,
          method: "cards.get_verify_code",
          params: {
            token: data.result.card.token
          }
        }
      }).then((response) => {
        setIsLoad(false)
        console.log('verify:',response)
        setVerifyData({...response.data.result, token: data.result.card.token})
        setPage(1);
      })
    });
    // dispatch(fetchCreateCard("8600069195406311", "0399"));
  }

  useEffect(() => {
    setIsLoad(false)
    setIsOpen(false);
    if (cards === null && token) {
      setIsLoad(true);
      dispatch(fetchListCards());
    }
  }, [cards, token])

  const verifyCode = (code) => {
    setIsLoad(true)
    axios({
      method: "post",
      url: "https://checkout.test.paycom.uz/api",
      headers: {
        "X-Auth": "585ba89501362a830d245454",
      },
      data: {
        id: 1,
        method: "cards.verify",
        params: {
          token: verifyData.token,
          code,
        }
      }
    }).then(response => {
      console.log('verifyCode:',response)
      setPage(2)
      setIsLoad(false)
      setCard(response.data.result.card)
    })
  }

  const addPin = (pin) => {
    setIsLoad(true)
    dispatch(fetchCreateCardWithPin(card, pin));
  }

  const deleteCard = (card) => {
    console.log('card:',card)
    // axios({
    //   method: "post",
    //   url: "https://checkout.test.paycom.uz/api",
    //   headers: {
    //     "X-Auth": "585ba89501362a830d245454",
    //   },
    //   data: {
    //     id: 1,
    //     method: "cards.remove",
    //     params: {
    //       token: card.card_token,
    //     }
    //   }
    // }).then(response => {
      dispatch(fetchDeleteCard(card.guid));
    // })
  }

  return (
    <Wrapper>
      <NewCardModal 
          isOpen={isOpen} 
          setIsOpen={setIsOpen}
          getCode={getCode}
          isLoad={isLoad}
          page={page}
          verifyData={verifyData}
          verifyCode={verifyCode}
          addPin={addPin}
      />
      <TopHeader>
        Карты
      </TopHeader>
      <Container>
        <ListWrapper>
        {cards && cards.map((card, index) => (
          <ListContainer>
            <span style={{marginRight: 34, width: 30}}>{index + 1}.</span>
            <img src={creditCard}/>
            <span style={{margin: "0 20px"}}>{card.number}</span>
            <InputImage src={delete_adr} style={{width: 15, height: 23}} onClick={() => deleteCard(card)}/>
          </ListContainer>
        ))}
        </ListWrapper>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
        <Button onClick={() => handle()} data-trash="true">
          Добавить
        </Button>
        </div>
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
  width: 200px;
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
