import styled from 'styled-components';

const Wrapper = styled.div`
  height: ${props => props.theme.headerHeight};
  width: 100%;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background: white;
  margin-bottom: ${props => props.theme.headerHeight};
  justify-content: center;
  box-shadow: ${props => props.theme.shadow};
  flex-shrink: 1;
`;

export default Wrapper;