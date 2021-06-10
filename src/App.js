import styled from "styled-components";
import { defaultBoxStyle } from "./style/mixins";

const S = {
  Box: styled.div`
    ${defaultBoxStyle}
    width: 300px;
  `,
};

function App() {
  return (
    <div>
      <S.Box>
        <div>asdf</div>
        <div>hhhh</div>
      </S.Box>
    </div>
  );
}

export default App;
