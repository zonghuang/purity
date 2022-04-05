import path from 'path';
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver, VantResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import Inspect from 'vite-plugin-inspect'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    server: {
      port: 5200,

      proxy: {
        '/sso-server': {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
        },
      }
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    },

    plugins: [
      vue({}),
      Inspect(),
      AutoImport({
        dts: 'src/auto-imports.d.ts',
        include: [
          /\.[tj]sx?$/,
          /\.vue$/, /\.vue\?vue/,
          /\.md$/,
        ],
        imports: [
          'vue',
          'vue-router',
          'pinia',
        ],
        resolvers: [ElementPlusResolver(), VantResolver()]
      }),
      Components({
        dts: 'src/auto-components.d.ts',
        dirs: ['src/components', 'src/render', 'src/editor', 'src/admin'],
        resolvers: [ElementPlusResolver(), VantResolver()
        ],
      }),
      
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/image')],
        symbolId: 'icon-[dir]-[name]',
        inject: 'body-last',
        customDomId: '__svg__icons__dom__'
      }),
    ]
  }
})
