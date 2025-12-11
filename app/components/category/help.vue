<!-- components/HelpFurnitureSection.vue -->
<template>
  <section class="w-full py-10">
    <UContainer class=" flex flex-col gap-4">
      <!-- Title -->
      <h2>
        {{ t(Labels.helpFurnitureTitle, { city }) }}
      </h2>

      <!-- Body -->
      <p class="text-lg text-black leading-relaxed whitespace-pre-line">
        {{ t(Labels.helpFurnitureBody, { city }) }}
      </p>

      <!-- CTA -->
      <NuxtLink
          to="/auftrag-erstellen"
          class="mt-4 inline-flex items-center gap-2 text-black underline underline-offset-4 hover:text-blue-600"
      >
        <UIcon name="i-tabler-circle-arrow-right-filled" class="w-5 h-5" />
        <span class="text-lg">
          {{ t(Labels.helpFurnitureCta) }}
        </span>
      </NuxtLink>
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
