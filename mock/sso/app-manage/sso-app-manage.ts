export const config = {
  id: 'sso-app-manage',
  name: '应用管理',
  path: '/sso-app-manage',
  elements: [
    {
      uuid: "1648821632532",
      name: "zh-container",
      type: "root",
      style: {
        display: "block",
        minHeight: "60px",
      },
      events: [],
      modelValue: "",
      propConfig: {},
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
              trigger: [],
              event: "request",
              modalId: "",
              link: "",
              aTarget: "",
              api: "/lc/api/onl-report/config",
              method: "POST",
              showLoading: true,
              params: [
                {
                  key: "reportCode",
                  value: "PurchaseReceive",
                  type: "input-keyValue",
                },
              ],
              assignmentType: "",
              valueToComp: "",
              valueToComps: [],
              sourceToTarget: [],
              thenEvents: [],
              userAction: "click",
            },
          ],
          modelValue: "",
          propConfig: {
            label: "按钮",
          },
          animations: [],
        },
        {
          uuid: "1648949698710",
          name: "zh-button",
          type: "button",
          style: {
            display: "inline-block",
          },
          events: [
            {
              trigger: [],
              event: "link",
              modalId: "",
              link: "https://www.baidu.com/",
              aTarget: "_blank",
              api: "",
              method: "",
              showLoading: false,
              params: [
                {
                  key: "name",
                  value: "zonghuang",
                  type: "input-keyValue",
                },
                {
                  key: "age",
                  value: "18",
                  type: "input-keyValue",
                },
              ],
              assignmentType: "",
              valueToComp: "",
              valueToComps: [],
              sourceToTarget: [],
              thenEvents: [],
              userAction: "click",
            },
          ],
          modelValue: "",
          propConfig: {
            label: "按钮",
          },
          animations: [],
        },
      ],
    },
  ],
  settings: {},
}
