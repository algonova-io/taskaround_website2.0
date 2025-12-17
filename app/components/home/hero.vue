<template>
  <section class="w-full bg-primary py-16">
    <UContainer class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      <div class="flex flex-col gap-6">
        <h1 class="font-extrabold text-black">
          {{ t(Labels.heroFurnitureTitle1) }}<br/>
          {{ t(Labels.heroFurnitureTitle2) }}
        </h1>

        <p class="text-lg text-black leading-relaxed max-w-lg">
          {{ t(Labels.heroFurnitureDescription) }}
        </p>

        <UButton
            to="/new-task"
            class="bg-white hover:bg-white max-w-100 p-4 inline-block text-black font-bold  rounded-md shadow-md"
            variant="ghost"
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
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import {Labels} from '~/models/Locale'

const {t} = useI18n()

const cities = [
  Labels.heroFurnitureCityKarlsruhe,
  Labels.heroFurnitureCityDurlach,
  Labels.heroFurnitureCityEttlingen,
  Labels.heroFurnitureCityOststadt,
  Labels.heroFurnitureCityWeststadt
]
</script>