export const config = {
  name: 'sso-log',
  title: 'sso 日志',
  elements: [
    {
      uuid: '1662126644525',
      name: 'zh-container',
      type: 'root',
      style: {
        width: '100%',
        padding: '16px'
      },
      actions: [
        {

        }
      ],
      modelValue: '',
      propConfig: {},
      animations: [],
      childrens: [
        {
          uuid: '1662126786340',
          name: 'zh-form',
          type: 'form',
          style: {
            height: '100px'
          },
          actions: [],
          modelValue: {},
          propConfig: {
            label: '表单',
            formItemWidth: '',
            labelWidth: '',
            labelPosition: ''
          },
          animations: [],
          childrens: [
            {
              uuid: '1662126789908',
              name: 'zh-input',
              type: 'input',
              style: {},
              actions: [],
              modelValue: '',
              propConfig: {
                label: '输入框',
                field: '',
                placeholder: '请输入',
                labelWidth: '100px',
                labelPosition: 'right'
              },
              animations: []
            },
            {
              uuid: '1662126792173',
              name: 'zh-button',
              type: 'button',
              style: {
                display: 'inline-block'
              },
              actions: [],
              modelValue: '',
              propConfig: {
                label: '按钮'
              },
              animations: []
            }
          ]
        }
      ]
    }
  ],
  settings: {}
}
