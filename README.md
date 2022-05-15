# Auto-Scheduler

## docker-compose

### 必要ソフト

- Docker
- docker-compose

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
