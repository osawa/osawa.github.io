---
title: 当ブログ構築に際しての記録
date: "2021-06-05"
description: 実際の手順と困ったところの記録
tags:
  - gatsby
  - react

---
2021-06-10 更新 \
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
- `gatsby-node.js`にあるスキーマに記述を追加
- `src/pages/index.js`, `templates/blog-post.js`に表示分岐を追加

### タグの追加
- Frontmatterにtagsを追加
- `gatsby-node.js`のスキーマに`tags: [String]`を追記
- 色々わからなかったので \
diff001a/diff001a-gatsby-blog: my gatsby blog https://github.com/diff001a/diff001a-gatsby-blog \
を参考に`gatsby-node.js`をいじったり`templates/tag-page.js`をつくったり
  - 雰囲気だけで実装したのであらためて仕組みをじっくり把握する必要がある

## 今後適宜やりたいこと
そもそも継続して書くのかという話はあるが

- [x] カテゴリなりタグなり
- [ ] 検索ボックス（これはきつそう）
- リデザイン
  - [ ] tailwind導入
  - [ ] デフォルトスタイルのいけてないところを直す
  - [ ] 適当にクリーンなテーマを考えてあてる
- [ ] Markdown周りの改善（外部リンク用のUIとかほしい）
  - このへんでできそう https://nodachisoft.com/common/jp/article/jp000025/