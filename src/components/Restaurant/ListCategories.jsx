import React, {useState} from 'react';
import styled from 'styled-components';

const ListCategories = ({menu}) => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  return (
    <Wrapper>
      {menu && menu.categories.map((category, index) => {
        return <Item onClick={() => {
          document.getElementById(category.guid).scrollIntoView({behavior: "smooth"});
          setSelectedCategory(index);
        }} key={index} selected={index === selectedCategory}>
                  {category.name.ru}
                </Item>
      })}
    </Wrapper>
  )
}

export default ListCategories;

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  padding: 10px 0;
  background: white;
  //overflow-x: scroll;
     overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  z-index: 2;  
  display: flex;
  //flex-wrap: wrap;  
  align-items: center;
  margin-bottom: 40px;
  //scrollbar-track-color: red;
`;

const Item = styled.div`
  margin: 0 3px;
  color: #000;
  flex-shrink: 0;  
  transition: .2s all;
  padding: 7px 12px;
  background: #fff;
  border-radius: 30px;
  font-weight: 500;
  font-size: 13px;
  //font-family: 'Montserrat';
  cursor: pointer;
  ${props => {
    if (props.selected) return `
      background: ${props.theme.primary};
      color: #fff;
    `
  }}
  :hover {
    color: #fff;
    transition: .2s all;
    background: ${props => props.theme.primary};
  }
`;

const Container = styled.div`
  display: flex;
`;
