import { IElement, ILib, IPage, ISnapshot } from "./interface"
import { componentsConfig } from "../components";

// 测试无限层渲染数据
export const loopElements: IElement[] = [
  {
    uuid: 's001',
    name: 'zh-container',
    type: 'container',
    style: { position: 'absolute' },
    events: [],
    propValue: 'page',
    propConfig: { k: 'kk'},
    childrens: [
      {
        uuid: 's002',
        name: 'zh-input',
        
        style: { width: '200px' },
        events: [],
        propValue: "zonghuang",
        propConfig: { placeholder: '请输入' },
        animations: [],
        childrens: []
      },
      {
        uuid: "s003",
        name: "zh-button",
        style: {},
        events: [],
        propValue: "提交",
        propConfig: {},
        animations: [],
        childrens: [
          {
            uuid: "s008",
            name: 'zh-button',
            style: {},
            events: [],
            propValue: "嵌套按钮",
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
        propValue: "容器",
        propConfig: {},
        animations: [],
        childrens: [
          {
            uuid: "s0101",
            name: "zh-container",
            type: 'container',
            style: {},
            events: [],
            propValue: "子容器1",
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
            propValue: "子容器2",
            propConfig: {},
            animations: [],
            childrens: [
              {
                uuid: "s01021",
                name: "zh-container",
                type: 'container',
                style: {},
                events: [],
                propValue: "孙容器1",
                propConfig: {},
                animations: [],
                childrens: [
                  {
                    uuid: "s010211",
                    name: "zh-container",
                    type: 'container',
                    style: {},
                    events: [],
                    propValue: "曾孙容器1",
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
    propValue: 'page',
    propConfig: { k: 'kk'},
    childrens: [
      {
        uuid: "s0077inlineNoncontainer",
        name: "zh-button",
        
        style: { display: 'inline-block' },
        events: [],
        propValue: "inlineNoncontainer",
        propConfig: {}
      },
      {
        uuid: "s007inlineNoncontainer",
        name: "zh-button",
        
        style: { display: 'inline-block' },
        events: [],
        propValue: "按钮-inlineNoncontainer",
        propConfig: {}
      },
      {
          uuid: "s003blockNoncontainer",
          name: "zh-input",
          
          style: { width: '100%' },
          events: [],
          propValue: "请输入-blockNoncontainer",
          propConfig: {}
      },
      {
        uuid: 's2',
        name: 'zh-container',
        type: 'container',
        style: { display: 'block', position: 'relative' },
        events: [],
        propValue: 'page',
        propConfig: { k: 'kk'},
        childrens: [
          {
            uuid: 's002容器inlineContainer',
            name: 'zh-container',
            type: 'container',
            style: { display: 'inline-block', width: '250px', height: '150px', background: 'pink' },
            events: [],
            propValue: 'page',
            propConfig: { k: 'kk'},
            childrens: []
          },
          {
            uuid: 's0025容器inlineContainer',
            name: 'zh-container',
            type: 'container',
            style: { display: 'inline-block', width: '300px', height: '150px', background: 'blue' },
            events: [],
            propValue: 'page',
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
        propValue: 'page',
        propConfig: { k: 'kk'},
        childrens: []
      },
      {
        uuid: 's0025容器inlineContainer1',
        name: 'zh-container',
        type: 'container',
        style: { display: 'inline-block', width: '300px', height: '150px', background: 'blue' },
        events: [],
        propValue: 'page',
        propConfig: { k: 'kk'},
        childrens: []
      },
      {
        uuid: 's0083容器blockContainer',
        name: 'zh-container',
        type: 'container',
        style: { width: '100%', height: '50px', background: '#888' },
        events: [],
        propValue: 'page',
        propConfig: { k: 'kk'},
        childrens: []
      },
      {
        uuid: 's008容器blockContainer',
        name: 'zh-container',
        type: 'container',
        style: { width: '100%', height: '80px', background: '#eee' },
        events: [],
        propValue: 'page',
        propConfig: { k: 'kk'},
        childrens: [
          {
            uuid: 's0083容器999',
            name: 'zh-container',
            type: 'container',
            style: { width: '80%', height: '40px', background: '#888' },
            events: [],
            propValue: 'page',
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
          { label: '单行输入框', name: 'zh-input', icon: '' },
          { label: '多行文本框', name: 'zh-textarea', icon: '' },
          { label: '范围输入框', name: 'zh-range', icon: '' },
          { label: '复合型输入框', name: 'zh-mixed', icon: '' },
          { label: '数字输入框', name: 'zh-number', icon: '' },
          { label: '金额输入框', name: 'zh-money', icon: '' },
          { label: '计算公式', name: 'zh-formula', icon: '' }
        ]
      },
      {
        label: 'group-3',
        name: 'group-3',
        childrens: [
          { label: '密码输入框', name: 'zh-password', icon: '' },
          { label: '电话输入框', name: 'zh-phone', icon: '' },
          { label: '邮箱输入框', name: 'zh-email', icon: '' },
          { label: '身份证输入框', name: 'zh-identity-card', icon: '' },
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
          { label: '下拉选择器', name: 'zh-select', icon: '' },
          { label: '级联选择器', name: 'zh-cascader', icon: '' },
          { label: '日期选择器', name: 'zh-date-picker', icon: '' },
          { label: '日期范围选择器', name: 'zh-date-time-picker', icon: '' },
          { label: '时间选择', name: 'zh-time-select', icon: '' },
          { label: '时间范围选择器', name: 'zh-time-picker', icon: '' },
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
