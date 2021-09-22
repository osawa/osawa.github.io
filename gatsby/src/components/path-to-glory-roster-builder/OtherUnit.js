import React, { useState } from 'react';
import tw, { css } from 'twin.macro'

import { Label } from "./Label"
import { TextField } from "./TextField"
import { TextareaField } from "./TextareaField"

export const OtherUnit = ({dark}) => {
  return (
    <>
      <TextField label="Name" dark={dark} />
      <TextField label="Warscroll" dark={dark} />
      <TextareaField label="Veteran Abilities / Notes" dark={dark} />
      <div tw="flex">
        <div tw="flex border-b w-1/2">
          <Label tw="w-2/3" dark={dark}>Reinforced</Label>
          <div css={checkboxBoxStyles}>
            <input type="checkbox" tw="block" />
            <input type="checkbox" tw="block" />
          </div>
        </div>
        <div tw="flex border-b w-1/2">
          <Label tw="w-2/3" dark={dark}>Casualty Score</Label>
          <div css={bodyStyles}>
            <input type="number" min="0" step="5" css={inputStyles} />
          </div>
        </div>
      </div>
      <div tw="flex">
        <div tw="flex border-b w-1/2">
          <Label tw="w-2/3" dark={dark}>Renown Points</Label>
          <div css={bodyStyles}>
            <input type="number" min="0" step="5" css={inputStyles} />
          </div>
        </div>
        <div tw="flex border-b w-1/2">
          <Label tw="w-2/3" dark={dark}>Points</Label>
          <div css={bodyStyles}>
            <input type="number" min="0" step="5" css={inputStyles} />
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
