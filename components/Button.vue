<template>
  <button
    id="Button"
    :disabled="disabled"
    :style="{
      backgroundColor: scssVar(color)
    }"
    :size="size"
    :fab="fab"
    @click="to ? pushRoute() : $emit('click')"
  >
    <div
      class="text"
      :style="`
        --color: ${scssVar(textColor)}
      `"
    >
      <Icon
        v-if="icon"
        size="24px"
        :icon="icon"
      />
      <slot />
    </div>
  </button>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  useRoute,
} from '@nuxtjs/composition-api'
import scssVar from '~/composable/scss/returnVariables'
import usePageTransition, { pageTransitionKey, pageTransitionType } from '~/composition/pageTransition'

export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: 'primary',
    },
    textColor: {
      type: String,
      default: 'black',
    },
    size: {
      type: String,
      default: 'normal',
      validator: (value: string) => {
        return ['small', 'normal', 'large'].includes(value)
      },
    },
    fab: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
      default: null,
    },
  },
  setup (props) {
    // store
    const {
      push,
    } = inject(pageTransitionKey, usePageTransition()) as pageTransitionType
    // const
    const route = useRoute()

    // methods
    const pushRoute = () => {
      const nowPath = route.value.path
      push(nowPath, props.to)
    }

    // lifeCycle

    // other

    return {
      scssVar,
      pushRoute,
    }
  },
})
</script>

<style lang="scss">
#Button {
  position: relative;
  width: auto;
  height: 100%;

  border: none;
  border-radius: 8px;
  background-color: $primary-lighten-1;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color:rgba(0,0,0,0);

  .text {
    --color: $white;
    display: inline-flex;
    position: relative;
    z-index: 1;
    padding: 0.4rem 1em;
    margin: 0px;

    font-family: 'Noto Sans JP', sans-serif;
    text-align: center;
    font-size: 14px;
    font-weight: normal;
    color: var(--color);

    justify-content: center;
    align-items: center;

    svg {
      path {
        fill: var(--color);
      }
    }
  }

  &:hover::before {
    position: absolute;
    z-index: 2;
    content: '';
    width: 100%;
    height: 100%;

    top: 0%;
    left: 0%;

    border-radius: 8px;
    background-color: #CCCCCC2D;
  }

  &:disabled {
    color: rgba(16, 16, 16, 0.5);
    svg path {
      fill: rgba(16, 16, 16, 0.5);
    }

    &::after {
      position: absolute;
      z-index: 0;
      content: '';
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;

      border-radius: 8px;
      background-color: $gray-lighten-2;
    }
  }

  &:disabled:hover::before {
    position: absolute;
    z-index: 1;
    content: '';
    width: 100%;
    height: 100%;

    top: 0%;
    left: 0%;

    border-radius: 8px;
    background-color: #CCCCCC00;
  }

  &[fab] {
    .text {
      height: calc(100% - 16px);
      padding: 8px;
    }
  }

  &[size = "small"] {
    width: auto;
    height: 24px;
  }

  &[size = "normal"] {
    width: auto;
    height: 40.78px;
  }

  &[size = "large"] {
    width: auto;
    height: 64px;
    border-radius: 16px;

    &:hover::before {
      border-radius: 16px;
    }
  }
}
</style>
