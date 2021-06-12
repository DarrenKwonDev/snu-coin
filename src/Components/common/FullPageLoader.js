import React from "react";
import styled from "styled-components";

const LoadingScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: rgba(0, 0, 0, 0.5); */
  background-color: white;
  z-index: 1000000;
  color: white;

  /* 여기까지가 전체 page 관련 설정들 이하 loader들 */
  .lds-ripple {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ripple div {
    position: absolute;
    border: 4px solid var(--blue);
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .lds-ripple div:nth-child(2) {
    animation-delay: -0.5s;
  }
  @keyframes lds-ripple {
    0% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 72px;
      height: 72px;
      opacity: 0;
    }
  }
`;

function FullPageLoader({ isLoading }) {
  return (
    <>
      {isLoading && (
        <LoadingScreen>
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </LoadingScreen>
      )}
    </>
  );
}

export default FullPageLoader;
