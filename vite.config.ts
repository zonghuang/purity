import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver, VantResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      // template: {
      //   compilerOptions: {
      //     // 将所有包含短横线的标签作为自定义元素处理
      //     isCustomElement: tag => tag.includes('-')
      //   }
      // }
    }),
    AutoImport({
      
      resolvers: [ElementPlusResolver(), VantResolver(), (name) => {
        console.log(name);
        if (name.startsWith('zh'))
          return { importName: name.slice(2), path: './src/components/'}
      }],
    }),
    Components({
      dirs: ['src/components', 'src/admin/components'],
      resolvers: [ElementPlusResolver(), VantResolver(), (name) => {
        console.log(name);
        
        if (name.startsWith('zh'))
          return { importName: name.slice(2), path: './src/components/'}
      }],
    }),
  ],
  resolve: {
    alias: [
      { find: 'vue', replacement: 'vue/dist/vue.esm-bundler.js' }
    ]
  }
})
