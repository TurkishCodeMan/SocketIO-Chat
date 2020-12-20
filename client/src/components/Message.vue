<template>
  <div class="message">
    
    <p class="meta">{{ message.userId }} <span>{{message.date}}</span></p>
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