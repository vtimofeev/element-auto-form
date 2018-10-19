<template>
  <el-form-item :label="attributes.label || name" :prop="name" :class="attributes.class">
    <el-slider v-model="instance[name]"
               :size="attributes.size || 'default'"
               :show-input="attributes.showInput"

               :input-size="attributes.inputSize"
               :show-stops="attributes.showStops"

               :showTooltip="attributes.showTooltip"
               :formatTooltip="attributes.formatTooltip"

               :range="attributes.range"
               :min="attributes.min"
               :max="attributes.max"
               :step="attributes.step"
               :debounce="attributes.debounce"
               :disabled="attributes.disabled"
    >
    </el-slider>
  </el-form-item>
</template>

<script>
  import {Props} from './common'

  export default {
    name: 'ef-slider',
    props: Props
  }
</script>
