# AppleNotes Sync

Sync **macOS Apple Notes** to Obsidian, manual refresh only.

## Features

### macOS Apple Notes (macOS only)

- Sidebar "refresh" button and "Sync macOS Apple Notes" command: sync notes from a specified folder in the Apple Notes app to Obsidian
- Supports images, tables, and other rich content. Configurable source folder name and Obsidian target folder

## Installation

### From Obsidian Community Plugins (Recommended)

Open Obsidian Settings → Community Plugins → Browse, and search for **AppleNotes Sync** or **fengshuzi** to install directly.


### From GitHub Release (Recommended)

1. Go to the [Releases](../../releases) page and download the latest version
2. Download `main.js`, `manifest.json`, and `styles.css` if available
3. Create a plugin directory in your Obsidian vault: `.obsidian/plugins/applenotes-sync/`
4. Copy the downloaded files into that directory
5. Restart Obsidian or refresh the plugin list, then enable "AppleNotes Sync" in settings

### Build from Source

```bash
cd applenotes-sync
npm install
npm run build
# Copy files from dist/ to .obsidian/plugins/applenotes-sync/
```

## Usage

1. Open Obsidian Settings → Community Plugins → **AppleNotes Sync**
2. Configure the Apple Notes folder name and Obsidian target folder (macOS only)
3. Click the refresh icon in the sidebar, or use the command palette to run "Sync macOS Apple Notes"

## Development

```bash
npm install
npm run dev    # Watch mode
npm run build  # Production build
npm run deploy # Deploy to local vaults
npm run release # Publish to GitHub
```

## License

MIT


---
## ☕ Support the Author

If this plugin helped you, feel free to buy me a coffee!

<div align="center">
  <img src="https://raw.githubusercontent.com/fengshuzi/images/main/wechat-donate.jpg" alt="WeChat Donate" width="320" />
  <p><sub>WeChat QR Code</sub></p>
</div>
