import path from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver, VantResolver } from 'unplugin-vue-components/resolvers'
// import Icons from 'unplugin-icons/vite'
// import IconsResolver from 'unplugin-icons/resolver'
import viteSvgIcons from 'vite-plugin-svg-icons';
import Inspect from 'vite-plugin-inspect'


// 注意：element-plus icon 图标目前还不支持自动导入，官网显示正在开发中
// 所以下面 IconsResolver() 导入没有生效，到时候官网开发完再看看什么情况

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({}),
    AutoImport({
      // dts: './auto-imports.d.ts',
      resolvers: [ElementPlusResolver(), VantResolver()]
    }),
    Components({
      // dts: './components.d.ts',
      dirs: ['src/components', 'src/render', 'src/editor'],
      resolvers: [ElementPlusResolver(), VantResolver(),
        // IconsResolver({enabledCollections: ['ep']}),
        // 自定义 resolver
        // (name) => {
        //   console.log(name);
        //   if (name.startsWith('Lyy')) {
        //     return { importName: name, path: '/src/admin/components/' }
        //   }
        // }
      ],
    }),
    // Icons({ autoInstall: true }),
    viteSvgIcons({iconDirs: [path.resolve(process.cwd(), 'src/editor/assets')], symbolId: 'icon-[dir]-[name]'}),
    Inspect(),
  ],
  resolve: {
    alias: {
      '@': 'src',
    },
  }
})
