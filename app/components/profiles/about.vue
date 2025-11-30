<template>
  <section class="w-full py-10">
    <UContainer class="  flex flex-col gap-4">
      <h2>{{ t(Labels.taskerAboutTitle) }}</h2>

      <p class="text-lg text-text leading-relaxed whitespace-pre-line">
        {{ about }}
      </p>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { Labels } from '~/types/Locale'

defineProps<{
  about: string
}>()

const { t } = useI18n()
</script>
