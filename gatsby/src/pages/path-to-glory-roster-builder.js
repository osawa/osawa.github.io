import React, { useState } from 'react';
import tw, { css } from 'twin.macro'

import { Strategy } from "../components/strategy-selector/Strategy"

const Section = ({children, label, gray, ...props}) => {
  return (
    <section tw="px-2 py-4" css={gray && tw`bg-gray-100`} {...props}>
      {label && <div tw="font-medium text-sm text-center">{label}</div>}
      <div tw="mt-2 border border-b-0">{children}</div>
    </section>
  );
}

const TextField = ({label, dark}) => {
  return (
    <div tw="flex border-b">
      <div tw="p-1 border-r w-1/3 text-sm" css={dark ? tw`bg-green-500` : tw`bg-green-300`}>{label}</div>
      <div tw="w-2/3"><input type="text" tw="px-1 w-full h-full text-sm" /></div>
    </div>
  );
};

const TextareaField = ({label}) => {
  return (
    <div tw="flex border-b">
      <div tw="p-1 border-r bg-green-300 w-1/3 text-sm">{label}</div>
      <div tw="w-2/3">
        <textarea tw="block p-1 w-full h-16 text-sm leading-4"></textarea>
      </div>
    </div>
  );
};

const NumberField = ({label, dark, ...props}) => {
  return (
    <div tw="flex border-b">
      <div tw="p-1 border-r w-1/3 text-sm" css={dark ? tw`bg-green-500` : tw`bg-green-300`}>{label}</div>
      <div tw="w-2/3">
        <input type="number" tw="px-1 w-full h-full text-sm" {...props} />
      </div>
    </div>
  );
};

const CheckboxField = ({label}) => {
  return (
    <div tw="flex border-b">
      <div tw="p-1 border-r bg-green-300 w-2/3 text-sm">{label}</div>
      <div tw="p-1 w-1/3 flex items-center justify-center bg-white">
        <input type="checkbox" tw="block" />
      </div>
    </div>
  );
};

const SelectField = ({label, options}) => {
  const optionJSX = options.map((option) => {
    return (
      <option value={option}>{option}</option>
    );
  });
  const Options = () => {
    return optionJSX;
  };
  return (
    <div tw="flex border-b">
      <div tw="p-1 border-r bg-green-300 w-1/3 text-sm">{label}</div>
      <div tw="w-2/3">
        <select name="" id="" tw="w-full h-full text-sm">
          <Options />
        </select>
      </div>
    </div>
  );
};

const Territory = () => {
  return (
    <div tw="flex w-full border-b">
      <div tw="border-r w-1/3 text-sm"><input type="text" tw="p-1 w-full h-full text-sm" /></div>
      <div tw="border-r w-1/3 text-sm"><input type="text" tw="p-1 w-full h-full text-sm" /></div>
      <div tw="p-1 w-1/3 flex items-center justify-center bg-white">
        <input type="checkbox" tw="block" />
      </div>
    </div>
  );
};

const Territories = ({label}) => {
  return (
    <>
      <div tw="p-1 border-b bg-green-500 text-sm">{label}</div>
      <div tw="flex w-full">
        <div tw="p-1 border-r bg-green-300 w-1/3 text-sm">Name</div>
        <div tw="p-1 border-r bg-green-300 w-1/3 text-sm">Territory Type</div>
        <div tw="p-1 bg-green-300 w-1/3 text-sm">Upgraded</div>
      </div>
      <Territory />
      <Territory />
      <Territory />
    </>
  );
}

const Hero = ({dark}) => {
  return (
    <>
      <TextField label="Name" dark={dark} />
      <TextField label="Warscroll" dark={dark} />
      <TextField label="Command Trait" dark={dark} />
      <TextField label="Core Enhancements / Notes" dark={dark} />
      <TextField label="Injury" dark={dark} />
      <div tw="flex">
        <div tw="flex border-b w-1/2">
          <div tw="p-1 border-r w-2/3 text-sm" css={dark ? tw`bg-green-500` : tw`bg-green-300`}>Renown Points</div>
          <div tw="w-1/3 flex items-center justify-center bg-white">
            <input type="number" min="0" step="5" tw="px-1 w-full h-full text-sm" />
          </div>
        </div>
        <div tw="flex border-b w-1/2">
          <div tw="p-1 border-r w-2/3 text-sm" css={dark ? tw`bg-green-500` : tw`bg-green-300`}>Points</div>
          <div tw="w-1/3 flex items-center justify-center bg-white">
            <input type="number" min="0" step="5" tw="px-1 w-full h-full text-sm" />
          </div>
        </div>
      </div>
    </>
  );
}

const OtherUnit = ({dark}) => {
  return (
    <>
      <TextField label="Name" dark={dark} />
      <TextField label="Warscroll" dark={dark} />
      <TextField label="Veteran Abilities / Notes" dark={dark} />
      <div tw="flex">
        <div tw="flex border-b w-1/2">
          <div tw="p-1 border-r w-2/3 text-sm" css={dark ? tw`bg-green-500` : tw`bg-green-300`}>Reinforced</div>
          <div tw="p-1 w-1/3 flex items-center justify-center space-x-2 bg-white">
            <input type="checkbox" tw="block" />
            <input type="checkbox" tw="block" />
          </div>
        </div>
        <div tw="flex border-b w-1/2">
          <div tw="p-1 border-r w-2/3 text-sm" css={dark ? tw`bg-green-500` : tw`bg-green-300`}>Casualty Score</div>
          <div tw="w-1/3 flex items-center justify-center bg-white">
            <input type="number" min="0" step="5" tw="px-1 w-full h-full text-sm" />
          </div>
        </div>
      </div>
      <div tw="flex">
        <div tw="flex border-b w-1/2">
          <div tw="p-1 border-r w-2/3 text-sm" css={dark ? tw`bg-green-500` : tw`bg-green-300`}>Renown Points</div>
          <div tw="w-1/3 flex items-center justify-center bg-white">
            <input type="number" min="0" step="5" tw="px-1 w-full h-full text-sm" />
          </div>
        </div>
        <div tw="flex border-b w-1/2">
          <div tw="p-1 border-r w-2/3 text-sm" css={dark ? tw`bg-green-500` : tw`bg-green-300`}>Points</div>
          <div tw="w-1/3 flex items-center justify-center bg-white">
            <input type="number" min="0" step="5" tw="px-1 w-full h-full text-sm" />
          </div>
        </div>
      </div>
    </>
  );
}

const PathToGloryRosterBuilder = () => {
  const version = '0.0.1';

  const [isPtgRoster, setIsPtgRoster] = useState(true);

  return (
    <div css={tw`flex flex-col`}>
      <div css={tw`flex items-center justify-between px-4 py-2 border-b border-black`}>
        <h1 css={tw`m-0 text-sm`}>WH:AoS 「栄光への道」ロスタービルダー</h1>
        <small>Ver {version}</small>
      </div>

      {/* TODO: 戦闘序列とタブ切り替え */}
      <div tw="flex justify-between space-x-2 mt-2 px-4 border-b w-full">
        <div css={[tabStyles, isPtgRoster && activeTabStyles]} onClick={() => setIsPtgRoster(true)}>Path to Glory Roster</div>
        <div css={[tabStyles, isPtgRoster || activeTabStyles]} onClick={() => setIsPtgRoster(false)}>Order of Battle</div>
      </div>

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
            <SelectField label="Current Quest" options={[
              'Quest1'
            ]} />
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
            <div tw="p-1 border-b bg-green-500 text-sm">Bonus Artefacts of Power</div>
            <TextField label="1" />
            <TextField label="2" />
            <TextField label="3" />
            <TextField label="4" />
            <TextField label="5" />
            <TextField label="6" />
            <div tw="p-1 border-b bg-green-500 text-sm">Bonus Spells</div>
            <TextField label="1" />
            <TextField label="2" />
            <TextField label="3" />
            <TextField label="4" />
            <TextField label="5" />
            <TextField label="6" />
            <div tw="p-1 border-b bg-green-500 text-sm">Bonus Prayers</div>
            <TextField label="1" />
            <TextField label="2" />
            <TextField label="3" />
            <TextField label="4" />
            <TextField label="5" />
            <TextField label="6" />
            <div tw="p-1 border-b bg-green-500 text-sm">Bonus Unique Enhancements</div>
            <TextField label="1" />
            <TextField label="2" />
            <TextField label="3" />
            <TextField label="4" />
            <TextField label="5" />
            <TextField label="6" />
            <div tw="p-1 border-b bg-green-500 text-sm">Endless Spells / Invocations</div>
            <TextField label="1" />
            <TextField label="2" />
            <TextField label="3" />
            <div tw="p-1 border-b bg-green-500 text-sm">Triumph</div>
            <TextField label="1" />
            <div tw="p-1 border-b bg-green-500 text-sm">Battalions</div>
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
            <TextField label="Core Enhancements / Notes" />
            <TextField label="Injury" />
            <TextField label="Renown Points" />
            <NumberField label="Points" min="0" step="5" />
          </Section>

          <Section label="HEROES" gray>
            <Hero />
            <Hero dark />
            <Hero />
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
      </main>
    </div>
  )
}

export default PathToGloryRosterBuilder

const tabStyles = css`
  ${tw`relative flex-1 py-1 border rounded rounded-b-none text-sm text-center`}
  bottom: -1px;
`;

const activeTabStyles = css`
  border-bottom-color: white;
`;
