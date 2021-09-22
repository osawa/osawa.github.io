import React, { useState } from 'react';
import tw, { css } from 'twin.macro'

export const Tab = ({isPtgRoster, setIsPtgRoster}) => {
  return (
    <div tw="flex justify-between space-x-2 mt-2 px-4 border-b w-full">
      <div css={[tabStyles, isPtgRoster && activeTabStyles]} onClick={() => setIsPtgRoster(true)}>Path to Glory Roster</div>
      <div css={[tabStyles, isPtgRoster || activeTabStyles]} onClick={() => setIsPtgRoster(false)}>Order of Battle</div>
    </div>
  )
}

const tabStyles = css`
  ${tw`relative flex-1 py-1 border rounded rounded-b-none text-sm text-center bg-gray-100 cursor-pointer`}
  bottom: -1px;
`;

const activeTabStyles = css`
  ${tw`bg-white`}
  border-bottom-color: white;
`;