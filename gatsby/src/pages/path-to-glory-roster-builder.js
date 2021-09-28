import React, { createContext, useState, useEffect } from 'react';
import tw, { css } from 'twin.macro'
import deepmerge from 'deepmerge'

import { CheckboxField } from '../components/path-to-glory-roster-builder/CheckboxField';
import { FieldsetTitle } from '../components/path-to-glory-roster-builder/FieldsetTitle';
import { HeroUnit } from '../components/path-to-glory-roster-builder/HeroUnit';
import { Label } from "../components/path-to-glory-roster-builder/Label"
import { NumberField } from "../components/path-to-glory-roster-builder/NumberField"
import { OtherUnit } from '../components/path-to-glory-roster-builder/OtherUnit';
import { Section } from "../components/path-to-glory-roster-builder/Section"
import { SelectField } from "../components/path-to-glory-roster-builder/SelectField"
import { Tab } from "../components/path-to-glory-roster-builder/Tab"
import { Territories } from "../components/path-to-glory-roster-builder/Territories"
import { TextField } from "../components/path-to-glory-roster-builder/TextField"
import { TextareaField } from "../components/path-to-glory-roster-builder/TextareaField"

import { ptgStateData } from "./ptgStateData";

export const PtgContext = createContext();

const PathToGloryRosterBuilder = () => {
  const version = '0.0.3';

  const [ptg, setPtg] = useState(ptgStateData);
  const [ptgJson, setPtgJson] = useState();

  // NOTE: Gatsbyのビルド時にエラーが出るのでuseEffect内に避難
  useEffect(() => {
    // ストレージに何もないとき、localStorageに初期データを格納
    if (!localStorage.getItem('PtG')) {
      localStorage.setItem('PtG', JSON.stringify(ptgStateData));
    }
  });

  const load = () => {
    setPtg(JSON.parse(localStorage.getItem('PtG')));
  }
  const save = () => {
    localStorage.setItem('PtG', JSON.stringify(ptg));
  }

  const setDataToStorage = (inputData) => {
    console.log('setDataToStorage');
    const data = deepmerge(ptg, inputData);
    console.log(inputData);
    setPtg(data); // ここでドカンとレンダリングされてしまう
    console.log(ptg);
  }

  const handleInputChange = e => {
    console.log('handleChange');
    const target = e.target;
    const nameArray = target.name.split('.');
    const value = target.type === 'checkbox' ? target.checked : target.value;
    let inputData = {};

    // 末尾から（深い階層から）再帰的にオブジェクトを作っていく
    const generateDataObject = (nameArray, value, child) => {
      const key = nameArray.pop();
      inputData = {[key]: child || value};
      if (nameArray.length) generateDataObject(nameArray, value, inputData);
    };

    generateDataObject(nameArray, value);
    setDataToStorage(inputData);
  }

  const [isPtgRoster, setIsPtgRoster] = useState(true);
  console.log('RENDERED!');

  return (
    <div css={tw`flex flex-col`}>
      <div css={tw`flex items-center justify-between px-4 py-2 border-b border-black`}>
        <h1 css={tw`m-0 text-sm`}>WH:AoS 「栄光への道」ロスタービルダー</h1>
        <small>Ver {version}</small>
      </div>
      <div tw="mt-2 flex space-x-4 justify-center">
        <div tw="px-2 border border-yellow-400 bg-yellow-300 text-sm cursor-pointer" onClick={load}>LOAD</div>
        <div tw="px-2 border border-yellow-400 bg-yellow-300 text-sm cursor-pointer" onClick={save}>SAVE</div>
        {/* <div tw="px-2 border border-gray-400 bg-gray-300 text-sm" onClick={() => console.log(ptg)}>CONSOLE</div> */}
      </div>

      <Tab isPtgRoster={isPtgRoster} setIsPtgRoster={setIsPtgRoster} />

      <main>
        <PtgContext.Provider value={ptg}>
        <div css={isPtgRoster ? tw`block` : tw`hidden`}>
          <Section>
            <TextField label="Player Name" name="playerName" value={ptg.playerName} onUpdate={handleInputChange} />
            <TextField label="Army Name" name="armyName" value={ptg.armyName} onUpdate={handleInputChange} />
            <TextField label="Faction" name="faction" value={ptg.faction} onUpdate={handleInputChange} />
            <TextField label="Subfaction" name="subfaction" value={ptg.subfaction} onUpdate={handleInputChange} />
            <TextField label="Realm of Origin" name="realmOfOrigin" value={ptg.realmOfOrigin} onUpdate={handleInputChange} />
            <SelectField label="Starting Size" name="startingSize" value={ptg.startingSize} options={[
              600, 1000, 2000, 2500
            ]} onUpdate={handleInputChange} />
          </Section>

          <Section label="QUEST LOG">
            <TextField label="Current Quest" name="questLog.current" value={ptg.questLog.current} onUpdate={handleInputChange} />
            <TextField label="Quest Reward" name="questLog.reward" value={ptg.questLog.reward} onUpdate={handleInputChange} />
            <TextareaField label="Quest Progress" name="questLog.progress" value={ptg.questLog.progress} onUpdate={handleInputChange} />
          </Section>
          
          <Section label="GLORY POINTS">
            <NumberField label="Glory Points" min="0" name="gloryPoints" value={ptg.gloryPoints} onUpdate={handleInputChange} />
          </Section>
          
          <Section label="STRONGHOLD">
            <TextField label="Name" name="stronghold.name" value={ptg.stronghold.name} onUpdate={handleInputChange} />
            <NumberField label="Barracks" min="0" name="stronghold.barracks" value={ptg.stronghold.barracks} onUpdate={handleInputChange} />
            <div tw="flex">
              <div tw="w-1/2"><CheckboxField label="Imposing" name="stronghold.hasImposing" checked={ptg.stronghold.hasImposing} onUpdate={handleInputChange} /></div>
              <div tw="w-1/2"><CheckboxField label="Mighty" name="stronghold.hasMighty" checked={ptg.stronghold.hasMighty} onUpdate={handleInputChange} /></div>
            </div>
          </Section>
          
          <Section label="ARCHIVEMENTS">
            {/* TODO: 見出し幅を長くする */}
            <NumberField label="Battles Fought" min="0" name="archivements.battleFought" value={ptg.archivements.battleFought} onUpdate={handleInputChange} />
            <NumberField label="Victories Won" min="0" name="archivements.victoriesWon" value={ptg.archivements.victoriesWon} onUpdate={handleInputChange} />
            <NumberField label="Quests Completed" min="0" name="archivements.questsCompleted" value={ptg.archivements.questsCompleted} onUpdate={handleInputChange} />
            <NumberField label="Enemy Heroes Slain" min="0" name="archivements.enemyHeroesSlain" value={ptg.archivements.enemyHeroesSlain} onUpdate={handleInputChange} />
          </Section>
          
          <Section label="THE VAULT">
            <FieldsetTitle dark>Bonus Artefacts of Power</FieldsetTitle>
            { [...Array(6)].map((_, i) => <TextField label={i + 1} name={`theVault.artefact${i + 1}`} value={ptg.theVault[`artefact${i + 1}`]} onUpdate={handleInputChange} />)}
            <FieldsetTitle dark>Bonus Spells</FieldsetTitle>
            { [...Array(6)].map((_, i) => <TextField label={i + 1} name={`theVault.spell${i + 1}`} value={ptg.theVault[`spell${i + 1}`]} onUpdate={handleInputChange} />)}
            <FieldsetTitle dark>Bonus Prayers</FieldsetTitle>
            { [...Array(6)].map((_, i) => <TextField label={i + 1} name={`theVault.prayer${i + 1}`} value={ptg.theVault[`prayer${i + 1}`]} onUpdate={handleInputChange} />)}
            <FieldsetTitle dark>Bonus Unique Enhancements</FieldsetTitle>
            { [...Array(6)].map((_, i) => <TextField label={i + 1} name={`theVault.uniqueEnhancement${i + 1}`} value={ptg.theVault[`uniqueEnhancement${i + 1}`]} onUpdate={handleInputChange} />)}
            <FieldsetTitle dark>Endless Spells / Invocations</FieldsetTitle>
            { [...Array(3)].map((_, i) => <TextField label={i + 1} name={`theVault.endlessSpell${i + 1}`} value={ptg.theVault[`endlessSpell${i + 1}`]} onUpdate={handleInputChange} />)}
            <FieldsetTitle dark>Triumph</FieldsetTitle>
            <TextField label="1" name="theVault.triumph" value={ptg.theVault.triumph} onUpdate={handleInputChange} />
            <FieldsetTitle dark>Battalions</FieldsetTitle>
            { [...Array(6)].map((_, i) => <TextField label={i + 1} name={`theVault.battalion${i + 1}`} value={ptg.theVault[`battalion${i + 1}`]} onUpdate={handleInputChange} />)}
          </Section>

          <Section label="TERRITORIES">
            <Territories label="Stronghold Territories" category="stronghold" onUpdate={handleInputChange} />
            <Territories label="Imposing Stronghold Territories" category="imposing" onUpdate={handleInputChange} />
            <Territories label="Mighty Stronghold Territories" category="mighty" onUpdate={handleInputChange} />
          </Section>
        </div>

        <div css={isPtgRoster ? tw`hidden` : tw`block`}>
          <Section label="WARLORD">
            <TextField label="Name" name="warlord.name" value={ptg.warlord.name} onUpdate={handleInputChange}  />
            <TextField label="Warscroll" name="warlord.warscroll" value={ptg.warlord.warscroll} onUpdate={handleInputChange}  />
            <TextField label="Command Trait" name="warlord.commandTrait" value={ptg.warlord.commandTrait} onUpdate={handleInputChange}  />
            <TextareaField label="Core Enhancements / Notes" name="warlord.coreEnhancements" value={ptg.warlord.coreEnhancements} onUpdate={handleInputChange}  />
            <TextField label="Injury" name="warlord.injury" value={ptg.warlord.injury} onUpdate={handleInputChange}  />
            <div tw="flex">
              <div tw="flex border-b w-1/2">
                <Label tw="w-2/3">Renown Points</Label>
                <div css={pointsBodyStyles}>
                  <input type="number" min="0" step="5" css={pointsInputStyles} name="warlord.renownPoints" value={ptg.warlord.renownPoints} onChange={handleInputChange} />
                </div>
              </div>
              <div tw="flex border-b w-1/2">
                <Label tw="w-2/3">Points</Label>
                <div css={pointsBodyStyles}>
                  <input type="number" min="0" step="5" css={pointsInputStyles} name="warlord.points" value={ptg.warlord.points} onChange={handleInputChange} />
                </div>
              </div>
            </div>
          </Section>

          <Section label="HEROES">
            <HeroUnit id="1" onUpdate={handleInputChange} />
            <HeroUnit id="2" onUpdate={handleInputChange} dark />
            <HeroUnit id="3" onUpdate={handleInputChange} />
          </Section>

          <Section label="OTHER UNITS">
            <OtherUnit id="1" onUpdate={handleInputChange} />
            <OtherUnit id="2" onUpdate={handleInputChange} dark />
            <OtherUnit id="3" onUpdate={handleInputChange} />
            <OtherUnit id="4" onUpdate={handleInputChange} dark />
            <OtherUnit id="5" onUpdate={handleInputChange} />
            <OtherUnit id="6" onUpdate={handleInputChange} dark />
            <OtherUnit id="7" onUpdate={handleInputChange} />
            <OtherUnit id="8" onUpdate={handleInputChange} dark />
            <OtherUnit id="9" onUpdate={handleInputChange} />
            <OtherUnit id="10" onUpdate={handleInputChange} dark />
            <OtherUnit id="11" onUpdate={handleInputChange} />
            <OtherUnit id="12" onUpdate={handleInputChange} dark />
          </Section>

          <Section label="ORDER OF BATTLE LIMITS">
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
        </PtgContext.Provider>
      </main>
    </div>
  )
}

export default PathToGloryRosterBuilder

const pointsBodyStyles = css`
  ${tw`w-1/3 flex items-center justify-center bg-white`}
`;

const pointsInputStyles = css`
  ${tw`px-1 w-full h-full text-sm`}
`;