# よいどれゲームズ

React + TypeScript + Vite で作った、スマートフォン向けの飲みゲーム集です。

## GitHub Pages で公開する

1. `npm ci` を実行します。
2. `npm run build` を実行します。公開ファイルは `docs/` に生成されます。
3. `docs/` の内容をリポジトリに push します。
4. GitHub の **Settings → Pages → Build and deployment** で、Source を **Deploy from a branch**、Branch を公開ブランチ（通常は `main`）、フォルダーを **/docs** に設定します。

このリポジトリ名を `party-games` として公開する設定（`/party-games/`）です。

## 開発

```sh
npm ci
npm run dev
```
