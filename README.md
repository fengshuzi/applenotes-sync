# AppleNotes Sync

将 **macOS 备忘录**同步到 Obsidian，仅手动刷新。

## 功能特性

### macOS 备忘录（仅 macOS）

- 侧边栏「刷新」按钮、命令「同步 macOS 备忘录」：从系统「备忘录」App 指定文件夹同步到 Obsidian
- 支持图片、表格等，可配置 App 内文件夹名与 Obsidian 目标文件夹

## 安装方法

### 从 GitHub Release 安装（推荐）

1. 前往 [Releases](../../releases) 页面下载最新版本
2. 下载 `main.js`、`manifest.json`，如有 `styles.css`、`sql-wasm.wasm` 一并下载
3. 在 Obsidian 库中创建插件目录：`.obsidian/plugins/applenotes-sync/`
4. 将下载的文件复制到该目录
5. 重启 Obsidian 或刷新插件列表，在设置中启用「AppleNotes Sync」

### 手动构建

```bash
cd applenotes-sync
npm install
npm run build
# 将 dist/ 下的文件复制到 .obsidian/plugins/applenotes-sync/
```

## 使用方法

1. 打开 Obsidian 设置 → 第三方插件 → **AppleNotes Sync**
2. **macOS 备忘录**：配置「备忘录」App 内文件夹名称、Obsidian 目标文件夹（仅 macOS）
3. 侧边栏点击刷新图标，或命令面板「同步 macOS 备忘录」执行同步

## 开发

```bash
npm install
npm run dev    # 开发模式
npm run build  # 构建
npm run deploy # 部署到本地 vault
npm run release # 发布到 GitHub
```

## 许可证

MIT


---

## ☕ 请作者喝杯咖啡

如果这个插件帮助了你，欢迎扫码打赏，感谢支持！

<div align="center">
  <img src="./assets/wechat-donate.jpg" alt="微信打赏" width="200" />
  <p><sub>微信扫码打赏</sub></p>
</div>
