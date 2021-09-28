import React, { useContext } from 'react';
import tw, { css } from 'twin.macro'

import { PtgContext } from '../../pages/path-to-glory-roster-builder';

import { Label } from "./Label"
import { TextField } from "./TextField"
import { TextareaField } from "./TextareaField"

export const OtherUnit = ({id, dark, onUpdate}) => {
  const ptg = useContext(PtgContext);
  const unit = `unit${id}`;
  return (
    <>
      <TextField label="Name" name={`otherUnits.unit${id}.name`} value={ptg.otherUnits[unit].name} onUpdate={onUpdate} dark={dark} />
      <TextField label="Warscroll" name={`otherUnits.unit${id}.warscroll`} value={ptg.otherUnits[unit].warscroll} onUpdate={onUpdate} dark={dark} />
      <TextareaField label="Veteran Abilities / Notes" name={`otherUnits.unit${id}.veteranAbilities`} value={ptg.otherUnits[unit].veteranAbilities} onUpdate={onUpdate} dark={dark} />
      <div tw="flex">
        <div tw="flex border-b w-1/2">
          <Label tw="w-2/3" dark={dark}>Reinforced</Label>
          <div css={checkboxBoxStyles}>
            <input type="checkbox" tw="block" name={`otherUnits.unit${id}.reinforced2`} checked={ptg.otherUnits[unit].reinforced1} onChange={onUpdate} />
            <input type="checkbox" tw="block" name={`otherUnits.unit${id}.reinforced2`} checked={ptg.otherUnits[unit].reinforced2} onChange={onUpdate} />
          </div>
        </div>
        <div tw="flex border-b w-1/2">
          <Label tw="w-2/3" dark={dark}>Casualty Score</Label>
          <div css={bodyStyles}>
            <input type="number" min="0" step="5" css={inputStyles} name={`otherUnits.unit${id}.casualtyScore`} value={ptg.otherUnits[unit].casualtyScore} onChange={onUpdate} />
          </div>
        </div>
      </div>
      <div tw="flex">
        <div tw="flex border-b w-1/2">
          <Label tw="w-2/3" dark={dark}>Renown Points</Label>
          <div css={bodyStyles}>
            <input type="number" min="0" step="5" css={inputStyles} name={`otherUnits.unit${id}.renownPoints`} value={ptg.otherUnits[unit].renownPoints} onChange={onUpdate} />
          </div>
        </div>
        <div tw="flex border-b w-1/2">
          <Label tw="w-2/3" dark={dark}>Points</Label>
          <div css={bodyStyles}>
            <input type="number" min="0" step="5" css={inputStyles} name={`otherUnits.unit${id}.points`} value={ptg.otherUnits[unit].points} onChange={onUpdate} />
          </div>
        </div>
      </div>
    </>
  );
}

const bodyStyles = css`
  ${tw`w-1/3 flex items-center justify-center bg-white`}
`;

const checkboxBoxStyles = css`
  ${tw`p-1 w-1/3 flex items-center justify-center space-x-2 bg-white`}
`;

const inputStyles = css`
  ${tw`px-1 w-full h-full text-sm`}
`;
