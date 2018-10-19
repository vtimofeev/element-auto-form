let schema = {
  '$schema': 'http://json-schema.org/draft-04/schema#',
  'type': 'object',
  'attributes': {
    'title': 'NewsLetter form',
    'description': 'Sign up for free newsletters and get more delivered to your inbox',
    'size': 'small',
    'class': 'newsletter-form'
  },
  'properties': {
    'name': {
      'type': 'string',
      'minLength': 4,
      'maxLength': 30,
      'attributes': {
        'label': '[label] Full Name',
        'description': '[title] Please enter your full name. Min length 4, max length 30',
        'placeholder': 'Your Full Name'
      }
    },
    'email': {
      'type': 'string',
      'maxLength': 255,
      'attributes': {
        'type': 'email',
        'placeholder': '[placeholder] Your Email',
        'label': '[label] Emails',
        'description': '[description] Please enter your email'
      }
    },
    'list': {
      'type': 'string',
      'enum': [
        'Daily News',
        'Promotion'
      ],
      'attributes': {
        'placeholder': 'Select your list subscription',
        'description': 'Please select your list subscription'
      }
    },
    'multiple_list': {
      'type': 'array',
      'items': {
        'type': 'string'
      },
      'title': 'Multi list',
      'enum': [
        'Daily News',
        'Weekly News',
        'Monthly News',
        'Promotion'
      ],
      'attributes': {
        'v-if': '(instance.name || "").length > 5',
        'type': 'select',
        'label': 'Multiple list',
        'multiple': true,
        'placeholder': 'Select many',
        'description': 'Select many, minimum one'
      }
    },
    'agree': {
      'type': 'boolean',
      'default': false,
      'attributes': {
        'label': 'Я согласен',
        'type': 'checkbox'
      }
    }
  },
  'additionalProperties': false,
  'required': [
    'name',
    'email',
    'lists',
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
                    Form name is ... 
                </h1>
            </el-form-item>
            <el-form-item slot="footer">                
                <el-button @click="$refs.autoForm.validate().then(v => console.log(v))">Validate and submit</el-button>
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
        email: ''
      }
    }
  },
  mounted () {
  }
})
