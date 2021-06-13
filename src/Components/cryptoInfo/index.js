import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { loadMarkets } from "../../api";
import { CryptoContext } from "../../context/CryptoContext";
import { defaultBoxStyle } from "../../style/mixins";
import DropDown from "./dropdown/DropDown";

const S = {
  Wrapper: styled.div`
    ${defaultBoxStyle}
    overflow: visible;

    display: flex;

    .crpyto-name {
      display: flex;
      flex-direction: column;

      font-weight: bold;
      margin-bottom: 0.5rem;
      margin-right: 1.25rem;
    }

    .info {
      font-size: 1.25rem;
    }
  `,
};

function CrpytoInfo() {
  const { selectedMarket, wholeMarketList } = useContext(CryptoContext);

  useEffect(() => {
    const getMarkets = async () => {
      const marketsList = await loadMarkets();
      wholeMarketList.setwholeMarket(marketsList);
      selectedMarket.setChoosenMarket(marketsList[0]);
    };
    getMarkets();
  }, []);

  return (
    <S.Wrapper>
      {selectedMarket && (
        <>
          <div className="crpyto-name">
            <DropDown
              wholeMarketList={wholeMarketList}
              selectedMarket={selectedMarket}
            />
          </div>
          <div className="info">
            {selectedMarket.choosenMarket.coin}을/를{" "}
            {selectedMarket.choosenMarket.currency}로 거래합니다.
          </div>
        </>
      )}
    </S.Wrapper>
  );
}

export default CrpytoInfo;
