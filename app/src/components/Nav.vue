<template>
  <div class="navbar">
    <router-link to="/">Home</router-link>
    <router-link to="/register">Sign up</router-link>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  background-color: white;
  width: 100%;
  height: 78px;
  box-shadow: 0 4px 12px 0px rgb(230, 230, 230);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}
.navbar * {
  text-decoration: none;
}
</style>