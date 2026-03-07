# Guidelines for Christian Monks

A Next.js 16 (App Router) site for the Rule of Saint Benedict and other monastic texts. Dark manuscript theme with deep earth tones and parchment typography.

## Setup

Requires **Node.js 20.9+** (recommend **Node 22** LTS). If you use [nvm](https://github.com/nvm-sh/nvm): `nvm use` (see `.nvmrc`). Then:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Theme

- **Dark mode**: Always on via `class="dark"` on `<html>`.
- **Colors**: Parchment `#f5e8d3`, muted gold `#d4af37`, stone gradients.
- **Fonts**: Crimson Text, EB Garamond (Google Fonts).

## Content

1. **Benedict**: Edit `data/rules-benedict.md`. Use `# Chapter N: Title` (or `# Prologue`) then the body. Add all 73 chapters in that format.
2. **Augustine / Francis**: Add `data/rules-augustine.md` and `data/rules-francis.md` in the same Markdown structure; the app is set up to support them.

Content is parsed with **gray-matter** (front matter) and **remark** (Markdown → HTML).

## Daily reading

- Home page shows a random chapter snippet.
- A new random chapter is chosen at **midnight** (local time) via `localStorage` timestamp.
- API: `GET /api/daily-reading` returns `{ slug, title, excerpt }`.

## Images

- Place a hero image at `public/images/hero-monk.jpg` (e.g. hooded monk, dim corridor) for the home background. Optional; gradient works without it.
- Use Pexels/Unsplash for “monk silhouette”, “monastery”, “candlelit corridor”.

## Routes

| Route | Description |
|-------|-------------|
| `/` | Hero quote + daily reading |
| `/rules` | List of chapters (sidebar) |
| `/rules/[slug]` | Single chapter, e.g. `/rules/prologue`, `/rules/7-humility` |

## Tech

- Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS v4, ESLint 9 (stack current 2026)
- `gray-matter`, `remark`, `remark-html` for Markdown
