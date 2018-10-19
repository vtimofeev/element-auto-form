export var Props = {
  instance: {
    type: Object,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  prop: {
    type: Object,
    default: function () {
      return {}
    }
  },
  attributes: {
    type: Object,
    default: function () {
      return {}
    }
  },
  schema: {
    type: Object
  },
  config: {
    type: Object
  }
}
