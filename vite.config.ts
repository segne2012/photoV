import {resolve} from "path"
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { compression } from "vite-plugin-compression2"
import AutoImport from "unplugin-auto-import/vite"

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        math: "always"
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, "./src")
    }
  },
  plugins: [
    vue(),
    AutoImport({
      imports:[
        "vue"
      ],
      eslintrc: {
        enabled: true,
      },
      dts: './src/index.d.ts',
    }),
    compression()
  ],
})
