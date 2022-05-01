<template>
  <div class="error">
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <div>
      <Button
        color="blue-lighten-1"
        text-color="white"
        to="/"
      >
        ホームに戻る
      </Button>
      <Button
        color="blue-lighten-1"
        text-color="white"
        style="margin-left: 16px"
        @click="reload()"
      >
        リロードする
      </Button>
    </div>
  </div>
</template>

<script>
export default {
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
}
</script>

<style lang="scss" scoped>
.error {
  display: flex;
  flex-flow: column;
  justify-items: center;
  align-items: center;

  h1 {
    font-size: 64px;
    color: $white;
  }
}
</style>
