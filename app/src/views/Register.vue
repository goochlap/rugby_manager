<template>
  <form @submit="register" class="add-form">
    <div class="form-control">
      <label>name</label>
      <input type="text" v-model="name" name="name" placeholder="Add name" />
    </div>
    <div class="form-control">
      <label>email</label>
      <input
        type="text"
        v-model="email"
        name="email"
        placeholder="Add email"
      />
    </div>
    <div class="form-control">
      <label>password</label>
      <input
        type="text"
        v-model="password"
        name="password"
        placeholder="Add password"
      />
    </div>
    <select v-model="role">
      <option disabled value="">Choose role</option>
      <option>user</option>
      <option>manager</option>
    </select>

    <input type="submit" value="Register User" class="btn btn-block" />
  </form>
</template>

<script>

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      role: ''
    }
  },
  methods: {
    async register(e) {
      e.preventDefault()
      
      const res = await fetch(`api/v1/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          password: this.password,
          role: this.role
        })
      })

      const data = await res.json()
      if (!data.success) alert(`${data.error}`)

      if (data.token) localStorage.setItem('user', JSON.stringify(data));

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
