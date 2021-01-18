<template>
  <div class="home">
    <section class="info__section">
      <h1>Referrers Top 3 Urls</h1>
    </section>
    <section class="urls__section">
      <div class="container">
        <TopUrls />
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import TopUrls from '@/components/TopUrls';

export default {
  name: 'Home',
  components: {
    TopUrls
  },
  mounted() {
    this.$parent.setAuthenticated(true);
  }
};
</script>
<style scoped lang="scss">
.info__section {
  text-align: center;
  color: #ffffff;
}
h1 {
  margin: 40px;
  font-weight: 700;
}
</style>
