<template>
  <div class="flex flex-col gap-4">

    <h2>
      {{ t(Labels.partnerWizardStep1Title) }}
    </h2>

    <p class="text-lg text-text leading-relaxed whitespace-pre-line">
      {{ t(Labels.partnerWizardStep1Body, { city }) }}
    </p>

    <UButton
        color="blue"
        class="w-fit px-6 py-2 rounded-[18px] mt-2"
        @click="$emit('next')"
    >
      {{ t(Labels.partnerWizardStep1Cta) }}
    </UButton>

    <p class="text-xs text-deepGrey-300 mt-2">
      {{ t(Labels.partnerWizardStep1Note) }}
    </p>

  </div>
</template>

<script setup lang="ts">
import { Labels } from '~/models/Locale'

const { t } = useI18n()
const route = useRoute()

const city = (route.params.city as string) || 'Karlsruhe'

defineEmits(['next'])
</script>
