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
      {{ t(Labels.becomeTaskerStep3Title) }}
    </h2>

    <UForm
        :schema="schema"
        :state="form"
        class="flex flex-col gap-6"
        @submit="onSubmit"
    >

      <UFormField name="experience" class="w-full">
        <div class="space-y-4">

          <label
              class="flex items-center gap-4 p-4 border rounded-[18px] cursor-pointer transition-colors"
              :class="getBorderClass('high')"
          >
            <input
                type="radio"
                v-model="form.experience"
                value="high"
                class="hidden"
            />
            <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                 :class="form.experience === 'high' ? 'border-blue-500' : 'border-gray-300'">
              <div v-if="form.experience === 'high'" class="w-3 h-3 rounded-full bg-blue-500" />
            </div>
            <span class="text-lg font-medium">{{ t(Labels.becomeTaskerOptionHigh) }}</span>
          </label>

          <label
              class="flex items-center gap-4 p-4 border rounded-[18px] cursor-pointer transition-colors"
              :class="getBorderClass('medium')"
          >
            <input
                type="radio"
                v-model="form.experience"
                value="medium"
                class="hidden"
            />
            <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                 :class="form.experience === 'medium' ? 'border-blue-500' : 'border-gray-300'">
              <div v-if="form.experience === 'medium'" class="w-3 h-3 rounded-full bg-blue-500" />
            </div>
            <span class="text-lg font-medium">{{ t(Labels.becomeTaskerOptionMedium) }}</span>
          </label>

          <label
              class="flex items-center gap-4 p-4 border rounded-[18px] cursor-pointer transition-colors"
              :class="getBorderClass('low')"
          >
            <input
                type="radio"
                v-model="form.experience"
                value="low"
                class="hidden"
            />
            <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                 :class="form.experience === 'low' ? 'border-blue-500' : 'border-gray-300'">
              <div v-if="form.experience === 'low'" class="w-3 h-3 rounded-full bg-blue-500" />
            </div>
            <span class="text-lg font-medium">{{ t(Labels.becomeTaskerOptionLow) }}</span>
          </label>

        </div>
      </UFormField>

      <div class="mt-6 w-full flex justify-start">
        <UButton
            type="submit"
            color="blue"
            class="rounded-[18px] py-3 px-8 text-base font-medium"
        >
          {{ t(Labels.next) }}
        </UButton>
      </div>

    </UForm>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { Labels } from '~/models/Locale'
import type { PartnerApplication } from '~/models/Tasker'

const props = defineProps<{
  val: PartnerApplication
}>()

const emit = defineEmits<{
  (e: 'next', payload: { experience: string }): void
  (e: 'back'): void
}>()

const { t } = useI18n()

// --- State ---
const form = reactive({
  experience: props.val.experience ?? ''
})

// --- Zod Schema ---
const schema = z.object({
  experience: z.string().min(1, t(Labels.formErrorRequired))
})

// --- Helper for Styling ---
function getBorderClass(value: string) {
  return form.experience === value
      ? 'border-blue-500 bg-blue-50/10'
      : 'border-gray-200 hover:border-gray-300'
}

// --- Submit Handler ---
function onSubmit(event: FormSubmitEvent<{ experience: string }>) {
  emit('next', { experience: form.experience })
}
</script>