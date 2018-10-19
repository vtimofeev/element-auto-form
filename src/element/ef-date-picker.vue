<template>
  <el-form-item :label="attributes.label || name" :prop="name" :class="attributes.class">
    <el-date-picker
      v-model="instance[name]"
      :size="attributes.size || schema.attributes.size || 'default'"
      :type="attributes.type + 'datetime'"
      :format="attributes.format || 'yyyy-MM-dd HH:mm:ss'"
      :placeholder="attributes.placeholder || name"
      :readonly="attributes.readonly"
      :disabled="attributes.disabled"
    >
    </el-date-picker>
  </el-form-item>
</template>

<script>
  import {Props} from './common'

  export default {
    name: 'ef-datepicker',
    props: Props
  }
</script>
