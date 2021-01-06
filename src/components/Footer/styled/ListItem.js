import styled from 'styled-components'

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 85px;
  font-weight: 300;
  @media (max-width: 1150px) {
    margin: 0;
  }
`;

export default ListItem;
