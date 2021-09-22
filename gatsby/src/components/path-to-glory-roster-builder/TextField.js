import React, { useState } from 'react';
import tw, { css } from 'twin.macro'

import { Label } from "./Label"

export const TextField = ({label, dark}) => {
  return (
    <div tw="flex border-b">
      <Label tw="w-1/3" dark={dark}>{label}</Label>
      <div tw="w-2/3"><input type="text" css={inputStyles} /></div>
    </div>
  );
};

const inputStyles = css`
  ${tw`block px-1 w-full h-full text-sm`}
`;
