import React, { useState } from 'react';
import tw, { css } from 'twin.macro'

import { Strategy } from "../components/strategy-selector/Strategy"

const StrategySelector = () => {
  const version = '0.1.3';

  return (
    <div css={tw`flex flex-col`}>
      <div css={tw`flex items-center justify-between px-4 py-2 border-b border-black`}>
        <h1 css={tw`m-0 text-sm`}>WH:AoS 戦術目標選択ツール</h1>
        <small>Ver {version}</small>
      </div>
      <div>
        {/* TODO: 配列を流して量産する関数を用意する */}
        <Strategy
          title="戦線崩壊"
          text="この戦術目標を開示するとき、戦場に配置されている敵軍開戦時アーミーのバトルラインユニットを1個選択せよ。開示したターン中に選択したユニットを撃破した場合、この戦術目標を達成する。選択されたユニットが味方モンスターの攻撃、あるいは味方モンスターのアビリティによって撃破された場合、追加の勝利点を1ポイント獲得する。"
          hasAdditionalPoint
        />
        <Strategy
          title="征服"
          text="この戦術目標を開示するとき、対戦相手が確保している戦場に配置されている作戦目標を1個選択せよ。開示したターン終了時に選択した作戦目標を確保している場合、この戦術目標を達成する。"
        />
        <Strategy
          title="敵将を討て"
          text="このターン中に敵軍のジェネラルが戦死したならば、この戦術目標は達成される。その兵が味方モンスターの攻撃、あるいは味方モンスターのアビリティによって撃破された場合、追加の勝利点を1ポイント獲得する。"
          hasAdditionalPoint
        />
        <Strategy
          title="獰猛な前進"
          text="この戦術目標を開示するとき、戦場に配置されている自軍側開戦時アーミーのユニットを3個選択せよ。選択したすべてのユニットが次の移動フェイズで全力移動を行い、互いに3mv以内で移動を終えた場合、この戦術目標を達成する。これらの3個のユニットがすべてモンスターの場合、追加の勝利点を1ポイント獲得する。"
          hasAdditionalPoint
        />
        <Strategy
          title="打ち倒せ！"
          text="この戦術目標を開示するとき、戦場に配置されている敵モンスターを1体選択せよ。開示したターン中に選択したユニットを撃破した場合、この戦術目標を達成する。その敵モンスターが、味方モンスターの攻撃あるいは味方モンスターのアビリティによって撃破された場合、追加の勝利点を1ポイント獲得する。"
          hasAdditionalPoint
        />
        <Strategy
          title="好戦的な覇権"
          text="この戦術目標を開示するとき、自軍陣地に完全に収まっていない作戦目標マーカーを2個選択せよ。開示したターン終了時に選択した2個の作戦目標を確保している場合、この戦術目標を達成する。"
        />
        <Strategy
          title="巨大な支配"
          text="この戦術目標を開示するとき、戦場に配置されている自軍側開戦時アーミーのモンスターを1体選択せよ。開示したターン終了時、選択したモンスターが自軍が確保している作戦目標マーカーを争奪しており、その作戦目標マーカーが敵モンスターによって争奪されていない場合、この戦術目標を達成する。"
        />
        <Strategy
          title="容赦なき進軍"
          text="開示したターン終了時、自軍側開戦時アーミーの2個以上のユニットが、敵軍側陣地に完全に収まっている場合、この戦術目標を達成する。これらの2個以上のユニットがモンスターの場合、追加の勝利点を1ポイント獲得する。"
          hasAdditionalPoint
        />
      </div>
    </div>
  )
}

export default StrategySelector
