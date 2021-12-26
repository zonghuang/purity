import { defineCustomElement } from 'vue'


// 导入
import ZhButton from './zh-button/zh-button.ce.vue'
import ZhInput from './zh-input/zh-input.ce.vue'

// 转换为自定义元素构造器
const MyButton = defineCustomElement(ZhButton)
const MyInput = defineCustomElement(ZhInput)

// 导出独立的元素
export { MyButton, MyInput }

// 注册
export function register() {
  customElements.define('zh-button', MyButton)
  customElements.define('zh-input', MyInput)
}



// 开发环境：全量导入
// export function register() {
//   const modules = import.meta.glob('./**/*.ce.vue');
//   for (const path in modules) {
//     modules[path]().then((mod) => {      
//       customElements.define(path.split('/')[1], defineCustomElement(mod))
//     })
//   }
// }

// 生产环境：按需导入
// export function register(demands: string[]) {
//   for (const name of demands) {
//     import(`./${name}/${name}.ce.vue`).then(mod => {
//       customElements.define(name, defineCustomElement(mod))
//     })
//   }
// }

/**
 * 把每个单词的首字母转为大写
 * @param title 标题
 * @param separator1 单词分隔符号
 * @param separator2 单词合并符号
 * @returns 每个单词首字母大写的标题
 */
function toTitleCase(title: string, separator1: string = ' ', separator2: string = ' ') {
  const words = title.split(separator1);
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].slice(0, 1).toUpperCase() + words[i].slice(1).toLowerCase();
  }
  return words.join(separator2);
}
