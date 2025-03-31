<template>
  <div class="chat-window">
    <div class="messages">
      <Message
        v-for="(message, index) in messages"
        :key="index"
        :message="message"
      />
    </div>
    <InputBox @send-message="sendMessage" />
  </div>
</template>

<script lang="ts">
import Message from './Message.vue'
import InputBox from './InputBox.vue'
import axios from 'axios'

export default {
  components: {
    Message,
    InputBox,
  },
  data() {
    return {
      messages: [
        { text: '你好，我是 DeepSeek，有什么可以帮助你的吗？', sender: 'bot' },
        { text: '你好，我想了解一下你们的产品。', sender: 'user' },
      ],
      apiKey: 'sk-zkulwvdthgpgwhmiwnczmpbhalinmjgtgwqkfyoefwmzizxj',
      url: 'https://api.siliconflow.cn/v1/chat/completions', // 替换为实际 API 地址
    }
  },
  methods: {
    async sendMessage(text) {
      const response = await axios.post(
        this.url,

        // 请求参数
        {
          model: 'deepseek-ai/DeepSeek-V3',
          messages: [
            {
              role: 'user',
              content: '中国大模型行业2025年将会迎来哪些机遇和挑战？',
            },
          ],
          stream: false,
          max_tokens: 512,
          stop: ['null'],
          temperature: 0.7,
          top_p: 0.7,
          top_k: 50,
          frequency_penalty: 0.5,
          n: 1,
          response_format: { type: 'text' },
          tools: [
            {
              type: 'function',
              function: {
                description: '<string>',
                name: '<string>',
                parameters: {},
                strict: false,
              },
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      )

      this.messages.push({ text, sender: 'user' })
      console.log('response', response)
      // 这里可以调用 API 发送消息并接收回复
      this.receiveMessage(response)
      //   const options = {
      //     method: 'POST',
      //     headers: {
      //       Authorization:
      //         'Bearer sk-zkulwvdthgpgwhmiwnczmpbhalinmjgtgwqkfyoefwmzizxj',
      //       'Content-Type': 'application/json',
      //     },
      //     body: '{"model":"deepseek-ai/DeepSeek-V3","messages":[{"role":"user","content":"中国大模型行业2025年将会迎来哪些机遇和挑战？"}],"stream":false,"max_tokens":512,"stop":["null"],"temperature":0.7,"top_p":0.7,"top_k":50,"frequency_penalty":0.5,"n":1,"response_format":{"type":"text"},"tools":[{"type":"function","function":{"description":"<string>","name":"<string>","parameters":{},"strict":false}}]}',
      //   }

      //   fetch('https://api.siliconflow.cn/v1/chat/completions', options)
      //     .then(response => response.json())
      //     .then(response => console.log(response))
      //     .catch(err => console.error(err))
    },
    receiveMessage(text) {
      this.messages.push({ text, sender: 'bot' })
    },
  },
}
</script>

<style scoped>
.chat-window {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}
</style>
