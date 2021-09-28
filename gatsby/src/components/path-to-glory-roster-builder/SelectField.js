import React, { useState } from 'react';
import tw, { css } from 'twin.macro'

import { Label } from "./Label"

// TODO: optionsをhash対応
export const SelectField = ({label, name, value, dark, options, onUpdate}) => {
  const optionJSX = options.map((option) => {
    const selected = option == value;
    console.log(selected);
    return (
      <option value={option} key={option} selected={selected}>{option}</option>
    );
  });
  const Options = () => {
    return optionJSX;
  };
  return (
    <div tw="flex border-b">
      <Label tw="w-1/3" dark={dark}>{label}</Label>
      <div tw="w-2/3">
        <select css={selectStyles} name={name} onChange={onUpdate}>
          <Options />
        </select>
      </div>
    </div>
  );
};

const selectStyles = css`
  ${tw`block w-full h-full text-sm`}
`;
