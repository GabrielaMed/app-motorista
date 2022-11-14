import styled from "styled-components";

export const Container = styled.div`
  background: #dd5400;
  width: 100%;
  max-height: 110px;
  flex: 1;
  margin: 0px;
  padding: 0px;

  header {
    width: 100%;
    display: flex;
    align-items: center;
    height: 115px;
    margin: 0px;
    padding: 0px;
    flex: 1;
    flex-direction: column;
  }
`;

export const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  width: 100%;

  div {
    margin-right: 5px;
    color: white;
    background: white;
    border-radius: 50px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 24px;
      height: auto;
    }
  }
  span {
    color: white;
    font-size: 1.5rem;
  }
`;
export const HeaderLogo = styled.div`
  margin: 10px;
  width: 80px;
  img {
    width: 100%;
    height: auto;
  }
`;
