import React, { useContext } from "react";
import styled from "styled-components";
import { AssetsContext } from "../../context/AssetsContext";

import { defaultBoxStyle } from "../../style/mixins";
import Divider from "../common/Divider";

const S = {
  Wrapper: styled.div`
    ${defaultBoxStyle}
  `,
  WholeAsset: styled.div`
    display: flex;
    flex-direction: column;

    color: var(--adaptiveGray900);
    text-align: left;
    margin: 12px 0;

    .whole-asset-title {
      color: var(--adaptiveGray600);
    }
    .whole-asset-number {
      font-size: 24px;
      font-weight: bold;
    }
  `,
  AssetHeader: styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;

    .asset-header-item {
      color: var(--adaptiveGray600);
      text-align: center;
    }

    .asset-name {
      width: 30%;
    }
    .asset-amount {
      width: 70%;
    }
  `,
  AssetList: styled.div``,
  AssetItem: styled.div`
    display: flex;
    justify-content: space-around;

    .asset-item {
      color: var(--adaptiveGray900);
      text-align: center;
      margin: 12px 0;
    }

    .asset-symbol {
      width: 30%;
      text-transform: capitalize;
    }
    .asset-quantity {
      width: 70%;
    }
  `,
};

function UserAsset() {
  const { userAssets } = useContext(AssetsContext);

  const assetSum = userAssets.assets.reduce(
    (acc, cur) => acc + cur.quantity,
    0
  );

  return (
    <S.Wrapper>
      <S.WholeAsset>
        <div className="whole-asset-title">총 자산(단순 합계)</div>
        <div className="whole-asset-number">{assetSum}</div>
      </S.WholeAsset>
      <S.AssetHeader>
        <div className="asset-header-item asset-name">자산명</div>
        <div className="asset-header-item asset-amount">보유 수량</div>
      </S.AssetHeader>
      <Divider />
      <S.AssetList>
        {userAssets.assets.map((asset) => (
          <S.AssetItem key={asset._id}>
            <div className="asset-item asset-symbol">{asset.symbol}</div>
            <div className="asset-item asset-quantity">{asset.quantity}</div>
          </S.AssetItem>
        ))}
      </S.AssetList>
    </S.Wrapper>
  );
}

export default React.memo(UserAsset);
