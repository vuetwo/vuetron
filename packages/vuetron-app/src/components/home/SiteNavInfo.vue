<template>
  <b-col cols="12" md="6">
    <router-link :to="info.redirectPath" class="info">
      <div class="info-logo">
        <icon :name="info.iconName" scale="4" />
      </div>
      <div class="info-text">
        <p><strong>{{ info.infoTitle }}</strong></p>
        <span>{{ info.infoBlurb }}</span>
      </div>
    </router-link>
  </b-col>
</template>
  
<script>
  export default {
    name: "SiteNavInfo",
    props: ['info']
  };
</script>

<style scoped>
</style>
