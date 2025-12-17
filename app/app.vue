<template>
  <UApp :toaster="{ position: 'top-right'}">
    <div>
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </div>
  </UApp>
</template>
<script setup lang="ts">
const config = useRuntimeConfig()

useHead({
  script: [
    {
      src: `https://maps.googleapis.com/maps/api/js?key=${config.public.googleMapsKey}&libraries=places`,
      // Google Maps usually recommends these attributes to not block page load
      async: true,
      defer: true,
    }
  ]
})
</script>