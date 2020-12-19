<template>
  <div class="vue-tempalte">
    <!-- Navigation -->
    <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
      <div class="container">
        <router-link  classs="nav-link pr-3"  to="/" v-if="token === null || token === ''"><h3>weDev</h3></router-link>
        <router-link  classs="nav-link pr-3"  to="/" v-else><h3>Admin</h3></router-link>

        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item" v-if="token === null || token === ''">
            <router-link class=" btn btn-outline-primary " to="/login">Login</router-link>
          </li>
          <li class="nav-item" v-if="token === null || token === ''">
            <router-link class="btn btn-outline-info" to="/signup"  style="margin-left:5px"  >Registration</router-link>
          </li>
          <li class="nav-item" v-else>
            <button class="btn btn-outline-primary"  v-on:click="logout"  style="margin-left: 5px" >Log Out </button>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Main -->
    <div class="App">
          <router-view />
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
       token : localStorage.getItem('token')
    }
  },
  methods:{

  }

}
</script>