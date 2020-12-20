<template>
 
     <header class="chat-header">
      <h1><i class="fas fa-smile"></i> ChatCord</h1>
      <router-link tag="a" class="btn" to="/">Leave Room</router-link>
    </header>

</template>

<script>
import {mapGetters} from "vuex";
export default {

  methods:{
    ...mapGetters(["getRoom","getUser"]),
    leaveRoom(){
      this.room.users.findIndex(u=>{u!=this.user._id});
      this.$socket.emit("disconnect",{room:this.room});
    }
  },
  computed:{
    user:{
      get:function(){
        return this.getUser();
      },
      set:function(value){
        this.$store.commit("setUser",value)
      }
    },
    room:{
      get:function(){
        return this.getRoom();
      },
      set:function(value){
        this.$store.commit("setRoom",value);
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>

