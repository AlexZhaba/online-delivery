import React from 'react';
import styled from 'styled-components';

const Points = (props) => {
  return (
    <Wrapper>
      <TopHeader>
        Мои баллы
      </TopHeader>
      <Container>
          <FlexContainer style={{fontWeight: '600', marginBottom: 30}}>
            <FlexColumn>
              Название
            </FlexColumn>
            <FlexColumn>
              Дата
            </FlexColumn>
            <FlexColumn>
              Кол-во баллов
            </FlexColumn>

          </FlexContainer>
          <Line/>
          {Array(8).fill(0).map(e => (
            <PointContainer>
              <FlexColumn>
                Списание 1 
              </FlexColumn>
              <FlexColumn>
                15.02.2020
              </FlexColumn>
              <FlexColumn>
                1555
              </FlexColumn>
            </PointContainer>
          ))}
          <div style={{display: 'flex', justifyContent: "center", marginTop: 40}}>
            <Button>Показать ещё</Button>
          </div>
      </Container>
    </Wrapper>
  )
}

export {Points};

const Container = styled.div`
  margin-top: 25px;
  width: 100%;
  min-height: 500px;
  box-shadow: 0 0 15px #cdcdcd;
  border-radius: 5px;
  padding: 35px 70px;
  
  position: relative;
`;

const Button = styled.div`
  width: 300px;
  padding: 13px 0;
  background: ${props => props.theme.primary};
  transition: .2s all;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #FFFFFF;
  cursor: pointer;
  text-align: center;
  border-radius: 5px;
  :hover {
    transition: .2s all;
    background: ${props => props.theme.primaryDark};
  }
`;

const Line = styled.div`
  border: 1px solid #EAEAEA;
  width: 100%;
  position: absolute;
  left: 0;
  width: 100%;
  top: 70px;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const PointContainer = styled.div`
  display: flex;
  margin: 15px 0;
`;
const FlexColumn = styled.div`
  flex: 1;
  font-size: 22px;
  line-height: 27px;
  color: #404040;
`;

const Wrapper = styled.div`
`;

const TopHeader = styled.div`
  height: 60px;
  font-weight: bold;
  font-size: 42px;
  line-height: 51px;
  color: #282828;
  display: flex;
  align-items: center;
`;
