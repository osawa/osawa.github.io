import React, { useContext } from 'react';
import tw, { css } from 'twin.macro'

import { PtgContext } from '../../pages/path-to-glory-roster-builder';

import { Label } from "./Label"
import { TextField } from "./TextField"
import { TextareaField } from "./TextareaField"

export const HeroUnit = ({id, dark, onUpdate}) => {
  const ptg = useContext(PtgContext);
  const hero = `hero${id}`;
  return (
    <>
      <TextField label="ファイター名" name={`heroes.hero${id}.name`} value={ptg.heroes[hero].name} onUpdate={onUpdate} dark={dark} />
      <TextField label="ウォースクロール" name={`heroes.hero${id}.warscroll`} value={ptg.heroes[hero].warscroll} onUpdate={onUpdate} dark={dark} />
      <TextField label="指揮特性" name={`heroes.hero${id}.commandTrait`} value={ptg.heroes[hero].commandTrait} onUpdate={onUpdate} dark={dark} />
      <TextareaField label="コア強化 / 備考" name={`heroes.hero${id}.coreEnhancements`} value={ptg.heroes[hero].coreEnhancements} onUpdate={onUpdate} dark={dark} />
      <TextField label="負傷" name={`heroes.hero${id}.injury` }value={ptg.heroes[hero].injury} onUpdate={onUpdate} dark={dark} />
      <div tw="flex">
        <div tw="flex border-b w-1/2">
          <Label tw="w-2/3" dark={dark}>名声値</Label>
          <div css={bodyStyles}>
            <input type="number" min="0" step="5" css={inputStyles} name={`heroes.hero${id}.renownPoints`} value={ptg.heroes[hero].renownPoints} onChange={onUpdate} />
          </div>
        </div>
        <div tw="flex border-b w-1/2">
          <Label tw="w-2/3" dark={dark}>ポイント</Label>
          <div css={bodyStyles}>
            <input type="number" min="0" step="5" css={inputStyles} name={`heroes.hero${id}.points`} value={ptg.heroes[hero].points} onChange={onUpdate} />
          </div>
        </div>
      </div>
    </>
  );
}

const bodyStyles = css`
  ${tw`w-1/3 flex items-center justify-center bg-white`}
`;

const inputStyles = css`
  ${tw`px-1 w-full h-full text-xs`}
`;
