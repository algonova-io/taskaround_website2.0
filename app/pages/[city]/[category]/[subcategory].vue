<template><div>{{ route.params.locale }} {{ route.params.city }} {{ route.params.listing }}</div></template>


<script setup lang="ts">
  const route = useRoute();
  console.log(route.params.listing, route.params.city, route.params.locale);
</script>