[![Build Status](https://travis-ci.org/nukosuke/annict-widgets.svg?branch=master)](https://travis-ci.org/nukosuke/annict-widgets)

# annict-widgets
Annictから取得した自分の視聴中アニメリストをサイトに埋め込むためのウィジェットとサーバです。

<img src='https://cloud.githubusercontent.com/assets/17716649/16066527/fed6621e-32ee-11e6-8927-ab40831a322a.png' width='256'/>

- [Annict](https://annict.com/)
- [Annict Widgets](http://nukosuke.hatenablog.jp/entry/2016/06/15/224515)

## 使い方
```bash
$ git clone git@github.com:nukosuke/annict-widgets.git
$ cd annict-widgets
$ npm install
$ npm run build
$ ANNICT_CLIENT_ID=[your_client_id] \
ANNICT_CLIENT_SECRET=[your_client_secret] \
ANNICT_REDIRECT_URI=[your_redirect_uri] \
ANNICT_MONGODB_URI=[your_mongodb_uri] \
ANNICT_FETCH_CRON_TAB=[fetch_interval] \ # '* */10 * * * *' => 10分ごとに更新
npm start
```

## スタック
- Vue.js
- Express
- Node.js
- MongoDB

## ライセンス
Copyright (c) 2016 ぬこすけ  
Released under the MIT license  
http://opensource.org/licenses/mit-license.php
