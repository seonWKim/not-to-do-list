<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <input
        type="text"
        class="p-2 w-full mr-2 block text-xl font-bold"
        :value="task.name"
        @change="updateTaskProperty($event, 'name')"
        @keyup.enter="updateTaskProperty($event, 'name')"
      >

      <textarea
        class="relative w-full bg-transparent px-2 border mt-2 h-64 border-none leading-normal"
        :value="task.description"
        @change="updateTaskProperty($event, 'description')"
      />

      <button @click="deleteTask">delete</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getTask']),
    task () {
      return this.getTask(this.$route.params.id)
    }
  },
  methods: {
    updateTaskProperty (e, key) {
      this.$store.commit('UPDATE_TASK', {
        task: this.task,
        key,
        value: e.target.value
      })
    },
    deleteTask () {
      const columnIndex = this.$route.params.columnIndex
      const taskIndex = this.$route.params.taskIndex
      this.$store.commit('REMOVE_TASK', { columnIndex, taskIndex })
      this.$router.push({ name: 'board' })
    }
  }
}
</script>

<style>
.task-view {
  @apply relative flex flex-row bg-white pin mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>
