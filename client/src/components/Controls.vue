<template>
  <div class="block m-5">
    <b-button type="is-primary" @click="$parent.loadUrls()">
      <b-icon
        icon="sync-alt"
        :class="{ 'fa-spin': loading }"
        size="is-medium"
      ></b-icon>
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'Controls',
  props: ['loading']
};
</script>

<style></style>
