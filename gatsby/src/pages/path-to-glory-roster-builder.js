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
  const version = '0.1';

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
      <div tw="mt-2 flex space-x-8 justify-center">
        <div tw="px-4 py-1 border border-yellow-400 bg-yellow-300 text-sm cursor-pointer" onClick={load}>LOAD</div>
        <div tw="px-4 py-1 border border-yellow-400 bg-yellow-300 text-sm cursor-pointer" onClick={save}>SAVE</div>
        {/* <div tw="px-2 border border-gray-400 bg-gray-300 text-sm" onClick={() => console.log(ptg)}>CONSOLE</div> */}
      </div>

      <Tab isPtgRoster={isPtgRoster} setIsPtgRoster={setIsPtgRoster} />

      <main>
        <PtgContext.Provider value={ptg}>
        <div css={isPtgRoster ? tw`block` : tw`hidden`}>
          <Section>
            <TextField label="プレイヤー名" name="playerName" value={ptg.playerName} onUpdate={handleInputChange} />
            <TextField label="アーミー名" name="armyName" value={ptg.armyName} onUpdate={handleInputChange} />
            <TextField label="陣営" name="faction" value={ptg.faction} onUpdate={handleInputChange} />
            <TextField label="派閥" name="subfaction" value={ptg.subfaction} onUpdate={handleInputChange} />
            <TextField label="出身領域" name="realmOfOrigin" value={ptg.realmOfOrigin} onUpdate={handleInputChange} />
            <SelectField label="初期兵力" name="startingSize" value={ptg.startingSize} options={[
              'ヴァンガード (600pt)', 'ウォーバンド (1000pt)', 'ブリゲイド (2000pt)', 'レギオン (2500pt)'
            ]} onUpdate={handleInputChange} />
          </Section>

          <Section label="クエストログ">
            <TextField label="現行クエスト" name="questLog.current" value={ptg.questLog.current} onUpdate={handleInputChange} />
            <TextField label="クエスト報酬" name="questLog.reward" value={ptg.questLog.reward} onUpdate={handleInputChange} />
            <TextareaField label="クエスト進展" name="questLog.progress" value={ptg.questLog.progress} onUpdate={handleInputChange} />
          </Section>
          
          <Section label="栄光ポイント">
            <NumberField label="栄光ポイント" min="0" name="gloryPoints" value={ptg.gloryPoints} onUpdate={handleInputChange} />
          </Section>
          
          <Section label="城">
            <TextField label="名前" name="stronghold.name" value={ptg.stronghold.name} onUpdate={handleInputChange} />
            <NumberField label="兵舎" min="0" name="stronghold.barracks" value={ptg.stronghold.barracks} onUpdate={handleInputChange} />
            <div tw="flex">
              <div tw="w-1/2"><CheckboxField label="城塞" name="stronghold.hasImposing" checked={ptg.stronghold.hasImposing} onUpdate={handleInputChange} /></div>
              <div tw="w-1/2"><CheckboxField label="大城塞" name="stronghold.hasMighty" checked={ptg.stronghold.hasMighty} onUpdate={handleInputChange} /></div>
            </div>
          </Section>
          
          <Section label="達成事項">
            {/* TODO: 見出し幅を長くする */}
            <NumberField label="バトル回数" min="0" name="archivements.battleFought" value={ptg.archivements.battleFought} onUpdate={handleInputChange} />
            <NumberField label="勝利数" min="0" name="archivements.victoriesWon" value={ptg.archivements.victoriesWon} onUpdate={handleInputChange} />
            <NumberField label="達成クエスト" min="0" name="archivements.questsCompleted" value={ptg.archivements.questsCompleted} onUpdate={handleInputChange} />
            <NumberField label="敵ヒーロー撃破数" min="0" name="archivements.enemyHeroesSlain" value={ptg.archivements.enemyHeroesSlain} onUpdate={handleInputChange} />
          </Section>
          
          <Section label="宝物殿">
            <FieldsetTitle dark>ボーナス神器</FieldsetTitle>
            { [...Array(6)].map((_, i) => <TextField label={i + 1} name={`theVault.artefact${i + 1}`} value={ptg.theVault[`artefact${i + 1}`]} onUpdate={handleInputChange} />)}
            <FieldsetTitle dark>ボーナス呪文</FieldsetTitle>
            { [...Array(6)].map((_, i) => <TextField label={i + 1} name={`theVault.spell${i + 1}`} value={ptg.theVault[`spell${i + 1}`]} onUpdate={handleInputChange} />)}
            <FieldsetTitle dark>ボーナス奇蹟</FieldsetTitle>
            { [...Array(6)].map((_, i) => <TextField label={i + 1} name={`theVault.prayer${i + 1}`} value={ptg.theVault[`prayer${i + 1}`]} onUpdate={handleInputChange} />)}
            <FieldsetTitle dark>ボーナス固有強化</FieldsetTitle>
            { [...Array(6)].map((_, i) => <TextField label={i + 1} name={`theVault.uniqueEnhancement${i + 1}`} value={ptg.theVault[`uniqueEnhancement${i + 1}`]} onUpdate={handleInputChange} />)}
            <FieldsetTitle dark>永久呪文 / 顕現</FieldsetTitle>
            { [...Array(3)].map((_, i) => <TextField label={i + 1} name={`theVault.endlessSpell${i + 1}`} value={ptg.theVault[`endlessSpell${i + 1}`]} onUpdate={handleInputChange} />)}
            <FieldsetTitle dark>偉業</FieldsetTitle>
            <TextField label="1" name="theVault.triumph" value={ptg.theVault.triumph} onUpdate={handleInputChange} />
            <FieldsetTitle dark>バタリオン</FieldsetTitle>
            { [...Array(6)].map((_, i) => <TextField label={i + 1} name={`theVault.battalion${i + 1}`} value={ptg.theVault[`battalion${i + 1}`]} onUpdate={handleInputChange} />)}
          </Section>

          <Section label="領地">
            <Territories label="城" category="stronghold" onUpdate={handleInputChange} />
            <Territories label="城塞" category="imposing" onUpdate={handleInputChange} />
            <Territories label="大城塞" category="mighty" onUpdate={handleInputChange} />
          </Section>
        </div>

        <div css={isPtgRoster ? tw`hidden` : tw`block`}>
          <Section label="ウォーロード">
            <TextField label="ファイター名" name="warlord.name" value={ptg.warlord.name} onUpdate={handleInputChange}  />
            <TextField label="ウォースクロール" name="warlord.warscroll" value={ptg.warlord.warscroll} onUpdate={handleInputChange}  />
            <TextField label="指揮特性" name="warlord.commandTrait" value={ptg.warlord.commandTrait} onUpdate={handleInputChange}  />
            <TextareaField label="コア強化 / 備考" name="warlord.coreEnhancements" value={ptg.warlord.coreEnhancements} onUpdate={handleInputChange}  />
            <TextField label="負傷" name="warlord.injury" value={ptg.warlord.injury} onUpdate={handleInputChange}  />
            <div tw="flex">
              <div tw="flex border-b w-1/2">
                <Label tw="w-2/3">名声値</Label>
                <div css={pointsBodyStyles}>
                  <input type="number" min="0" step="5" css={pointsInputStyles} name="warlord.renownPoints" value={ptg.warlord.renownPoints} onChange={handleInputChange} />
                </div>
              </div>
              <div tw="flex border-b w-1/2">
                <Label tw="w-2/3">ポイント</Label>
                <div css={pointsBodyStyles}>
                  <input type="number" min="0" step="5" css={pointsInputStyles} name="warlord.points" value={ptg.warlord.points} onChange={handleInputChange} />
                </div>
              </div>
            </div>
          </Section>

          <Section label="ヒーロー">
            <HeroUnit id="1" onUpdate={handleInputChange} />
            <HeroUnit id="2" onUpdate={handleInputChange} dark />
            <HeroUnit id="3" onUpdate={handleInputChange} />
          </Section>

          <Section label="その他のユニット">
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

          <Section label="戦闘序列上限">
            <NumberField label="ユニット合計" min="6" value="6" name="orderOfBattleLimits.totalUnits" value={ptg.orderOfBattleLimits.totalUnits} onUpdate={handleInputChange} />
            <NumberField label="ヒーロー" min="3" value="3" name="orderOfBattleLimits.heroes" value={ptg.orderOfBattleLimits.heroes} onUpdate={handleInputChange} />
            <NumberField label="モンスター" min="1" value="1" name="orderOfBattleLimits.monsters" value={ptg.orderOfBattleLimits.monsters} onUpdate={handleInputChange} />
            <NumberField label="ウォーマシン" min="1" value="1" name="orderOfBattleLimits.warMachines" value={ptg.orderOfBattleLimits.warMachines} onUpdate={handleInputChange} />
            <NumberField label="ウィザード" min="1" value="1" name="orderOfBattleLimits.wizards" value={ptg.orderOfBattleLimits.wizards} onUpdate={handleInputChange} />
            <NumberField label="プリースト" min="1" value="1" name="orderOfBattleLimits.priests" value={ptg.orderOfBattleLimits.priests} onUpdate={handleInputChange} />
            <NumberField label="増強ユニット" min="1" value="1" name="orderOfBattleLimits.reinforcedUnits" value={ptg.orderOfBattleLimits.reinforcedUnits} onUpdate={handleInputChange} />
            <NumberField label="同盟" min="1" value="1" name="orderOfBattleLimits.allies" value={ptg.orderOfBattleLimits.allies} onUpdate={handleInputChange} />
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
  ${tw`px-1 w-full h-full text-xs`}
`;