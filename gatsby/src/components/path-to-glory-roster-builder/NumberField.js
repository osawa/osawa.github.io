import React, { useState } from 'react';
import tw, { css } from 'twin.macro'

import { Label } from "./Label"

export const NumberField = ({label, dark, name, value, onUpdate, ...props}) => {
  return (
    <div tw="flex border-b">
      <Label tw="w-1/3" dark={dark}>{label}</Label>
      <div tw="w-2/3">
        <input type="number" css={inputStyles} name={name} value={value} onChange={onUpdate} {...props} />
      </div>
    </div>
  );
};

const inputStyles = css`
  ${tw`block px-1 w-full h-full text-xs`}
`;
