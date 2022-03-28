export const tableData = [
  { icon: '😄', clientId: 'app122', appType: '电商', authMethod: '国家认证', appStatus: '已上线', auditStatus: '通过', contacts: 'zonghuang' },
  { icon: '😄', clientId: 'app12as4', appType: '设计', authMethod: '世界认证', appStatus: '已上线', auditStatus: '通过', contacts: 'kobe' },
  { icon: '😄', clientId: 'app2as4', appType: '设计', authMethod: '世界认证', appStatus: '已上线', auditStatus: '通过', contacts: 'kobe' },
  { icon: '😄', clientId: 'app122as4', appType: '设计', authMethod: '世界认证', appStatus: '已上线', auditStatus: '通过', contacts: 'kobe' },
  { icon: '😄', clientId: 'app122as4', appType: '设计', authMethod: '世界认证', appStatus: '已上线', auditStatus: '通过', contacts: 'kobe' },
  { icon: '😄', clientId: 'app122etas4', appType: '设计', authMethod: '世界认证', appStatus: '已上线', auditStatus: '通过', contacts: 'kobe' },
  { icon: '😄', clientId: 'app122svas4', appType: '设计', authMethod: '世界认证', appStatus: '已上线', auditStatus: '通过', contacts: 'kobe' },
  { icon: '😄', clientId: 'app122as4', appType: '设计', authMethod: '世界认证', appStatus: '已上线', auditStatus: '通过', contacts: 'kobe' },
  { icon: '😄', clientId: 'apas4', appType: '设计', authMethod: '世界认证', appStatus: '已上线', auditStatus: '通过', contacts: 'kobe' },
  { icon: '😄', clientId: 'ap22as4', appType: '设计', authMethod: '世界认证', appStatus: '已上线', auditStatus: '通过', contacts: 'kobe' },
  { icon: '😄', clientId: 'app122as4', appType: '设计', authMethod: '世界认证', appStatus: '已上线', auditStatus: '通过', contacts: 'kobe' },
]

export const resData = {
  tableData: tableData,
  total: 150
}

export const appData = {
  "id": "p1",
  "name": "首页",
  "elements": [
      {
          "uuid": "1647829917054",
          "name": "zh-container",
          "type": "root",
          "style": {
              "display": "block",
              "minHeight": "60px",
              "paddingRight": "16px",
              "paddingLeft": "16px",
              "background": "#f5f5f5",
              "paddingTop": "16px",
              "paddingBottom": "16px"
          },
          "events": [],
          "modelValue": "",
          "propConfig": {},
          "animations": [],
          "childrens": [
              {
                  "uuid": "1647829940161",
                  "name": "zh-form",
                  "type": "form",
                  "style": {
                      "height": "60px",
                      "display": "flex",
                      "flexWrap": "wrap",
                      "alignItems": "center",
                      "background": "#fff",
                      "paddingLeft": "10px",
                      "rowGap": "",
                      "columnGap": "10px"
                  },
                  "events": [],
                  "modelValue": "",
                  "propConfig": {
                      "labelWidth": "120px"
                  },
                  "animations": [],
                  "childrens": [
                      {
                          "uuid": "1647829955128",
                          "name": "zh-input",
                          "type": "input",
                          "style": {
                              "width": "350px"
                          },
                          "events": [],
                          "modelValue": "",
                          "propConfig": {
                              "label": "应用ID或名称",
                              "field": "IDAndName",
                              "placeholder": "请输入",
                              "labelWidth": "120px",
                              "labelPosition": "right"
                          },
                          "animations": []
                      },
                      {
                          "uuid": "1647829994227",
                          "name": "zh-select",
                          "type": "select",
                          "style": {
                              "width": "350px"
                          },
                          "events": [],
                          "modelValue": "",
                          "propConfig": {
                              "label": "应用状态",
                              "field": "appStatus",
                              "placeholder": "请选择",
                              "labelWidth": "120px",
                              "labelPosition": "right",
                              options: [
                                { label: '已上架', value: 1 },
                                { label: '已下架', value: 0 }
                              ]
                          },
                          "animations": []
                      },
                      {
                          "uuid": "1647830022031",
                          "name": "zh-button",
                          "type": "button",
                          "style": {
                              "display": "inline-block",
                              "marginLeft": "",
                              "paddingLeft": ""
                          },
                          "events": [],
                          "modelValue": "",
                          "propConfig": {
                              "label": "重置",
                              icon: "Refresh"
                          },
                          "animations": []
                      },
                      {
                          "uuid": "1647830063494",
                          "name": "zh-button",
                          "type": "button",
                          "style": {
                              "display": "inline-block",
                              "marginLeft": ""
                          },
                          "events": [
                              {
                                  "userAction": "click",
                                  "trigger": [
                                      {
                                          "logical": "",
                                          "conditions": []
                                      }
                                  ],
                                  "command": "request",
                                  "modalId": "",
                                  "link": "",
                                  "aTarget": "",
                                  "api": "api/query/",
                                  "method": "POST",
                                  assignmentType: '',
                                  sourceToTarget: [],
                                  "params": [
                                      {
                                          "key": "",
                                          "value": "",
                                          "type": "input-keyValue"
                                      },
                                      {
                                          "keyValue": "1647829955128",
                                          "type": "select-keyValue"
                                      },
                                      {
                                          "keyValue": "1647829994227",
                                          "type": "select-keyValue"
                                      }
                                  ],
                                  "valueToComp": "1647830358171",
                                  valueToComps: [],
                                  "thenEvents": []
                              }
                          ],
                          "modelValue": "",
                          "propConfig": {
                              "label": "查询",
                              type: "primary",
                              icon: "Search"
                          },
                          "animations": []
                      }
                  ]
              },
              {
                  "uuid": "1647830310171",
                  "name": "zh-container",
                  "type": "container",
                  "style": {
                      "display": "flex",
                      "minHeight": "50px",
                      "alignItems": "center",
                      "justifyContent": "flex-end",
                      "background": "#fff",
                      "marginTop": "8px",
                      "marginBottom": "8px",
                      "paddingRight": "10px"
                  },
                  "events": [],
                  "modelValue": "",
                  "propConfig": {},
                  "animations": [],
                  "childrens": [
                      {
                          "uuid": "1647830314739",
                          "name": "zh-button",
                          "type": "button",
                          "style": {
                              "display": "inline-block"
                          },
                          "events": [
                              {
                                  "userAction": "click",
                                  "trigger": [
                                      {
                                          "logical": "",
                                          "conditions": []
                                      }
                                  ],
                                  "command": "openModal",
                                  "modalId": "1647831103726",
                                  "link": "",
                                  "aTarget": "",
                                  "api": "",
                                  "method": "",
                                  assignmentType: '',
                                  sourceToTarget: [],
                                  "params": [],
                                  "valueToComp": "",
                                  "thenEvents": []
                              }
                          ],
                          "modelValue": "",
                          "propConfig": {
                              "label": "添加应用",
                              type: "primary",
                              icon: "CirclePlus"
                          },
                          "animations": []
                      }
                  ]
              },
              {
                  "uuid": "1647830358171",
                  "name": "zh-table",
                  "type": "table",
                  "style": {
                      "background": "#fff"
                  },
                  "events": [],
                  "modelValue": [],
                  "propConfig": {
                      "title": "表格数据",
                      "showBorder": false,
                      "showSelection": true,
                      "showStripe": false,
                      "showOperations": true,
                      "operations": [
                          {
                              "name": "审核",
                              "code": "",
                              "events": []
                          },
                          {
                              "name": "上架",
                              "code": "",
                              "events": []
                          },
                          {
                              "name": "删除",
                              "code": "",
                              "events": []
                          },
                          {
                              "name": "更多",
                              "code": "",
                              "events": []
                          }
                      ],
                      "columns": [
                          {
                              "label": "应用图标",
                              "field": "icon",
                              "width": "",
                          },
                          {
                              "label": "client_id",
                              "field": "clientId",
                              "width": "",
                          },
                          {
                              "label": "应用类型",
                              "field": "appType",
                              "width": ""
                          },
                          {
                              "label": "认证方式",
                              "field": "authMethod",
                              "width": ""
                          },
                          {
                            "label": "认证方式",
                            "field": "authMethod",
                            "width": ""
                        },
                        {
                            "label": "认证方式",
                            "field": "authMethod",
                            "width": ""
                        },
                        {
                            "label": "认证方式",
                            "field": "authMethod",
                            "width": ""
                        },
                        {
                            "label": "认证方式",
                            "field": "authMethod",
                            "width": ""
                        },
                        {
                            "label": "认证方式",
                            "field": "authMethod",
                            "width": ""
                        },
                        {
                            "label": "认证方式",
                            "field": "authMethod",
                            "width": ""
                        },
                        {
                            "label": "认证方式",
                            "field": "authMethod",
                            "width": ""
                        },
                        {
                            "label": "认证方式",
                            "field": "authMethod",
                            "width": ""
                        },
                        {
                            "label": "认证方式",
                            "field": "authMethod",
                            "width": ""
                        },
                          {
                              "label": "应用状态",
                              "field": "appStatus",
                              "width": ""
                          },
                          {
                              "label": "审核状态",
                              "field": "auditStatus",
                              "width": ""
                          },
                          {
                              "label": "对接人",
                              "field": "contacts",
                              "width": "",
                          }
                      ]
                  },
                  "animations": [],
                  "childrens": []
              },
              {
                  "uuid": "1647831009023",
                  "name": "zh-pagination",
                  "type": "pagination",
                  "style": {
                      "background": "#fff"
                  },
                  "events": [],
                  "modelValue": {
                    currentPage: 1,
                    pageSize: 10,
                  },
                  "propConfig": {
                    total: 100,
                    field: 'pagination'
                  },
                  "animations": []
              }
          ]
      },
      {
          "uuid": "1647831103726",
          "name": "zh-modal",
          "type": "modal",
          "style": {},
          "events": [],
          "modelValue": "",
          "propConfig": {
              "label": "模态框",
              "width": "500px",
              "visible": false,
              "modal": true,
              "closeOnClickModal": true
          },
          "animations": [],
          "childrens": [
              {
                  "uuid": "1647831103727",
                  "name": "zh-container",
                  "type": "container",
                  "style": {
                      "minHeight": "100px",
                      "overflowY": "scroll"
                  },
                  "events": [],
                  "modelValue": "",
                  "propConfig": {},
                  "animations": [],
                  "childrens": [
                      {
                          "uuid": "1647831305558",
                          "name": "zh-form",
                          "type": "form",
                          "style": {
                              "height": "100px",
                              "display": "flex",
                              "rowGap": "12px",
                              "flexDirection": "column",
                              "alignItems": "stretch",
                              "justifyContent": "center"
                          },
                          "events": [],
                          "modelValue": "",
                          "propConfig": {},
                          "animations": [],
                          "childrens": [
                              {
                                  "uuid": "1647831275048",
                                  "name": "zh-input",
                                  "type": "input",
                                  "style": {},
                                  "events": [
                                      {
                                          "userAction": "click",
                                          "trigger": [
                                              {
                                                  "logical": "",
                                                  "conditions": []
                                              }
                                          ],
                                          "command": "",
                                          "modalId": "",
                                          "link": "",
                                          "aTarget": "",
                                          "api": "",
                                          "method": "",
                                          assignmentType: '',
                                          sourceToTarget: [],
                                          "params": [],
                                          "valueToComp": "",
                                          "thenEvents": []
                                      }
                                  ],
                                  "modelValue": "",
                                  "propConfig": {
                                      "label": "应用Id",
                                      "field": "",
                                      "placeholder": "请输入",
                                      "labelWidth": "100px",
                                      "labelPosition": "right"
                                  },
                                  "animations": []
                              },
                              {
                                  "uuid": "1647831313251",
                                  "name": "zh-input",
                                  "type": "input",
                                  "style": {},
                                  "events": [],
                                  "modelValue": "",
                                  "propConfig": {
                                      "label": "应用名称",
                                      "field": "",
                                      "placeholder": "请输入",
                                      "labelWidth": "100px",
                                      "labelPosition": "right"
                                  },
                                  "animations": []
                              }
                          ]
                      }
                  ]
              },
              {
                  "uuid": "1647831103728",
                  "name": "zh-container",
                  "type": "container",
                  "style": {
                      "display": "flex",
                      "justifyContent": "flex-end",
                      "alignItems": "flex-end",
                      "columnGap": "12px",
                      "height": "44px"
                  },
                  "events": [],
                  "modelValue": "",
                  "propConfig": {},
                  "animations": [],
                  "childrens": [
                      {
                          "uuid": "1647831103729",
                          "name": "zh-button",
                          "type": "button",
                          "style": {
                              "display": "inline-block"
                          },
                          "events": [
                              {
                                  "userAction": "click",
                                  "trigger": [
                                      {
                                          "logical": "",
                                          "conditions": []
                                      }
                                  ],
                                  "command": "closeModal",
                                  "modalId": "1647831103726",
                                  "link": "",
                                  "aTarget": "",
                                  "api": "",
                                  "method": "",
                                  assignmentType: '',
                                  sourceToTarget: [],
                                  "params": [],
                                  "valueToComp": "",
                                  "thenEvents": []
                              }
                          ],
                          "modelValue": "",
                          "propConfig": {
                              "label": "取 消"
                          },
                          "animations": []
                      },
                      {
                          "uuid": "1647831103730",
                          "name": "zh-button",
                          "type": "button",
                          "style": {
                              "display": "inline-block"
                          },
                          "events": [
                              {
                                  "userAction": "click",
                                  "trigger": [
                                      {
                                          "logical": "",
                                          "conditions": []
                                      }
                                  ],
                                  "command": "request",
                                  "modalId": "",
                                  "link": "",
                                  "aTarget": "",
                                  "api": "api/addApp/",
                                  "method": "POST",
                                  assignmentType: '',
                                  sourceToTarget: [],
                                  "params": [
                                      {
                                          "key": "appName",
                                          "value": "动物森林会",
                                          "type": "input-keyValue"
                                      },
                                      {
                                          "key": "appId",
                                          "value": "123456",
                                          "type": "input-keyValue"
                                      }
                                  ],
                                  "valueToComp": "",
                                  "thenEvents": [
                                      {
                                          "trigger": [
                                              {
                                                  "logical": "",
                                                  "conditions": []
                                              }
                                          ],
                                          "command": "closeModal",
                                          "modalId": "1647831103726",
                                          "link": "",
                                          "aTarget": "",
                                          "api": "",
                                          "method": "",
                                          assignmentType: '',
                                          sourceToTarget: [],
                                          "params": [],
                                          "valueToComp": "",
                                          "thenEvents": []
                                      }
                                  ]
                              }
                          ],
                          "modelValue": "",
                          "propConfig": {
                              "type": "primary",
                              "label": "确 认"
                          },
                          "animations": []
                      }
                  ]
              }
          ]
      }
  ],
  "settings": {},
  "modalList": [
      {
          "id": "1647831103726",
          "name": "模态框"
      }
  ]
}


