import React, { useContext, useState } from 'react';
import tw, { css } from 'twin.macro'

import { PtgContext } from '../../pages/path-to-glory-roster-builder';

export const Territory = ({category, id, onUpdate}) => {
  const ptg = useContext(PtgContext);
  const territoryName = `territories.${category}.territory${id}.name`;
  const territoryType = `territories.${category}.territory${id}.type`;
  const territoryIsUpgraded = `territories.${category}.territory${id}.isUpgraded`;
  const nameValue = ptg.territories[category][`territory${id}`].name;
  const typeValue = ptg.territories[category][`territory${id}`].type;
  const upgradedValue = Boolean(ptg.territories[category][`territory${id}`].isUpgraded);

  return (
    <div tw="flex w-full border-b">
      <div css={inputBoxStyles}>
        <input type="text" css={inputStyles} name={territoryName} value={nameValue} onChange={onUpdate} />
      </div>
      <div css={inputBoxStyles}>
        <input type="text" css={inputStyles} name={territoryType} value={typeValue} onChange={onUpdate} />
      </div>
      <div css={checkboxBoxStyles}>
        <input type="checkbox" tw="block" name={territoryIsUpgraded} checked={upgradedValue} onChange={onUpdate} />
      </div>
    </div>
  );
};

const inputBoxStyles = css`
${tw`border-r w-1/3 text-xs`}
`;

const inputStyles = css`
${tw`p-1 w-full h-full text-xs`}
`;

const checkboxBoxStyles = css`
${tw`p-1 w-1/3 flex items-center justify-center bg-white`}
`;
