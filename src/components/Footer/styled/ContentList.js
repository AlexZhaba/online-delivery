import styled from 'styled-components';

const ContentList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  @media (max-width: 1150px) {
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 25px;
    row-gap: 40px;
  }
`;

export default ContentList;