export default {
  uuid: '',
  name: 'zh-modal',
  type: 'modal',
  style: {},
  actions: [],
  modelValue: '',
  property: {
    label: '模态框',
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
      actions: [],
      modelValue: '',
      property: {},
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
      actions: [],
      modelValue: '',
      property: {},
      animations: [],
      childrens: [
        {
          uuid: '',
          name: 'zh-button',
          type: 'button',
          style: { display: 'inline-block' },
          actions: [],
          modelValue: '',
          property: { label: '取 消' },
          animations: []
        },
        {
          uuid: '',
          name: 'zh-button',
          type: 'button',
          style: { display: 'inline-block' },
          actions: [],
          modelValue: '',
          property: { type: 'primary', label: '确 认' },
          animations: []
        }
      ]
    }
  ]
}
