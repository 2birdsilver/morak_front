import React from "react";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
  width: calc(100% - 32px);
  ${(props) =>
    props.height &&
    `
        height: ${props.height}px;
    `}
  padding: 16px;
  font-size: 16px;
  line-height: 20px;
  resize: none; /* 사이즈 조절 불가 */
`;

function TextInput(props) {
  const { height, value, onChange } = props;

  return <StyledTextarea height={height} value={value} onChange={onChange} />;
}

export default TextInput;
