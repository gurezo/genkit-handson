## Agenda

1. Firebase の最新情報
1. Firebase AI Logic
   クライアントサイドから生成 AI にアクセス
1. Genkit
   1. https://firebase.google.com/products/genkit?hl=ja

### ハンズオン資料

- 資料：https://tanabee.github.io/genkit-codelab/ja/
- サンプルコード：https://github.com/tanabee/genkit-codelab
- 参考（MCP サーバー一覧）：https://github.com/modelcontextprotocol/servers?tab=readme-ov-file
- 社内用 AI の資料
  - https://github.com/tanabee/internal-ai
  - https://zenn.dev/tanabee/articles/1729f53b9a3223

## AI オーケストレーション

「AI オーケストレーション」とは、**複数の AI モデルやシステム、タスクを連携・統合・最適化して、より高度な処理や意思決定を実現するアプローチ**です。音楽の「オーケストラ」に例えて、異なる役割を持つ AI を指揮・調整して、全体として調和の取れた結果を出すことを意味します。

---

### 🔧 1. なぜ「オーケストレーション」が必要なのか？

現代の AI は以下のように多様です：

| AI の種類               | 主な役割                     |
| ----------------------- | ---------------------------- |
| LLM（大規模言語モデル） | 自然言語の理解・生成         |
| CV モデル（画像認識）   | 画像や動画の解析             |
| 音声認識 AI             | 音声からテキストを生成       |
| 推論エンジン            | 論理的推論やルールベース処理 |
| 自律エージェント        | タスクの計画・実行           |

これらを**組み合わせて使わなければ解決できない問題**（例：マルチモーダルなアシスタント、製造ラインの自動化など）が増えています。

---

### 🎻 2. 具体例：AI オーケストレーションのユースケース

| ユースケース                 | 関与する AI                             | オーケストレーションの内容                                 |
| ---------------------------- | --------------------------------------- | ---------------------------------------------------------- |
| カスタマーサポート自動化     | LLM + FAQ 検索 + 感情分析               | ユーザー入力を分析し、関連情報を探し、適切な回答を生成     |
| 音声アシスタント             | 音声認識 + LLM + 音声合成               | 音声入力を文字に変換 → 意図を解析 → 回答 → 音声で出力      |
| スマート工場                 | センサー AI + CV + 異常検知 AI          | 様々な機器のデータを解析し、異常を検出し、対応手順を自動化 |
| マルチエージェント・システム | 複数の AI エージェント（LLM, API 連携） | エージェント同士が役割分担しながら、最適なタスク解決を図る |

---

### 🧩 3. 技術的構成要素

AI オーケストレーションには以下の技術が使われます：

- **ワークフローエンジン（例: Apache Airflow, Temporal）**
  タスクの順序や条件分岐を制御

- **エージェントフレームワーク（例: LangChain, AutoGen）**
  LLM を使ったエージェントを構築し、会話や意思決定を分担

- **API ゲートウェイ / マイクロサービス構成**
  異なる AI 機能を API 化し、疎結合で連携

- **状態管理 / コンテキスト保持**
  長期的な会話や複数ステップのタスク実行で文脈を維持

---

### 🤖 4. 代表的な AI オーケストレーションツール

| ツール / フレームワーク      | 主な特徴                                             |
| ---------------------------- | ---------------------------------------------------- |
| **LangChain**                | LLM を中心としたマルチステップ処理やツール連携が得意 |
| **AutoGen**                  | マルチエージェントでの役割分担による問題解決         |
| **Airflow / Prefect**        | バッチ処理やタスクの依存関係の管理に強い             |
| **LLM Router / Prompt Flow** | 入力に応じて適切なモデルやプロンプトを選択           |

---

### 🚀 まとめ

- **AI オーケストレーションとは、異なる AI システムを連携・統合して、高度な処理を実現する手法**
- **複雑なユースケースでは、単体の AI ではなく複数の AI の組み合わせが必要**
- **技術的には、ワークフロー管理・エージェント設計・API 連携・状態管理がカギ**

---

- Gemini API key
  - <GEMINI_API_KEY>

```sh
curl \
 -H 'Content-Type: application/json' \
 -d '{"contents":[{"parts":[{"text":"Explain Firebase in under 100 words."}]}]}' \
 -X POST 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=<GEMINI_API_KEY>'

export GEMINI_API_KEY=<GEMINI_API_KEY>

$env:GEMINI_API_KEY="<GEMINI_API_KEY>"

echo "GEMINI_API_KEY=<API_KEY>" > .env
```

- Github 30 days
  - [REMOVED - GitHub Personal Access Token]
