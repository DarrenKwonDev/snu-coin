import React, { useState } from "react";
import styled from "styled-components";
import { LOGIN_KEY, login } from "../../api";
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
    margin-top: 32px;
  `,
  LogoutWrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: space-between;
    height: 100%;
  `,
};

const inputType = {
  ID: "id",
  PASSWORD: "password",
};

function UserAuth() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(() =>
    localStorage.getItem(LOGIN_KEY) ? true : false
  );

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

  const handleLoginClick = async () => {
    const loginData = await login(userId, password);
    if (loginData.key) {
      localStorage.setItem(LOGIN_KEY, loginData.key);
      alert(`Welcome`);
      setisLoggedIn(true);
    } else {
      console.error(loginData);
      alert("key not found");
    }
  };

  const handleLogoutClick = () => {
    localStorage.removeItem(LOGIN_KEY);
    setisLoggedIn(false);
    alert(`Bye`);
  };

  return (
    <S.Wrapper>
      {isLoggedIn ? (
        <S.LogoutWrapper>
          <S.Title>Welcome</S.Title>
          <S.LoginButton onClick={handleLogoutClick}>Logout</S.LoginButton>
        </S.LogoutWrapper>
      ) : (
        <>
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
          <S.LoginButton onClick={handleLoginClick}>Login</S.LoginButton>
        </>
      )}
    </S.Wrapper>
  );
}

export default UserAuth;
