<template>
  <div class="message">
 
    <p class="meta">{{ message.userId.username}} <span>{{message.date}}</span></p>
    <p class="text">
      {{ message.msg }}
    </p>
  </div>
</template>

<script>
export default {
  props: ["message"],
};
</script>

<style>
</style>