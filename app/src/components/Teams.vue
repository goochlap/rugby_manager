<template>
  <div v-for="team in teams" :key="team.id" >
    <h2>{{ team.name }}</h2>
    <p>{{ team.description.slice(0, 100) }}...</p>
  </div>
</template>

<script>
export default {
  name: 'Teams',
  props: {
    teams: Array
  }
}
</script>