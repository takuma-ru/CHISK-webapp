<template>
  <div class="error">
    <h1>
      {{ error.statusCode }}
    </h1>
    <p>
      {{ error.message }}
    </p>
    <div>
      <Button
        color="blue-lighten-1"
        text-color="white"
        icon="mdiHomeVariantOutline"
        to="/"
      >
        ホームに戻る
      </Button>
      <Button
        color="blue-lighten-1"
        text-color="white"
        icon="mdiReload"
        style="margin-left: 16px"
        @click="reload()"
      >
        リロードする
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  setup () {
    // const
    const router = useRouter()

    // methods
    const reload = () => {
      router.go(0)
    }

    return {
      reload,
    }
  },
})

/* export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
  methods: {
    reload () {
      this.$router.go({ path: this.$router.currentRoute.path, force: true })
    },
  },
} */
</script>

<style lang="scss" scoped>
.error {
  display: flex;
  flex-flow: column;
  justify-items: center;
  align-items: center;
  align-content: space-around;

  h1 {
    font-size: 64px;
    color: $white;
    text-align: center;
    margin-top: 48px;
    margin-bottom: 0px;
  }

  p {
    color: $white;
    margin-bottom: 48px;
  }
}
</style>
