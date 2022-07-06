<template>
  <div class="snack-bar-group">
    <div
      v-for="(data, i) in snackBarNoticeData"
      :key="i"
    >
      <transition name="snack-bar-transition">
        <div
          v-if="data.model"
          :type="data.type"
          class="snack-bar"
        >
          <div class="icon">
            <Icon
              :color="data.type === 'success' ? 'green-lighten-2' : data.type === 'error' ? 'red-lighten-2' : data.type === 'help' ? 'yellow-lighten-2' : 'blue-lighten-2'"
              :icon="data.type === 'success' ? 'mdiCheckCircle' : data.type === 'error' ? 'mdiAlertCircle' : data.type === 'help' ? 'mdiInformation' : 'mdiDownload'"
            />
          </div>
          <div
            v-if="data.type === 'pwaInstall'"
          >
            <div class="contents">
              <p>
                インストールすると、すぐにアプリを起動できます。
              </p>
              <InstallButton />
            </div>
          </div>
          <div
            v-else
          >
            <div class="contents" v-text="data.content" />
          </div>
          <div class="actions">
            <Button
              icon-mode
              icon="mdiClose"
              @click="hiddenSnackBarNoticeData(i)"
            />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted } from '@nuxtjs/composition-api'
import InstallButton from './InstallButton.vue'
import returnMdiIcon from '~/composable/utils/returnMdiIcon'
import useSnackBarNoticeData, { snackBarNoticeDataKey, snackBarNoticeDataType } from '~/composition/snackBarNoticeData'

export default defineComponent({
  components: { InstallButton },
  setup () {
    const { snackBarNoticeData, hiddenSnackBarNoticeData } = inject(snackBarNoticeDataKey, useSnackBarNoticeData()) as snackBarNoticeDataType
    const closeSnackBar = () => {
      for (const [key] of Object.entries(snackBarNoticeData)) {
        hiddenSnackBarNoticeData(Number(key))
      }
    }
    onMounted(() => {
      setTimeout(closeSnackBar, 15000)
    })
    return {
      snackBarNoticeData,
      returnMdiIcon,
      hiddenSnackBarNoticeData,
    }
  },
})
</script>

<style lang="scss" scoped>
.snack-bar-group {
  display: flex;
  flex-flow: column;

  z-index: 11;
  position: fixed;

  top: 56px;
  right: 0px;

  padding: 24px;
}

.snack-bar {
  display: grid;
  grid-template-columns: 48px 1fr 48px;
  align-items: center;

  position: relative;
  width: min(calc(100vw - 24px), 342px);
  min-height: 48px;

  margin: 4px 0px;

  border-radius: 12px;
  box-shadow: 0px 16px 40px rgba(0, 37, 80, 0.3);

  .icon {
    display: grid;
    place-items: center;

    width: 100%;
    height: 100%;

    background-color: $red;
    border-radius: 12px 0px 0px 12px;
  }

  .contents {
    padding: 8px;

    p {
      margin-top: 0px;
      margin-bottom: 16px;
    }
  }

  .actions {
    justify-self: center;

    cursor: pointer;
  }

  &[type = 'success'] {
    background-color: $green-lighten-2;
    .icon {
      background-color: $green;
    }
  }

    &[type = 'error'] {
    background-color: $red-lighten-2;
    .icon {
      background-color: $red;
    }
  }

  &[type = 'help'] {
    background-color: $yellow-lighten-2;
    .icon {
      background-color: $yellow;
    }
  }

  &[type = 'pwaInstall'] {
    background-color: $blue-lighten-2;
    .icon {
      background-color: $blue;
    }
  }
}

.snack-bar-transition {
  &-enter {
    & {
      right: 684px;
    }
    &-active {
      transition: all 0.25s cubic-bezier(0.25, 0, 0.84, 0);
    }
    &-to {
      right: 0px;
    }
  }
  &-leave {
    & {
      right: 0px;
    }
    &-active {
      transition: all 0.25s cubic-bezier(0.25, 0, 0.84, 0);
    }
    &-to {
      right: -684px;
    }
  }
}
</style>
