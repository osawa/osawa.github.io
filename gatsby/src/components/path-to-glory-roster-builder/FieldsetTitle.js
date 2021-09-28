import React, { useState } from 'react';
import tw, { css } from 'twin.macro'

export const FieldsetTitle = ({children, dark, ...props}) => {
  return (
    <div css={[fieldsetTitleStyles, dark ? tw`bg-green-500` : tw`bg-green-300`]} {...props}>{children}{dark}</div>
  )
}

const fieldsetTitleStyles = css`
  ${tw`p-1 border-b text-sm leading-4 text-xs`}
`;
