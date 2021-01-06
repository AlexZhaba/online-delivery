import styled from 'styled-components';

const InputWrapper = styled.div`
  flex: 1;
  height: 40px;
  display: flex;
  background: #fff;
  align-items: center;
  border-radius: 5px;
  border: 2px solid ${props => props.theme.primary};
  margin: 0 60px;
  @media(max-width: 1150px) {
    margin: 0 10px;
    margin-left: 20px;
  }
  @media(max-width: 970px) {
    margin: 0;
    margin-left: 15px;
  }
  @media (max-width: 620px) {
    margin: 0 5px;
    margin-right: 0px;
  }
`;

export default InputWrapper;