import React, { useState } from 'react';
import tw, { css } from 'twin.macro'

import { Label } from "./Label"

// TODO: optionsをhash対応
export const SelectField = ({label, dark, options}) => {
  const optionJSX = options.map((option) => {
    return (
      <option value={option} key={option}>{option}</option>
    );
  });
  const Options = () => {
    return optionJSX;
  };
  return (
    <div tw="flex border-b">
      <Label tw="w-1/3" dark={dark}>{label}</Label>
      <div tw="w-2/3">
        <select css={selectStyles}>
          <Options />
        </select>
      </div>
    </div>
  );
};

const selectStyles = css`
  ${tw`block w-full h-full text-sm`}
`;
