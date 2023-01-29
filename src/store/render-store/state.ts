const state = {
  page: {} as Page,
  home: {
    form: {
      textInput: '',
      radio: '',
    },

    table: {
      data: [],
      currentIndex: 0,
      currentRow: {},
      selectedRows: [],
      expandedRows: [],
      summary: {},
    },

    editTable: {
      data: [],
      currentIndex: 0,
      currentRow: {},
      selectedRows: [],
      expandedRows: [],
      summary: {},
      methods: {
        vialidate: () => {}
      },
    },

    tree: {
      selectedKey: 0,
      checkedKeys: [],
      expandedKeys: [],
    },

    options: {
      radio: [],
      checkbox: [],
      select: [],
      cascader: [],
      tree: [],
      chips: [],
      rating: [],
      segmentedButton: [],
    },
  }
}

const state1 = {
  page: {} as Page,
  home: {
    textInput: {
      data: '',
      methods: {
        vialidate: () => {}
      },
    },

    radio: {
      data: '',
      options: [],
      methods: {
        vialidate: () => {}
      },
    },

    form: {
      data: {},
      methods: {
        vialidate: () => {}
      },
    },

    table: {
      data: [],
      currentIndex: 0,
      currentRow: {},
      selectedRows: [],
      expandedRows: [],
      summary: {},
    },

    editTable: {
      data: [],
      currentIndex: 0,
      currentRow: {},
      selectedRows: [],
      expandedRows: [],
      summary: {},
      methods: {
        vialidate: () => {}
      },
    },

    // tree: {
    //   selectedKey: 0,
    //   checkedKeys: [],
    //   expandedKeys: [],
    // },

    // options: {
    //   radio: [],
    //   checkbox: [],
    //   select: [],
    //   cascader: [],
    //   tree: [],
    //   chips: [],
    //   rating: [],
    //   segmentedButton: [],
    // },
  }
}
