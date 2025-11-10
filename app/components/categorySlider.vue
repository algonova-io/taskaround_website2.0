<template>
  <div
      class="flex gap-4 overflow-x-auto snap-x snap-mandatory px-2 pb-2 scrollbar-none"
  >
    <slot/>
  </div>
</template>
<style scoped>
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
<script setup lang="ts">
</script>