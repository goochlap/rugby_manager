<template>
  <div class="container">
    <Header @toggle-add-team="toggleAddTeam" title="RUGBY MANAGER"/>
    <div v-show="showAddTeam">
      <AddTeam />
    </div>
    <Teams :teams="teams" />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Teams from './components/Teams.vue'
import AddTeam from './components/AddTeam.vue'

export default {
  name: 'App',
  components: {
    Header,
    Teams,
    AddTeam
  },
  data() {
    return {
      teams: [],
      showAddTeam: false
    }
  },
  methods: {
    async fetchTeams() {
      const res = await fetch(`http://localhost:3000/api/v1/teams/`)
      const teams = await res.json()

      return teams.data
    },
    toggleAddTeam() {
      this.showAddTeam = !this.showAddTeam
    }
  },
  async created() {
    this.teams = await this.fetchTeams()
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Montserrat', sans-serif;
}
.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid rgb(66, 134, 190);
  padding: 30px;
  border-radius: 5px;
}
.btn {
  display: inline-block;
  background: rgb(88, 170, 236);
  color: rgb(0, 0, 0);
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
</style>
