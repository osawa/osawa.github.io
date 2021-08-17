import React, { useState } from 'react';
import { Link, graphql } from "gatsby"
import tw, { css } from 'twin.macro'

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Tags from "../components/tags"

const SpellOdds = ({ data, location }) => {
  const version = '0.3';
  const siteTitle = data.site.siteMetadata?.title || `Title`

  const [castValue, setCastValue] = useState(6);
  const [castModifier, setCastModifier] = useState(0);
  const [rollValue, setRollValue] = useState(7);

  const getRollOdds = (value) => {
    return (0 - Math.abs(value - 7) + 6) / 36;
  };

  const getCastOdds = (value = castValue, hasLimit = true) => {
    let v = hasLimit && value <= 2 ? 3 : value; // 出目2はファンブルなので詠唱値3と同値扱い
    let odds = 0;
    return (() => {
      for (let i = v; i < 13; i++) {
        odds += getRollOdds(i);
      }
      return odds;
    })();
  };

  const getUnbindOdds  = castValueWithModifier => {
    // 補正込み詠唱ロール12 -> 打ち消し値13で自動失敗
    if (castValueWithModifier >= 12) return 0;
    // 補正込み詠唱ロール1 -> 打ち消し値2で自動成功
    if (castValueWithModifier <= 1) castValueWithModifier = 0;
    return getCastOdds(parseInt(castValueWithModifier) + 1, false);
  };

  const getNotUnbindOdds = value => {
    return 1 - getUnbindOdds(value);
  }

  const getFinallySuccessOdds = (_castValue, _castModifier) => {
    let castValueWithModifier = _castValue - _castModifier;
    let odds = 0;
    return (() => {
      // 詠唱値 - 補正をiの初期値としたい
      // 2はファンブルなので最低初期値は3
      for (let i = castValueWithModifier <= 2 ? 3 : castValueWithModifier; i < 13; i++) {
        const rollOdds = getRollOdds(i);
        const notUnbindOdds = getNotUnbindOdds(Math.round(i) + Math.round(castModifier));
        const so = rollOdds * notUnbindOdds;
        console.log(`i: ${i}`);
        console.log(`rollOdds: ${rollOdds}`);
        console.log(`notUnbindOdds: ${notUnbindOdds}`);
        console.log(`so: ${so}`);
        odds += so;
      }
      console.log('----');
      return odds;
    })();
  }

  const toPercent = value => {
    return (Math.round(value * 10000) / 100) + '%';
  };

  return (
    <Layout location={location} title={siteTitle}>
      <div css={tw`flex flex-col space-y-8`}>
        <div css={tw`flex items-center justify-between`}>
          <h1 css={tw`m-0`}>WH:AoS 呪文確率計算機</h1>
          <small>Ver {version}</small>
        </div>
        <div css={tw`space-y-2 md:flex md:space-x-8 md:items-center md:space-y-0`}>
          <div css={tw`flex space-x-4 items-center`}>
            <div>詠唱値</div>
            <input type="number" min={2} max={12} onChange={(e) => setCastValue(e.target.value)} css={inputStyles} value={castValue} />
          </div>
          <div css={tw`flex space-x-4 items-center`}>
            <div>詠唱ロール</div>
            <input type="number" min={3} max={12} onChange={(e) => setRollValue(e.target.value)} css={inputStyles} value={rollValue} />
            <small>※2はファンブルなので3-12</small>
          </div>
          <div css={tw`flex space-x-4 items-center`}>
            <div>詠唱ロール補正</div>
            <input type="number" min={-5} max={5} onChange={(e) => setCastModifier(e.target.value)} css={inputStyles} value={castModifier} />
          </div>
        </div>
        <div css={tw`flex-1`}>
          <table css={tableStyles}>
            <tr>
              <th css={thStyles}>呪文発動<small>（詠唱成功かつ打ち消し失敗）</small>率</th>
              {/* TODO: 補正いれる */}
              <td css={tdStyles}>{toPercent(getFinallySuccessOdds(castValue, castModifier))}</td>
            </tr>
          </table>
          <ul css={tw`text-xs mt-4 mb-0`}>
            <li css={liStyles}>呪文の詠唱値と詠唱ロール補正から算定（打ち消し補正は未実装）</li>
            <li css={liStyles}>詠唱／打ち消しロールの全出目における確率の合計</li>
          </ul>
        </div>
        <div css={tw`flex flex-col md:flex-row md:space-x-4`}>
          <div css={tw`flex-1`}>
            <table css={tableStyles}>
              <tr>
                <th css={thStyles}>詠唱成功率</th>
                <td css={tdStyles}>{toPercent(getCastOdds(parseInt(castValue) - parseInt(castModifier)))}</td>
              </tr>
            </table>
          </div>
          <div css={tw`flex-1`}>
            <table css={tableStyles}>
              <tr>
                <th css={thStyles}>打ち消し成功値</th>
                <td css={tdStyles}>{parseInt(rollValue) + parseInt(castModifier) + 1}</td>
              </tr>
              <tr>
                <th css={thStyles}>打ち消し成功率</th>
                <td css={tdStyles}>{toPercent(getUnbindOdds(Math.round(rollValue) + Math.round(castModifier)))}</td>
              </tr>
              <tr>
                <th css={thStyles}>打ち消し失敗率</th>
                <td css={tdStyles}>{toPercent(getNotUnbindOdds(Math.round(rollValue) + Math.round(castModifier)))}</td>
              </tr>
            </table>
          </div>
        </div>
        <div css={tw`flex-1`}>
          <h6 css={tw`font-bold text-xs m-0`}>MEMO</h6>
          <ul css={tw`text-xs`}>
            <li css={liStyles}>補正+5（打ち消し補正なし）において、詠唱値8以下の呪文は詠唱ロール2以外で絶対成功するので、打ち消しとの出目勝負になり確率は92.98%で固定される</li>
            <li css={liStyles}>補正が下がるにしたがって確率が固定される詠唱値も下がっていく（ハードルの低いものが固定される）、また、固定確率の値も下がる</li>
            <li css={liStyles}>未実装だが、打ち消し補正が加わることで上記の固定される確率が下がるはずだが、確率が固定される詠唱値は変わらないはず</li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default SpellOdds

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt(truncate: true)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          title
          description
          draft
          tags
        }
      }
    }
  }
`

const inputStyles = css`
  ${tw`border p-2`}
`;

const tableStyles = css`
  ${tw`border m-0`}
`;

const thStyles = css`
  ${tw`border text-left p-2 w-1/2`}
`;

const tdStyles = css`
  ${tw`border text-left p-2 w-1/2`}
`;

const liStyles = css`
  ${tw`my-1`}
`;