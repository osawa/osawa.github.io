---
title: 仕事のために覚えなければならないこと
date: "2021-06-13"
description: やることが多い
tags: ['tech', 'javascript', 'react', 'work']

---
- React
  - react-dom
  - react-router-dom
    ```
    import { Link } from 'react-router-dom'
    ```
    して`<Link to="/hoge">`みたいなリンクを使えるようにしつつ、大元のルーティング設定部で
    ```
    <Router>
      <Route path='/hoge' component={Hoge}/>
    </Router>
    ```
    とすることでルーティング完了、ということらしい
      - https://qiita.com/koja1234/items/a20d7ce81d9c2d927af5 \
      Switchは条件のバッティングをなんとかするやつだった
  - recoil
    - https://ics.media/entry/210224/
  - twin.macro
  - craco
  - emotion
- Storybook
- TypeScript
- TSLint
  - vscodeとの連携とか多分あるんでしょう