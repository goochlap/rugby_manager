<template>
  <div>
    <div v-for="team in teams" :key="team.id" >
      <Team :team="team" />
    </div>
  </div>
</template>

<script>
import Team from './Team.vue'

export default {
  name: 'Teams',
  props: {
    teams: Array
  },
  components: {
    Team
  }
}
</script>