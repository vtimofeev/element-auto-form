<template>
  <el-form-item :label="attributes.label || name" :prop="name" :class="attributes.class">
    <el-color-picker
      v-model="instance[name]"
      :size="attributes.size || schema.attributes.size || 'default'"
      :readonly="attributes.readonly"
      :disabled="attributes.disabled"
    >
    </el-color-picker>
  </el-form-item>
</template>

<script>
  import {Props} from './common'

  export default {
    name: 'ef-color-picker',
    props: Props
  }
</script>
