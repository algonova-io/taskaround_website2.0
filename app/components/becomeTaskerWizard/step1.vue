<template>
  <div class="w-full">

    <h2 class="text-2xl font-bold mb-6">
      {{ t(Labels.partnerWizardStep1Title) }}
    </h2>

    <div class="flex flex-col gap-6">

      <p class="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
        {{ t(Labels.partnerWizardStep1Body, { city }) }}
      </p>

      <div class="flex flex-col gap-4">
        <div class="flex justify-start">
          <UButton
              color="blue"
              class="px-8 py-3 rounded-[18px] text-base font-medium"
              @click="$emit('next')"
          >
            {{ t(Labels.partnerWizardStep1Cta) }}
          </UButton>
        </div>

        <p class="text-xs text-gray-500">
          {{ t(Labels.partnerWizardStep1Note) }}
        </p>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { Labels } from '~/models/Locale'

const { t } = useI18n()
const route = useRoute()

const city = (route.params.city as string) || 'Karlsruhe'

defineEmits(['next'])
</script>