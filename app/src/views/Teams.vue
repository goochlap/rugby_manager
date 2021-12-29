<template>
  <div>
    <AddTeam v-show="showAddTeam" />
    <Teams :teams="teams" />
    <router-link to="/">Home page</router-link>
  </div>
</template>

<script>
import Teams from '../components/Teams.vue'
import AddTeam from '../components/AddTeam.vue'

export default {
  name: 'Home',
  props: {
    showAddTeam: Boolean
  },
  components: {
    Teams,
    AddTeam
  },
  data() {
    return {
      teams: []
    }
  },
  methods: {
    async fetchTeams() {
      const res = await fetch(`api/v1/teams/`)
      const teams = await res.json()

      return teams.data
    },
  },
  async created() {
    this.teams = await this.fetchTeams()
  },
}
</script>
