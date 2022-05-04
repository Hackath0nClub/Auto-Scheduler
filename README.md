# Auto-Scheduler

# 加藤からの伝言
## ガントチャートの表示の確認方法
>yarn install
>yarn dev
をすればローカルが立ち上がり、</br>
localhost〇〇/ganttのページを見にいけば確認できます。</br>
ちなみに表示部分からはデータをいじることができないので</br>
入力したデータをjsで受け取って動的に値を変える必要があります。</br>
また、ドラッグあんどドロップは実装できていないので</br>
こちらもjs側で

## docker-compose

### 必要ソフトs

- Docker
- docker-compose

### 使い方

#### 起動

```
docker-compose up -d
```

#### 停止

```
docker-compose down
# ボリュームも削除する場合は以下
# docker-compose down -v
```

#### コンテナへの入り方

```
docker-compose exec react_app sh
```

#### ログ

```
docker-compose logs -f react_app
```

#### デプロイURL

<http://localhost:3000/>
