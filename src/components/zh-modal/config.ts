export default {
  uuid: '',
  name: 'zh-modal',
  type: 'modal',
  style: {},
  events: [],
  propValue: '',
  propConfig: {
    title: '模态框',
    width: '500px',
    visible: true,
    modal: true,
    closeOnClickModal: true
  },
  animations: [],
  childrens: [
    {
      uuid: '',
      name: 'zh-container',
      type: 'container',
      style: { minHeight: '100px', overflowY: 'scroll' },
      events: [],
      propValue: '',
      propConfig: {},
      animations: [],
      childrens: []
    },
    {
      uuid: '',
      name: 'zh-container',
      type: 'container',
      style: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        columnGap: '12px',
        height: '44px'
      },
      events: [],
      propValue: '',
      propConfig: {},
      animations: [],
      childrens: [
        {
          uuid: '',
          name: 'zh-button',
          type: 'button',
          style: { display: 'inline-block' },
          events: [],
          propValue: '取 消',
          propConfig: {},
          animations: []
        },
        {
          uuid: '',
          name: 'zh-button',
          type: 'button',
          style: { display: 'inline-block' },
          events: [],
          propValue: '确 认',
          propConfig: { type: 'primary' },
          animations: []
        }
      ]
    }
  ]
}
