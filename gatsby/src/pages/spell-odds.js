import React, { useState } from 'react';
import { Link, graphql } from "gatsby"
import tw, { css } from 'twin.macro'

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Tags from "../components/tags"

const SpellOdds = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  const [castValue, scb] = useState(6);
  const setCastValue = (e) => scb(e.target.value);

  const getOdds = (value = castValue) => {
    return (0 - Math.abs(value - 7) + 6) / 36;
  };

  const getCastOdds = (value = castValue) => {
    let v = value == 2 ? 3 : value; // 出目2はファンブルなので詠唱値3と同値扱い
    let odds = 0;
    return (() => {
      for (let i = v; i < 13; i++) {
        odds += getOdds(i);
      }
      return odds;
    })();
  };

  const getUnbindOdds  = (value = castValue) => {
    if (value >= 12) return 0;
    const v = value == 2 ? 3 : value;
    return getCastOdds(parseInt(v) + 1);
  };

  const getNotUnbindOdds = value => {
    return 1 - getUnbindOdds(value);
  }

  const getFinallySuccessOdds = value => {
    let v = value == 2 ? 3 : value; // 出目2はファンブルなので詠唱値3と同値扱い
    let odds = 0;
    return (() => {
      for (let i = v; i < 13; i++) {
        const so = getOdds(i) * getNotUnbindOdds(i);
        odds += so;
        console.log('getOdds: ' + getOdds(i));
        console.log('getNotUnbindOdds: ' + getNotUnbindOdds(i));
        console.log('so: ' + so);
      }
      return odds;
    })();
  }

  const toPercent = value => {
    return (Math.floor(value * 10000) / 100) + '%';
  };

  return (
    <Layout location={location} title={siteTitle}>
      <div css={tw`flex items-center justify-between`}>
        <h1 css={tw`m-0`}>呪文確率計算機</h1>
        <small>ver 0.1</small>
      </div>
      <div css={tw`flex space-x-4 items-center mt-8`}>
        <div>詠唱値</div>
        <input type="number" min={2} max={12} name="" id="" onChange={setCastValue} css={inputStyles} value={castValue} />
      </div>
      <table css={tw`border mt-4`}>
        <tr>
          <th css={thStyles}>詠唱値</th>
          <td css={tdStyles}>{castValue}</td>
          <th css={thStyles}>打ち消し成功値</th>
          <td css={tdStyles}>{parseInt(castValue)+ 1}</td>
        </tr>
        <tr>
          <th css={thStyles}>詠唱成功率</th>
          <td css={tdStyles}>{toPercent(getCastOdds(castValue))}</td>
          <th css={thStyles}>打ち消し成功率</th>
          <td css={tdStyles}>{toPercent(getUnbindOdds(castValue))}</td>
        </tr>
        <tr>
          <th css={thStyles}>詠唱成功＆打ち消し失敗率</th>
          <td css={tdStyles}>{toPercent(getFinallySuccessOdds(castValue))}</td>
          <th css={thStyles}>打ち消し失敗率</th>
          <td css={tdStyles}>{toPercent(getNotUnbindOdds(castValue))}</td>
        </tr>
      </table>
      {/* <p>Odds: {getOdds()}</p>
      <p>UnbindOdds: {getCastOdds(castValue + 1)}</p>
      <p>NotUnbindOdds: {getNotUnbindOdds(castValue)}</p>
      <p>FinallySuccessOdds: {toPercent(getFinallySuccessOdds(castValue))}</p> */}
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
