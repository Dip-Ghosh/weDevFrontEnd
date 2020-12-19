<template>
  <div class="vue-tempalte">
    <!-- Navigation -->
    <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
      <div class="container">
        <router-link  class="nav-link pr-3"  to="/"><h3>weDev</h3></router-link>

        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link class=" btn btn-outline-primary " to="/login">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-outline-info" to="/signup"  style="margin-left:5px" >Registration</router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-outline-primary" to="/"  style="margin-left: 5px">Log Out </router-link>
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