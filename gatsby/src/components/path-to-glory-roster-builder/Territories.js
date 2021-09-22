import React, { useState } from 'react';
import tw, { css } from 'twin.macro'

import { FieldsetTitle } from "./FieldsetTitle"
import { Label } from "./Label"
import { Territory } from "./Territory"

export const Territories = ({label}) => {
  return (
    <>
      <FieldsetTitle dark>{label}</FieldsetTitle>
      <div tw="flex w-full">
        <Label tw="w-1/3">Name</Label>
        <Label tw="w-1/3">Territory Type</Label>
        <Label tw="w-1/3">Upgraded</Label>
      </div>
      <Territory />
      <Territory />
      <Territory />
    </>
  );
}
