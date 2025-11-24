<template>
  <section class="flex gap-4">
    <UAvatar
        :src="avatar"
        size="lg"
        class="rounded-full object-cover w-[100px] h-[100px]"
    />

    <div class="flex-1 min-w-0 flex flex-col justify-center gap-2">
      <div>
        <p class="text-lg font-semibold text-black truncate">
          {{ name }}
        </p>
        <p class="text-sm text-black">
          {{ location }}
        </p>
      </div>

      <div class="flex items-center gap-2">
          <span class="text-base text-black font-medium">
            {{ ratingLabel }}
          </span>
        <div class="flex gap-1">
          <UIcon
              v-for="i in 5"
              :key="i"
              name="i-heroicons-star-20-solid"
              class="w-5 h-5 text-primary"
          />
        </div>
      </div>
    </div>
  </section>

</template>
<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
  name: string
  location: string
  rating: number
  avatar: string
}>()

const ratingLabel = computed(() => props.rating.toString().replace('.', ','))

</script>