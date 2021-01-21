import React from 'react';
import styled from 'styled-components';
import soup from '@assets/soup1.png';
const Product = ({setModal, item, setOpenItem}) => {
  if (!item) return <div></div>

  const handleClick = () => {
    if (item.modifier_groups) {
      console.log('item = ', item);
      setOpenItem(item);
      setModal(true)
    }
  }

  return (
    <Wrapper url={item.image_urls}>
      <Cart>
        <Name>
          {item.name.ru}
        </Name>
        <Description>
          {item.ingredient_desc.ru}
        </Description>
        <Price>
          {item.portions[0].price} {item.portions[0].currency}
        </Price>
        <BottomContainer>
          <Button onClick={() => handleClick()}>
            В корзину
          </Button>
        </BottomContainer>
      </Cart>
    </Wrapper>
  )
}

export default Product;

const Wrapper = styled.div`
  box-shadow: 0px 4px 16px rgba(0,0,0,0.10);
  height: 285px;
  background-image: url("${props => props.url ? props.url : "https://diabetno.ru/wp-content/uploads/2020/07/pp_image_7236_22yecuiyctplaceholder.png"}");
  background-size: contain;
  border-radius: 5px;
  background-repeat: no-repeat;
  display: flex;
  align-items: flex-end;
  cursor: pointer;
  overflow: hidden;

  max-width: 400px;
  :hover {
    & > :first-child {
      //width: calc(100% + 1);
      transform: translate(0px);
      transition: .3s all;
    }
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
  width: 370px;
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