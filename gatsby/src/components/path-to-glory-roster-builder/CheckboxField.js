import React, { useState } from 'react';
import tw, { css } from 'twin.macro'

import { Label } from "./Label"

export const CheckboxField = ({label, dark, name, checked, onUpdate}) => {
  return (
    <div tw="flex border-b">
      <Label tw="w-2/3" dark={dark}>{label}</Label>
      <div css={bodyStyles}>
        <input type="checkbox" tw="block" name={name} checked={checked} onChange={onUpdate} />
      </div>
    </div>
  );
};

const bodyStyles = css`
  ${tw`p-1 w-1/3 flex items-center justify-center bg-white`}
`;
