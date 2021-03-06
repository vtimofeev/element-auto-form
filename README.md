# element-auto-form

State: development
Create and validate form with element-ui and JSON schema.
Fast and simple.

## Install

```
npm i element-auto-form --save-exact
```


## Use

```
import ElementAutoFrom from 'element-auto-form'

let schema = {
  '$schema': 'http://json-schema.org/draft-04/schema#',
  'type': 'object',
  'attributes': {
    'size': 'small',
    'class': 'auto-form'
  },
  'properties': {
    'name': {
      'type': 'string',
      'minLength': 4,
      'maxLength': 30,
      'attributes': {
        'label': 'Full Name',
        'description': 'Please enter your full name. Min length 4, max length 30',
        'placeholder': 'Your Full Name'
      }
    },
    'email': {
      'type': 'string',
      'maxLength': 255,
      'attributes': {
        'type': 'email',
        'placeholder': 'Your Email',
        'label': 'Emails',
        'description': 'Please enter your email'
      }
    },
    'list': {
      'type': 'string',
      'enum': [
+        'Daily News',
        'Promotion'
      ],
      'attributes': {
        'placeholder': 'Select your list subscription',
        'description': 'Please select your list subscription'
      }
    },
    'agree': {
      'type': 'boolean',
      'default': false,
      'attributes': {
        'label': 'I`m agree',
        'type': 'checkbox'
      }
    }
  },
  'additionalProperties': false,
  'required': [
    'name',
    'email',
    'agree'
  ]
}

const App = new Vue({
  el: '#app',
  template: `
    <div>
        <element-auto-form ref="autoForm" :schema="schema" :extend="extend" v-model="model">
            <el-form-item slot="header">
                <h1>
                    Form Name
                </h1>
            </el-form-item>
            <el-form-item slot="footer">
                <el-button @click="$refs.autoForm.validate().then(v => console.log('After validate'))">Validate and submit</el-button>
            </el-form-item>
        </element-auto-form>
    </div>`,
  data () {
    return {
      schema: schema,
      extend: {
        attributes: {
          'label-width': '160px'
        }
      },
      model: {
        name: '',
        email: '',
        list: '',
        agree: false
      }
    }
  },
  mounted () {
  }
})
```

