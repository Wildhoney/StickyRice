import styled from "@emotion/styled";


export const Table = styled.table`
  border-collapse: collapse;
`;

export const TH = styled.th`
  padding: 10px;
  background-color: lightgray;
  text-align: left;
  position: sticky;
  min-width: ${({ size }) => size};
  top: 0;
`;

export const TD = styled.td`
  padding: 10px;
  border-bottom: 1px solid lightgray;
`;
