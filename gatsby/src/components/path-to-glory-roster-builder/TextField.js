import React, { useState } from 'react';
import tw, { css } from 'twin.macro'

import { Label } from "./Label"

export const TextField = ({label, dark, name, value, onUpdate}) => {
  // const [val, setVal] = useState(value);
  return (
    <div tw="flex border-b">
      <Label tw="w-1/3" dark={dark}>{label}</Label>
      <div tw="w-2/3">
        <input type="text" css={inputStyles} name={name} value={value} onChange={onUpdate} />
      </div>
    </div>
  );
};

const inputStyles = css`
  ${tw`block px-1 w-full h-full text-xs`}
`;
