<template>
  <div>
    <h1>Welcome to the DnD Game</h1>
    <GameInterface />
  </div>
</template>

<script>
import GameInterface from '~/components/GameInterface.vue';

export default {
  components: {
    GameInterface
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 20px;
}
</style>
