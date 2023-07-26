<template>
  <div>
    <input type="text" v-model="message" placeholder="Type a message">
    <button @click="sendMessage">Send</button>
    <ul>
      <li v-for="receivedMessage in receivedMessages" :key="receivedMessage.id">{{ receivedMessage.text }}</li>
    </ul>
  </div>
</template>

<script>
import { io } from 'socket.io-client'

export default {
  data() {
    return {
      message: '',
      receivedMessages: []
    }
  },
  mounted() {
    this.socket = io('http://localhost:3000') // Replace with your server URL

    // Listen for 'serverMessage' event from the server
    this.socket.on('serverMessage', (data) => {
      this.receivedMessages.push(data)
    })
  },
  methods: {
    sendMessage() {
      // Emit 'message' event to the server with the message text
      this.socket.emit('message', { text: this.message })

      // Clear the input field
      this.message = ''
    }
  }
}
</script>
