import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { Plugin, Connect } from 'vite'
import type { IncomingMessage, ServerResponse } from 'http'

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
  },
  configureServer(server) {
    // 添加中间件来处理 Markdown 文件
    server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: Connect.NextFunction) => {
      const url = req.url || '';
      if (url.endsWith('.md')) {
        try {
          const filePath = url.startsWith('/') ? url.slice(1) : url;
          const content = await server.ssrLoadModule(filePath);
          res.setHeader('Content-Type', 'text/markdown');
          res.end(content.default);
        } catch (error) {
          console.error('Error loading markdown file:', error);
          res.statusCode = 404;
          res.end('Not found');
        }
      } else {
        next();
      }
    });
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
