import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "./atom";

const SwitchWarp = styled.div`
  position: relative;
  margin-top: 30px;
  margin-left: 30px;
`;

const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 30px;
  border-radius: 20px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;

const CheckBox = styled.input`
  width: 55px;
  height: 25px;
  border-radius: 20px;
  z-index: 1;
  &:checked + ${CheckBoxLabel} {
    background: #4fbe79;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 22px;
      height: 22px;
      margin-left: 35px;
      transition: 0.2s;
    }
  }
`;

function Toggle() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const checkBoxHandler = (event: any) => {
    setDarkAtom(event.target.checked);
  };

  return (
    <SwitchWarp>
      <CheckBox id="checkbox" type="checkbox" onClick={(event) => checkBoxHandler(event)} />
      <CheckBoxLabel htmlFor="checkbox" />
    </SwitchWarp>
  );
}

export default Toggle;
