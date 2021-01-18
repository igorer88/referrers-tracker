<template>
  <div class="home">
    <section class="info__section">
      <h3>Referrers Top 3 Urls</h3>
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
  }
};
</script>
<style scoped lang="scss">
.info__section {
  text-align: center;
  color: #ffffff;
}
h3 {
  margin: 40px;
}
</style>
