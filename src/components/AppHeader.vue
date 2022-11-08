<template>
  <div class="nav-container mb-3">
    <nav class="navbar navbar-expand-md navbar-light bg-light">
      <div class="container">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link active">Workouts</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/stats" class="nav-link">Stats</router-link>
            </li>
            <li style="float:right" v-if="!isAuthenticated">
              <a id="qsLoginBtn" href="#" class @click="login">Log in</a>
            </li>
            <li style="float:right" v-if="isAuthenticated">
              <a id="qsLogoutBtn" href="#" class @click="logout">Log out</a>
            </li>
            <li style="float:right" v-if="isAuthenticated">
              <a href="">{{ user.email }}</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  data: function () {
    return {
      isAuthenticated: this.$auth0.isAuthenticated,
      isLoading: this.$auth0.isLoading,
      user: this.$auth0.user
    };
  },
  methods: {
    async login() {
      await this.$auth0.loginWithRedirect();
    },
    async logout() {
      await this.$auth0.logout({ returnTo: window.location.origin });
    }
  }
};
</script>

<style>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover {
  color: #34D2C1;
}

li a.router-link-active {
  color: #34D2C1;
}
</style>