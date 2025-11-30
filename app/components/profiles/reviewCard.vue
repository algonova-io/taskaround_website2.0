<template>
  <article class="w-full bg-surface-100 rounded-[18px] px-6 py-4">
    <header class="flex items-center gap-3 mb-1">
      <p class="font-semibold text-text">{{ review.name }}</p>

      <div class="flex items-center gap-1">
        <UIcon
            v-for="i in 5"
            :key="i"
            name="i-tabler-star-filled"
            class="w-4 h-4"
            :class="i <= review.rating ? 'text-[#E3A623]' : 'text-surface-300'"
        />
      </div>
    </header>

    <p class="text-sm text-text mb-3">
      {{ t(Labels.taskerReviewRatedOn, { date: review.date }) }}
    </p>

    <p class="text-base text-text leading-relaxed">
      {{ review.text }}
    </p>
  </article>
</template>

<script setup lang="ts">
import { Labels } from '~/types/Locale'
import type {TaskerReview} from "~/types/Tasker";


defineProps<{
  review: TaskerReview
}>()

const { t } = useI18n()
</script>
