import React, { useState } from 'react';
import tw, { css } from 'twin.macro'

export const Strategy = ({ title, text, hasAdditionalPoint = false }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleText = () => setIsOpen(!isOpen);

  const [isSelected, setIsSelected] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const setSelected = (e) => {
    e.stopPropagation();
    setIsSelected(true);
    // init的なものを作っておくべきか
    setIsSuccess(false);
    setIsEnd(false);
    setAdditionalPoint(false);
  }
  const setSuccess = (e) => {
    finish(e);
    setIsSuccess(true);
  };
  const setFailure = (e) => {
    finish(e);
  };
  const finish = (e) => {
    e.stopPropagation();
    setIsEnd(true);
    setIsSelected(false);
    setIsOpen(false);
  }
  const cancel = (e) => {
    e.stopPropagation();
    setIsSelected(false);
  }
  const edit = (e) => {
    setSelected(e);
    setIsOpen(true);
  }

  const [additionalPoint, setAdditionalPoint] = useState(false);
  const setSuccessWithAdditionalPoint = (e) => {
    setSuccess(e);
    setAdditionalPoint(true);
  };

  return (
    <div css={tw`border-b border-black`}>
      <div css={[
        strategyStyles,
        isSelected && activeStrategyStyles,
        isEnd && disabledStrategyStyles,
        isSuccess && succeedStrategyStyles
      ]}  onClick={toggleText}>
        <div css={[titleStyles, isOpen || titleCloseStyles]}>
          {title}
          {additionalPoint && <span css={additionalPointStyles}>+1</span>}
        </div>
        <div css={[textStyles, isOpen || tw`hidden`]}>{text}</div>
        {isEnd ||
          <div css={tw`mt-2`}>
              {isSelected || <button css={buttonStyles} onClick={setSelected}>選択</button>}
              {isSelected &&
                <div css={tw`flex space-x-4`}>
                  <button css={buttonStyles} onClick={setSuccess}>達成</button>
                  {hasAdditionalPoint && <button css={buttonStyles} onClick={setSuccessWithAdditionalPoint}>+1VP</button>}
                  <button css={[buttonStyles, buttonFailureStyles]} onClick={setFailure}>失敗</button>
                  <button css={[buttonStyles, buttonCancelStyles]} onClick={cancel}>キャンセル</button>
                </div>
              }
          </div>
        }
        {(isEnd && isOpen) && <button css={[buttonStyles, buttonCancelStyles, tw`mt-2`]} onClick={edit}>修正</button>}
      </div>
    </div>
  )
}

const strategyStyles = css`
  ${tw`px-4 py-2`}
`;

const activeStrategyStyles = css`
  ${tw`bg-red-200`}
`;

const disabledStrategyStyles = css`
  ${tw`bg-gray-50 text-gray-400`}
`;

const succeedStrategyStyles = css`
  ${tw`bg-green-50`}
`;

const titleStyles = css`
  ${tw`relative font-bold`}
  &::after {
    ${tw`absolute top-2 right-0 block w-2 h-2 border-r border-t border-black transform -rotate-45`}
    content: ''
  }
`;

const titleCloseStyles = css`
  &::after {
    ${tw`top-1 border-b border-t-0 rotate-45`}
  }
`;

const additionalPointStyles = css`
  ${tw`relative inline-block ml-2 px-2 font-normal text-xs border border-gray-400 rounded`}
  top: -2px;
`;

const textStyles = css`
  ${tw`text-xs`}
  font-size: 10px;
`;

const buttonStyles = css`
  ${tw`block px-4 py-1 bg-green-500 rounded text-white text-sm`}
`;

const buttonCancelStyles = css`
  ${tw`bg-gray-400`}
`;

const buttonFailureStyles = css`
  ${tw`bg-red-500`}
`;