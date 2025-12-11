<!-- components/CategoryPricingSection.vue -->
<template>
  <section class="w-full py-10">
    <UContainer class=" flex flex-col gap-4">
      <h2>
        {{ t(Labels.categoryPricingTitle, { city }) }}
      </h2>

      <p class="text-lg text-black leading-relaxed whitespace-pre-line">
        {{ t(Labels.categoryPricingParagraph1, { city }) }}
      </p>

      <p class="text-lg text-black leading-relaxed whitespace-pre-line">
        {{ t(Labels.categoryPricingParagraph2, { city }) }}
      </p>

      <p class="text-lg text-black leading-relaxed whitespace-pre-line">
        {{ t(Labels.categoryPricingParagraph3, { city }) }}
      </p>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from '#imports'
import { useI18n } from 'vue-i18n'
import { Labels } from '~/models/Locale'

const { t } = useI18n()
const route = useRoute()
const city = (route.params.city as string | undefined) || 'Karlsruhe'
</script>
