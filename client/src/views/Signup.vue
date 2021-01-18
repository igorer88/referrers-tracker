<template>
  <div>
    <section>
      <div class="hero is-primary">
        <div class="hero-body">
          <h1 class="title has-text-centered is-size-2">
            Signup to Referrers Tracker
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
                      maxlength="20"
                    ></b-input>
                  </b-field>
                  <b-field label="Password">
                    <b-input
                      type="password"
                      icon-pack="fas"
                      icon="lock"
                      password-reveal
                      v-model="form.password"
                      :placeholder="'password'"
                      aria-describedby="input-password-live-feedback"
                    >
                    </b-input>
                  </b-field>
                  <b-field
                    label="Confirm password"
                    :type="
                      ({ 'is-success': checkPassword },
                      { 'is-danger': !checkPassword })
                    "
                    :message="
                      checkPassword
                        ? 'Password matches!'
                        : 'Password must match!'
                    "
                  >
                    <b-input
                      type="password"
                      icon-pack="fas"
                      icon="lock"
                      password-reveal
                      v-model="form.passwordConfirm"
                      :placeholder="'password'"
                      aria-describedby="input-password-live-feedback"
                    >
                    </b-input>
                  </b-field>
                  <div class="columns has-text-centered">
                    <div class="column">
                      <b-button
                        class="is-warning is-light is-rounded is-outlined is-medium"
                        native-type="reset"
                        @click="resetForm()"
                      >
                        Reset
                      </b-button>
                    </div>
                    <div class="column">
                      <b-button
                        class="is-info is-rounded is-outlined is-medium"
                        tag="input"
                        native-type="submit"
                        value="Signup"
                        :loading="loading"
                      />
                    </div>
                  </div>
                </form>
                <br />
                <a href="#/login">
                  <span>Already registered? <strong>Log in</strong></span>
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
  name: 'Signup',
  data() {
    return {
      form: {
        username: null,
        password: null,
        passwordConfirm: null
      },
      confirmed: false,
      loading: false
    };
  },
  computed: {
    checkPassword() {
      if (this.password === null) {
        return false;
      }
      return this.form.password === this.form.passwordConfirm ? true : false;
    }
  },
  methods: {
    resetForm() {
      this.form = {
        username: null,
        password: null,
        passwordConfirm: null
      };
      this.confirmed = false;
    },
    onSubmit() {
      this.loading = true;
      axios
        .post(`auth/signup`, this.form)
        .then(response => {
          // commit("onLoginSuccess", response);
          console.log(response.data);
          this.$buefy.toast.open({
            duration: 5000,
            message: `${response.data.message}`,
            position: 'is-bottom',
            type: 'is-success'
          });
          this.$router.replace({ name: 'Login' });
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
        });
      this.loading = false;
    }
  }
};
</script>
<style lang="scss" scoped>
body {
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
}
.hero {
  height: 100vh;
  position: relative;
}
.notification {
  padding-top: 20px;
  padding-bottom: 30px;
}
.button {
  margin-top: 10px;
}
</style>
