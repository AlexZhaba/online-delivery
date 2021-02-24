import styled from 'styled-components';

const Burger = styled.div`
  width: 30px;
  height: 30px;
  cursor: pointer;
  //background: red;
  margin-right: 10px;
  display: none;
  flex-direction: column;
  justify-content: space-around;
  @media (max-width: 970px) {
    display: flex;
  }
`;

export default Burger;