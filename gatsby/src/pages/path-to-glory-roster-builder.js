import React, { useState } from 'react';
import tw, { css } from 'twin.macro'

import { CheckboxField } from '../components/path-to-glory-roster-builder/CheckboxField';
import { FieldsetTitle } from '../components/path-to-glory-roster-builder/FieldsetTitle';
import { HeroUnit } from '../components/path-to-glory-roster-builder/HeroUnit';
import { NumberField } from "../components/path-to-glory-roster-builder/NumberField"
import { OtherUnit } from '../components/path-to-glory-roster-builder/OtherUnit';
import { Section } from "../components/path-to-glory-roster-builder/Section"
import { SelectField } from "../components/path-to-glory-roster-builder/SelectField"
import { Tab } from "../components/path-to-glory-roster-builder/Tab"
import { Territories } from "../components/path-to-glory-roster-builder/Territories"
import { TextField } from "../components/path-to-glory-roster-builder/TextField"
import { TextareaField } from "../components/path-to-glory-roster-builder/TextareaField"

const PathToGloryRosterBuilder = () => {
  const version = '0.0.3';

  const [isPtgRoster, setIsPtgRoster] = useState(true);

  return (
    <div css={tw`flex flex-col`}>
      <div css={tw`flex items-center justify-between px-4 py-2 border-b border-black`}>
        <h1 css={tw`m-0 text-sm`}>WH:AoS 「栄光への道」ロスタービルダー</h1>
        <small>Ver {version}</small>
      </div>

      <Tab isPtgRoster={isPtgRoster} setIsPtgRoster={setIsPtgRoster} />

      <main>

        <div css={isPtgRoster ? tw`block` : tw`hidden`}>
          <Section>
            <TextField label="Player Name" />
            <TextField label="Army Name" />
            <TextField label="Faction" />
            <TextField label="Subfaction" />
            <TextField label="Realm of Origin" />
            <SelectField label="Starting Size" options={[
              600, 1000, 2000, 2500
            ]} />
          </Section>

          <Section label="QUEST LOG" gray>
            <TextField label="Current Quest" />
            <TextField label="Quest Reward" />
            <TextareaField label="Quest Progress" />
          </Section>
          
          <Section label="GLORY POINTS">
            <NumberField label="Glory Points" min="0" value="0" />
          </Section>
          
          <Section label="STRONGHOLD" gray>
            <TextField label="Name" />
            <TextField label="Barracks" />
            <div tw="flex">
              <div tw="w-1/2"><CheckboxField label="Inposing" /></div>
              <div tw="w-1/2"><CheckboxField label="Mighty" /></div>
            </div>
          </Section>
          
          <Section label="ARCHIVEMENTS">
            {/* TODO: 見出し幅を長くする */}
            <NumberField label="Battles Fought" min="0" value="0" />
            <NumberField label="Victories Won" min="0" value="0" />
            <NumberField label="Quests Completed" min="0" value="0" />
            <NumberField label="Enemy Heroes Slain" min="0" value="0" />
          </Section>
          
          <Section label="THE VAULT" gray>
            <FieldsetTitle dark>Bonus Artefacts of Power</FieldsetTitle>
            <TextField label="1" />
            <TextField label="2" />
            <TextField label="3" />
            <TextField label="4" />
            <TextField label="5" />
            <TextField label="6" />
            <FieldsetTitle dark>Bonus Spells</FieldsetTitle>
            <TextField label="1" />
            <TextField label="2" />
            <TextField label="3" />
            <TextField label="4" />
            <TextField label="5" />
            <TextField label="6" />
            <FieldsetTitle dark>Bonus Prayers</FieldsetTitle>
            <TextField label="1" />
            <TextField label="2" />
            <TextField label="3" />
            <TextField label="4" />
            <TextField label="5" />
            <TextField label="6" />
            <FieldsetTitle dark>Bonus Unique Enhancements</FieldsetTitle>
            <TextField label="1" />
            <TextField label="2" />
            <TextField label="3" />
            <TextField label="4" />
            <TextField label="5" />
            <TextField label="6" />
            <FieldsetTitle dark>Endless Spells / Invocations</FieldsetTitle>
            <TextField label="1" />
            <TextField label="2" />
            <TextField label="3" />
            <FieldsetTitle dark>Triumph</FieldsetTitle>
            <TextField label="1" />
            <FieldsetTitle dark>Battalions</FieldsetTitle>
            <TextField label="1" />
            <TextField label="2" />
            <TextField label="3" />
            <TextField label="4" />
            <TextField label="5" />
            <TextField label="6" />
          </Section>

          <Section label="TERRITORIES">
            <Territories label="Stronghold Territories" />
            <Territories label="Imposing Stronghold Territories" />
            <Territories label="Mighty Stronghold Territories" />
          </Section>
        </div>

        <div css={isPtgRoster ? tw`hidden` : tw`block`}>
          <Section label="WARLORD">
            <TextField label="Name" />
            <TextField label="Warscroll" />
            <TextField label="Command Trait" />
            <TextareaField label="Core Enhancements / Notes" />
            <TextField label="Injury" />
            <TextField label="Renown Points" />
            <NumberField label="Points" min="0" step="5" />
          </Section>

          <Section label="HEROES" gray>
            <HeroUnit />
            <HeroUnit dark />
            <HeroUnit />
          </Section>

          <Section label="OTHER UNITS">
            <OtherUnit />
            <OtherUnit dark />
            <OtherUnit />
            <OtherUnit dark />
            <OtherUnit />
            <OtherUnit dark />
            <OtherUnit />
            <OtherUnit dark />
            <OtherUnit />
            <OtherUnit dark />
            <OtherUnit />
            <OtherUnit dark />
          </Section>

          <Section label="ORDER OF BATTLE LIMITS" gray>
            <NumberField label="Total Units" min="6" value="6" />
            <NumberField label="Heroes" min="3" value="3" />
            <NumberField label="Monsters" min="1" value="1" />
            <NumberField label="War Machines" min="1" value="1" />
            <NumberField label="Wizards" min="1" value="1" />
            <NumberField label="Priests" min="1" value="1" />
            <NumberField label="Reinforced Units" min="1" value="1" />
            <NumberField label="Allies" min="1" value="1" />
          </Section>
        </div>
      </main>
    </div>
  )
}

export default PathToGloryRosterBuilder
