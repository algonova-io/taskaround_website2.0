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

    <h2 class="text-2xl font-bold mb-4">
      {{ t(Labels.becomeTaskerStep4Title) }}
    </h2>

    <UForm
        :schema="schema"
        :state="form"
        class="flex flex-col gap-8"
        @submit="onSubmit"
    >

      <UFormField name="motivation" :label="t(Labels.becomeTaskerPlaceholderMotivation)" required>
        <UTextarea
            id="motivation"
            v-model="form.motivation"
            :placeholder="t(Labels.becomeTaskerPlaceholderMotivation)"
            :rows="4"
            class="w-full text-lg"
            size="xl"
        />
      </UFormField>

      <div>
        <h3 class="text-xl font-semibold mb-4">
          {{ t(Labels.becomeTaskerStep4Subtitle) }}
        </h3>

        <UFormField name="problemSolving" required>
          <div class="space-y-4">

            <label
                class="flex items-center gap-4 p-4 border rounded-[18px] cursor-pointer transition-colors"
                :class="getRadioClass('calm')"
            >
              <input
                  type="radio"
                  v-model="form.problemSolving"
                  value="calm"
                  class="hidden"
              />
              <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white"
                   :class="form.problemSolving === 'calm' ? 'border-blue-500' : 'border-gray-300'">
                <div v-if="form.problemSolving === 'calm'" class="w-3 h-3 rounded-full bg-blue-500" />
              </div>
              <span class="text-lg">{{ t(Labels.becomeTaskerOptionCalm) }}</span>
            </label>

            <label
                class="flex items-center gap-4 p-4 border rounded-[18px] cursor-pointer transition-colors"
                :class="getRadioClass('ask')"
            >
              <input
                  type="radio"
                  v-model="form.problemSolving"
                  value="ask"
                  class="hidden"
              />
              <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white"
                   :class="form.problemSolving === 'ask' ? 'border-blue-500' : 'border-gray-300'">
                <div v-if="form.problemSolving === 'ask'" class="w-3 h-3 rounded-full bg-blue-500" />
              </div>
              <span class="text-lg">{{ t(Labels.becomeTaskerOptionAsk) }}</span>
            </label>

            <label
                class="flex items-center gap-4 p-4 border rounded-[18px] cursor-pointer transition-colors"
                :class="getRadioClass('team')"
            >
              <input
                  type="radio"
                  v-model="form.problemSolving"
                  value="team"
                  class="hidden"
              />
              <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white"
                   :class="form.problemSolving === 'team' ? 'border-blue-500' : 'border-gray-300'">
                <div v-if="form.problemSolving === 'team'" class="w-3 h-3 rounded-full bg-blue-500" />
              </div>
              <span class="text-lg">{{ t(Labels.becomeTaskerOptionTeam) }}</span>
            </label>

          </div>
        </UFormField>
      </div>

      <div class="mt-2 w-full flex justify-start">
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
import type { PartnerApplication, PartnerStep4 } from "~/models/Tasker"

const props = defineProps<{
  val: PartnerApplication
}>()

const emit = defineEmits<{
  (e: 'next', payload: Partial<PartnerStep4>): void
  (e: 'back'): void
}>()

const { t } = useI18n()

// --- State ---
const form = reactive({
  motivation: props.val.motivation ?? '',
  problemSolving: props.val.problemSolving ?? ''
})

// --- Zod Schema ---
const schema = z.object({
  motivation: z.string()
      .min(1, t(Labels.formErrorRequired))
      .min(10, t(Labels.formErrorMinLength, ['10'])),

  problemSolving: z.string().min(1, t(Labels.formErrorRequired ))
})

// --- Helpers ---
function getRadioClass(value: string) {
  return form.problemSolving === value
      ? 'border-blue-500 bg-blue-50'
      : 'border-gray-200 hover:bg-gray-50'
}

// --- Submit Handler ---
function onSubmit(event: FormSubmitEvent<PartnerStep4>) {
  emit('next', {
    motivation: form.motivation.trim(),
    problemSolving: form.problemSolving
  })
}
</script>