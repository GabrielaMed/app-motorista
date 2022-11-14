import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex: 2;
  flex-grow: 3;
  height: 100%;
  background: #d2d2d2;
  margin: 0px;
  padding: 0px;
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

export const ListContainer = styled.ul`
  margin: 0px;
  padding: 0.4rem;
  display: flex;
  flex-direction: column;
`;

interface IPropList {
  selected?: boolean;
}
export const ListItem = styled.li<IPropList>`
  padding: 0.5rem;
  border-radius: 0.5em;
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
  }
`;
