<template>
  <div
    class="tab"
    :style="{
      width: width,
    }"
  >
    <div
      v-for="(item, i) in tabItem"
      :key="i"
      class="tab-item"
      :slected="item === model ? true : false"
      @click="tabSwitch(item)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'InputField',

  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },

  props: {
    modelValue: {
      type: String,
      default: null,
    },
    tabItem: {
      type: Array,
      default: null,
    },
    width: {
      type: String,
      default: null,
    },
  },
  emits: ['update:modelValue'],

  setup (props, ctx) {
    // const

    // computed
    const model = computed({
      get: () => props.modelValue,
      set: (value: string) => ctx.emit('update:modelValue', value),
    })

    const tabSwitch = (item: any) => {
      ctx.emit('update:modelValue', item)
    }

    return {
      model,

      tabSwitch,
    }
  },
})
</script>

<style lang="scss" scoped>
.tab {
  display: flex;
  justify-content: space-around;

  margin-bottom: 16px;

  .tab-item {
    position: relative;

    margin-bottom: 12px + 4px;
    padding: 8px 16px;

    font-size: 14px;
    line-height: 24px;
    border-radius: 12px;
    color: $white;
    cursor: pointer;
    outline: none;
    -webkit-tap-highlight-color:rgba(0,0,0,0);

    &[slected] {
      background-color: $primary;

      &::before {
        position: absolute;
        content: '';

        bottom: -12px;
        left: 0px;
        width: 100%;
        height: 4px;

        border-radius: 2px;
        background-color: $primary;
      }
    }

  }
}
</style>
