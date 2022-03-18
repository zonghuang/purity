import { IElement, ILib, IPage, ISnapshot } from "./interface-type"
import { componentsConfig } from "./components";

// 测试无限层渲染数据
export const loopElements: IElement[] = [
  {
    uuid: 's001',
    name: 'zh-container',
    type: 'container',
    style: { position: 'absolute' },
    events: [],
    modelValue: 'page',
    propConfig: { k: 'kk'},
    childrens: [
      {
        uuid: 's002',
        name: 'zh-input',
        type: 'input',
        style: { width: '200px' },
        events: [],
        modelValue: "zonghuang",
        propConfig: { placeholder: '请输入' },
        animations: [],
        childrens: []
      },
      {
        uuid: "s003",
        name: "zh-button",
        type: 'button',
        style: {},
        events: [],
        modelValue: "提交",
        propConfig: {},
        animations: [],
        childrens: [
          {
            uuid: "s008",
            name: 'zh-button',
            type: 'button',
            style: {},
            events: [],
            modelValue: "嵌套按钮",
            propConfig: { type: 'success' },
            animations: [],
            childrens: []
          }
        ]
      },
      {
        uuid: "s010",
        name: 'zh-container',
        type: 'container',
        style: {},
        events: [],
        modelValue: "容器",
        propConfig: {},
        animations: [],
        childrens: [
          {
            uuid: "s0101",
            name: "zh-container",
            type: 'container',
            style: {},
            events: [],
            modelValue: "子容器1",
            propConfig: {},
            animations: [],
            childrens: []
          },
          {
            uuid: "s0102",
            name: "zh-container",
            type: 'container',
            style: {},
            events: [],
            modelValue: "子容器2",
            propConfig: {},
            animations: [],
            childrens: [
              {
                uuid: "s01021",
                name: "zh-container",
                type: 'container',
                style: {},
                events: [],
                modelValue: "孙容器1",
                propConfig: {},
                animations: [],
                childrens: [
                  {
                    uuid: "s010211",
                    name: "zh-container",
                    type: 'container',
                    style: {},
                    events: [],
                    modelValue: "曾孙容器1",
                    propConfig: {},
                    animations: [],
                    childrens: []
                  },
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

export const loopElements1: IElement[] = [
  {
    uuid: 's001',
    name: 'zh-container',
    type: 'container',
    style: { margin: 0, padding: 0, width: '100%', height: '600px', background: '#ccc', border: 'none' },
    events: [],
    modelValue: 'page',
    propConfig: { k: 'kk'},
    childrens: [
      {
        uuid: "s0077inlineNoncontainer",
        name: "zh-button",
        type: 'button',
        style: { display: 'inline-block' },
        events: [],
        modelValue: "inlineNoncontainer",
        propConfig: {}
      },
      {
        uuid: "s007inlineNoncontainer",
        name: "zh-button",
        type: 'button',
        style: { display: 'inline-block' },
        events: [],
        modelValue: "按钮-inlineNoncontainer",
        propConfig: {}
      },
      {
          uuid: "s003blockNoncontainer",
          name: "zh-input",
          type: 'input',
          style: { width: '100%' },
          events: [],
          modelValue: "请输入-blockNoncontainer",
          propConfig: {}
      },
      {
        uuid: 's2',
        name: 'zh-container',
        type: 'container',
        style: { display: 'block', position: 'relative' },
        events: [],
        modelValue: 'page',
        propConfig: { k: 'kk'},
        childrens: [
          {
            uuid: 's002容器inlineContainer',
            name: 'zh-container',
            type: 'container',
            style: { display: 'inline-block', width: '250px', height: '150px', background: 'pink' },
            events: [],
            modelValue: 'page',
            propConfig: { k: 'kk'},
            childrens: []
          },
          {
            uuid: 's0025容器inlineContainer',
            name: 'zh-container',
            type: 'container',
            style: { display: 'inline-block', width: '300px', height: '150px', background: 'blue' },
            events: [],
            modelValue: 'page',
            propConfig: { k: 'kk'},
            childrens: []
          },
        ]
      },
      {
        uuid: 's002容器inlineContainer换个风格',
        name: 'zh-container',
        type: 'container',
        style: { display: 'inline-block', width: '400px', height: '150px', background: 'pink' },
        events: [],
        modelValue: 'page',
        propConfig: { k: 'kk'},
        childrens: []
      },
      {
        uuid: 's0025容器inlineContainer1',
        name: 'zh-container',
        type: 'container',
        style: { display: 'inline-block', width: '300px', height: '150px', background: 'blue' },
        events: [],
        modelValue: 'page',
        propConfig: { k: 'kk'},
        childrens: []
      },
      {
        uuid: 's0083容器blockContainer',
        name: 'zh-container',
        type: 'container',
        style: { width: '100%', height: '50px', background: '#888' },
        events: [],
        modelValue: 'page',
        propConfig: { k: 'kk'},
        childrens: []
      },
      {
        uuid: 's008容器blockContainer',
        name: 'zh-container',
        type: 'container',
        style: { width: '100%', height: '80px', background: '#eee' },
        events: [],
        modelValue: 'page',
        propConfig: { k: 'kk'},
        childrens: [
          {
            uuid: 's0083容器999',
            name: 'zh-container',
            type: 'container',
            style: { width: '80%', height: '40px', background: '#888' },
            events: [],
            modelValue: 'page',
            propConfig: { k: 'kk'},
            childrens: []
          }
        ]
      },
    ]
  }
]


// 组件库列表
export const componentLibs: ILib[] = [
  {
    label: '临时测试',
    name: 'test',
    childrens: [
      {
        label: 'group-1',
        name: 'group-1',
        childrens: [
          { label: '容器', name: 'zh-container', icon: '' },
          { label: '按钮', name: 'zh-button', icon: '' },
          { label: '单行输入框', name: 'zh-input', icon: '' },
          { label: '下拉选择器', name: 'zh-select', icon: '' },
          { label: '表单', name: 'zh-form', icon: '' },
          { label: '表格', name: 'zh-table', icon: '' },
          { label: '模态框', name: 'zh-modal', icon: '' }
        ]
      }
    ]
  },
  {
    label: '基础组件',
    name: 'basic',
    childrens: [
      {
        label: 'group-1',
        name: 'group-1',
        childrens: [
          { label: '标题/段落', name: 'zh-text', icon: '' },
          { label: '链接', name: 'zh-link', icon: '' },
          { label: '按钮', name: 'zh-button', icon: '' },
          { label: 'html', name: 'zh-html', icon: '' }
        ]
      },
      {
        label: 'group-2',
        name: 'group-2',
        childrens: [
          { label: '单行文本', name: 'zh-input', icon: '' },
          { label: '多行文本', name: 'zh-textarea', icon: '' },
          { label: '区间范围', name: 'zh-range', icon: '' },
          { label: '文本+单位', name: 'zh-mixed', icon: '' },
          { label: '数字', name: 'zh-number', icon: '' },
          { label: '金额', name: 'zh-money', icon: '' },
          { label: '计算公式', name: 'zh-formula', icon: '' }
        ]
      },
      {
        label: 'group-3',
        name: 'group-3',
        childrens: [
          { label: '密码', name: 'zh-password', icon: '' },
          { label: '手机/电话', name: 'zh-phone', icon: '' },
          { label: '邮箱', name: 'zh-email', icon: '' },
          { label: '身份证', name: 'zh-identity-card', icon: '' },
          // 银行卡(开户行、卡号、姓名)
          // 地址(省市区街道)
          { label: '银行卡', name: 'zh-credit-card', icon: '' },
          { label: '地址', name: 'zh-address', icon: '' }
        ]
      },
      {
        label: 'group-4',
        name: 'group-4',
        childrens: [
          { label: '单选框', name: 'zh-radio', icon: '' },
          { label: '多选框', name: 'zh-checkbox', icon: '' },
          { label: '开关', name: 'zh-switch', icon: '' },
          { label: '评分', name: 'zh-rate', icon: '' },
          { label: '取色', name: 'zh-color', icon: '' },
          { label: '滑块', name: 'zh-slider', icon: '' }
        ]
      },
      {
        label: 'group-5',
        name: 'group-5',
        childrens: [
          { label: '下拉选择', name: 'zh-select', icon: '' },
          { label: '级联选择', name: 'zh-cascader', icon: '' },
          { label: '日期选择', name: 'zh-date-picker', icon: '' },
          { label: '日期范围', name: 'zh-date-time-picker', icon: '' },
          { label: '时间选择', name: 'zh-time-select', icon: '' },
          { label: '时间范围', name: 'zh-time-picker', icon: '' },
          { label: '树', name: 'zh-tree', icon: '' },
          { label: '穿梭框', name: 'zh-transfer', icon: '' }
        ]
      }
    ]
  },
  {
    label: '媒体组件',
    name: 'media',
    childrens: [
      {
        label: 'group-1',
        name: 'group-1',
        childrens: [
          { label: '图片', name: 'zh-picture', icon: '' },
          { label: '视频', name: 'zh-video', icon: '' },
          { label: '音频', name: 'zh-audio', icon: '' },
          { label: '附件', name: 'zh-upload', icon: '' },
          { label: '富文本', name: 'zh-rich-text', icon: '' }
        ]
      }
    ]
  },
  {
    label: '容器组件',
    name: 'container',
    childrens: [
      {
        label: 'group-1',
        name: 'group-1',
        childrens: [
          { label: '容器', name: 'zh-container', icon: '' },
          { label: '表单', name: 'zh-form', icon: '' },
          { label: '标签页', name: 'zh-tabs', icon: '' },
          { label: '模态框', name: 'zh-modal', icon: '' },
          { label: '抽屉', name: 'zh-drawer', icon: '' }
        ]
      }
    ]
  },
  {
    label: '图表组件',
    name: 'chart',
    childrens: [
      {
        label: 'group-1',
        name: 'group-1',
        childrens: [
          { label: '表格', name: 'zh-table', icon: '' },
          { label: '柱状图', name: 'zh-bar', icon: '' },
          { label: '饼状图', name: 'zh-pie', icon: '' },
          { label: '折线图', name: 'zh-line', icon: '' }
        ]
      }
    ]
  },
  {
    label: '反馈组件',
    name: 'feedback',
    childrens: [
      {
        label: 'group-1',
        name: 'group-1',
        childrens: [
          { label: '消息提示', name: 'zh-message', icon: '' },
          { label: '文字提示', name: 'zh-tooltip', icon: '' },
          { label: 'loading', name: 'zh-loading', icon: '' },
          { label: '结果', name: 'zh-rusult', icon: '' },
          { label: '通知', name: 'zh-notice', icon: '' },
          { label: '徽章', name: 'zh-badge', icon: '' }
        ]
      }
    ]
  },
  {
    label: '其他组件',
    name: 'other',
    childrens: [
      {
        label: 'group-1',
        name: 'group-1',
        childrens: [
          { label: '卡片', name: 'zh-card', icon: '' },
          { label: '轮播图', name: 'zh-carousel', icon: '' },
          { label: '面包屑', name: 'zh-breadcrumb', icon: '' },
          { label: '工具栏', name: 'zh-toolbar', icon: '' },
          { label: '分页', name: 'zh-pagination', icon: '' },
          { label: '折叠板', name: 'zh-collapse', icon: '' },
          { label: 'Tag 标签', name: 'zh-tag', icon: '' },
          { label: '时间线', name: 'zh-timeline', icon: '' },
          { label: '步骤条', name: 'zh-steps', icon: '' },
          { label: '菜单', name: 'zh-menu', icon: '' }
        ]
      }
    ]
  },
  {
    label: '业务组件',
    name: 'business',
    childrens: [
      // {
      //   label: 'group-1',
      //   name: 'group-1',
      //   childrens: []
      // }
    ]
  },
  {
    label: '自定义组件',
    name: 'custom',
    childrens: [
      // {
      //   label: 'group-1',
      //   name: 'group-1',
      //   childrens: []
      // }
    ]
  },
]

// 组件的默认数据
export { componentsConfig }

// 所有页数据
export const pages: IPage[] = [
  {
    id: 'p1',
    name: '首页',
    elements: [],
    settings: {},
    modalList: []
  },
  // {
  //   id: 'p2',
  //   name: '详情页',
  //   elements: [],
  //   settings: {}
  // }
]

// 当前页数据
export const currentPage: IPage = {
  id: 'p1',
  name: '首页',
  elements: [],
  settings: {},
  modalList: []
}

// 当前组件
export const currentComponent: IElement | null = null

// 当前快照
export const snapshot: ISnapshot = {
  id: 'p1',
  index: -1,
  List: []
}

export const userActionOptions = [
  { label: '点击', value: 'click' },
  { label: '双击', value: 'dbclick' },
  { label: '触摸', value: 'touch' },
  { label: '滚动', value: 'scroll' },
]

// 事件选项
export const eventOptions = [
  { label: '打开弹窗', value: 'openModal' },
  { label: '关闭弹窗', value: 'closeModal' },
  { label: '跳转链接', value: 'link' },
  { label: '请求数据', value: 'request' },
]

// 请求方式
export const methodOptions = [
  { label: 'get', value: 'GET' },
  { label: 'post', value: 'POST' },
  { label: 'delete', value: 'DELETE' },
  { label: 'head', value: 'HEAD' },
  { label: 'put', value: 'PUT' },
  { label: 'patch', value: 'PATCH' },
]

export const categorys = [
  { label: 'Element Plus', value: 'elementplus' },
  { label: '布局', value: 'placement' },
  { label: '盒模型', value: 'boxmodel' },
  { label: '文字', value: 'font' },
  { label: '文本', value: 'text' },
  { label: 'CSS3 属性', value: 'css3' },
  { label: '高级输入', value: 'userinput' },
]

// 定位选项
export const positions = [
  { label: 'static', value: 'static' },
  { label: 'relative', value: 'relative' },
  { label: 'absolute', value: 'absolute' },
  { label: 'fixed', value: 'fixed' },
  { label: 'sticky', value: 'sticky' },
  { label: 'inherit', value: 'inherit' },
  { label: 'initial', value: 'initial' },
  { label: 'unset', value: 'unset' }
]

// 浮动选项
export const floatOptions = [
  { label: '不浮动', value: 'none' },
  { label: '向左浮动', value: 'left' },
  { label: '向右浮动', value: 'right' },
  { label: '在块容器的开始一侧浮动', value: 'inline-start' },
  { label: '在块容器的结束一侧浮动', value: 'inline-end' },
]

// 清除浮动选项
export const clearOptions = [
  { label: '元素被向下移动用于清除之前的左右浮动', value: 'both' },
  { label: '元素不会向下移动清除之前的浮动', value: 'none' },
  { label: '元素被向下移动用于清除之前的左浮动', value: 'left' },
  { label: '元素被向下移动用于清除之前的右浮动', value: 'right' },
  { label: '元素向下移动以清除其包含块的起始侧上的浮动', value: 'inline-start' },
  { label: '元素向下移动以清除其包含块的末端的浮点', value: 'inline-end' },
]

// 显示选项
export const displays = [
  { label: 'block', value: 'block' },
  { label: 'inline', value: 'inline' },
  { label: 'flex', value: 'flex' },
  { label: 'grid', value: 'grid' },
  { label: 'inline-block', value: 'inline-block' },
  { label: 'inline-flex', value: 'inline-flex' },
  { label: 'inline-grid', value: 'inline-grid' },
  { label: 'inherit', value: 'inherit' },
  { label: 'initial', value: 'initial' },
  { label: 'unset', value: 'unset' },
  { label: 'none', value: 'none' }
]

export const flexDirectionOptions = [
  { label: 'row', value: 'row' },
  { label: 'column', value: 'column' },
  { label: 'row-reverse', value: 'row-reverse' },
  { label: 'column-reverse', value: 'column-reverse' },
]

export const flexWrapOptions = [
  { label: 'wrap', value: 'wrap' },
  { label: 'nowrap', value: 'nowrap' }
]

export const alignItemsOptions = [
  { label: 'stretch', value: 'stretch' },
  { label: 'flex-start', value: 'flex-start' },
  { label: 'flex-end', value: 'flex-end' },
  { label: 'center', value: 'center' },
]

export const justifyContentOptions = [
  { label: 'stretch', value: 'stretch' },
  { label: 'flex-start', value: 'flex-start' },
  { label: 'flex-end', value: 'flex-end' },
  { label: 'center', value: 'center' },
  { label: 'space-around', value: 'space-around' },
  { label: 'space-between', value: 'space-between' },
]

export const alignSelfOptions = [
  { label: 'stretch', value: 'stretch' },
  { label: 'center', value: 'center' },
  { label: 'start', value: 'start' },
  { label: 'end', value: 'end' },
]

export const labelPositionOptions = [
  { label: '顶部对齐', value: 'top' },
  { label: '向左对齐', value: 'left' },
  { label: '向右对齐', value: 'right' },
]