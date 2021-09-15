<template>
  <div
    @drop.stop="onDrop"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot/>
  </div>
</template>

<script>
export default {
  methods: {
    onDrop (e) {
      const transferData = JSON.parse(e.dataTransfer.getData('payload'))

      // {type: 'column', fromColumnIndex: 1}
      // {type: 'task', fromColumnIndex: 0, fromTaskIndex: 1}
      this.$emit('drop', transferData)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
