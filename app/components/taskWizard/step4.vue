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

    <h2 class="text-2xl font-bold mb-6">
      {{ t(Labels.newTaskStep4Title) }}
    </h2>

    <div class="flex flex-col gap-6 text-lg">

      <div>
        <h4 class="font-bold mb-2">{{ t(Labels.newTaskSummarySectionFurniture) }}</h4>
        <div class="flex flex-col gap-1 text-gray-700">
          <p>
            <span class="font-medium text-black">{{ val.what }}</span>
          </p>
          <p v-if="val.brand">
            {{ t(Labels.newTaskFieldBrand) }}: {{ val.brand }}
          </p>
          <p>
            {{ t(Labels.newTaskFieldCondition) }}:
            {{ val.condition === 'new' ? t(Labels.new) : t(Labels.used) }}
          </p>
          <p>
            {{ t(Labels.newTaskFieldHasManual) }}:
            {{ val.hasManual === 'yes' ? t(Labels.yes) : t(Labels.no) }}
          </p>
        </div>
      </div>

      <div>
        <h4 class="font-bold mb-2">{{ t(Labels.newTaskSummarySectionDate) }}</h4>
        <div class="flex flex-col gap-1 text-gray-700">
          <p>
            {{ t(Labels.newTaskFieldLocation) }}: {{ val.location }}
          </p>
          <p>
            {{ t(Labels.date) }}: {{ val.date }}
          </p>
          <p>
            {{ t(Labels.timeWindow) }}: {{ val.time }}
          </p>
          <p v-if="val.notes">
            {{ t(Labels.newTaskFieldNotes) }}: {{ val.notes }}
          </p>
        </div>
      </div>

      <div>
        <h4 class="font-bold mb-2">{{ t(Labels.newTaskSummarySectionContact) }}</h4>
        <div class="flex flex-col gap-1 text-gray-700">
          <p>{{ val.name }}</p>
          <p>{{ val.email }}</p>
          <p>{{ t(Labels.newTaskFieldPhone) }}: {{ val.phone }}</p>
        </div>
      </div>

      <div class="mt-6 w-full flex justify-start">
        <UButton
            color="green"
            class="px-8 py-3 mb-10 rounded-[18px] text-base font-medium"
            @click="$emit('sendApplication')"
        >
          {{ t(Labels.newTaskButtonSend) }}
        </UButton>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { Labels } from '~/models/Locale'
import type { NewTask } from '~/models/Tasks'

defineProps<{
  val: NewTask
}>()

defineEmits<{
  (e: 'sendApplication'): void
  (e: 'back'): void
}>()

const { t } = useI18n()
</script>