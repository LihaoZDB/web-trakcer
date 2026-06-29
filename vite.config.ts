import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import dts from "vite-plugin-dts";
export default defineConfig({
  plugins: [
    dts({
      outDirs: ["dist"], // 输出目录
      entryRoot: ".", // 根入口目录
    }),
  ],
  build: {
    minify: true, // 是否压缩代码
    outDir: "dist", // 输出目录
    emptyOutDir: true, // 是否清空输出目录
    sourcemap: false, // 是否生成源码映射
    lib: {
      entry: "index.ts", // 入口文件
      name: "tracker", // 库的名称
      fileName: "tracker", // 输出文件名
      formats: ["es", "cjs", "umd", "iife"], // 输出格式
    },
  },
  server: {
    proxy: {
      "/api": {
        target: `http://localhost:3000`,
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
