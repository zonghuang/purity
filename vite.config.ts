import path from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver, VantResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import Inspect from 'vite-plugin-inspect'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({}),
    AutoImport({
      resolvers: [ElementPlusResolver(), VantResolver()]
    }),
    Components({
      dirs: ['src/components', 'src/render', 'src/editor'],
      resolvers: [ElementPlusResolver(), VantResolver()
      ],
    }),
    
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/editor/assets/image')],
      symbolId: 'icon-[dir]-[name]',
      inject: 'body-last',
      customDomId: '__svg__icons__dom__'
    }),
    Inspect()
  ],
  resolve: {
    alias: {
      '@': 'src',
    }
  }
})
