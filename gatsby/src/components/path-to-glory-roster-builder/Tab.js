import React, { useState } from 'react';
import tw, { css } from 'twin.macro'

export const Tab = ({isPtgRoster, setIsPtgRoster}) => {
  return (
    <div tw="flex justify-between space-x-2 mt-2 px-4 border-b w-full">
      <div css={[tabStyles, isPtgRoster && activeTabStyles]} onClick={() => setIsPtgRoster(true)}>『栄光への道』ロスター</div>
      <div css={[tabStyles, isPtgRoster || activeTabStyles]} onClick={() => setIsPtgRoster(false)}>戦闘序列</div>
    </div>
  )
}

const tabStyles = css`
  ${tw`relative flex-1 py-1 border rounded rounded-b-none text-sm text-center bg-white cursor-pointer text-gray-500`}
  bottom: -1px;
`;

const activeTabStyles = css`
  ${tw`bg-gray-100 text-black`}
  border-bottom-color: rgba(243, 244, 246, var(--tw-border-opacity));
`;