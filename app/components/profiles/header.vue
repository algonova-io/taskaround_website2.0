<template>
  <section class="flex gap-4 items-center">
    <UAvatar
        :src="avatar"
        :size="small ? 'md' : 'lg'"
        class="rounded-full object-cover"
        :class="small ? 'w-12 h-12' : 'w-[100px] h-[100px]'"
    />

    <div class="flex-1 min-w-0 flex flex-col justify-center" :class="small ? 'gap-1' : 'gap-2'">
      <div>
        <p class="font-semibold text-black truncate" :class="small ? 'text-base' : 'text-lg'">
          {{ name }}
        </p>
        <p class="text-black" :class="small ? 'text-xs' : 'text-sm'">
          {{ location }}
        </p>
      </div>

      <div class="flex items-center gap-2">
        <span class="text-black font-medium" :class="small ? 'text-sm' : 'text-base'">
          {{ ratingLabel }}
        </span>
        <div class="flex gap-1">
          <UIcon
              v-for="i in 5"
              :key="i"
              name="i-heroicons-star-20-solid"
              class="text-primary"
              :class="small ? 'w-4 h-4' : 'w-5 h-5'"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  name: string
  location: string
  rating: number
  avatar: string
  small?: boolean // New optional prop
}>()

const ratingLabel = computed(() => props.rating.toString().replace('.', ','))
</script>s