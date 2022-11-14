import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  background-color: #023047;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 80px;
  
`

export const Logo = styled.div`
  height: 160px;
  width: 160px;
  border-radius: 50%;
  background-color: white;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const LoginBtn = styled.button`
  width: 200px;
  height: 50px;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: #FB8500;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 2px;

  :active{
    background-color: #fd9e02;
  }
`