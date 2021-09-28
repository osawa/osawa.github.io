import React, { useState } from 'react';
import tw, { css } from 'twin.macro'

export const Label = ({children, dark, ...props}) => {
  return (
    <div css={[labelStyles, dark ? tw`bg-green-500` : tw`bg-green-300`]} {...props}>{children}{dark}</div>
  )
}

const labelStyles = css`
  ${tw`p-1 border-r text-sm leading-4 text-xs`}
`;
