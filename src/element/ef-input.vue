<template>
  <el-form-item :label="attributes.label || name" :prop="name" :class="attributes.class">
    <el-input v-model="instance[name]"
              :type="attributes.type"
              :size="attributes.size || schema.attributes.size || 'default'"
              :autosize="attributes.autosize"
              :placeholder="attributes.placeholder || name"
              :clearable="attributes.clearable"
              :disabled="attributes.disabled"
              :readonly="attributes.readonly"
    >
    </el-input>
  </el-form-item>
</template>

<script>
  import {Props} from './common'

  export default {
    name: 'ef-input',
    props: Props
  }
</script>
