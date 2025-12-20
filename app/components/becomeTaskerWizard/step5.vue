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
      {{ t(Labels.becomeTaskerStep5Title) }}
    </h2>

    <UForm
        :schema="schema"
        :state="form"
        class="flex flex-col gap-8"
        @submit="onSubmit"
    >

      <UFormField name="resources">
        <div class="space-y-4">

          <label
              class="flex items-center gap-4 p-4 border rounded-[18px] cursor-pointer transition-colors"
              :class="getCheckboxClass('tools')"
          >
            <input
                type="checkbox"
                value="tools"
                v-model="form.resources"
                class="hidden"
            />
            <div class="w-6 h-6 rounded border-2 flex items-center justify-center"
                 :class="form.resources.includes('tools') ? 'border-blue-500 bg-blue-500' : 'border-gray-300'">
              <UIcon v-if="form.resources.includes('tools')" name="i-heroicons-check" class="text-white w-4 h-4" />
            </div>
            <span class="text-lg font-medium">{{ t(Labels.becomeTaskerOptionTools) }}</span>
          </label>

          <label
              class="flex items-center gap-4 p-4 border rounded-[18px] cursor-pointer transition-colors"
              :class="getCheckboxClass('car')"
          >
            <input
                type="checkbox"
                value="car"
                v-model="form.resources"
                class="hidden"
            />
            <div class="w-6 h-6 rounded border-2 flex items-center justify-center"
                 :class="form.resources.includes('car') ? 'border-blue-500 bg-blue-500' : 'border-gray-300'">
              <UIcon v-if="form.resources.includes('car')" name="i-heroicons-check" class="text-white w-4 h-4" />
            </div>
            <span class="text-lg font-medium">{{ t(Labels.becomeTaskerOptionCar) }}</span>
          </label>

          <label
              class="flex items-center gap-4 p-4 border rounded-[18px] cursor-pointer transition-colors"
              :class="getCheckboxClass('public_transport')"
          >
            <input
                type="checkbox"
                value="public_transport"
                v-model="form.resources"
                class="hidden"
            />
            <div class="w-6 h-6 rounded border-2 flex items-center justify-center"
                 :class="form.resources.includes('public_transport') ? 'border-blue-500 bg-blue-500' : 'border-gray-300'">
              <UIcon v-if="form.resources.includes('public_transport')" name="i-heroicons-check" class="text-white w-4 h-4" />
            </div>
            <span class="text-lg font-medium">{{ t(Labels.becomeTaskerOptionPublicTransport) }}</span>
          </label>

          <label
              class="flex items-center gap-4 p-4 border rounded-[18px] cursor-pointer transition-colors"
              :class="getCheckboxClass('none')"
          >
            <input
                type="checkbox"
                value="none"
                v-model="form.resources"
                class="hidden"
            />
            <div class="w-6 h-6 rounded border-2 flex items-center justify-center"
                 :class="form.resources.includes('none') ? 'border-blue-500 bg-blue-500' : 'border-gray-300'">
              <UIcon v-if="form.resources.includes('none')" name="i-heroicons-check" class="text-white w-4 h-4" />
            </div>
            <span class="text-lg font-medium">{{ t(Labels.becomeTaskerOptionNone) }}</span>
          </label>

        </div>
      </UFormField>

      <div>
        <h3 class="text-xl font-bold mb-4">
          {{ t(Labels.becomeTaskerStep5Subtitle) }}
        </h3>

        <UFormField name="additionalInfo">
          <UTextarea
              id="additionalInfo"
              v-model="form.additionalInfo"
              :placeholder="t(Labels.becomeTaskerPlaceholderAdditionalInfo)"
              :rows="4"
              class="w-full"
              size="xl"
          />
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
import { reactive, watch } from 'vue'
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { Labels } from '~/models/Locale'
import type { PartnerApplication, PartnerStep5 } from "~/models/Tasker"

const props = defineProps<{
  val: PartnerApplication
}>()

const emit = defineEmits<{
  (e: 'next', payload: Partial<PartnerStep5>): void
  (e: 'back'): void
}>()

const { t } = useI18n()

// --- State ---
const form = reactive({
  resources: props.val.resources ? [...props.val.resources] : [] as string[],
  additionalInfo: props.val.additionalInfo ?? ''
})

watch(() => form.resources, (newVal, oldVal) => {
  const isNoneSelected = newVal.includes('none')
  const wasNoneSelected = oldVal?.includes('none')

  if (isNoneSelected && !wasNoneSelected) {
    form.resources = ['none']
  } else if (isNoneSelected && newVal.length > 1) {
    form.resources = newVal.filter(i => i !== 'none')
  }
})

// --- Zod Schema ---
const schema = z.object({
  // Must be an array with at least 1 item
  resources: z.array(z.string()).min(1, t(Labels.formErrorRequired )),
  additionalInfo: z.string().optional()
})

// --- Helpers ---
function getCheckboxClass(value: string) {
  return form.resources.includes(value)
      ? 'border-blue-500 bg-blue-50/10'
      : 'border-gray-200 hover:border-gray-300'
}

// --- Submit Handler ---
function onSubmit(event: FormSubmitEvent<PartnerStep5>) {
  emit('next', {
    resources: form.resources,
    additionalInfo: form.additionalInfo.trim()
  })
}
</script>