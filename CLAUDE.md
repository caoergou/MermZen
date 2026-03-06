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
- **Blog**: Static blog in `blog/` directory

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
