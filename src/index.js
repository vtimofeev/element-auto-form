import Vue from 'vue'
import EfInput from './element/ef-input.vue'
import EfSelect from './element/ef-select.vue'
import EfCheckbox from './element/ef-checkbox.vue'
import EfColorPicker from './element/ef-color-picker.vue'
import EfDatePicker from './element/ef-date-picker.vue'
import EfRate from './element/ef-rate.vue'
import EfSlider from './element/ef-slider.vue'
import {merge} from './extend'

Vue.component(EfInput.name, EfInput)
Vue.component(EfCheckbox.name, EfCheckbox)
Vue.component(EfColorPicker.name, EfColorPicker)
Vue.component(EfDatePicker.name, EfDatePicker)
Vue.component(EfRate.name, EfRate)
Vue.component(EfSelect.name, EfSelect)
Vue.component(EfSlider.name, EfSlider)

const NameToComponent = {'form': 'el-form'}

const ElementAutoForm = Vue.extend({
  name: 'element-auto-form',
  props: {
    schema: {type: Object, required: true},
    extend: {type: Object},
    value: {type: Object, default: () => ({})},
    fields: {type: Array, default: () => null}
  },
  data: () => ({
    error: null,
    data: {},
    rules: {}
  }),
  created () {
    this.init()
    this.data = Object.assign({}, this.value)
  },
  render (h) {
    const formChildren = [],
      props = this.getFields()
    let formElement = null
    formChildren.push(this.$slots['header'])

    props.forEach(name => {
      let prop = this.getSchemaProperty(name),
        ifCondition = prop.attributes && prop.attributes['v-if'],
        ifResult = ifCondition ? (function (instance, name, prop, schema, attributes) {
          return eval(ifCondition)
        })(this.value, name, prop, this.schema, prop.attributes) : true

      if (ifResult) {
        const children = this.getElementChildren(name, {}, h),
          element = this.getElement(name, prop, h, children)

        formChildren.push(element)
        if (name && this.$slots[name]) formChildren.push(this.$slots[name])
      }
    })

    formChildren.push(this.$slots['footer'])
    formElement = this.getFormElement('form', this.extendedSchema, h, formChildren)
    return formElement
  },
  computed: {
    extendedSchema () {
      return merge(this.schema, this.extend)
    }
  },
  mounted () {
  },
  methods: {
    init () {
      this.rules = this.getFields().reduce((m, name) => {
        let prop = this.getSchemaProperty(name)

        if (prop.attributes.rules) {
          m[name] = m[name] || []
          m[name].push(rules)
        }

        if (this.extendedSchema.required && this.extendedSchema.required.indexOf(name) > -1) {
          m[name] = m[name] || []
          m[name].push({
            required: true,
            message: this.extendedSchema.attributes.requiredMessage || 'Field is required'
          })
        }

        return m
      }, {})
    },
    getFields () {
      return this.fields || Object.keys(this.extendedSchema.properties)
    },
    getSchemaProperty (name) {
      return this.extendedSchema.properties[name] || {}
    },
    getComponentName (name, prop) {
      let isSelect = prop.enum || prop.type === 'array' || prop.items,
        isCheckbox = prop.type === 'boolean',
        componentNameBySchema = isSelect && EfSelect.name || isCheckbox && EfCheckbox.name || EfInput.name,
        result = (prop.attributes && prop.attributes.component) || NameToComponent[name] || componentNameBySchema
      return result
    },
    getElementChildren (name, prop, h) {
      return []
    },
    getElement (name, prop, h, children) {
      let componentName = this.getComponentName(name, prop),
        componentProps = {
          model: this.value,
          instance: this.value,
          name: name,
          schema: this.extendedSchema,
          prop: prop,
          attributes: prop.attributes || {}
        },
        elementProps = {
          ref: name,
          props: componentProps,
          on: {
            change: this.changeHandler.bind(this, name, prop),
            input: this.inputHandler.bind(this, name, prop)
          },
          directives: []
        }

      return h(componentName, elementProps, children)
    },
    getFormElement (name, prop, h, children) {
      let componentName = this.getComponentName(name, prop),
        componentProps = {
          model: this.value,
          rules: this.rules,
          name: name
        },
        elementProps = {
          ref: name,
          props: Object.assign({}, prop.attributes, componentProps)
        }
      return h(componentName, elementProps, children)
    },
    inputHandler (name, prop, e) {
      const value = (e && e.target && e.target.value) || e
      this.$set(this.data, name, value)
      this.$emit('input', this.data)
    },
    changeHandler (name, prop, e) {
      const value = (e && e.target && e.target.value) || e
      this.$set(this.data, name, value)
      this.$emit('change', this.data)
    },
    form () {
      return this.$refs.form
    },
    validate () {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(v => {
          v ? resolve(true) : reject(false)
        })
      })
    }
  }
})

console.log('Vue is ', Vue, ' try to register ', 'element-auto-form', ElementAutoForm.name, ElementAutoForm)
Vue.component('element-auto-form', ElementAutoForm)

export default ElementAutoForm
