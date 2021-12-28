<template>
  <form @submit="createTeam" class="add-form">
    <div class="form-control">
      <label>Team Name</label>
      <input type="text" v-model="name" name="name" placeholder="Add name" />
    </div>
    <div class="form-control">
      <label>Description</label>
      <input
        type="text"
        v-model="description"
        name="description"
        placeholder="Add description"
      />
    </div>
    <div class="form-control">
      <label>Address</label>
      <input type="text" v-model="address" name="address" placeholder="Add a description" />
    </div>

    <input type="submit" value="Create Team" class="btn btn-block" />
  </form>
</template>

<script>

export default {
  name: 'AddTeam',
  data() {
    return {
      name: '',
      description: '',
      address: ''
    }
  },
  methods: {
    async createTeam(e) {
      e.preventDefault()
      
      const res = await fetch(`http://localhost:3000/api/v1/teams/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzM0NTM5MmRmZjRhN2RiOThiNjUwNCIsImlhdCI6MTY0MDcxMDkyOCwiZXhwIjoxNjQzMzAyOTI4fQ.iiTyefjHndzT9haajeEs00o0sEFHrrgzf8i0WS9kS00'
        },
        body: JSON.stringify({
          name: this.name,
          description: this.description,
          address: this.address,
        })
      })

      const data = await res.json()
      if (!data.success) alert(`${data.error}`)

      return data
    }
  }
}
</script>

<style scoped>
.add-form {
  margin-bottom: 40px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
</style>
