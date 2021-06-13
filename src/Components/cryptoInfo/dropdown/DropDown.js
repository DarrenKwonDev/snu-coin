import React, { useState } from "react";
import styled from "styled-components";
import { adaptiveBackground, flexCentering } from "../../../style/mixins";
import { ReactComponent as DropDownSvg } from "../../../style/svg/chevron.svg";
import { CURRENT_MARKET } from "../../../_constants";

const S = {
  DropDownWrapper: styled.ul`
    border: 1px solid black;
    z-index: 100;
  `,
  DropDownItem: styled.li`
    ${adaptiveBackground}
    ${flexCentering("column")}

    padding: 6px 12px;
    cursor: pointer;
    z-index: 100;

    &:hover {
      background: var(--blue);
    }
  `,
  OpenButton: styled.div`
    ${adaptiveBackground}
    display: flex;
    justify-content: space-around;

    width: 120px;

    border: 1px solid var(--adaptiveGray700);
    border-bottom: ${({ open }) => open && 0}; // dropdown 열리면 안 보이게 하자

    padding: 6px 12px;
    cursor: pointer;

    p {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .dropdown-icon {
      transform: ${({ open }) => open && `rotate(180deg)`};
      transition: transform 0.25s;
    }
  `,
};

function DropDownItem({
  crpyto,
  selectedMarket,
  wholeMarketList,
  index,
  setOpen,
}) {
  const handleClickDropDownItem = () => {
    selectedMarket.setChoosenMarket(wholeMarketList.wholeMarket[index]);
    localStorage.setItem(
      CURRENT_MARKET,
      JSON.stringify(wholeMarketList.wholeMarket[index])
    );
    setOpen((prev) => !prev);
  };

  return (
    <S.DropDownItem onClick={handleClickDropDownItem}>
      <p>{crpyto.name}</p>
    </S.DropDownItem>
  );
}

function DropDown({ wholeMarketList, selectedMarket }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <S.OpenButton open={open} onClick={() => setOpen((prev) => !prev)}>
        <p>{selectedMarket.choosenMarket.name}</p>
        <p className="dropdown-icon">
          <DropDownSvg />
        </p>
      </S.OpenButton>
      {open && wholeMarketList.wholeMarket && (
        <S.DropDownWrapper>
          {wholeMarketList.wholeMarket.map((crpyto, i) => {
            return (
              <DropDownItem
                key={i}
                wholeMarketList={wholeMarketList}
                selectedMarket={selectedMarket}
                crpyto={crpyto}
                index={i}
                setOpen={setOpen}
              />
            );
          })}
        </S.DropDownWrapper>
      )}
    </>
  );
}

export default DropDown;
