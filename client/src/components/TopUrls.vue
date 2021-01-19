<template>
  <section>
    <div class="card has-text-centered">
      <!-- <Controls :loading="loading" /> -->
      <div class="m-5" v-if="loading">
        <b-icon
          icon="sync-alt"
          :class="{ 'fa-spin': loading }"
          size="is-medium"
        />
      </div>
      <div
        class="block m-5"
        v-show="!loading"
        v-for="el in topUrlList"
        :key="el._id"
      >
        <a
          target="_blank"
          rel="noopener"
          :href="el.href"
          @click="clickHandler(el.href)"
        >
          <b-icon icon="link" size="is-small" />
          {{ el.href + ' - ' + el.clicks + ' Clicks' }}
        </a>
      </div>
    </div>
  </section>
</template>
<script>
import axios from '@/config/axios';
// import Controls from '@/components/Controls';

export default {
  name: 'TopUrls',
  // components: { Controls },
  data() {
    return {
      loading: false,
      topUrlList: []
    };
  },
  mounted() {
    this.loadUrls();
  },
  methods: {
    loadUrls() {
      this.loading = true;
      axios
        .get('urls/tops')
        .then(response => {
          console.log(response.data);
          this.topUrlList = response.data.payload;
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
          const err = error.response.data;
          this.$buefy.toast.open({
            duration: 5000,
            message: `${err.message}`,
            position: 'is-bottom',
            type: 'is-danger'
          });
        });
    },
    clickHandler(url) {
      axios
        .put('urls', { url })
        .then(response => {
          console.log(response.data);
          this.loadUrls();
        })
        .catch(error => {
          const err = error.response.data;
          this.$buefy.toast.open({
            duration: 5000,
            message: `${err.message}`,
            position: 'is-bottom',
            type: 'is-danger'
          });
        });
    }
  }
};
</script>
<style></style>
