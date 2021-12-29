<template>
  <div class="team">
    <h2>{{ team.name }}</h2>
    <p>{{ team.description.slice(0, 100) }}...</p>
  </div>
</template>

<script>

export default ({
  name: 'Team',
  props: {
    team: Object
  }
})
</script>

<style scope>
.team {
  background: #ececec;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
.team h2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
}
</style>