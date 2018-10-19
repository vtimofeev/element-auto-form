<template>
  <el-form-item :label="attributes.label || name" :prop="name" :class="attributes.class">
    <el-rate v-model="instance[name]"
             :size="attributes.size || schema.attributes.size || 'default'"
             :colors="attributes.colors"
             :texts="attributes.texts"
             :text-color="attributes.textColor"
             :show-text="attributes.showText"
             :placeholder="attributes.placeholder || name"
             :disabled="attributes.disabled"
    >
    </el-rate>
  </el-form-item>
</template>

<script>
  import {Props} from './common'

  export default {
    name: 'ef-rate',
    props: Props
  }
</script>
