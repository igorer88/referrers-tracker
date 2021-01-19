<template>
  <div>
    <section>
      <div class="hero is-primary">
        <div class="hero-body">
          <h1 class="title has-text-centered is-size-2">
            Login to Referrers Tracker
          </h1>
          <div class="columns is-centered">
            <div class="column is-half">
              <div class="notification is-light">
                <form @submit.stop.prevent="onSubmit">
                  <b-field label="Username">
                    <b-input
                      icon-pack="fas"
                      icon="user"
                      v-model="form.username"
                      :placeholder="'username'"
                    ></b-input>
                  </b-field>
                  <b-field label="Password">
                    <b-input
                      type="password"
                      icon-pack="fas"
                      icon="lock"
                      v-model="form.password"
                      password-reveal
                      :placeholder="'password'"
                      aria-describedby="input-password-live-feedback"
                    >
                    </b-input>
                  </b-field>
                  <div class="columns has-text-centered">
                    <div class="column">
                      <b-button
                        class="is-info is-rounded is-outlined is-medium"
                        tag="input"
                        native-type="submit"
                        value="Login"
                      />
                    </div>
                  </div>
                </form>
                <br />
                <a href="#/signup">
                  <span
                    >Don't you have an account? <strong>Signup</strong></span
                  >
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from '@/config/axios';

export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: null,
        password: null
      }
    };
  },
  methods: {
    resetForm() {
      this.form = {
        username: null,
        password: null
      };
    },
    onSubmit() {
      axios
        .post(`auth/login`, this.form)
        .then(response => {
          // commit("onLoginSuccess", response);
          console.log(response.data);
          this.$buefy.toast.open({
            duration: 5000,
            message: `${response.data.message}`,
            position: 'is-bottom',
            type: 'is-success'
          });
          const payload = response.data.payload;
          console.log(payload);
          localStorage.setItem('access-token', payload.token);
          this.$emit('authenticated', true);
          this.$router.replace({
            name: 'Home',
            params: { user: payload.user }
          });
        })
        .catch(error => {
          // commit("onLoginError", error);
          const err = error.response.data;
          this.$buefy.toast.open({
            duration: 5000,
            message: `${err.message}`,
            position: 'is-bottom',
            type: 'is-danger'
          });
          this.resetForm();
        });
    }
  }
};
</script>
<style lang="scss" scoped>
body {
  padding: 0;
  margin: 0;
}
.hero {
  height: 100vh;
  position: relative;
}
.notification {
  padding-top: 20px;
  padding-bottom: 30px;
  & a:not(.button):not(.dropdown-item) {
    text-decoration: none;
  }
}
.button {
  margin-top: 10px;
}
</style>
