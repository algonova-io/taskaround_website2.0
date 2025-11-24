<template>
  <section class="w-full bg-primary py-16">
    <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      <div class="flex flex-col gap-6">
        <h1 class="text-4xl lg:text-5xl font-extrabold text-black leading-tight">
          {{ t(Labels.heroFurnitureTitle1) }}<br/>
          {{ t(Labels.heroFurnitureTitle2) }}
        </h1>

        <p class="text-lg text-black leading-relaxed max-w-lg">
          {{ t(Labels.heroFurnitureDescription) }}
        </p>

        <UButton
            size="lg"
            class="bg-white text-black shadow-md"
        >
          {{ t(Labels.heroFurnitureCtaWeekendHelper) }}
        </UButton>

        <div class="flex flex-wrap gap-6 text-black mt-4">
          <div
              v-for="city in cities"
              :key="city"
              class="flex items-center gap-2">
            <UIcon name="i-tabler-map-pin-filled" class="text-black"/>
            {{ t(city) }}
          </div>
        </div>
      </div>

      <div class="flex justify-center lg:justify-end">
        <img
            src="/images/looking.svg"
            alt="Tasker illustration"
            class="w-[70%] lg:w-[80%] max-w-md"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {Labels} from '~/types/Locale'

const {t} = useI18n()

const cities = [
  Labels.heroFurnitureCityKarlsruhe,
  Labels.heroFurnitureCityDurlach,
  Labels.heroFurnitureCityEttlingen,
  Labels.heroFurnitureCityOststadt,
  Labels.heroFurnitureCityWeststadt
]
</script>
