
declare interface Component {
  uuid: string
  name: string
  style?: Style
  property?: any
  modelValue?: any
  actions?: Action[]
  animations?: any[]
  children?: Component[]
  slots?: {
    name: string
    children: Component[]
  }[]
}

// events
declare type EventType =
  | 'click'
  | 'dbclick'
  | 'touch'
  | 'scroll'
  | 'update'
  | 'beforeMount'
  | 'mounted'
  | 'beforeUnmount'
  | 'activated'
  | 'deactivated'

// actions
declare type Action = OpenDialog | CloseDialog | Linkto | Fetch | Download | Validate | resetValue | setValue | Broadcast

declare interface OpenDialog {
  event?: EventType
  action: 'openDialog'
  options: {
    targetId: string
  }
  condition: Condition
  thenActions: Action[]
}

declare interface CloseDialog {
  event?: EventType
  action: 'closeDialog'
  options: {
    targetId: string
  }
  condition: Condition
  thenActions: Action[]
}

declare interface Linkto {
  event?: EventType
  action: 'linkto'
  options: {
    go?: number
    url?: string
    tab?: '_self' | '_blank'
    mode?: 'query' | 'params'
    name?: string
    payloads?: Payload[]
  }
  condition: Condition
  thenActions: Action[]
}

declare interface Fetch {
  event?: EventType
  action: 'fetch'
  options: FetchOption
  condition: Condition
  thenActions: Action[]
}

declare interface FetchOption extends RequestConfig {
  payloads: Payload[]
  headerPayloads?: Payload[]
}

declare interface Download {
  event?: EventType
  action: 'download'
  options: {
    // 待完善
  }
  condition: Condition
  thenActions: Action[]
}

declare interface Validate {
  event?: EventType
  action: 'validate'
  options: {
    targetId: string
  }
  condition: Condition
  thenActions: Action[]
}

declare interface resetValue {
  event?: EventType
  action: 'resetValue'
  options: {
    targetId: string
  }
  condition: Condition
  thenActions: Action[]
}

declare interface setValue {
  event?: EventType
  action: 'setValue'
  options: {
    payloads: Payload[]

    // 单个组件
    target?: {
      id: string
      path: string | string[]
      payloadKey?: string
    }

    // 多个组件
    targets?: {
      id: string
      path: string | string[]
      payloadKey?: string
    }[]
  }
  condition: Condition
  thenActions: Action[]
}

declare interface Broadcast {
  event?: EventType
  action: 'broadcast'
  options: {
    targetId: string
  }
  condition: Condition
  thenActions: Action[]
}

// payload
declare interface IPayload {
  key?: string
  value?: string
  sourceId?: string
  jsonPath?: string
}

// condition
declare interface Condition {
  payloads: Payload[]
  expression: string
}
