// 打开弹窗
// [{
//   userAction: 'click',
//   event: 'openModal',
//   option: { modalId: '123456' },
//   thenEvents: []
// }]

// 关闭弹窗
// [{
//   userAction: 'click',
//   event: 'closeModal',
//   option: { modalId: '123456' },
//   thenEvents: []
// }]

// 链接跳转
// [{
//   userAction: 'click',
//   event: 'link',
//   option: {
//     url: '/abc/details',                      // 当前域名下的既可以使用相对 url，也可以使用完整 url
//     // url: 'https://baidu.com/abc/details',  // 其他域名使用完整 url
//     window: '_self',                          // _self 当前窗口打开，_blank 新窗口打开
//     transferMode: 'query',                    // query 传参方式(即 ? 形式拼接参数到 url)，params 传参方式(即参数不拼接到 url)
//     params: [],
//   },
//   thenEvents: []
// }]


// 请求数据
// {
//   data: [{ label: '上架', value: 1 }, { label: '下架', value: 0 }]
// }
// {
//   dada: { name: 'kobe', age: 18 }
// }
// [{
//   userAction: '',
//   event: 'fetch',
//   option: {
//     api: '/api/xxx.com/abc',
//     method: 'POST', // GET、POST、DELETE、PATCH
//     loading: true,
//     params: [],
//     assign: 'components',	// component、components、componentOptions、cacheData
//     target: '123987', // 情况一：单个组件（即 assign 值为 component / componentOptions时）
//   },
//   thenEvents: []
// }]

// {
//   uuid: '123988',
//   modelValue: { name: 'kobe', age: 18 },
//   // ...其他属性
// }


// {
//   uuid: '123987',
//   propConfig: {
//     options: [{ label: '上架', value: 1 }, { label: '下架', value: 0 }],
//     // ...其他属性
//   },
//   // ...其他属性
// }

// 请求数据
// {
//   data: {
//     tableData: [{ id: 1, name: 'aaa', time: '4/19' }, { id: 2, name: 'bbb', time: '4/20' } ],
//     total: 100,
//   }
// }
// [{
//   userAction: '',
//   event: 'fetch',
//   option: {
//     api: '/api/xxx.com/abc',
//     method: 'POST', // GET、POST、DELETE、PATCH
//     loading: true,
//     params: [],
//     assign: 'components',	// component、components、componentOptions、cacheData
//     targets: [
//       { source: 'tableData', target: '123789' },
//       { source: 'total', target: '456789' }
//     ], // 情况二：多个组件或缓存数据（即 assign 值为 components / cacheData）
//   },
//   thenEvents: []
// }]

// {
//   uuid: '123789',
//   modelValue: [{ id: 1, name: 'aaa', time: '4/19' }, { id: 2, name: 'bbb', time: '4/20' } ],
//   // ...其他属性
// }

// {
//   uuid: '456789',
//   modelValue: 100,
//   // ...其他属性
// }

// {
//   xxyy: [{ id: 1, name: 'aaa', time: '4/19' }, { id: 2, name: 'bbb', time: '4/20' } ],
//   yyzz: 100
// }


// // 重置组件值
// [{
//   userAction: 'click',
//   event: 'reset',
//   option: { target: '123789' },
//   thenEvents: []
// }]

// // 赋值给组件
[{
  userAction: '',
  bindCode: '',
  event: 'set',
  option: {
    assign: '', // component、components、componentOptions、cacheData
    params: [],
    target: '',
    targets: [{ source: '', target: '' }],
  },
  thenEvents: []
}]



// /*****************************/
// // params
// [
//   { type: 'input', key: '输入', value: '输入' },
//   { type: 'inputSelect', key: '输入', value: '选择' }, // 值取组件 modelValue
//   { type: 'select', key: '选择', value: '选择' },	// 键取组件 field，值取组件 modelValue
//   { type: 'inputSelectInput', key: '输入', value: '选择', deepProp: '' } // 值取组件 modelValue 的深层属性
// ]

// // key -> realKey
// currentRow -> currentRow
// selectedRows -> selectedRows
// rowKey -> 当前的 primaryKey
// rowsKeys -> 选中的 primaryKey（数组）
// component -> field

// // value -> realValue
// routeQuery
// routeParams
// currentRow
// selectedRows
// currentRowKey
// selectedRowsKeys
// component -> modelValue

