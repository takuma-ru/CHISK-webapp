<template>
  <div class="input">
    <div class="input-icon">
      <Icon
        :icon="icon"
        color="gray"
        size="1.5rem"
      />
    </div>
    <div class="input-datefield">
      <input
        v-model="model"
        type="date"
        required
      >
      <label>{{ label }}</label>
    </div>
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
      type: Date,
      default: null,
    },
    icon: {
      type: String,
      require: true,
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
  display: flex;
  width: 100%;
  padding: 24px 0px 8px;

  align-items: center;

  &-icon {
    margin: 0px 8px;
  }

  &-datefield {
    position: relative;
    flex-grow: 1;
  }

  input {
    min-height: 56px;
    padding: 0.75rem 1rem;
    width: 100%;

    transition: 0.2s;

    font: 15px/24px sans-serif;
    box-sizing: border-box;
    border: 0px solid $gray-lighten-1;
    border-radius: 16px;
    background-color: #bec6cf50;

    resize: none;

    & ~ label {
      position: absolute;
      z-index: -1;
      width: auto;
      top: calc(-0.75rem - 28px);
      left: 1rem;

      font-size: 14px;
      line-height: 56px;
      letter-spacing: 0.5px;
      transition: 0.2s;
      color: $gray-lighten-1;
    }
  }
}
</style>
