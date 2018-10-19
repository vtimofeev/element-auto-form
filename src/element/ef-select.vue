<template>
  <el-form-item :label="attributes.label || name" :prop="name" :class="attributes.class">
    <div v-if="attributes.type === 'radio-group'">
      <el-radio v-model="instance[name]" v-for="(item, index) in items"
                :disabled="attributes.disabled"
                :size="attributes.size || 'default'"
                :value="getItemValue(item)"
                :label="getItemLabel(item)">
      </el-radio>
    </div>
    <div v-if="attributes.type === 'checkbox-group'">
      <el-checkbox-group v-model="instance[name]" :disabled="attributes.disabled" :size="attributes.size">
        <el-checkbox v-for="(item, index) in items"
                     :size="attributes.size || 'default'"
                     :value="getItemValue(item)"
                     :label="getItemLabel(item)">
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <div v-if="attributes.type === 'button-group'">
      <el-checkbox-group v-model="instance[name]" :disabled="attributes.disabled" :size="attributes.size">
        <el-checkbox-button v-for="(item, index) in items"
                            :size="attributes.size || 'default'"
                            :value="getItemValue(item)"
                            :label="getItemLabel(item)">
        </el-checkbox-button>
      </el-checkbox-group>
    </div>
    <el-select
      v-else
      v-model="instance[name]"
      :size="attributes.size || 'default'"
      :remoteMethod="getRemoteItemsWrapper(attributes.remoteMethod)"
      :filterable="attributes.filterable"
      :multiple="attributes.multiple"
      :loading="loading"
      :disabled="attributes.disabled"
      :remote="attributes.remote">
      <el-option v-for="(item, index) in items"
                 :value="getItemValue(item)"
                 :label="getItemLabel(item)"
                 :key="getItemKey(item, index)"></el-option>
    </el-select>
  </el-form-item>
</template>

<script>
  import {Props} from './common'

  export default {
    name: 'ef-select',
    props: Props,
    data: function () {
      return {
        loading: false,
        items: []
      }
    },
    created () {
      this.getItems()
    },
    methods: {
      getItems () {
        let itemsResult = this.attributes.items || this.prop.enum || this.prop.items

        if (Array.isArray(itemsResult)) {
          this.items = itemsResult
        }
        else if (typeof itemsResult === 'function') {
          this.getRemoteItems(itemsResult)
        }
        else {
          throw new Error('Can not get items of ' + this.name +  ' of ' + JSON.stringify(this.prop))
        }
      },
      getRemoteItemsWrapper (f) {
        return f ? (v) => this.getRemoteItems(f, v) : null
      },
      getRemoteItems (f, data) {
        if (!f) return
        this.loading = true
        f(data, this.name, this.prop)
          .then(v => {
            this.items = v
            this.loading = false
          })
          .catch(e => {
            console.warn('[ef-select:getRemoteItems] Error ', e)
            this.loading = false
          })
      },
      getItemValue (item) {
        return item && (item.value || item.id) || item
      },
      getItemLabel (item) {
        return item && (item.label || item.name) || item
      },
      getItemKey (item, index) {
        return item && (item.value || item.id) || item || `${name}-${index}`
      }
    }
  }
</script>
