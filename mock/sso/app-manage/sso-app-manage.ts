export const config = {
  name: "sso-app-manage",
  title: "应用管理",
  elements: [
    {
      uuid: "1648821632532",
      name: "zh-container",
      type: "root",
      style: {
        display: "block",
        minHeight: "60px",
        // background: "#f5f5f5",
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
              uuid: "1649078482443",
              name: "zh-select",
              type: "select",
              style: {
                width: "300px",
              },
              events: [],
              modelValue: "",
              propConfig: {
                label: "应用状态",
                field: "s.status",
                placeholder: "请选择",
                labelWidth: "100px",
                labelPosition: "right",
                options: [
                  {
                    label: "待审核",
                    value: "1",
                  },
                  {
                    label: "已上架",
                    value: "2",
                  },
                  {
                    label: "已驳回",
                    value: "3",
                  },
                  {
                    label: "已下架",
                    value: "4",
                  },
                ],
              },
              animations: [],
            },
            {
              uuid: "1649076727266",
              name: "zh-container",
              type: "container",
              style: {
                display: "flex",
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
                        api: "/sso-server/api/onl-report/queryReportData/sso_app_manage",
                        method: "POST",
                        loading: true,
                        params: [
                          {
                            key: "reportCode",
                            value: "sso_app_manage",
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
                        api: "/sso-server/api/onl-report/queryReportData/sso_app_manage",
                        method: "POST",
                        loading: true,
                        params: [
                          {
                            key: "reportCode",
                            value: "sso_app_manage",
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
              events: [
                {
                  userAction: "click",
                  event: "openModal",
                  option: {
                    modalId: "1649109281400",
                  },
                  thenEvents: [],
                },
              ],
              modelValue: "",
              propConfig: {
                label: "添加应用",
                icon: "CirclePlus",
                type: "primary",
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
              event: "openModal",
              option: {
                modalId: "1649118790283",
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
                    target: "1649118790285",
                    targets: [],
                  },
                  thenEvents: [],
                },
              ],
              bindCode: " approve",
            },
            {
              userAction: "click",
              event: "fetch",
              option: {
                api: "/sso-server/api/form-model/delFormData/sso_app",
                method: "POST",
                loading: true,
                params: [
                  {
                    key: "reportCode",
                    value: "sso_app_manage",
                    type: "input",
                  },
                  {
                    key: "modelCode",
                    value: "sso_app",
                    type: "input",
                  },
                  {
                    key: "physicalDeleted",
                    value: "N",
                    type: "input",
                  },
                  {
                    key: "dataId",
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
              thenEvents: [],
              bindCode: "delete",
            },
            {
              userAction: "click",
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
                target: "1649123842919",
                targets: [],
              },
              thenEvents: [
                {
                  event: "openModal",
                  option: {
                    modalId: "1649123842917",
                  },
                  thenEvents: [],
                },
              ],
              bindCode: "up",
            },
            {
              userAction: "click",
              event: "set",
              option: {
                assign: "component",
                params: [
                  {
                    key: "",
                    value: "1649080037732currentRow",
                    type: "inputSelect",
                  },
                ],
                target: "1649123344263",
                targets: [],
              },
              thenEvents: [
                {
                  event: "openModal",
                  option: {
                    modalId: "1649122952028",
                  },
                  thenEvents: [],
                },
              ],
              bindCode: "down",
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
                name: "审核",
                code: " approve",
              },
              {
                name: "上架",
                code: "up",
              },
              {
                name: "下架",
                code: "down",
              },
              {
                name: "删除",
                code: "delete",
              },
            ],
            columns: [
              {
                label: "应用图标",
                field: "logo",
                width: "100",
                type: "image",
                align: "center",
              },
              {
                label: "应用名称",
                field: "app_name",
                width: "",
              },
              {
                label: "client_id",
                field: "client_id",
                width: "",
              },
              {
                label: "应用类型",
                field: "app_type",
                width: "",
              },
              {
                label: "认证方式",
                field: "auth_type",
                width: "",
              },
              {
                label: "应用状态",
                field: "status",
                width: "",
              },
              {
                label: "审核状态",
                field: "review_status",
                width: "",
              },
              {
                label: "对接人",
                field: "name",
                width: "",
              },
            ],
            primaryKey: "sso_app_id",
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
                api: "/sso-server/api/onl-report/queryReportData/sso_app_manage",
                method: "POST",
                loading: true,
                params: [
                  {
                    key: "reportCode",
                    value: "sso_app_manage",
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
      uuid: "1649109281400",
      name: "zh-modal",
      type: "modal",
      style: {},
      events: [
        {
          userAction: "click",
          event: "",
          option: {},
          thenEvents: [],
        },
      ],
      modelValue: "",
      propConfig: {
        label: "添加应用",
        width: "800px",
        visible: false,
        modal: true,
        closeOnClickModal: true,
      },
      animations: [],
      childrens: [
        {
          uuid: "1649109281401",
          name: "zh-container",
          type: "container",
          style: {
            minHeight: "100px",
            overflowY: "scroll",
          },
          events: [],
          modelValue: "",
          propConfig: {},
          animations: [],
          childrens: [
            {
              uuid: "1649109424378",
              name: "zh-form",
              type: "form",
              style: {
                height: "",
                paddingTop: "16px",
                paddingRight: "16px",
                paddingBottom: "16px",
                paddingLeft: "16px",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                rowGap: "16px",
                columnGap: "16px",
                justifyContent: "flex-start",
              },
              events: [],
              modelValue: {},
              propConfig: {
                label: "添加应用表单",
                formItemWidth: "350px",
                labelWidth: "",
                labelPosition: "",
                field: "formData",
              },
              animations: [],
              childrens: [
                {
                  uuid: "1649109474185",
                  name: "zh-input",
                  type: "input",
                  style: {
                    width: "350px",
                  },
                  events: [],
                  modelValue: "",
                  propConfig: {
                    label: "应用名称",
                    field: "name",
                    placeholder: "应用名称，最多32个字",
                    labelWidth: "100px",
                    labelPosition: "right",
                    width: "300px",
                    required: true,
                  },
                  animations: [],
                },
                {
                  uuid: "1649113675004",
                  name: "zh-picture",
                  type: "picture",
                  style: {
                    width: "350px",
                  },
                  events: [],
                  modelValue: "",
                  propConfig: {
                    label: "应用图标",
                    field: "logo",
                    placeholder: "请输入",
                    labelWidth: "100px",
                    labelPosition: "right",
                    width: "300px",
                  },
                  animations: [],
                },
                {
                  uuid: "1649109708172",
                  name: "zh-input",
                  type: "input",
                  style: {
                    width: "350px",
                  },
                  events: [],
                  modelValue: "",
                  propConfig: {
                    label: "应用简述",
                    field: "description",
                    placeholder: "应用简述最多输入140个字",
                    labelWidth: "100px",
                    labelPosition: "right",
                    width: "300px",
                    required: true,
                  },
                  animations: [],
                },
                {
                  uuid: "1649109736056",
                  name: "zh-input",
                  type: "input",
                  style: {
                    width: "350px",
                  },
                  events: [],
                  modelValue: "",
                  propConfig: {
                    label: "URL",
                    field: "url",
                    placeholder: "从导航页打开的应用首页URL",
                    labelWidth: "100px",
                    labelPosition: "right",
                    width: "300px",
                    required: true,
                  },
                  animations: [],
                },
                {
                  uuid: "1649109753420",
                  name: "zh-radio",
                  type: "radio",
                  style: {
                    width: "350px",
                  },
                  events: [],
                  modelValue: "",
                  propConfig: {
                    label: "应用类型",
                    field: "app_type",
                    labelWidth: "100px",
                    labelPosition: "right",
                    options: [
                      {
                        label: "Web 应用",
                        value: "1",
                      },
                      {
                        label: "App 客户端",
                        value: "2",
                      },
                    ],
                    width: "300px",
                    required: true,
                  },
                  animations: [],
                },
                {
                  uuid: "1649109816795",
                  name: "zh-radio",
                  type: "radio",
                  style: {
                    width: "350px",
                  },
                  events: [],
                  modelValue: "",
                  propConfig: {
                    label: "认证方式",
                    field: "access_type",
                    labelWidth: "100px",
                    labelPosition: "right",
                    options: [
                      {
                        label: "CAS",
                        value: "1",
                      },
                      {
                        label: "Option B",
                        value: 2,
                      },
                    ],
                    width: "300px",
                    required: true,
                  },
                  animations: [],
                },
                {
                  uuid: "1649109856821",
                  name: "zh-radio",
                  type: "radio",
                  style: {
                    width: "350px",
                    height: "",
                  },
                  events: [],
                  modelValue: "",
                  propConfig: {
                    label: "访问授权",
                    field: "auth_type",
                    labelWidth: "100px",
                    labelPosition: "right",
                    options: [
                      {
                        label: "默认开发",
                        value: 1,
                      },
                      {
                        label: "暂不开放",
                        value: "0",
                      },
                    ],
                    width: "300px",
                    required: true,
                  },
                  animations: [],
                },
                {
                  uuid: "1649114468710",
                  name: "zh-container",
                  type: "container",
                  style: {
                    display: "block",
                    minHeight: "",
                    width: "350px",
                    height: "32px",
                  },
                  events: [],
                  modelValue: "",
                  propConfig: {},
                  animations: [],
                  childrens: [],
                },
                {
                  uuid: "1649114494079",
                  name: "zh-text",
                  type: "text",
                  style: {
                    "min-height": "32px",
                    display: "flex",
                    "align-items": "center",
                    width: "350px",
                    fontSize: "13px",
                    fontWeight: "",
                    color: "#aaa",
                  },
                  events: [],
                  modelValue:
                    "登录权限：<br>1. 默认开放：用户可随时登录应用（请做好应用内权限管理） <br>2. 暂不开放：上架后用户无法登录访问，部分需要使用本应用的用户需联系管理员在统一认证中心授权访问。",
                  propConfig: {
                    label: "",
                    alias: "添加应用提示",
                  },
                  animations: [],
                },
              ],
            },
          ],
        },
        {
          uuid: "1649109281402",
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
              uuid: "1649109281403",
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
                    modalId: "1649109281400",
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
              uuid: "1649109281404",
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
                    api: "/sso-server/api/form-model/saveFormData/sso_app",
                    method: "POST",
                    loading: true,
                    params: [
                      {
                        key: "reportCode",
                        value: "sso_app_manage",
                        type: "input",
                      },
                      {
                        key: "modelCode",
                        value: "sso_app",
                        type: "input",
                      },
                      {
                        key: "dtoObj",
                        value: "1649109424378",
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
                      event: "openModal",
                      option: {
                        modalId: "1649116983253",
                      },
                      thenEvents: [],
                    },
                  ],
                },
              ],
              modelValue: "",
              propConfig: {
                type: "primary",
                label: "确 认",
              },
              animations: [],
            },
          ],
        },
      ],
    },
    {
      uuid: "1649116983253",
      name: "zh-modal",
      type: "modal",
      style: {},
      events: [],
      modelValue: "",
      propConfig: {
        label: "提交成功",
        width: "500px",
        visible: false,
        modal: true,
        closeOnClickModal: true,
      },
      animations: [],
      childrens: [
        {
          uuid: "1649116983254",
          name: "zh-container",
          type: "container",
          style: {
            minHeight: "100px",
            overflowY: "scroll",
            paddingTop: "16px",
            paddingRight: "16px",
            paddingBottom: "16px",
            paddingLeft: "16px",
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            rowGap: "16px",
            columnGap: "",
          },
          events: [],
          modelValue: "",
          propConfig: {},
          animations: [],
          childrens: [
            {
              uuid: "1649116992786",
              name: "zh-text",
              type: "text",
              style: {
                "min-height": "32px",
                display: "flex",
                "align-items": "center",
              },
              events: [],
              modelValue: "nsd0vs7jt14b2797",
              propConfig: {
                label: "Client_id",
                labelWidth: "120px",
              },
              animations: [],
            },
            {
              uuid: "1649117083505",
              name: "zh-text",
              type: "text",
              style: {
                "min-height": "32px",
                display: "flex",
                "align-items": "center",
              },
              events: [],
              modelValue: "7267dgwg91q3s4lp3wbr0y845xjeqm08 ",
              propConfig: {
                label: "Client_secret",
                labelWidth: "120px",
              },
              animations: [],
            },
            {
              uuid: "1649117110123",
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
                "💡请保存好Client_secret并尽快完成接入，管理员审核通过后应用将自动上架。",
              propConfig: {
                label: "",
              },
              animations: [],
            },
          ],
        },
        {
          uuid: "1649116983255",
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
              uuid: "1649116983256",
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
                    modalId: "1649116983253",
                  },
                  thenEvents: [],
                },
              ],
              modelValue: "",
              propConfig: {
                label: "好 的",
              },
              animations: [],
            },
          ],
        },
      ],
    },
    {
      uuid: "1649118790283",
      name: "zh-modal",
      type: "modal",
      style: {},
      events: [],
      modelValue: "",
      propConfig: {
        label: "审核应用",
        width: "800px",
        visible: false,
        modal: true,
        closeOnClickModal: true,
      },
      animations: [],
      childrens: [
        {
          uuid: "1649118790284",
          name: "zh-container",
          type: "container",
          style: {
            minHeight: "100px",
            overflowY: "scroll",
          },
          events: [],
          modelValue: "",
          propConfig: {},
          animations: [],
          childrens: [
            {
              uuid: "1649118790285",
              name: "zh-form",
              type: "form",
              style: {
                height: "",
                paddingTop: "16px",
                paddingRight: "16px",
                paddingBottom: "16px",
                paddingLeft: "16px",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                rowGap: "16px",
                columnGap: "16px",
                justifyContent: "flex-start",
              },
              events: [],
              modelValue: {},
              propConfig: {
                label: "审核应用表单",
                formItemWidth: "350px",
                labelWidth: "150px",
                labelPosition: "",
                field: "formData",
              },
              animations: [],
              childrens: [
                {
                  uuid: "1649118868345",
                  name: "zh-input",
                  type: "input",
                  style: {
                    width: "350px",
                  },
                  events: [],
                  modelValue: "",
                  propConfig: {
                    label: "Client_id",
                    field: "client_id",
                    placeholder: "",
                    labelWidth: "150px",
                    labelPosition: "right",
                    width: "300px",
                    required: true,
                  },
                  animations: [],
                },
                {
                  uuid: "1649118978867",
                  name: "zh-input",
                  type: "input",
                  style: {
                    width: "350px",
                  },
                  events: [],
                  modelValue: "",
                  propConfig: {
                    label: "Client_secret",
                    field: "client_secret",
                    placeholder: "",
                    labelWidth: "150px",
                    labelPosition: "right",
                    width: "300px",
                    required: true,
                  },
                  animations: [],
                },
                {
                  uuid: "1649118790286",
                  name: "zh-input",
                  type: "input",
                  style: {
                    width: "350px",
                  },
                  events: [],
                  modelValue: "",
                  propConfig: {
                    label: "应用名称",
                    field: "app_name",
                    placeholder: "",
                    labelWidth: "150px",
                    labelPosition: "right",
                    width: "300px",
                    required: true,
                  },
                  animations: [],
                },
                {
                  uuid: "1649118790288",
                  name: "zh-input",
                  type: "input",
                  style: {
                    width: "350px",
                  },
                  events: [],
                  modelValue: "加入动物森林会，男人玩的也沉醉",
                  propConfig: {
                    label: "应用简述",
                    field: "description",
                    placeholder: "",
                    labelWidth: "150px",
                    labelPosition: "right",
                    width: "300px",
                    required: true,
                  },
                  animations: [],
                },
                {
                  uuid: "1649118790289",
                  name: "zh-input",
                  type: "input",
                  style: {
                    width: "350px",
                  },
                  events: [],
                  modelValue: "",
                  propConfig: {
                    label: "URL",
                    field: "url",
                    placeholder: "",
                    labelWidth: "150px",
                    labelPosition: "right",
                    width: "300px",
                    required: true,
                  },
                  animations: [],
                },
                {
                  uuid: "1649118790290",
                  name: "zh-radio",
                  type: "radio",
                  style: {
                    width: "350px",
                  },
                  events: [],
                  modelValue: "",
                  propConfig: {
                    label: "应用状态",
                    field: "status",
                    labelWidth: "150px",
                    labelPosition: "right",
                    options: [
                      {
                        label: "已上架",
                        value: "已上架",
                      },
                      {
                        label: "已下架",
                        value: "已下架",
                      },
                    ],
                    width: "300px",
                    required: true,
                  },
                  animations: [],
                },
                {
                  uuid: "1649119204469",
                  name: "zh-input",
                  type: "input",
                  style: {
                    width: "350px",
                  },
                  events: [],
                  modelValue: "",
                  propConfig: {
                    label: "审核状态",
                    field: "review_status",
                    placeholder: "",
                    labelWidth: "150px",
                    labelPosition: "right",
                    width: "300px",
                    required: true,
                  },
                  animations: [],
                },
                {
                  uuid: "1649119277652",
                  name: "zh-input",
                  type: "input",
                  style: {
                    width: "350px",
                  },
                  events: [],
                  modelValue: "",
                  propConfig: {
                    label: "对接人",
                    field: "name",
                    placeholder: "",
                    labelWidth: "150px",
                    labelPosition: "right",
                    width: "300px",
                    required: true,
                  },
                  animations: [],
                },
                {
                  uuid: "1649118790287",
                  name: "zh-picture",
                  type: "picture",
                  style: {
                    width: "350px",
                  },
                  events: [],
                  modelValue: "",
                  propConfig: {
                    label: "应用图标",
                    field: "logo",
                    placeholder: "请输入",
                    labelWidth: "150px",
                    labelPosition: "right",
                    width: "300px",
                  },
                  animations: [],
                },
              ],
            },
          ],
        },
        {
          uuid: "1649118790295",
          name: "zh-container",
          type: "container",
          style: {
            display: "flex",
            justifyContent: "center",
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
              uuid: "1649118790297",
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
                    api: "/sso-server/api/app/changeStatus",
                    method: "POST",
                    loading: true,
                    params: [
                      {
                        key: "status",
                        value: "3",
                        type: "input",
                      },
                      {
                        key: "ssoAppId",
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
                        modalId: "1649118790283",
                      },
                      thenEvents: [],
                    },
                  ],
                },
              ],
              modelValue: "",
              propConfig: {
                type: "primary",
                label: "审 核 通 过",
              },
              animations: [],
            },
            {
              uuid: "1649119640242",
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
                    api: "/sso-server/api/app/changeStatus",
                    method: "POST",
                    loading: true,
                    params: [
                      {
                        key: "status",
                        value: "3",
                        type: "input",
                      },
                      {
                        key: "ssoAppId",
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
                        modalId: "1649118790283",
                      },
                      thenEvents: [],
                    },
                  ],
                },
              ],
              modelValue: "",
              propConfig: {
                label: "驳 回",
                type: "danger",
              },
              animations: [],
            },
            {
              uuid: "1649118790296",
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
                    modalId: "1649118790283",
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
          ],
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
        label: "下架应用",
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
                label: "下架应用表单",
                formItemWidth: "300px",
                labelWidth: "",
                labelPosition: "",
                field: "formData",
              },
              animations: [],
              childrens: [
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
                    label: "应用",
                    labelWidth: "100px",
                    field: "app_name",
                    alias: "应用（下架）",
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
                label: "确 认",
              },
              animations: [],
            },
          ],
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
        label: "上架应用",
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
                  uuid: "1649123842920",
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
                    label: "应用",
                    labelWidth: "100px",
                    field: "app_name",
                    alias: "应用（下架）",
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
                    "请注意：重新上架后用户将能通过统一账号登录应用。",
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
                label: "确 认",
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
