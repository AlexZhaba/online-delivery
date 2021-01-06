import styled from 'styled-components'

const Wrapper = styled.div`
  margin-top: 110px;
  width: 100%;
  height: 400px;
  background: #000;
  display: flex;
  justify-content: center;
  @media (max-width: 1150px ) {
    height: 550px;
  }
  @media (max-width: 570px) {
    height: 610px;
  }
`;

export default Wrapper;