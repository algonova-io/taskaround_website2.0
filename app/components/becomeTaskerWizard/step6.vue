<template>
  <div class="w-full">
    <div class="mb-4">
      <UButton
          variant="ghost"
          color="black"
          class="p-0 hover:bg-transparent"
          icon="i-heroicons-arrow-left"
          @click="$emit('back')"
      >
        {{ t(Labels.back) }}
      </UButton>
    </div>

    <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
      {{ t(Labels.becomeTaskerStep6Title) }}
      <span>🎉</span>
    </h2>

    <div class="flex flex-col gap-8">

      <p class="text-lg text-gray-700 leading-relaxed">
        {{ t(Labels.becomeTaskerStep6Body) }}
      </p>

      <div class="mt-4 w-full flex justify-start">
        <UButton
            color="green"
            class="rounded-[18px] py-3 mb-10 px-8 text-base font-medium"
            @click="$emit('sendApplication')"
        >
          {{ t(Labels.becomeTaskerButtonSend) }}
        </UButton>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { Labels } from '~/models/Locale'

// No props needed for this step as it's just info/submission
const emit = defineEmits<{
  (e: 'sendApplication'): void
  (e: 'back'): void
}>()

const { t } = useI18n()
</script>