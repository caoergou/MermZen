# CLAUDE.md

This file provides high-level guidance for Claude when working with this repository.

## Quick Reference

For detailed project documentation, see **[AGENTS.md](./AGENTS.md)**.

## Project Summary

**MermZen** - A clean, lightweight Mermaid diagram editor with hand-drawn style support.

- **Live Demo**: https://eric.run.place/MermZen/
- **Tech Stack**: Vite 7 + TypeScript + Mermaid 11 + CodeMirror 6
- **Deployment**: GitHub Pages (auto-deploy on push to main)

## Quick Commands

```bash
# Development
npm run dev              # Start dev server (port 5173)
npm run type-check       # TypeScript check

# Build
npm run build            # Production build (dist/)
npm run build:all        # Build + screenshots + blog
npm run build:screenshots # Generate README screenshots

# Test
npx playwright test test-tour.spec.js
```

## Important Notes

- **Source code**: All TypeScript source is in `src/modules/`
- **Old JS files**: The root `modules/` directory was deleted after TS migration
- **Scripts**: Build/utility scripts are in `scripts/` directory
- **Agent Skill**: `skills/mermzen-render/` — open-standard Agent Skill (agentskills.io), installable via `npx skills add caoergou/MermZen`
- **Blog**: Static blog in `blog/` directory
- **SEO / sitemap**: `scripts/generate-sitemap.sh` builds `sitemap.xml` by scanning the
  repo for `*.html`. It MUST exclude `node_modules/`, `dist/` and other artifact dirs —
  otherwise third-party demo pages (e.g. `cytoscape-fcose/demo/*.html`, `tslib/*.html`)
  get listed in the sitemap and crawled by Google, which 404s them in Search Console
  (only `dist/` is deployed, so those paths don't exist on the live site). When adding a
  new build/output dir, add it to the `find ... -not -path` excludes too. See commit
  `391a65e`. Both `sitemap.xml` and `robots.txt` are gitignored and regenerated at deploy.

## Key Files

| File | Purpose |
|------|---------|
| `index.html` | Main app page |
| `embed.html` | Embedded diagram viewer |
| `src/app.ts` | Main entry point |
| `src/embed.ts` | Embed page entry point |
| `vite.config.ts` | Build configuration |

## URL Parameters

- `?skipTour=1` - Skip onboarding tour
- `?lang=zh|en` - Set language

---

📖 **See [AGENTS.md](./AGENTS.md) for complete documentation** including:
- Full architecture overview
- Module descriptions
- Development guidelines
- Testing instructions
