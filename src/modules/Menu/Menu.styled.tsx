import styled from "@emotion/styled";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export const MenuWrapper = styled.div`
  position: relative;
  width: 250px;
`;

export const disabledForm = css`
  color: grey;
`;

export const menuForm = css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
