export const config = {
  name: "user-auth-details",
  title: "用户授权详情",
  elements: [
    {
      uuid: "1648821632532",
      name: "zh-container",
      type: "root",
      style: {
        display: "block",
        minHeight: "60px",
        background: "#f5f5f5",
        paddingTop: "16px",
        paddingRight: "16px",
        paddingBottom: "16px",
        paddingLeft: "16px",
        maxWidth: "",
        margin: "0 auto",
      },
      events: [],
      modelValue: "",
      propConfig: {},
      animations: [],
      childrens: [
        {
          uuid: "1649076593129",
          name: "zh-form",
          type: "form",
          style: {
            height: "",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            paddingTop: "16px",
            paddingRight: "16px",
            paddingBottom: "16px",
            paddingLeft: "16px",
            rowGap: "16px",
            columnGap: "16px",
            marginBottom: "8px",
            background: "#fff",
          },
          events: [
            {
              userAction: "mount",
              event: "set",
              option: {
                assign: "component",
                params: [
                  {
                    key: "",
                    value: "routeQuery",
                    type: "select",
                  },
                ],
                target: "1649076593129",
                targets: [],
              },
              thenEvents: [
                {
                  event: "fetch",
                  option: {
                    api: "/sso-server/api/onl-report/queryReportData/access_user_app_detail",
                    method: "POST",
                    loading: true,
                    params: [
                      {
                        key: "reportCode",
                        value: "access_user_app_details",
                        type: "input",
                      },
                      {
                        key: "queryParams",
                        value: "1649076593129",
                        type: "inputSelect",
                      },
                      {
                        key: "",
                        value: "1649080043586",
                        type: "select",
                      },
                    ],
                    assign: "components",
                    target: "",
                    targets: [
                      {
                        source: "tableData",
                        target: "1649080037732",
                      },
                      {
                        source: "total",
                        target: "1649080043586",
                      },
                    ],
                  },
                  thenEvents: [],
                },
              ],
            },
          ],
          modelValue: {},
          propConfig: {
            label: "搜索表单",
            formItemWidth: "300px",
            labelWidth: "130px",
            field: "searchData",
          },
          animations: [],
          childrens: [
            {
              uuid: "1649076628361",
              name: "zh-input",
              type: "input",
              style: {
                width: "300px",
              },
              events: [],
              modelValue: "",
              propConfig: {
                label: "用户ID",
                field: "ad_user_id",
                placeholder: "请输入",
                labelWidth: "130px",
                labelPosition: "right",
              },
              animations: [],
            },
            {
              uuid: "1649126654860",
              name: "zh-input",
              type: "input",
              style: {
                width: "300px",
              },
              events: [],
              modelValue: "",
              propConfig: {
                label: "应用ID或名称",
                field: "g1",
                placeholder: "请输入",
                labelWidth: "130px",
                labelPosition: "right",
              },
              animations: [],
            },
            {
              uuid: "1649076727266",
              name: "zh-container",
              type: "container",
              style: {
                display: "block",
                minHeight: "",
                width: "",
              },
              events: [],
              modelValue: "",
              propConfig: {
                labelWidth: "130px",
              },
              animations: [],
              childrens: [
                {
                  uuid: "1648821634221",
                  name: "zh-button",
                  type: "button",
                  style: {
                    display: "inline-block",
                  },
                  events: [
                    {
                      userAction: "click",
                      event: "reset",
                      option: {
                        target: "1649076593129",
                      },
                      thenEvents: [],
                    },
                    {
                      userAction: "click",
                      event: "fetch",
                      option: {
                        api: "/sso-server/api/onl-report/queryReportData/access_user_app_detail",
                        method: "POST",
                        loading: true,
                        params: [
                          {
                            key: "reportCode",
                            value: "access_user_app_details",
                            type: "input",
                          },
                          {
                            key: "queryParams",
                            value: "1649076593129",
                            type: "inputSelect",
                          },
                          {
                            key: "",
                            value: "1649080043586",
                            type: "select",
                          },
                        ],
                        assign: "components",
                        target: "",
                        targets: [
                          {
                            source: "tableData",
                            target: "1649080037732",
                          },
                          {
                            source: "total",
                            target: "1649080043586",
                          },
                        ],
                      },
                      thenEvents: [],
                    },
                  ],
                  modelValue: "",
                  propConfig: {
                    label: "重置",
                    icon: "Refresh",
                  },
                  animations: [],
                },
                {
                  uuid: "1648949698710",
                  name: "zh-button",
                  type: "button",
                  style: {
                    display: "inline-block",
                    marginLeft: "8px",
                  },
                  events: [
                    {
                      userAction: "click",
                      event: "fetch",
                      option: {
                        api: "/sso-server/api/onl-report/queryReportData/access_user_app_detail",
                        method: "POST",
                        loading: true,
                        params: [
                          {
                            key: "reportCode",
                            value: "access_user_app_details",
                            type: "input",
                          },
                          {
                            key: "queryParams",
                            value: "1649076593129",
                            type: "inputSelect",
                          },
                          {
                            key: "",
                            value: "1649080043586",
                            type: "select",
                          },
                        ],
                        assign: "components",
                        target: "",
                        targets: [
                          {
                            source: "tableData",
                            target: "1649080037732",
                          },
                          {
                            source: "total",
                            target: "1649080043586",
                          },
                        ],
                      },
                      thenEvents: [],
                    },
                  ],
                  modelValue: "",
                  propConfig: {
                    label: "搜索",
                    type: "primary",
                    icon: "Search",
                  },
                  animations: [],
                },
              ],
            },
          ],
        },
        {
          uuid: "1649079696419",
          name: "zh-container",
          type: "container",
          style: {
            display: "flex",
            minHeight: "",
            height: "68px",
            alignItems: "center",
            paddingTop: "",
            paddingRight: "16px",
            paddingLeft: "16px",
            background: "#fff",
          },
          events: [],
          modelValue: "",
          propConfig: {},
          animations: [],
          childrens: [
            {
              uuid: "1649079851273",
              name: "zh-button",
              type: "button",
              style: {
                display: "inline-block",
              },
              events: [],
              modelValue: "",
              propConfig: {
                label: "全部授权",
                icon: "CirclePlus",
                type: "primary",
              },
              animations: [],
            },
            {
              uuid: "1649126704140",
              name: "zh-button",
              type: "button",
              style: {
                display: "inline-block",
                marginLeft: "8px",
              },
              events: [
                {
                  userAction: "click",
                  event: "openModal",
                  option: {
                    modalId: "1649123842917",
                  },
                  thenEvents: [],
                },
              ],
              modelValue: "",
              propConfig: {
                label: "全部关闭",
                icon: "CircleClose",
                type: "",
              },
              animations: [],
            },
          ],
        },
        {
          uuid: "1649080037732",
          name: "zh-table",
          type: "table",
          style: {},
          events: [
            {
              userAction: "click",
              event: "",
              option: {},
              thenEvents: [],
              bindCode: "close",
            },
          ],
          modelValue: [],
          propConfig: {
            label: "表格数据",
            showBorder: false,
            showSelection: true,
            showStripe: false,
            showOperations: true,
            operationsColumnWidth: "150",
            operations: [
              {
                name: "关闭",
                code: "close",
              },
            ],
            columns: [
              {
                label: "应用图标",
                field: "logo",
                width: "",
                type: "image",
                align: "center",
              },
              {
                label: "应用名称",
                field: "name",
                width: "",
              },
              {
                label: "client_id",
                field: "client_id",
                width: "",
              },
              {
                label: "授权状态",
                field: "status_mean",
                width: "",
              },
              {
                label: "对接人",
                field: "ducking_people",
                width: "",
              },
            ],
            primaryKey: "sso_app_id",
            endFixed: "",
          },
          animations: [],
          childrens: [],
        },
        {
          uuid: "1649080043586",
          name: "zh-pagination",
          type: "pagination",
          style: {
            background: "#fff",
          },
          events: [
            {
              userAction: "update",
              event: "fetch",
              option: {
                api: "/sso-server/api/onl-report/queryReportData/access_user_app_detail",
                method: "POST",
                loading: true,
                params: [
                  {
                    key: "reportCode",
                    value: "access_user_app_details",
                    type: "input",
                  },
                  {
                    key: "queryParams",
                    value: "1649076593129",
                    type: "inputSelect",
                  },
                  {
                    key: "",
                    value: "1649080043586",
                    type: "select",
                  },
                ],
                assign: "components",
                target: "",
                targets: [
                  {
                    source: "tableData",
                    target: "1649080037732",
                  },
                  {
                    source: "total",
                    target: "1649080043586",
                  },
                ],
              },
              thenEvents: [],
            },
          ],
          modelValue: {
            currentPage: 1,
            pageSize: 10,
          },
          propConfig: {
            label: "分页",
            total: 0,
            field: "pagination",
          },
          animations: [],
        },
      ],
    },
    {
      uuid: "1649123842917",
      name: "zh-modal",
      type: "modal",
      style: {},
      events: [],
      modelValue: "",
      propConfig: {
        label: "您确定要全部关闭该用户应用的访问授权吗？",
        width: "500px",
        visible: false,
        modal: true,
        closeOnClickModal: true,
      },
      animations: [],
      childrens: [
        {
          uuid: "1649123842918",
          name: "zh-container",
          type: "container",
          style: {
            minHeight: "",
            overflowY: "scroll",
            paddingTop: "16px",
            paddingRight: "16px",
            paddingBottom: "16px",
            paddingLeft: "16px",
            display: "flex",
            flexDirection: "column",
            rowGap: "16px",
          },
          events: [],
          modelValue: "",
          propConfig: {},
          animations: [],
          childrens: [
            {
              uuid: "1649123842919",
              name: "zh-form",
              type: "form",
              style: {
                height: "",
                display: "flex",
                flexDirection: "column",
                rowGap: "16px",
              },
              events: [],
              modelValue: {},
              propConfig: {
                label: "上架应用表单",
                formItemWidth: "300px",
                labelWidth: "",
                labelPosition: "",
                field: "formData",
              },
              animations: [],
              childrens: [
                {
                  uuid: "1649127778723",
                  name: "zh-input",
                  type: "input",
                  style: {},
                  events: [],
                  modelValue: "",
                  propConfig: {
                    label: "用户姓名",
                    field: "name",
                    placeholder: "请输入",
                    labelWidth: "100px",
                    labelPosition: "right",
                    width: "300px",
                  },
                  animations: [],
                },
                {
                  uuid: "1649127802505",
                  name: "zh-input",
                  type: "input",
                  style: {},
                  events: [],
                  modelValue: "",
                  propConfig: {
                    label: "用户邮箱",
                    field: "email",
                    placeholder: "请输入",
                    labelWidth: "100px",
                    labelPosition: "right",
                    width: "300px",
                  },
                  animations: [],
                },
                {
                  uuid: "1649127819411",
                  name: "zh-input",
                  type: "input",
                  style: {},
                  events: [],
                  modelValue: "",
                  propConfig: {
                    label: "所属部门",
                    field: "department",
                    placeholder: "请输入",
                    labelWidth: "100px",
                    labelPosition: "right",
                    width: "300px",
                  },
                  animations: [],
                },
                {
                  uuid: "1649123842921",
                  name: "zh-text",
                  type: "text",
                  style: {
                    "min-height": "32px",
                    display: "flex",
                    "align-items": "center",
                    fontSize: "13px",
                    color: "#aaa",
                  },
                  events: [],
                  modelValue:
                    "请注意：<br>1.全部关闭后该账户将无法通过本系统登录已接入的应用！ <br>2.如需禁用账号，请在账号管理模块下禁用账号即可",
                  propConfig: {
                    label: "",
                  },
                  animations: [],
                },
              ],
            },
          ],
        },
        {
          uuid: "1649123842922",
          name: "zh-container",
          type: "container",
          style: {
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            columnGap: "12px",
            height: "44px",
          },
          events: [],
          modelValue: "",
          propConfig: {},
          animations: [],
          childrens: [
            {
              uuid: "1649123842923",
              name: "zh-button",
              type: "button",
              style: {
                display: "inline-block",
              },
              events: [
                {
                  userAction: "click",
                  event: "closeModal",
                  option: {
                    modalId: "1649123842917",
                  },
                  thenEvents: [],
                },
              ],
              modelValue: "",
              propConfig: {
                label: "取 消",
              },
              animations: [],
            },
            {
              uuid: "1649123842924",
              name: "zh-button",
              type: "button",
              style: {
                display: "inline-block",
              },
              events: [
                {
                  userAction: "click",
                  event: "fetch",
                  option: {
                    api: "/sso-server/api/component/submit",
                    method: "POST",
                    loading: true,
                    params: [
                      {
                        key: "componentName",
                        value: "SsoAppDownComponent",
                        type: "input",
                      },
                      {
                        key: "jsonChooseData",
                        value: "[]",
                        type: "input",
                      },
                      {
                        key: "jsonData",
                        value: "1649080037732rowsKey",
                        type: "inputSelect",
                      },
                    ],
                    assign: "",
                    target: "",
                    targets: [
                      {
                        source: "",
                        target: "",
                      },
                    ],
                  },
                  thenEvents: [
                    {
                      event: "closeModal",
                      option: {
                        modalId: "1649123842917",
                      },
                      thenEvents: [],
                    },
                  ],
                },
              ],
              modelValue: "",
              propConfig: {
                type: "primary",
                label: "确 认 关 闭",
              },
              animations: [],
            },
          ],
        },
      ],
    },
  ],
  settings: {},
};
