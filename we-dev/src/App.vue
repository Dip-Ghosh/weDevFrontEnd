<template>
  <div class="vue-tempalte">
    <!-- Navigation -->
    <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
      <div class="container">
        <router-link classs=" pr-3" to="/" v-if="token === null || token === ''"><h3>weDev</h3></router-link>
        <router-link classs="nav-link pr-3" to="/" v-else><h3>Admin</h3></router-link>

        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item" v-if="token === null || token === ''">
            <router-link class=" btn btn-outline-primary " to="/login">Login</router-link>
          </li>
          <li class="nav-item" v-if="token === null || token === ''">
            <router-link class="btn btn-outline-info" to="/signup" style="margin-left:5px">Registration</router-link>
          </li>
          <li class="nav-item" v-else>
            <button class="btn btn-outline-primary" v-on:click="logout" style="margin-left: 5px">Log Out</button>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Main -->
    <div class="App">
      <router-view/>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-undef
import axios from 'axios';

export default {

  data() {
    return {
      token: localStorage.getItem('token')
    }
  },
  methods: {
    logout() {
      const token = localStorage.getItem('token');
      // eslint-disable-next-line no-undef
      Swal.fire({
        title: 'Are you sure to log out?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post('http://localhost:8000/api/logout',
              { headers: {"Authorization" : `Bearer ${token}`} })
              .then(response => {
                console.log(response.data.token);
                localStorage.removeItem('token');
                // eslint-disable-next-line no-undef
                Swal.fire({

                  icon: 'success',
                  title: 'Successfully Login',
                  showConfirmButton: false
                })
                window.location.href = '/';

                console.log(response);
              })
              .catch(e => {
                localStorage.removeItem('token');
                window.location.href = '/';
                console.log(e);
              })
        }
      });
    }
  }
}
</script>
