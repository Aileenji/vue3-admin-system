<template>
  <div :class="['message', sender]">
    {{ message.text }}
  </div>
</template>

<script lang="ts">
export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  computed: {
    sender() {
      return this.message.sender
    },
  },
}
</script>

<style scoped>
.message {
  margin: 5px 0;
  padding: 10px;
  border-radius: 10px;
  max-width: 70%;
}

.user {
  background-color: #dcf8c6;
  align-self: flex-end;
}

.bot {
  background-color: #ececec;
  align-self: flex-start;
}
</style>
