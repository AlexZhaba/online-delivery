import styled from 'styled-components';

const Wrapper = styled.div`
  height: ${props => props.theme.headerHeight};
  display: flex;
  justify-content: center;
  box-shadow: ${props => props.theme.shadow};
  flex-shrink: 1;
`;

export default Wrapper;