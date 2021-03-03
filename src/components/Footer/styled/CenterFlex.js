import styled from 'styled-components';

const CenterFlex = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: .2s all;

  & > a {
      transition: .2s all;
      :hover {
        filter: brightness(0.7)
      }
  }
  :hover {
    filter: brightness(0.7)
  }
`;

export default CenterFlex;
