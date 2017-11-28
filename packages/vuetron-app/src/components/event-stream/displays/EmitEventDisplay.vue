<template id="apiDisplayTemplate">
  <div>
    <p class="event-card-title">
      <strong>{{ event.title }}</strong>
    </p>
    <p><strong>Event Name:</strong> {{ event.display }}</p>
  </div>
</template>
  
<script>
  export default {
    name: 'EmitEventDisplay',
    props: ['event']
  };
</script>

<style>

</style>

<style scoped>
  
</style>

 