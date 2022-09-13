import path from 'path'
import { defineConfig, loadEnv } from 'vite'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import Inspect from 'vite-plugin-inspect'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const resolve = {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }

  const server = {
    port: 5200,
    proxy: {
      '/sso-server': {
        target: env.VITE_BASE_URL,
        changeOrigin: true
      },
      '/api': {
        target: 'http://127.0.0.1:9000/',
        changeOrigin: true
      }
    }
  }

  const plugins = [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => {
            return tag.startsWith('md-')
          }
        }
      }
    }),
    vueJsx({}),
    Inspect(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      dts: 'src/auto-imports.d.ts',
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: ['vue', 'vue-router', 'pinia'],
      resolvers: [ElementPlusResolver()]
    }),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      dts: 'src/auto-components.d.ts',
      dirs: ['src/components', 'src/render', 'src/editor', 'src/admin'],
      resolvers: [ElementPlusResolver()]
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/image')],
      symbolId: 'icon-[dir]-[name]',
      inject: 'body-last',
      customDomId: '__svg__icons__dom__'
    })
  ]

  // https://vitejs.dev/guide/build.html#library-mode
  const libBuild = {
    lib: {
      entry: 'src/lib.ts',
      name: 'PurityRender',
      fileName: 'purity-render'
      // formats: ['es', 'cjs', 'umd', 'iife', 'amd']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' }
      }
    }
  }

  const build = mode === 'lib' ? libBuild : {}

  return { resolve, server, plugins, build }
})
