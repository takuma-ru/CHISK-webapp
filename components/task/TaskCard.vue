<template>
  <div :id="taskData.id">
    {{ taskData.title }}
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  PropType,
  useMeta,
} from '@nuxtjs/composition-api'
import { userTaskDataInterface } from '~/composition/userTaskData'

export default defineComponent({
  props: {
    taskData: {
      type: Object as PropType<userTaskDataInterface>,
      default: () => ({
        id: 'id',
        title: 'title',
        text: 'text',
        dateStart: new Date(),
        dateEnd: new Date(),
        group: 'group',
        completed: new Date(),
        tag: [],
      }),
    },
  },
  setup () {
    // const
    // let, computed
    // methods
    // lifeCycle
    onBeforeMount(async () => {
    })
    // other
    useMeta({ title: 'test one' })

    return {
    }
  },
  head: {},
})
</script>
