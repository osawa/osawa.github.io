import React, { useState } from 'react';
import { Link, graphql } from "gatsby"
import tw, { css } from 'twin.macro'

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Tags from "../components/tags"

const SpellOdds = ({ data, location }) => {
  const version = '0.2';
  const siteTitle = data.site.siteMetadata?.title || `Title`

  const [castValue, setCastValue] = useState(12);
  const [rollValue, setRollValue] = useState(6);

  const getRollOdds = (value) => {
    return (0 - Math.abs(value - 7) + 6) / 36;
  };

  const getCastOdds = (value = castValue) => {
    let v = value == 2 ? 3 : parseInt(value); // 出目2はファンブルなので詠唱値3と同値扱い
    let odds = 0;
    return (() => {
      for (let i = v; i < 13; i++) {
        odds += getRollOdds(i);
      }
      return odds;
    })();
  };

  const getUnbindOdds  = (value = castValue) => {
    if (value >= 12) return 0;
    return getCastOdds(parseInt(value) + 1);
  };

  const getNotUnbindOdds = value => {
    return 1 - getUnbindOdds(value);
  }

  const getFinallySuccessOdds = value => {
    let v = value == 2 ? 3 : value; // 出目2はファンブルなので詠唱値3と同値扱い
    let odds = 0;
    return (() => {
      for (let i = v; i < 13; i++) {
        const so = getRollOdds(i) * getNotUnbindOdds(i);
        odds += so;
      }
      return odds;
    })();
  }

  const toPercent = value => {
    return (Math.floor(value * 10000) / 100) + '%';
  };

  return (
    <Layout location={location} title={siteTitle}>
      <div css={tw`flex flex-col space-y-8`}>
        <div css={tw`flex items-center justify-between`}>
          <h1 css={tw`m-0`}>WH:AoS 呪文確率計算機</h1>
          <small>Ver {version}</small>
        </div>
        <div css={tw`flex flex-col md:flex-row md:space-x-4`}>
          <div css={tw`flex-1`}>
            <h2>詠唱値ベースでの成功率</h2>
            <div css={tw`flex space-x-4 items-center`}>
              <div>詠唱値</div>
              <input type="number" min={2} max={12} onChange={(e) => setCastValue(e.target.value)} css={inputStyles} value={castValue} />
            </div>
            <table css={tw`border mt-4`}>
              <tr>
                <th css={thStyles}>詠唱成功率</th>
                <td css={tdStyles}>{toPercent(getCastOdds(castValue))}</td>
              </tr>
              <tr>
                <th css={thStyles}>詠唱成功＆打ち消し失敗率</th>
                <td css={tdStyles}>{toPercent(getFinallySuccessOdds(castValue))}</td>
              </tr>
            </table>
          </div>
          <div css={tw`flex-1`}>
            <h2>詠唱出目に対する打ち消し成功率</h2>
            <div css={tw`flex space-x-4 items-center`}>
              <div>詠唱出目</div>
              <input type="number" min={3} max={12} onChange={(e) => setRollValue(e.target.value)} css={inputStyles} value={rollValue} />
              <small>※2はファンブルなので3-12</small>
            </div>
            <table css={tw`border mt-4`}>
              <tr>
                <th css={thStyles}>打ち消し成功値</th>
                <td css={tdStyles}>{parseInt(rollValue)+ 1}</td>
              </tr>
              <tr>
                <th css={thStyles}>打ち消し成功率</th>
                <td css={tdStyles}>{toPercent(getUnbindOdds(rollValue))}</td>
              </tr>
              <tr>
                <th css={thStyles}>打ち消し失敗率</th>
                <td css={tdStyles}>{toPercent(getNotUnbindOdds(rollValue))}</td>
              </tr>
            </table>
          </div>
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

const thStyles = css`
  ${tw`border text-left p-2 w-1/4`}
`;

const tdStyles = css`
  ${tw`border text-left p-2 w-1/4`}
`;
