---
title: Gatsby + Github Pages によるブログ構築に際してのメモ
date: "2021-06-05T00:51:00"
description: 実際の手順と困ったところの記録

---
実際の手順と困ったところの記録

## 動機
- 普段Google Keepですべてのメモを取っていたが、しっかりしたことを書きづらいのと共有しづらい
- Medium, Noteを試してみたが文章整形が貧弱すぎてつらい
- Evernoteでもよかったが、できればWYSIWYGを避けたい、Markdownを使いたい、デザイン調整に自由度がほしい
- ちょうどGatsbyを勉強したいタイミングだった

## 参考
- Gatsby + GitHub Pages でポートフォリオページを無料でシュッと作る - Qiita https://qiita.com/mishiwata1015/items/ac65efbabb4400fd95bf
- Gatsby + Markdownでブログを作り直しました https://diff001a.netlify.app/gatsby-blog-with-markdown/

## かえたところ
- ワークファイルの親ディレクトリにoutputが展開されてしまうのが嫌だったので
```
"deploy": "gatsby build && cp -pvr public/* ../blog/ && git add ../ && git commit -m 'Deploy to production' && git push"
```
こんなかんじで`blog`ディレクトリにoutputを吐き出すことにした
- ドラフトの実装
  - Frontmatterに`draft`を追加
  - `gatsby-node.js`にあるスキーマに記述を追加
  - `src/pages/index.js`, `pages/index.js`に表示分岐を追加

## 今後適宜やりたいこと
そもそも継続して書くのかという話はあるが
- カテゴリなりタグなり
- 検索ボックス
- リデザイン