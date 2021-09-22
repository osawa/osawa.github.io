import React, { useState } from 'react';
import tw, { css } from 'twin.macro'

export const Territory = () => {
  return (
    <div tw="flex w-full border-b">
      <div css={inputBoxStyles}><input type="text" css={inputStyles} /></div>
      <div css={inputBoxStyles}><input type="text" css={inputStyles} /></div>
      <div css={checkboxBoxStyles}>
        <input type="checkbox" tw="block" />
      </div>
    </div>
  );
};

const inputBoxStyles = css`
${tw`border-r w-1/3 text-sm`}
`;

const inputStyles = css`
${tw`p-1 w-full h-full text-sm`}
`;

const checkboxBoxStyles = css`
${tw`p-1 w-1/3 flex items-center justify-center bg-white`}
`;
