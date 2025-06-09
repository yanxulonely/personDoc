import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'

// 创建自定义插件来处理 Markdown 文件
const markdownPlugin = (): Plugin => ({
  name: 'vite-plugin-markdown',
  transform(code, id) {
    if (id.endsWith('.md')) {
      // 将 Markdown 文件内容作为字符串导出
      return {
        code: `export default ${JSON.stringify(code)}`,
        map: null
      }
    }
  }
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), markdownPlugin()],
  server: {
    fs: {
      // 允许服务器访问上层目录
      allow: ['..']
    }
  }
})
