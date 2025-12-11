<template>
  <section class="w-full py-10">
    <UContainer class="  flex flex-col gap-6">
      <h2>{{ t(Labels.taskerReviewListTitle) }}</h2>

      <div class="flex flex-col gap-4">
        <ProfilesReviewCard
            v-for="review in reviews"
            :key="review.id"
            :review="review"
        />
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { Labels } from '~/models/Locale'
import type {TaskerReview} from "~/models/Tasker";

defineProps<{
  reviews: TaskerReview[]
}>()

const { t } = useI18n()
</script>
