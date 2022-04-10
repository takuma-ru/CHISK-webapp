<template>
  <div class="input">
    <input
      v-model="model"
      type="text"
      placeholder=""
      required
    >
    <label>{{ label }}</label>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
} from '@nuxtjs/composition-api'

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
    label: {
      type: String,
      default: '',
    },
  },

  emits: ['update:modelValue'],

  setup (props, ctx) {
    // const
    const msg = ref<string>()

    // computed
    const model = computed({
      get: () => props.modelValue,
      set: (value: any) => ctx.emit('update:modelValue', value),
    })

    return {
      msg,
      model,
    }
  },
})
</script>

<style lang="scss" scoped>
.input {
  position: relative;

  input {
    width: 100%;
    margin: 24px 0px 8px;
    padding: 1rem 1rem;

    transition: 0.2s;

    font: 15px/24px sans-serif;
    box-sizing: border-box;
    border: 0px solid $gray-lighten-1;
    border-radius: 28px;
    background-color: #bec6cf50;

    &:focus {
      outline: none;

      & ~ label {
        font-size: 12px;
        top: -16px;
        left: 1rem;
        transition: 0.2s;
        color: $gray-lighten-1;
      }
    }

    &:valid ~ label {
      font-size: 12px;
      top: -16px;
      left: 1rem;
      transition: 0.2s;
      color: $gray-lighten-1;
    }

    & ~ label {
      position: absolute;
      z-index: -1;
      top: 24px;
      left: 1rem;
      width: 100%;
      line-height: 56px;
      transition: 0.2s;
      letter-spacing: 0.5px;
      color: $gray;
    }

  }
}
</style>
