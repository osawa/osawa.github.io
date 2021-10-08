---
title: 当ブログ構築に際しての記録
date: "2021-06-05"
description: 実際の手順と困ったところの記録
tags:
  - gatsby
  - react

---
2021-08-18 更新 \
Gatsby + Github Pages でブログをつくるぞ

## 動機
- 普段Google Keepですべてのメモを取っていたが、しっかりしたことを書きづらいのと共有しづらい
- Medium, Noteを試してみたが文章整形が貧弱すぎてつらい
- Evernoteでもよかったが、できればWYSIWYGを避けたい、Markdownを使いたい、デザイン調整に自由度がほしい
- ちょうどGatsbyを勉強したいタイミングだったこともあり、ほぼメモ用途のブログを作ることにした

## 参考
- Gatsby + GitHub Pages でポートフォリオページを無料でシュッと作る - Qiita https://qiita.com/mishiwata1015/items/ac65efbabb4400fd95bf
- Gatsby + Markdownでブログを作り直しました https://diff001a.netlify.app/gatsby-blog-with-markdown/

## かえたところ
### deploy設定
- npm run deploy で GitHub Pages にお手軽デプロイ - Qiita https://qiita.com/star__hoshi/items/490959aee12dbf528f7c \
を参考にgh-pagesを導入
  - あわせてgithubのほうで「Setting -> Pages -> Source」をgh-pagesに変更

### ドラフトの実装
- Frontmatterに`draft`を追加
- `gatsby-node.js`にあるスキーマに`draft: Boolean`を追加
- `src/pages/index.js`, `templates/blog-post.js`に表示分岐を追加

### タグの追加
- Frontmatterに`tags`を追加
- `gatsby-node.js`のスキーマに`tags: [String]`を追記
- 色々わからなかったので \
diff001a/diff001a-gatsby-blog: my gatsby blog https://github.com/diff001a/diff001a-gatsby-blog \
を参考に`gatsby-node.js`をいじったり`templates/tag-page.js`をつくったり
  - 雰囲気だけで実装したのであらためて仕組みをじっくり把握する必要がある

### 更新日の追加
- Frontmatterに`modified_at`を追加
- `gatsby-node.js`のスキーマに`modified_at: Date @dateformat`を追記

### Emotionおよびtwin.macroの導入
- Emotion | Gatsby https://www.gatsbyjs.com/docs/how-to/styling/emotion/
- GatsbyにTailwind CSSを導入する最短手順(CSS-in-JS) - Qiita https://qiita.com/suin/items/7281351779b5206e17b3

を参考にいれた（styled-componentとbabelMacros設定は取り急ぎ自分では使わないので抜いた）
```jsx
import tw, { css } from 'twin.macro';

const hoge = () => (
  <>
    <div css={tw`m-0`}>...</div>
    <div css={hogeStyles}>...</div>
  </>
);

const hogeStyles = css`
  margin: 0;
`;
```
のようにして使ってる

## 今後適宜やりたいこと
そもそも継続して書くのかという話はあるが

- [x] カテゴリなりタグなり
- [x] パーマリンクの仕様策定（`YYYY-MM-DD_slug`の形がいい気がする）
- [ ] 検索ボックス（これはきつそう）
- [ ] TypeScript導入
- リデザイン
  - [x] emotion導入
  - [x] tailwind（twin.macro)導入
  - [x] デフォルトスタイルのいけてないところを直す（簡易的に対応）
  - [ ] 適当にクリーンなテーマを考えてあてる
- [ ] Markdown周りの改善（外部リンク用のUIとかほしい）
  - このへんでできそう https://nodachisoft.com/common/jp/article/jp000025/