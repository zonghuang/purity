export const config = {
  name: "user-auth",
  title: "用户授权",
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
          events: [],
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
                width: "400px",
              },
              events: [],
              modelValue: "",
              propConfig: {
                label: "ID/名称/姓名/邮箱",
                field: "g1",
                placeholder: "请输入",
                labelWidth: "200px",
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
                        api: "/sso-server/api/onl-report/queryReportData/sso_app_access_user",
                        method: "POST",
                        loading: true,
                        params: [
                          {
                            key: "reportCode",
                            value: "sso_app_access_user",
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
                        api: "/sso-server/api/onl-report/queryReportData/sso_app_access_user",
                        method: "POST",
                        loading: true,
                        params: [
                          {
                            key: "reportCode",
                            value: "sso_app_access_user",
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
          uuid: "1649080037732",
          name: "zh-table",
          type: "table",
          style: {},
          events: [
            {
              userAction: "click",
              event: "openModal",
              option: {
                modalId: "1649122952028",
              },
              thenEvents: [
                {
                  event: "set",
                  option: {
                    assign: "component",
                    params: [
                      {
                        key: "",
                        value: "1649080037732currentRow",
                        type: "select",
                      },
                    ],
                    target: "1649123344263",
                    targets: [],
                  },
                  thenEvents: [],
                },
              ],
              bindCode: "open",
            },
            {
              userAction: "click",
              event: "link",
              option: {
                url: "/render/sso/permission/user-auth-details",
                window: "_self",
                transferMode: "query",
                params: [
                  {
                    key: "ad_user_id",
                    value: "1649080037732rowKey",
                    type: "inputSelect",
                  },
                ],
              },
              thenEvents: [],
              bindCode: "details",
            },
          ],
          modelValue: [],
          propConfig: {
            label: "表格数据",
            showBorder: false,
            showSelection: true,
            showStripe: false,
            showOperations: true,
            operationsColumnWidth: "180",
            operations: [
              {
                name: "详情",
                code: "details",
              },
              {
                name: "全部授权",
                code: "open",
              },
            ],
            columns: [
              {
                label: "Leyaoyao_ID",
                field: "ad_user_id",
                width: "",
                type: "image",
                align: "center",
              },
              {
                label: "工号",
                field: "job_no",
                width: "",
              },
              {
                label: "姓名",
                field: "user_name",
                width: "",
              },
              {
                label: "部门",
                field: "app_type",
                width: "",
              },
            ],
            primaryKey: "ad_user_id",
            endFixed: 1,
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
                api: "/sso-server/api/onl-report/queryReportData/sso_app_access_user",
                method: "POST",
                loading: true,
                params: [
                  {
                    key: "reportCode",
                    value: "sso_app_access_user",
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
      uuid: "1649122952028",
      name: "zh-modal",
      type: "modal",
      style: {},
      events: [],
      modelValue: "",
      propConfig: {
        label: "提示信息-授权",
        width: "500px",
        visible: false,
        modal: true,
        closeOnClickModal: true,
      },
      animations: [],
      childrens: [
        {
          uuid: "1649122952029",
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
              uuid: "1649123344263",
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
                label: "授权表单",
                formItemWidth: "300px",
                labelWidth: "",
                labelPosition: "",
                field: "formData",
              },
              animations: [],
              childrens: [
                {
                  uuid: "1649125255738",
                  name: "zh-text",
                  type: "text",
                  style: {
                    "min-height": "32px",
                    display: "flex",
                    "align-items": "center",
                  },
                  events: [],
                  modelValue: "您确定要授权该用户全部应用的访问权限吗？",
                  propConfig: {
                    label: "tips：",
                    labelWidth: "50px",
                  },
                  animations: [],
                },
                {
                  uuid: "1649122982738",
                  name: "zh-text",
                  type: "text",
                  style: {
                    "min-height": "32px",
                    display: "flex",
                    "align-items": "center",
                  },
                  events: [],
                  modelValue: "",
                  propConfig: {
                    label: "",
                    labelWidth: "50px",
                    field: "user_name",
                    alias: "用户（授权弹窗）",
                  },
                  animations: [],
                },
                {
                  uuid: "1649123104028",
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
                  modelValue: "请注意：下架后用户无法通过统一账号登录应用。",
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
          uuid: "1649122952030",
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
              uuid: "1649122952031",
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
                    modalId: "1649122952028",
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
              uuid: "1649122952032",
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
                        value: "SsoAppUserAccessUserAllAppComponent",
                        type: "input",
                      },
                      {
                        key: "jsonChooseData",
                        value: "[]",
                        type: "input",
                      },
                      {
                        key: "jsonData",
                        value: "1649080037732rowKey",
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
                        modalId: "1649122952028",
                      },
                      thenEvents: [],
                    },
                  ],
                },
              ],
              modelValue: "",
              propConfig: {
                type: "primary",
                label: "确 认 授 权",
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
