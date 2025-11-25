<template>
  <section
      class="p-4 rounded-sm bg-surface flex flex-col gap-4 h-full border-none "
  >
    <Header :avatar="avatar" :location="location" :name="name" :rating="rating" />
    <p class="text-sm text-gray-800 leading-relaxed">
      {{ description }}
    </p>

    <UButton
        block
        variant="ghost"
        class="
    mt-auto py-2 rounded-sm justify-center gap-2
    bg-green text-white
    focus:bg-green-600 focus:text-white
    hover:bg-green-800 hover:text-white
    active:bg-green-800
  "
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
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {Labels} from "~/types/Locale";
import Header from "~/components/profiles/header.vue";

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
const buttonLabel = computed(() => props.buttonText ?? t(Labels.bookNow))
</script>

