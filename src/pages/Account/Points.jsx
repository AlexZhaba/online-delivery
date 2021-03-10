import React from 'react';
import styled from 'styled-components';

const Points = (props) => {
  return (
    <Wrapper>
      <TopHeader>
        <span>Мои баллы</span>
        <span>
          <span style={{fontSize: '28px'}}>2000</span>
          <span style={{color: "#969595", fontSize: 20, marginLeft: 12, fontWeight: 'normal'}}>баллов</span>
        </span>
      </TopHeader>
      <Container>
          <FlexContainer style={{fontWeight: '600', marginBottom: 30}}>
            <FlexColumn>
              Название
            </FlexColumn>
            <FlexColumn>
              Дата
            </FlexColumn>
            <FlexColumn style={{minWidth: 50}}>
              {window.innerWidth > 600 ? "Кол-во баллов" : "Кол-во"}
            </FlexColumn>

          </FlexContainer>
          <Line/>
          {Array(8).fill(0).map(e => (
            <PointContainer>
              <FlexColumn>
                Списание 1
              </FlexColumn>
              <FlexColumn >
                15.02.2020
              </FlexColumn>
              <FlexColumn style={{minWidth: 30}}>
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
  /* box-shadow: 0 0 15px #cdcdcd; */
  background: #fff;
  border-radius: 5px;
  padding: 35px 70px;
  position: relative;
  @media(max-width: 700px) {
    padding: 20px 10px
  }
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
  min-width: 100px;
  color: #404040;
  @media(max-width: 700px) {
    font-size: 14px;
  }
  @media(max-width: 400px) {
    flex-shrink: 1;
  }
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
  justify-content: space-between;
  
  @media(max-width: 700px) {
    font-size: 18px;
    line-height: 22px;
    height: auto;
    margin-left: 10px;

  }
`;

