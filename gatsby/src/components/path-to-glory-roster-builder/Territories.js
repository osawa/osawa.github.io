import React, { useState } from 'react';
import tw, { css } from 'twin.macro'

import { FieldsetTitle } from "./FieldsetTitle"
import { Label } from "./Label"
import { Territory } from "./Territory"

export const Territories = ({children, label, category, onUpdate}) => {

  return (
    <>
      <FieldsetTitle dark>{label}</FieldsetTitle>
      <div tw="flex w-full">
        <Label tw="w-1/3 text-xs">領地名</Label>
        <Label tw="w-1/3 text-xs">領地種別</Label>
        <Label tw="w-1/3 text-xs">アップグレード</Label>
      </div>
      <Territory category={category} id="1" onUpdate={onUpdate} />
      <Territory category={category} id="2" onUpdate={onUpdate} />
      <Territory category={category} id="3" onUpdate={onUpdate} />
    </>
  );
}
