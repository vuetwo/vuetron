<template>
  <div class="todo-navbar">
    <div class="nav-item">
      <router-link to="/" class="route-link">
        User Selection
      </router-link>
    </div>
    <div class="nav-item">
      <router-link to="/todo" class="route-link">
        Todos
      </router-link>
    </div>
    <div class="nav-item">
      <router-link to="/profile" class="route-link">
        Profile
      </router-link>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'Navbar'
};
</script>

<style scoped>
.todo-navbar {
  height: 50px;
  margin-bottom: 30px;
  background: #444444;
  font-weight: bold;
  display: flex;
  justify-content: center;
}

.nav-item {
  height: 60px;
  width: 30%;
  margin-left: 2%;
  margin-right: 2%;
  display: flex;
  justify-content: center;
}

.route-link {
  height: 60px;
  text-decoration: none;
  color: white;
  padding: 10px;
  line-height: 30px;
}
</style>

 