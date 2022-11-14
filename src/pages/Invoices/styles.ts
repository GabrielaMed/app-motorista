import styled from "styled-components";

export const MainContainer = styled.div`
  background: #d2d2d2;
  margin: 0px;
  padding: 0px;
  padding-top: 0.5rem;
  overflow-y: scroll;
  height: auto;
  box-sizing: border-box;
`;

export const ListContainer = styled.ul`
  margin: 0px;
  padding: 0.4rem;
  /* overflow-y: auto; */
`;

interface IPropList {
  selected: boolean;
}
export const ListItem = styled.li<IPropList>`
  padding: 0.5rem;
  border-radius: 0.5em;
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
  cursor: pointer;
  background: ${(props) => (props.selected ? "#4AD9A0" : "white")};
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
  }
`;
