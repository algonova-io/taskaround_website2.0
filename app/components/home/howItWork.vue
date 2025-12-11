<template>
  <section class="w-full bg-surface-50 py-16">
    <UContainer class="  flex flex-col items-center gap-10 text-center">
      <div>
        <h2 class="text-3xl md:text-4xl font-extrabold text-black">
          {{ t(Labels.howItWorksTitle) }}
        </h2>
        <p class="mt-3 text-base md:text-lg text-black">
          {{ t(Labels.howItWorksSubtitle) }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 w-full">
        <div
            v-for="step in steps"
            :key="step.title"
            class="flex flex-col items-center gap-4"
        >
          <img
              :src="step.image"
              :alt="t(step.title)"
              class="w-40 h-40 object-contain"
          />

          <div>
            <p class="text-sm font-extrabold tracking-wide text-black">
              {{ t(step.title) }}
            </p>
            <p class="mt-1 text-base text-black">
              {{ t(step.text) }}
            </p>
          </div>
        </div>
      </div>

      <UButton
          size="lg"
          variant="ghost"
          class="mt-2 px-8 py-3 rounded-full border border-text text-black bg-background-50
               hover:bg-background-50 hover:text-black active:bg-background-100"
      >
        {{ t(Labels.howItWorksCta) }}
      </UButton>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Labels } from '~/models/Locale'

const { t } = useI18n()

const steps = [
  {
    title: Labels.howItWorksStep1Title,
    text: Labels.howItWorksStep1Text,
    image: '/images/step-1.svg'
  },
  {
    title: Labels.howItWorksStep2Title,
    text: Labels.howItWorksStep2Text,
    image: '/images/step-2.svg'
  },
  {
    title: Labels.howItWorksStep3Title,
    text: Labels.howItWorksStep3Text,
    image: '/images/step-3.svg'
  }
]
</script>
