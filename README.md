# Trading Journal Site

Marketing website for Trading Journal AI.

This repo is the public front door: product story, install guidance, screenshots,
and links into the hosted demo app. It should not contain app database, import,
chart, AI coach, or local installer logic.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Product Boundary

- `trading-journal-site`: marketing website only.
- `trading-journal`: actual app, including local/live mode and hosted demo mode.
- Demo CTA target defaults to `https://demo.trading-journal.ai/demo`. Override `NEXT_PUBLIC_DEMO_URL` only when pointing at a different hosted app demo.
