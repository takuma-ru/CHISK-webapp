<template>
  <div class="input">
    <div class="input-icon">
      <Icon
        :icon="icon"
        color="gray"
        size="1.5rem"
      />
    </div>
    <div class="input-textarea">
      <textarea
        v-model="model"
        required
      />
      <label>{{ label }}</label>
      <div class="input-invalid">
        <div v-for="(error, index) in v.$errors" :key="index">
          <div v-if="error.$validator == 'required'">
            入力してください
          </div>
          <div v-if="error.$validator == 'maxLength'">
            {{ error.$params.max }}字以内にしてください
          </div>
        </div>
      </div>
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
      type: String,
      default: null,
    },
    v: {
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

  &-textarea {
    position: relative;
    flex-grow: 1;
  }

  &-invalid {
    color: $red;
    font-size: small;
    padding-left: 1rem;
  }

  textarea {
    min-height: 56*2px;
    padding: 0.75rem 1rem;
    width: 100%;

    transition: 0.2s;

    font: 15px/24px sans-serif;
    box-sizing: border-box;
    border: 0px solid $gray-lighten-1;
    border-radius: 16px;
    background-color: #bec6cf50;

    resize: vertical;

    &:focus {
      outline: none;

      & ~ label {
        font-size: 14px;
        top: calc(-0.75rem - 12px);
        left: 1rem;
        transition: 0.2s;
        color: $gray-lighten-1;
      }
    }

    &:valid ~ label {
      font-size: 14px;
      top: calc(-0.75rem - 12px);
      left: 1rem;
      transition: 0.2s;
      color: $gray-lighten-1;
    }

    & ~ label {
      position: absolute;
      z-index: -1;
      top: 0.75rem;
      left: 1rem;
      width: auto;
      transition: 0.2s;
      letter-spacing: 0.5px;
      color: $gray;
    }
  }
}
</style>
