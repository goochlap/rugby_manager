<template>
  <header>
    <h1>{{ title }}</h1>
    <Button v-show="teamsView" @btn-click="$emit('toggle-add-team')" :text="showAddTeam ? 'Close' : 'Add a team'" :color="showAddTeam ? 'red' : 'rgb(88, 170, 236)'" />
  </header>
</template>

<script>
import Button from './Button.vue'

export default {
  name: 'Header',
  props: {
    title: String,
    showAddTeam: Boolean
  },
  components: {
    Button,
  },
  computed: {
    teamsView() {
      return this.$route.path === '/teams' ? true : false
    }
  }
}
</script>

<style scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
</style>