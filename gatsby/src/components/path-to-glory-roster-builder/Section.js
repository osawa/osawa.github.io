import React, { useState } from 'react';
import tw, { css } from 'twin.macro'

export const Section = ({children, label, gray, ...props}) => {
  return (
    <section css={[sectionStyles, gray && tw`bg-gray-100`]} {...props}>
      {label && <div css={labelStyles}>{label}</div>}
      <div css={bodyStyles}>{children}</div>
    </section>
  )
}

const sectionStyles = css`
  ${tw`px-2 pt-4 pb-5 border-b border-gray-200`}
`;

const labelStyles = css`
  ${tw`font-medium text-sm text-center`}
`;

const bodyStyles = css`
  ${tw`mt-2 border border-b-0`}
`;
