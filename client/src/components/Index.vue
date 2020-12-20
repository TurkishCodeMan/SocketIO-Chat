<template>
  <div class="join-container">
    <header class="join-header">
      <h1><i class="fas fa-smile"></i> ChatCord</h1>
    </header>
    <main class="join-main">
      <form>
        <div class="form-control">
          <label for="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter username..."
            required
            v-model="user.username"
          />
        </div>
        <div class="form-control">
          <label for="room">Room</label>
          <select v-model="user.room" name="room" id="room">
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="PHP">PHP</option>
            <option value="C#">C#</option>
            <option value="Ruby">Ruby</option>
            <option value="Java">Java</option>
          </select>
        </div>
        <button @click.prevent="login" class="btn">Join Chat</button>
      </form>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        room: "",
      },
    };
  },
  methods: {
    async login() {
      this.$socket.emit("userJoin", this.user);
      this.$router.push({ name: "chat" });
    },
  },
  created() {
    this.$store.commit("setUser", false);
    this.$store.commit("setRoom", false);
  },
};
</script>

<style>
</style>