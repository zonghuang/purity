/**
 * 把文本转换成标题形式
 * 把每个单词的第一个字母转成大写形式，并把单词的其余部分转成小写形式
 * 单词之间用任意空白字符进行分隔，比如空格、Tab 或换行符
 */
export const upperCasePipe = (str: string) => {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (firstChar) => firstChar.toUpperCase())
}
