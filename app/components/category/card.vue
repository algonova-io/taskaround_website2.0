<template>
  <NuxtLink
      :to="href"
      class="group block w-full max-w-[400px] bg-white border border-[#C1C1C1]
           rounded-[18px] shadow-[0_4px_4px_0_#00000040] overflow-hidden
           transition-transform duration-200 hover:-translate-y-0.5"
  >
    <!-- Image -->
    <div class="w-full h-48 sm:h-52 md:h-56">
      <img
          :src="image"
          :alt="alt || title"
          class="w-full h-full object-cover"
      />
    </div>

    <!-- Content -->
    <div class="p-4 sm:p-5">
      <h3 class="text-xl font-semibold text-gray-900">
        {{ title }}
      </h3>

      <p class="mt-2 text-sm text-gray-700 line-clamp-4">
        {{ description }}
      </p>

      <span
          class="inline-block mt-3 text-sm font-medium underline underline-offset-2
               text-blue-700 group-hover:text-blue-800"
      >
        {{ cta }}
      </span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  image: string
  href: string
  alt?: string
  cta?: string
}>()

</script>
