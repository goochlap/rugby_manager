const app = Vue.createApp({
  data() {
    return {
      teams: 'Teams',
      players: "Player's team"
    };
  },
  methods: {
    async getTeams() {
      const res = await fetch('http://localhost:3000/api/v1/teams/');
      const teams = await res.json();

      // this.teams = teams.data[1].name;
      console.log(teams);
    }
  }
});

app.mount('#app');
