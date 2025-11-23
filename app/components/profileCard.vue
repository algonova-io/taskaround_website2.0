<!-- components/TaskerCard.vue -->
<template>
  <UCard
      class="p-4 rounded-2xl bg-[#FFF6EF] flex flex-col gap-4 h-full"
  >
    <!-- Header -->
    <div class="flex gap-4">
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
                class="w-5 h-5 text-[#E3A623]"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Description -->
    <p class="text-sm text-gray-800 leading-relaxed">
      {{ description }}
    </p>

    <!-- CTA Button -->
    <UButton
        block
        class="mt-auto py-2 rounded-xl bg-[#2E6E4A] text-white justify-center gap-2"
        @click="$emit('book')"
    >
      <span class="text-lg font-semibold">
        {{ buttonLabel }}
      </span>
      <UIcon
          name="i-heroicons-chat-bubble-left-right-20-solid"
          class="w-5 h-5"
      />
    </UButton>
  </UCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {Labels} from "~/types/Locale";

const props = defineProps<{
  name: string
  location: string
  rating: number
  description: string
  avatar: string
  buttonText?: string
}>()

defineEmits(['book'])
const {t} = useI18n()
const ratingLabel = computed(() => props.rating.toString().replace('.', ','))
const buttonLabel = computed(() => props.buttonText ?? t(Labels.bookNow))
</script>

