export const config: Component[] = [
  {
    uuid: 'container',
    name: 'zh-container',
    children: [
      {
        uuid: 'elevated-button',
        name: 'zh-elevated-button',
        property: {
          label: 'Open Dialog'
        },
        actions: [
          {
            event: 'click',
            action: 'openDialog',
            options: {
              targetId: 'basic-dialog'
            }
          }
        ]
      },

      {
        uuid: 'form',
        name: 'zh-form',
        children: [
          {
            uuid: 'filled-text-field',
            name: 'zh-filled-text-field',
            modelValue: 'zonghuang',
            property: {
              label: 'User name',
              field: 'name',
              formId: 'form',
            }
          },
          {
            uuid: 'outlined-text-field',
            name: 'zh-outlined-text-field',
            modelValue: '',
            property: {
              label: 'Cellphone number',
              field: 'cellphone',
              formId: 'form',
            }
          },
          {
            uuid: 'extended-fab',
            name: 'zh-extended-fab',
            property: {
              icon: '@',
              label: 'Submit'
            }
          },
          {
            uuid: 'filled-button',
            name: 'zh-filled-button',
            property: {
              label: 'Reset'
            }
          }
        ]
      }
    ]
  },

  {
    uuid: 'basic-dialog',
    name: 'zh-basic-dialog',
    modelValue: false,
    property: {
      label: 'Dialog'
    },
    children: [
      {
        uuid: 'outlined-text-field1',
        name: 'zh-outlined-text-field',
        modelValue: '',
        property: {
          label: '名称',
          field: 'name',
          formId: 'form',
        }
      },
      {
        uuid: 'filled-tonal-button',
        name: 'zh-filled-tonal-button',
        property: {
          label: 'Close'
        },
        actions: [
          {
            event: 'click',
            action: 'closeDialog',
            options: {
              targetId: 'basic-dialog'
            }
          }
        ]
      }
    ]
  }
]

// export const config: any = [
// {
//   uuid: '1662126644525',
//   name: 'zh-container',
//   type: 'root',
//   style: {
//     width: '100%',
//     padding: '16px'
//   },
//   actions: [
//     {
//       event: 'click',
//       action: 'openModal',
//       option: {
//         targetId: 'm1',
//       }
//     }
//   ],
//   modelValue: '',
//   property: {},
//   animations: [],
//   childrens: [
//     {
//       uuid: '1662126786340',
//       name: 'zh-form',
//       type: 'form',
//       style: {
//         height: '100px'
//       },
//       actions: [
//         {
//           event: 'click',
//           action: 'openModal',
//           option: {
//             targetId: 'm2',
//           }
//         }
//       ],
//       modelValue: {},
//       property: {
//         label: '表单',
//         formItemWidth: '',
//         labelWidth: '',
//         labelPosition: ''
//       },
//       animations: [],
//       childrens: [
//         {
//           uuid: '1662126789908',
//           name: 'zh-filled-text-field',
//           type: 'input',
//           style: {},
//           actions: [],
//           modelValue: '',
//           property: {
//             label: 'Label text',
//             field: '',
//           },
//           animations: []
//         },
//         {
//           uuid: '1662126789908',
//           name: 'zh-outlined-text-field',
//           type: 'input',
//           style: {},
//           actions: [],
//           modelValue: '',
//           property: {
//             label: 'Label text',
//             field: '',
//           },
//           animations: []
//         },
//         {
//           uuid: '1662126792173',
//           name: 'zh-elevated-button',
//           type: 'button',
//           style: {},
//           actions: [
//             {
//               event: 'click',
//               action: 'openModal',
//               option: {
//                 targetId: 'm1',
//               }
//             }
//           ],
//           property: {
//             label: 'Elevated button'
//           },
//           animations: []
//         },
//         {
//           uuid: '16621267921777',
//           name: 'zh-fab',
//           type: 'button',
//           style: {},
//           actions: [],
//           property: {
//             icon: '@'
//           },
//           animations: []
//         },
//         {
//           uuid: '16621767921777',
//           name: 'zh-switch',
//           type: 'switch',
//           style: {},
//           actions: [],
//           modelValue: '',
//           property: {
//             label: 'Label text',
//             field: '',
//           },
//           animations: []
//         }
//       ]
//     }
//   ],
//   slots: [
//     {
//       name: 'header',
//       childrens: [
//         {
//           uuid: '166212ggg8',
//           name: 'zh-filled-text-field',
//           type: 'input',
//           modelValue: '',
//           property: {
//             label: 'Slot Label text',
//             field: '',
//           },
//         },
//         {
//           uuid: '16asdafg',
//           name: 'zh-elevated-button',
//           type: 'button',
//           property: {
//             label: 'Slot Header'
//           },
//         },
//       ],
//     },
//     {
//       name: 'footer',
//       childrens: [
//         {
//           uuid: '16asd',
//           name: 'zh-elevated-button',
//           type: 'button',
//           modelValue: '',
//           property: {
//             // icon: '+',
//             label: 'Slot Footer'
//           },
//         },
//       ],
//     },
//   ],
// },

//   {
//     name: 'zh-container',
//     children: [
//       {
//         uuid: 'elevated-button',
//         name: 'zh-elevated-button',
//         property: {
//           label: 'Elevated button'
//         },
//         actions: [
//           {
//             event: 'click',
//             action: 'openDialog',
//             options: {
//               targetId: '12'
//             }
//           }
//         ]
//       },
//       {
//         uuid: 'extended-fab',
//         name: 'zh-extended-fab',
//         property: {
//           icon: '@',
//           label: 'Extended fab'
//         }
//       },
//       {
//         uuid: 'fab',
//         name: 'zh-fab',
//         property: {
//           icon: '@'
//         }
//       },
//       {
//         uuid: 'filled-button',
//         name: 'zh-filled-button',
//         property: {
//           label: 'Filled button'
//         }
//       },
//       {
//         uuid: 'filled-tonal-button',
//         name: 'zh-filled-tonal-button',
//         property: {
//           label: 'Filled tonal button'
//         }
//       },
//       {
//         uuid: 'outlined-button',
//         name: 'zh-outlined-button',
//         property: {
//           label: 'Outlined button'
//         }
//       },
//       {
//         uuid: 'switch',
//         name: 'zh-switch',
//         modelValue: false,
//         property: {}
//       },
//       {
//         uuid: 'filled-text-field',
//         name: 'zh-filled-text-field',
//         modelValue: '',
//         property: {
//           label: 'Label text',
//           field: ''
//         }
//       },
//       {
//         uuid: 'outlined-text-field',
//         name: 'zh-outlined-text-field',
//         modelValue: '',
//         property: {
//           label: 'Label text',
//           field: ''
//         }
//       }
//     ]
//   }
// ]
