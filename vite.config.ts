import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.CF_PAGES ? '/' : '/MermZen/',
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    target: 'esnext',
    cssMinify: 'esbuild',
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      input: { main: 'index.html', embed: 'embed.html' },
      output: {
        manualChunks(id) {
          // codemirror: 编辑器相关，首屏需要
          if (id.includes('@codemirror') || id.includes('@lezer') || id.includes('codemirror-lang-mermaid') || id.includes('node_modules/codemirror/'))
            return 'codemirror';
          // svgo: 已改为动态 import，保持独立 chunk
          if (id.includes('node_modules/svgo'))
            return 'svgo';
          // pako: 首屏解码 URL hash 时立即需要，单独保持小 chunk
          if (id.includes('node_modules/pako'))
            return 'vendor';
          // mermaid 及其所有运行时依赖归入同一 chunk，避免跨 chunk 循环引用 TDZ 错误
          if (id.includes('node_modules/'))
            return 'mermaid';
        },
        chunkFileNames: 'assets/[name]-[hash:6].js',
        entryFileNames: 'assets/[name]-[hash:6].js',
        assetFileNames: 'assets/[name]-[hash:6].[ext]',
      },
    },
    chunkSizeWarningLimit: 1000,
    modulePreload: { polyfill: false },
    assetsInlineLimit: 4096,
  },
  optimizeDeps: {
    include: ['mermaid', 'pako'],
    esbuildOptions: {
      target: 'esnext',
    },
  },
  server: {
    port: 56324,
    open: true,
  },
});
