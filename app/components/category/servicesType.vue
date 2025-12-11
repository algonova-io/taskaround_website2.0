<!-- components/CategoryServiceTypesSection.vue -->
<template>
  <section class="w-full py-10">
    <UContainer class="flex flex-col gap-4">
      <h2>
        {{ t(Labels.categoryServiceTypesTitle) }}
      </h2>

      <ul class="list-disc pl-6 text-lg text-black leading-relaxed space-y-1">
        <li v-for="item in items" :key="item">
          {{ t(item) }}
        </li>
      </ul>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Labels } from '~/models/Locale'

const { t } = useI18n()

const items: Labels[] = [
  Labels.categoryServiceTypesIkea,
  Labels.categoryServiceTypesShelvesBeds,
  Labels.categoryServiceTypesDesks,
  Labels.categoryServiceTypesLamps,
  Labels.categoryServiceTypesDismantling,
]
</script>
