import styled from 'styled-components';

const Content = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 1180px;
  //align-items: flex-start;
  //background: red;
  height: calc(100% - 40px);
  color: #fff;
  font-size: 16px;
  line-height: 28px;
  font-weight: 100;
  @media (max-width: 1150px ) {
    align-items: center;
  }
`;

export default Content;