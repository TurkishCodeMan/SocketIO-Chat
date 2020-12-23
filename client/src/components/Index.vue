<template>
  <div class="join-container">
    <header class="join-header">
      <h1><i class="fas fa-smile"></i> Sohbet & Muhabbet</h1>
    </header>
    <main class="join-main">
      <form>
        <div class="form-control">
          <label for="username">Kullanıcı Adı</label>
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
          <label for="room">Odalar</label>
          <select v-model="user.room" name="room" id="room">
            <option value="sans">Şanslılar</option>
            <option value="mor">Morlular</option>
            <option value="aksam">Akşamcılar</option>
            <option value="gundem">Gündem</option>
            <option value="siyaset">Siyaset</option>
            <option value="bilim">Bilim</option>
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
      if(this.user.username=="" || this.user.room==""){
        return this.$noty.error("Lütfen Tüm Alanları Doldurunuz")
      }
      this.$socket.emit("userJoin", this.user);
      this.$noty.success("Hoşgeldin " + this.user.username);
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