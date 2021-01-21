import React, {useState} from 'react';
import styled from 'styled-components';

import Product from "./Product";
import image from '@assets/modalImage.png';
import boxoff from '@assets/boxoff.png';

import CheckBox from '@components/CheckBox/CheckBox.jsx'

const AdditionalEl = ({option}) => {
  const [selected, setSelected] = useState(false);
  return (
    <Additional>
      <Con>
        <CheckBox selected={selected} setSelected={setSelected}/>
        <Description style={{margin: 0, marginLeft: 10, cursor: 'pointer'}} onClick={() => setSelected(!selected)}>{option.description.ru}</Description>
      </Con>
      <Text selected={selected}>{option.price} {option.currency}</Text>
    </Additional>
  )
}


const ProductsList = ({menu}) => {
  const [modal, setModal] = useState(null);
  const [openItem, setOpenItem] = useState(null);

  return (
    <Wrapper>
      <ModalWrapper modal={modal}>
        <ModalContainer  modal={modal}>
        {openItem && 
        <>
          <Cross onClick={() => setModal(null)}>
            <CrossEl style={{transform: "rotate(45deg)"}}/>
            <CrossEl style={{transform: "rotate(-45deg) translate(2px, -1px)"}}/>
          </Cross>
          <ModalImage src={openItem.image_urls ? openItem.image_urls[0] : "https://diabetno.ru/wp-content/uploads/2020/07/pp_image_7236_22yecuiyctplaceholder.png"}/>
          <Container>
            <Name>
              {openItem.name.ru}
            </Name>
            <SubName>
              370 гр 640 ккал
            </SubName>
            <Description>
              {openItem.cooking_desc.ru}
            </Description>
            {openItem.modifier_groups && openItem.modifier_groups.map(group => {
              return (
                <>
                <AdditionalName>
                  {group.name.ru}
                </AdditionalName>
                <AdditionalContainer>
                  {group.options.map(option => <AdditionalEl option={option}/>)}
                  
                </AdditionalContainer>
                </>
              )
            })}
            <Bottom>
              <Button>
                В корзину {openItem.portions[0].price} {openItem.portions[0].currency}
              </Button>
            </Bottom>
          </Container>
          </>
          }
        </ModalContainer>
      </ModalWrapper>
      {
        menu && menu.categories.map((category) => {
          return (
            <div>
              <CategoryName id={category.guid}>
                {category.name.ru}
              </CategoryName>
              {category.child_type === "food" &&
                <ProductsContainer>
                  {category.items.map(item => <Product setModal={setModal} item={item} setOpenItem={setOpenItem}/>)}
                </ProductsContainer>
              }
              {category.child_type === "section" &&
                category.sections.map(section => {
                  console.log("SECTION = ", section)
                  return (
                    <>
                    <Section>{section.name.ru}</Section>
                    <ProductsContainer>
                      {
                        section.items && section.items.map(item => {
                          return <Product setModal={setModal} item={item} setOpenItem={setOpenItem}/>
                        })
                      }
                    </ProductsContainer>
                    </>
                  )
                })
              }
            </div>
          )
        })
      }
    </Wrapper>
  )
}

export default ProductsList;

const Section = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #282828;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  width: 100%;
  padding-right: 2px;
`;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 25px;
  row-gap: 25px;
  @media(max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryName = styled.div`
  margin-bottom: 30px;
  margin-top: 50px;
  font-weight: bold;
  font-size: 30px;
  color: #282828;
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
  width: 911px;
  // min-height: ${props => props.modal ? "443px" : "0px"};
  transition: .5s all;
  opacity: ${props => props.modal ? "1" : "0"};
  background: white;
  position: relative;
  border-radius: 5px;
  padding: 40px;
  display: flex;
  align-items: flex-start;
  overflow: hidden;
  @media(max-width: 1000px) {
    width: calc(100% - 40px);
    margin: 0 20px;
    flex-direction: column;
    align-items: center;
  }
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

const ModalImage = styled.img`
  border-radius: 5px;
  width: 375px;
  @media(max-width: 600px) {
    display: none;
  } 
`;

const Container = styled.div`
  margin-left: 30px;
  // @media(max-width: 1000px) {
  //   margin-left: 0;
  // }
`;

const Name = styled.div`
  font-weight: bold;
  color: #080808;
  font-size: 30px;
  margin-bottom: 10px;
`;

const SubName = styled.div`
  color: grey;
  font-size: 12px;
  margin-bottom: 20px;
  font-weight: 500;
`;

const Description = styled.div`
  color: #080808;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 40px;
`;

const AdditionalName = styled(Name)`
  font-size: 20px;
  margin-bottom: 20px;
`;

const AdditionalContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Additional = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Con = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.div`
  font-weight: 500;
  color: ${props => props.selected ? "#080808" : "grey"};
`;

const Bottom = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: flex-start;
`;

const Button = styled.div`
  padding: 14px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  color: #fff;
  background: ${props => props.theme.primary};
  transition: .2s all;
  :hover {
    background: ${props => props.theme.primaryDark};
    transition: .2s all;
  }
`;