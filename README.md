# Auto-Scheduler

## docker-compose

### 必要ソフト

- Docker
- docker-compose

### 事前準備

#### Auth0 で利用する env ファイルを取得

|          | Service | URL                                                                         |
| -------- | ------- | --------------------------------------------------------------------------- |
| File     | GitHub  | https://github.com/Hackath0nClub/Auto-Scheduler-Secret-File/blob/main/Auth0 |
| Password | Slack   | https://iso-hackathon.slack.com/archives/C03G17K7N3Z/p1653201990392849      |

#### env ファイルを配置

`./react_app/.env.local`となるように配置

### 使い方

#### 起動

```sh
docker-compose up -d
```

#### 停止

```sh
docker-compose down
# ボリュームも削除する場合は以下
# docker-compose down -v
```

#### コンテナへの入り方

```sh
docker-compose exec react_app sh
```

#### ログ

```sh
docker-compose logs -f react_app
```

#### デプロイ URL

<http://localhost:3000/>
