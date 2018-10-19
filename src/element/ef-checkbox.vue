<template>
  <el-form-item :label="attributes.label || name" :prop="name" :class="attributes.class">
    <el-checkbox v-model="instance[name]"
                 :type="attributes.type"
                 :size="attributes.size || schema.attributes.size || 'default'"
                 :placeholder="attributes.placeholder || name"
                 :clearable="attributes.clearable"
                 :disabled="attributes.disabled">
    </el-checkbox>
  </el-form-item>
</template>

<script>
  import {Props} from './common'

  export default {
    name: 'ef-checkbox',
    props: Props
  }
</script>
