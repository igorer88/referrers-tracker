<template>
  <div id="app">
    <AppHeader v-if="authenticated" />
    <router-view @authenticated="setAuthenticated" />
  </div>
</template>
<script>
import AppHeader from '@/components/AppHeader';

export default {
  name: 'App',
  components: { AppHeader },
  data() {
    return {
      authenticated: true
    };
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = `${process.env.VUE_APP_TITLE} | ${to.name}`;
      }
    }
  }
};
</script>
<style lang="scss">
@import 'scss/main.scss';

body {
  background: #2c3e50;
  height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
