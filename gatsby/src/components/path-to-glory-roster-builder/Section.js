import React, { useState } from 'react';
import tw, { css } from 'twin.macro'

export const Section = ({children, label, ...props}) => {
  return (
    <section css={sectionStyles} {...props}>
      {label && <div css={labelStyles}>{label}</div>}
      <div css={bodyStyles}>{children}</div>
    </section>
  )
}

const sectionStyles = css`
  ${tw`px-2 pt-2 pb-4 bg-gray-100`}
`;

const labelStyles = css`
  ${tw`font-medium text-sm text-center`}
`;

const bodyStyles = css`
  ${tw`mt-2 border border-b-0`}
`;
