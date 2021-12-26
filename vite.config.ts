import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver, VantResolver } from 'unplugin-vue-components/resolvers'

import fs from 'fs'
import path from 'path'
// console.log(fs);


// const DynamicComponentResolver = name => {
//   const file = path.resolve(__dirname, `src/components/zh-input.vue`)
//   // console.log(name);
//   console.log(file);
  
  

//   if (fs.existsSync(file)) {
//     return file
//   }
// }



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({}),
    AutoImport({
      dts: 'src/auto-import.d.ts',
      resolvers: [ElementPlusResolver(), VantResolver(),]
    }),
    Components({
      dirs: ['src/components', 'src/render'],
      resolvers: [ElementPlusResolver(), VantResolver(), (name) => {
        console.log(name);
        if (name.startsWith('Lyy')) {
          // import('./src/admin/components/').then(mod => {
          //   console.log(mod);
          // })
          // const file = path.resolve(__dirname, `src/components/lyy-btn.vue`)
          // console.log(file);
          // import(`./src/admin/components/lyy-btn.vue`).then(res => {
          //   console.log(res);
            
          // })
          
          return { importName: name, path: '/src/admin/components/'}
        }
      }]
    }),
  ],
  resolve: {
    alias: [
      { find: 'vue', replacement: 'vue/dist/vue.esm-bundler.js' }
    ]
  }
})

// function custromResolvers() {
//   const packName = ['debounce', 'throttle', 'stringify']
//   return [
//     {
//       type: "utils",
//       resolve: (name) => {
//         if (!packName.includes(name)) return
//         return {
//           path: '@/utils',
//         }
//       }
//     }
//   ]
// }