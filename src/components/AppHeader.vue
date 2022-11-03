<template>
  <div class="nav-container mb-3">
    <nav class="navbar navbar-expand-md navbar-light bg-light">
      <div class="container">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/stats" class="nav-link">Stats</router-link>
            </li>
          </ul>
          <ul class="navbar-nav d-md-none" v-if="!isAuthenticated && !isLoading">
            <li>
              <a id="qsLoginBtn" href="#" class @click="login">Log in</a>
            </li>
          </ul>

          <ul id="mobileAuthNavBar" class="navbar-nav d-md-none d-flex" v-if="isAuthenticated">
            <li class="nav-item">
              <h6 class="d-inline-block">{{ user.name }}</h6>
            </li>
            <li>
              <router-link to="/profile">Profile</router-link>
            </li>
            <li>
              <a id="qsLogoutBtn" href="#" class @click="logout">Log out</a>
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
      user: this.$auth0.user,
    };
  },
  methods: {
    async login() {
      this.$auth0.loginWithRedirect();
    },
    async logout() {
      this.$auth0.logout({ returnTo: window.location.origin });
    }
  }
};
</script>

<style>
#mobileAuthNavBar {
  min-height: 125px;
  justify-content: space-between;
}
</style>