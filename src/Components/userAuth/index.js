import React, { useState } from "react";
import styled from "styled-components";
import {
  adaptiveBackground,
  defaultBoxStyle,
  primaryButtonStyle,
} from "../../style/mixins";

const S = {
  Wrapper: styled.div`
    ${defaultBoxStyle}
    display: flex;
    flex-direction: column;
  `,
  Title: styled.div`
    text-align: center;
    font-weight: bold;
    font-size: 1.25rem;
  `,
  InputWrapper: styled.div`
    display: flex;
    flex-direction: column;

    margin: 6px 0;

    input {
      ${adaptiveBackground}
      padding: 12px;
      margin: 6px 0;

      border-radius: 6px;
      border: 1px solid var(--adaptiveGray500);
      outline: none;

      &:focus {
        border: 2px solid var(--blue);
        transition: border 0.2s;
      }
    }
  `,
  LoginButton: styled.button`
    ${primaryButtonStyle}
  `,
};

const inputType = {
  ID: "id",
  PASSWORD: "password",
};

function UserAuth() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (e, type) => {
    switch (type) {
      case inputType.ID:
        setUserId(e.target.value);
        break;
      case inputType.PASSWORD:
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <S.Wrapper>
      <S.Title>Login</S.Title>
      <S.InputWrapper>
        <input
          className="id-input"
          placeholder="ID"
          type="text"
          value={userId}
          onChange={(e) => handleInputChange(e, inputType.ID)}
        ></input>
        <input
          className="password-input"
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => handleInputChange(e, inputType.PASSWORD)}
        ></input>
      </S.InputWrapper>
      <S.LoginButton>Login</S.LoginButton>
    </S.Wrapper>
  );
}

export default UserAuth;
