<template>
  <b-navbar
    id="nav"
    type="is-primary"
    centered
    shadow
    v-if="$parent.authenticated"
  >
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/home' }">
        <strong>{{ appTitle }}</strong>
      </b-navbar-item>
    </template>
    <template #start> </template>
    <template #end>
      <!-- <b-navbar-item
        tag="router-link"
        :class="{ 'is-active': active }"
        :to="{ name: 'Home' }"
      >
        Home
      </b-navbar-item> -->
      <b-navbar-item tag="div" v-if="$parent.authenticated">
        <div class="buttons">
          <b-button
            class="button is-primary"
            icon-left="sign-out-alt"
            inverted
            @click="logout()"
          >
            <strong>Logout</strong>
          </b-button>
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
      appTitle: process.env.VUE_APP_TITLE,
      active: true
    };
  },
  methods: {
    logout() {
      this.$parent.setAuthenticated(false);
      this.$router.replace('login');
    }
  }
};
</script>

<style lang="scss">
@import '../scss/main.scss';
#nav {
  a {
    &.router-link-exact-active {
      color: #ffffff;
    }
  }
}
</style>
