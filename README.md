# Trading Journal Site

Marketing website for Trading Journal AI.

This repo is the public front door: product story, install guidance, screenshots,
and links to the open-source app repository. It should not contain app database,
import, chart, AI coach, or local installer logic.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Product Boundary

- `trading-journal-site`: marketing website only.
- `trading-journal`: actual app, including the local journal and bundled sample data.
- Marketing CTAs point to the app's GitHub repository.
