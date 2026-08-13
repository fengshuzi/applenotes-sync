# AGENTS.md — applenotes-sync

Obsidian plugin that syncs notes from macOS 备忘录 (Apple Notes) to the local vault. Uses AppleScript to export notes, turndown for HTML-to-Markdown conversion. macOS-only (`isDesktopOnly: true`).

## Layout

- `main.ts` — plugin entry, registers commands, settings tab, sync logic
- `src/` — source modules (AppleScript execution, turndown conversion, storage)
- `manifest.json` / `versions.json` / `styles.css` / `esbuild.config.mjs` / `eslint.config.mjs` / `tsconfig.json`
- `deploy.mjs` / `release.mjs` — maintainer scripts
- `test-applescript.mjs`, `test-siyuan-api.mjs`, `test-storage-unit.mjs` — standalone test scripts

## Commands

```bash
npm run dev      # esbuild watch -> dist/main.js
npm run build    # lint + tsc -noEmit -skipLibCheck + esbuild production
npm run lint     # eslint "**/*.{ts,tsx}"
npm run deploy   # build + copy to author's local vaults, then delete dist/
npm run release  # gh release create from manifest.json version
```

`build` enforces lint + tsc before bundling.

## Build

- esbuild, entry `main.ts`, format `cjs`, target `es2018`
- externals: `obsidian`, `electron`, `@codemirror/*`, `@lezer/*`, Node builtins
- Copies `manifest.json`, `styles.css`, and `sql-wasm.wasm` to `dist/`
- Runtime dependencies: `turndown`, `turndown-plugin-gfm` (bundled)

## Dependencies

- `turndown` + `turndown-plugin-gfm` — HTML-to-Markdown conversion for rich Apple Notes content
- These are bundled into the plugin output; users do not need to install them separately

## Lint

Strict typed rules: `no-explicit-any`, `no-unsafe-*`, `no-floating-promises`, `await-thenable`.

## Versioning

Keep `package.json`, `manifest.json`, and `versions.json` versions in sync. `release.mjs` reads version from `manifest.json`.

## Marketplace / Scorecard

Marketplace, manifest, and release conventions live in the parent `obsidian-plugins-parent/AGENTS.md`. Read it before touching `manifest.json`, release flow, or marketplace-facing code.