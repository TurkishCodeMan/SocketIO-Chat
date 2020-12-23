<template>
  <header class="chat-header">
    <h1><i class="fas fa-smile"></i>Muhabbet</h1>
    <button class="btn" @click="leaveRoom">Odadan Ayrıl</button>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    ...mapGetters(["getRoom", "getUser"]),
    leaveRoom() {
      if (this.room && this.user) {
        let index = this.room.users.findIndex((u) => {
          u._id.toString() == this.user._id.toString();
        });

        this.room.users.splice(index, 1);

        this.$socket.emit("leave", { room: this.room });

        console.log("Burada");
        this.$router.push({ name: "index" });
      }else{
        this.$noty.error("Zaten Çıkış Yapılmış Durumda")
      }
    },
  },
  computed: {
    user: {
      get: function () {
        return this.getUser();
      },
      set: function (value) {
        this.$store.commit("setUser", value);
      },
    },
    room: {
      get: function () {
        return this.getRoom();
      },
      set: function (value) {
        this.$store.commit("setRoom", value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

