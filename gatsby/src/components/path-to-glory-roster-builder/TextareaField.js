import React, { useState } from 'react';
import tw, { css } from 'twin.macro'

import { Label } from "./Label"

export const TextareaField = ({label, dark}) => {
  return (
    <div tw="flex border-b">
      <Label tw="w-1/3" dark={dark}>{label}</Label>
      <div tw="w-2/3">
        <textarea css={inputStyles}></textarea>
      </div>
    </div>
  );
};

const inputStyles = css`
  ${tw`block p-1 w-full h-16 text-sm leading-4`}
`;
