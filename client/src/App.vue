<template>
  <div id="app">
    <app-home></app-home>
  </div>
</template>

<script>
import Home from "./components/Home"

export default {
  name: 'App',
  components:{
    appHome:Home
  },
 created(){
   this.$socket.emit("on",{})
 }
}
</script>

<style>
@import "./assets/style.css";

</style>
