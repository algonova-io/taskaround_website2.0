<template>
  <section class="w-full  py-8 pb-12">
    <div class=" flex flex-col gap-6">
      <!-- Title -->
      <p class="text-lg font-bold text-xl leading-snug">
        {{ t(Labels.whyWeekendTitle) }}
      </p>

      <ul class="flex flex-col gap-6">
        <li
            v-for="item in items"
            :key="item.title"
            class="flex items-center  gap-2"
        >
          <div
              class=" flex h-8 w-8 items-center justify-center rounded-full bg-green"
          >
            <UIcon
                name="i-tabler-check"
                class="h-5 w-5 text-white"
            />
          </div>

          <p class="text-lg text-text leading-relaxed">
            <span class="font-semibold">
              {{ t(item.title) }}
            </span>
            <span>
              {{ t(item.text) }}
            </span>
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Labels } from '~/types/Locale'

const { t } = useI18n()

const items = [
  {
    title: Labels.whyWeekendPoint1Title,
    text: Labels.whyWeekendPoint1Text
  },
  {
    title: Labels.whyWeekendPoint2Title,
    text: Labels.whyWeekendPoint2Text
  },
  {
    title: Labels.whyWeekendPoint3Title,
    text: Labels.whyWeekendPoint3Text
  }
]
</script>
