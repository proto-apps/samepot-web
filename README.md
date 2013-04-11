# samepot-web [![Build Status](https://travis-ci.org/proto-apps/samepot-web.png?branch=master)](https://travis-ci.org/proto-apps/samepot)

簡単で楽しいを目指すプロジェクト推進ツール  
アプリ名は「同じ釜の飯を食う」から

[デモ公開中](http://www11114ui.sakura.ne.jp/)


## 機能

* みんなのアクティビティをリアルタイムに表示
* アクティビティとチャットを統合したタイムライン
* みんなが今やってるタスク、レビューが分かる
* リーンキャンバスでプロジェクトのコンセプトを共有
* マイルストーンでプロジェクトの区切りが分かる
* シンプルで簡単なタスク管理
* メンバー管理、招待


## 必要なもの

* Ruby
* MySQL
* Redis
* ImageMagick, libjpeg-dev, libpng-dev

ImageMagickはMiniMagickで必要

### オプショナル

* Nginx (1.3.x development version)

1.3.xでないとWebsocketをリバースプロキシできない


## セットアップ

```sh
$ git clone https://github.com/proto-apps/samepot-web.git
$ cd samepot-web
$ bundle install --path=vendor/bundler
```

"vendor/conf"以下にMySQL,Redis,Nginxの設定ファイルと起動スクリプトがあるので、  
新規インストールする場合はコピーして使える

サインアップ確認メール、招待メールはdevelopment.logに表示される  
実際にメール送信する場合は、development.rbの"config.action_mailer.smtp_settings"をよしなに設定する

### アプリの起動

```sh
$ bundle exec rake db:create
$ bundle exec rake db:init // スキーマの初期化、サンプルデータ(db/seeds.rb)投入
$ bundle exec rake js // (en|ja).ymlからJS用国際化リソースファイルを作る
$ bundle exec foreman start // UnicornとSidekiqワーカーを起動
```

http://localhost:3000 にアクセスしてログイン画面が表示されていれば成功

Nginxをリバースプロキシとして使う場合は、http://localhost にアクセス  
  => その場合、development.rbの"socketio_host"をコメントアウト


## テスト

### Railsアプリ

MiniTest::Specでテストケースを記述

```sh
$ RAILS_ENV=test bundle exec rake test
```

### JavaScript

konacha(mocha + chai)でテストケースを記述

```sh
$ RAILS_ENV=test bundle exec konacha:run
```


## Websocketサーバ

リアルタイムアクティビティ通知とチャットに[sameot-realtime](https://github.com/proto-apps/samepot-realtime)を使うので、  
リポジトリから落として、README.mdの通りセットアップ
