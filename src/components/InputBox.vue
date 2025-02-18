<template>
  <div class="input-box">
    <input v-model="message" @keyup.enter="send" placeholder="输入消息..." />
    <button @click="send">发送</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
    }
  },
  methods: {
    send() {
      if (this.message.trim()) {
        this.$emit('send-message', this.message)
        this.message = ''
      }
    },
  },
}
</script>

<style scoped>
.input-box {
  display: flex;
  padding: 10px;
  background-color: #f5f5f5;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  margin-left: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
