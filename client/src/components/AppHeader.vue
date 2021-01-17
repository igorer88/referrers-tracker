<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <h3>{{ appTitle }}</h3>
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item tag="router-link" :to="{ name: 'Home' }">
        Home
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/about' }">
        About
      </b-navbar-item>
    </template>
    <template #end>
      <b-navbar-item tag="div" v-if="$parent.authenticated">
        <router-link to="/login" @click.native="logout()" replace
          >Logout</router-link
        >
      </b-navbar-item>
      <b-navbar-item tag="div" v-if="!$parent.authenticated">
        <div class="buttons">
          <b-navbar-item
            class="button is-primary"
            tag="router-link"
            :to="{ path: '/signup' }"
          >
            <strong>Sign up</strong>
          </b-navbar-item>
          <b-navbar-item
            class="button is-light"
            tag="router-link"
            :to="{ path: '/login' }"
          >
            Log in
          </b-navbar-item>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      appTitle: process.env.VUE_APP_TITLE
    };
  },
  methods: {
    logout() {
      this.$parent.setAuthenticated(false);
    }
  }
};
</script>

<style lang="scss">
@import '../scss/main.scss';
#nav {
  a {
    font-weight: bold;
    // color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
