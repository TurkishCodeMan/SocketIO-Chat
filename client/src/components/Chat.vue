<template>
  <div>
    <main class="chat-main">
      <div class="chat-sidebar">
        <h3><i class="fas fa-comments"></i> Room Name:</h3>
        <h2 id="room-name">{{ room.name }}</h2>
        <h3><i class="fas fa-users"></i> Users</h3>
        <ul id="users">
          <li v-for="user in users" :key="user.index">{{ user.username }}</li>
        </ul>
      </div>
      <div class="chat-messages">
        <app-message
          v-for="message in roomMessage"
          :key="message.index"
          :message="message"
        ></app-message>
      </div>
    </main>
    <div class="chat-form-container">
      <form id="chat-form">
        <input
          id="msg"
          type="text"
          placeholder="Enter Message"
          required
          autocomplete="off"
          v-model="message"
        />
        <button @click.prevent="sendMessage" class="btn">
          <i class="fas fa-paper-plane"></i> Send
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Message from "./Message";
import { mapGetters, mapMutations } from "vuex"; //Şimdiki state deki kullanıcı mesaj gönderecek
export default {
  data() {
    return {
      message: "",
      welcomeMessage: "",
      users: [],
      roomMessage: [],
    };
  },

  sockets: {
    welcomeMessage(msg) {
      this.welcomeMessage = msg.msg;

      let welcome = {
        userId: {
          username: "ChatBot",
        },
        date: Date.now().toString(),
        msg: msg.msg,
      };
      this.roomMessage.push(welcome);
      this.setRoom(msg.room);
      this.setUser(msg.user);
    },
    sameUser(data) {
      console.log("bUrasıı");
      this.$router.push({ name: "index" });
      return this.$noty.error(data);
    },

    users(users) {
      this.users = users;
    },
    oldMessages(messages) {
      console.log(messages);
      this.roomMessage = messages;
    },
    newMessage(message) {
      console.log(message);
      this.roomMessage.push(message);
    },
  },
  components: {
    appMessage: Message,
  },
  methods: {
    ...mapGetters(["getUser", "getRoomMessage", "getRoom", "getUsers"]),
    ...mapMutations(["setRoom", "setUser", "setUsers", "pushUsers"]),
    sendMessage() {
      this.$socket.emit("chatMessage", {
        user: this.user,
        message: this.message,
        room: this.room,
      });
      this.$socket.emit("message");
    },
  },
  computed: {
    user() {
      return this.getUser();
    },
    room() {
      return this.getRoom();
    },
  },
};
</script>

<style>
</style>