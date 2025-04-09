<template>
  <div>
    <h2>Game Interface</h2>
    <div>
      <h3>Game Assets</h3>
      <ul>
        <li v-for="asset in assets" :key="asset.id">{{ asset.name }}</li>
      </ul>
    </div>
    <div>
      <h3>Game Information</h3>
      <p>{{ gameInfo }}</p>
    </div>
    <div>
      <h3>AI Dungeon Master</h3>
      <input v-model="userInput" placeholder="Enter your message" />
      <button @click="interactWithAIDM">Interact with AI DM</button>
      <p>{{ aiResponse }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      assets: [],
      gameInfo: '',
      userInput: '',
      aiResponse: '',
    };
  },
  methods: {
    async interactWithAIDM() {
      try {
        const response = await this.$store.dispatch('interactWithAIDM', { message: this.userInput });
        this.aiResponse = response;
      } catch (error) {
        console.error('Error interacting with AI DM:', error);
      }
    },
    async fetchGameAssets() {
      this.assets = await this.$store.dispatch('fetchAssets');
    },
    async fetchGameInfo() {
      this.gameInfo = await this.$store.dispatch('fetchGameInfo');
    },
  },
  created() {
    this.fetchGameAssets();
    this.fetchGameInfo();
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 20px;
}
h3 {
  margin-top: 20px;
}
button {
  margin-top: 10px;
}
</style>
