export default {
  uuid: '',
  name: 'zh-table',
  type: 'table',
  style: {},
  events: [],
  modelValue: '',
  propConfig: {
    title: '表格数据',
    showBorder: false,
    // height: '',
    // maxHeight: '',
    showSelection: true,
    showStripe: false,
    showOperations: true,
    operations: [],
    columns: [
      {
        label: '名字',
        field: 'name',
        width: '100',
        // fixed: true
      },
      {
        label: '性别',
        field: 'gender',
        width: ''
      },
      {
        label: '职业',
        field: 'work',
        width: ''
      },
      {
        label: '城市',
        field: 'city',
        width: ''
      },
    ]
  },
  animations: [],
  childrens: []
}
