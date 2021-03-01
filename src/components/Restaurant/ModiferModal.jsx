import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import Add from '@assets/add.png';
import Delete from '@assets/delete.png';

import CheckBox from '@components/CheckBox/CheckBox.jsx'

const AdditionalEl = ({option, setAddition, addition, modal}) => {
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    // alert('nice')
    setSelected(false);
  },[modal])
  return (
    <Additional>
      <Con onClick={() => {
      if (!selected) {
        setAddition({
          ...addition,
          modiferGroups: [
            ...addition.modiferGroups,
            option
          ]
        })
      } else {
        let ad = [...addition.modiferGroups];
        let index = 0;
        ad.forEach((mod, i) => {
          if (mod.guid === option.guid) {
            index = i; 
          }
        })
        ad.splice(index, 1);
        setAddition({
          ...addition,
          modiferGroups: ad
        })
      }
      setSelected(!selected)
    }}>
        <CheckBox selected={selected} setSelected={setSelected}/>
        <Description style={{margin: 0, marginLeft: 10, cursor: 'pointer'}}>{option.description.ru}</Description>
      </Con>
      <Text selected={selected}>{option.price} {option.currency}</Text>
    </Additional>
  )
}


const ModiferModal = ({modal, setModal, openItem, handleClick, lang}) => {
  const [itemCount, setItemCount] = useState(1);
  const [addition, setAddition] = useState({
    portion: null,
    modiferGroups: []
  });
  useEffect(() => {
    console.log('addition:', addition)
  }, [addition])
  useEffect(() => {
    setItemCount(1);
  }, [openItem])
  console.log(addition.portion, ' ', openItem)
  return (
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
              {openItem.name[lang]}
            </Name>
            <SubName>
              370 гр 640 ккал
            </SubName>
            <Description>
              {openItem.cooking_desc[lang]}
            </Description>
            {openItem.portions && openItem.portions.length > 1 && 
              <AdditionalName style={{marginBottom: 15}}>Выберите порцию:</AdditionalName>
            }
            {openItem.portions && openItem.portions.length > 1 && openItem.portions.map((portion, index) => (
              <Additional>
                <label class="container" style={{width: "auto", margin: 0}} onClick={() => setAddition({
                  ...addition,
                  portion
                })}>
                  <span>{portion.name[lang]}</span>
                  <input type="radio" name="radio1" checked={addition.portion ? addition.portion.id === portion.id ? true : false : false}/>
                  <span class="checkmark"></span>
                </label>
                <Text>
                  {portion.price} {portion.currency}
                </Text>
              </Additional>
            ))}
            {openItem.modifier_groups && openItem.modifier_groups.map(group => {
              return (
                <>
                  <AdditionalName>
                    {group.name[lang]}
                  </AdditionalName>
                  <AdditionalContainer>
                    {group.options.map(option => <AdditionalEl option={option} setAddition={setAddition} addition={addition} modal={modal}/>)}
                  </AdditionalContainer>
                </>
              )
            })}
            <Bottom>
              <CountContainer style={{marginRight: 10}}>
                <CountButton onClick={() => {
                    if (itemCount - 1 >= openItem.min_order_size) setItemCount(itemCount - 1);
                  }}>
                  <CountImage src={Delete}/>
                </CountButton>
                <CountValue>
                  {itemCount}
                </CountValue>
                <CountButton onClick={() => {
                  if (itemCount + 1 + openItem.itemCount <= openItem.max_order_size) setItemCount(itemCount + 1)
                }}>
                <CountImage src={Add}/>
              </CountButton>
              </CountContainer> 
              <Button onClick={() => {
                  if (addition.portion === null && openItem.portions.length !== 1) return;
                  handleClick(openItem, itemCount, addition)
                  setItemCount(1);
                  setAddition({
                    portion: null,
                    modiferGroups: []
                  })
                }} active={addition.portion || openItem.portions.length === 1}>
                В корзину
                {/*В корзину {openItem.portions[0].price} {openItem.portions[0].currency}*/}
              </Button>
            </Bottom>
          </Container>
          </>
          }
        </ModalContainer>
      </ModalWrapper>
  )
}

export default ModiferModal;

const CountContainer = styled.div`
  display: flex;
  align-items: center;
  @media(max-width: 470px) {
    margin-bottom: 10px;
  }
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
    cursor: pointer;
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
  max-height: calc(100% - 10px);
  /* height: auto; */
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
  /* overflow: hidden; */
  overflow-y: auto;
  @media(max-width: 1000px) {
    /* width: calc(100% - 40px); */
    /* margin: 0 20px; */
    max-height: 100%;
    margin: 0;
    border-radius: 0;
    width: 100%;
    height: 100vh;
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
  flex: 1;
  @media(max-width: 1000px) {
     width: 100%;
     margin-top: 20px;
     margin-left: 0;
  }
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
  margin-bottom: 10px;
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
  @media(max-width: 470px) {
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
  }
`;

const Button = styled.div`
  padding: 14px 20px;
  border-radius: 5px;
  font-size: 14px;
  color: #fff;
  background: ${props => props.active ? props.theme.primary : "#878787"};
  transition: .2s all;
  ${(props) => props.active ? `
  :hover {
    cursor: pointer;
    background: ${props => props.theme.primaryDark};
    transition: .2s all;
  }
  `
    : ''
  }
  @media(max-width: 1000px) {
    /* margin-bottom: 30px; */
  }
`;