import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import soup from '@assets/soup1.png';

import Add from '@assets/add.png';
import Delete from '@assets/delete.png';

import {useDispatch, useSelector} from 'react-redux';
import {addItemToBasket, increaseItemCount, decreaseItemCount, clearBasket, setBasketVenue} from '../../redux/actions/Order';

const Product = ({setModal, item, setOpenItem, setClearBasketModal, clearBasketModal, lang, basketVenue, venue, setOtherRest}) => {
  const dispatch = useDispatch();

  const [itemInBasket, setItemInBasket] = useState(false);
  const [itemCount, setItemCount] = useState(0);

  const basketItems = useSelector(({Order}) => Order.basketItems);

  useEffect(() => {
    let isBasket = basketItems.filter(itemB => itemB.guid === item.guid).length !== 0;
    setItemInBasket(isBasket);
    if (isBasket) {
      let count = 0;
      basketItems.filter(itemB => itemB.guid === item.guid).forEach(item => {
        count += item.count
      });
      setItemCount(count);
    }
  }, [basketItems])
  const handleClick = () => {
    if (!item.online) return;
    if (basketVenue === null) {
      dispatch(setBasketVenue(venue));
    } else if (venue.guid !== basketVenue.guid) {
      setOtherRest(true);
      window.item_guid = item.guid;
      return;
    }
    // if (item.max_order_size <= 0) return;
    if (item.modifier_groups || (item.portions && item.portions.length > 1)) {
      setOpenItem({...item, itemCount: 0});
      setModal(true)
    } else {
      dispatch(addItemToBasket(item, {
        portion: item.portions[0],
        modiferGroups: []
      }));
    }
  }
  
  const onIncreaseCount = () => {
    if (!item.online) return;
    if (itemCount + 1 <= item.max_order_size) {
      if (item.modifier_groups || (item.portions && item.portions.length > 1)) {
        setOpenItem({...item, itemCount});
        setModal(true)
      } else dispatch(increaseItemCount(item))
    }
  }

  const onDecreaseCount = () => {
    if (!item.online) return;
    dispatch(decreaseItemCount(item))
  }
  
  if (!item) return <div></div>
  return (
    <Wrapper url={item.image_urls} online={item.online}>
      <Cart itemInBasket={itemInBasket}>
        <Name>
          {item.name[lang]}
        </Name>
        <Description>
          {item.ingredient_desc[lang]}
        </Description>
        <Price>
          {item.portions[0].price.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} {item.portions[0].currency}
        </Price>
        <BottomContainer >
        {(itemInBasket) &&
          <CountContainer>
            <CountButton onClick={onDecreaseCount}>
              <CountImage src={Delete}/>
            </CountButton>
            <CountValue>
              {itemCount}
            </CountValue>
            <CountButton onClick={onIncreaseCount}>
            <CountImage src={Add}/>
          </CountButton>
          </CountContainer> 
        }
        {(!itemInBasket)  &&
          <Button onClick={() => handleClick()} data-trash="true" id={`button_item_${item.guid}`}>
            В корзину
          </Button>
        }
        </BottomContainer>
      </Cart>
    </Wrapper>
  )
}

export default Product;

const CountContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CountButton = styled.div`
  background: ${props => props.theme.primary};
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: .2s all;
  margin: 0 5px;
  :hover {
    transition: .2s all;
    background: ${props => props.theme.primaryDark};
  }
`;

const CountImage = styled.img`
  width: 15px;
  user-select: none;
`;

const CountValue = styled.div`
  font-weight: 500;
  font-size: 21px;
`;

const Wrapper = styled.div`
  box-shadow: 0px 4px 16px rgba(0,0,0,0.10);
  height: 285px;
  background-image: url("${props => props.url ? props.url : "https://diabetno.ru/wp-content/uploads/2020/07/pp_image_7236_22yecuiyctplaceholder.png"}");
  background-size: contain;
  border-radius: 5px;
  background-repeat: no-repeat;
  display: flex;
  align-items: flex-end;
  ${
    props => props.online ? "cursor: pointer;": ""
  }
  overflow: hidden;
  ${
    props => !props.online ? "filter: grayscale(100%);" : ""
  }
  max-width: 400px;
  ${ props => props.online ? `
      :hover {
        & > :first-child {
          //width: calc(100% + 1);
          transform: translate(0px);
          transition: .3s all;
        }
      }
  ` : ""
  }
  @media(max-width: 780px) {
    cursor: auto;
  }
`;

const Cart = styled.div`
  width: 100%;
  padding: 16px;
  //height: 100px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transform: translateY(57px);
  transition: .3s all;
  ${
    (props) => props.itemInBasket ? `
      transform: translateY(0);
      transition: none !important;
      border: 4px solid ${props.theme.primary};
      border-radius: 5px;
      border-top-right-radius: 0;
      border-top-left-radius: 0;
      border-top: none;
    ` : ""
  }
  @media(max-width: 780px) {
    transform: translateY(0px);
  }
`;

const Name = styled.div`
  font-size: 20px;
  color: #080808;
  font-weight: bold;
`;

const Description = styled.div`
  //width: 100%;
  margin-top: 10px;
  display: flex;
  font-size: 12px;
  width: 100%;
  color: grey;
`;

const Price = styled.div`
  color: #080808;
  font-weight: bold;
  font-size: 18px;
  margin-top: 10px;
`;

const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 15px;
`;

const Button = styled.div`
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 5px;
  background: ${props => props.theme.primary};
  color: #fff;
  transition: .2s all;
  cursor: pointer;
  :hover {
    background: ${props => props.theme.primaryDark};
    transition: .2s all;
  }
  @media(max-width: 780px) {
    width: 100%;
    text-align: center;
  }
`;