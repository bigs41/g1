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
      <h3>Enemy Assets</h3>
      <ul>
        <li v-for="enemy in enemyAssets" :key="enemy.id">{{ enemy.name }}</li>
      </ul>
    </div>
    <div>
      <h3>Game Information</h3>
      <p>{{ gameInfo }}</p>
    </div>
    <div>
      <h3>AI Dungeon Master</h3>
      <button @click="interactWithAIDM">Interact with AI DM</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      assets: [],
      enemyAssets: [],
      gameInfo: '',
    };
  },
  methods: {
    async interactWithAIDM() {
      // Placeholder for interacting with the AI DM
      console.log('Interacting with AI DM...');
    },
    async fetchGameAssets() {
      const allAssets = await this.$store.dispatch('fetchAssets');
      this.assets = allAssets.filter(asset => asset.type !== 'enemy');
      this.enemyAssets = allAssets.filter(asset => asset.type === 'enemy');
    },
    async fetchGameInfo() {
      // Placeholder for fetching game information
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
