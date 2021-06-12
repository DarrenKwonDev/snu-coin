import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { loadMarkets } from "../../api";
import { CryptoContext } from "../../context/CryptoContext";
import { defaultBoxStyle } from "../../style/mixins";
import DropDown from "./dropdown/DropDown";

const S = {
  Wrapper: styled.div`
    ${defaultBoxStyle}

    display: flex;
    flex-direction: row;
    /* justify-content: center; */
    /* align-items: left; */

    .crpyto-name {
      display: flex;
      flex-direction: column;

      font-weight: bold;
      margin-bottom: 0.5rem;
      margin-right: 1.25rem;
    }

    .price {
      font-size: 1.5rem;
      font-weight: bold;
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
          <div className="price">
            minPrice : {selectedMarket.choosenMarket?.minPrice}
          </div>
        </>
      )}
    </S.Wrapper>
  );
}

export default CrpytoInfo;
