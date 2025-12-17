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

    <form @submit.prevent="onNext" class="flex flex-col gap-8">

      <div class="space-y-4">

        <label
            class="flex items-center gap-4 p-4 border rounded-[18px] cursor-pointer transition-colors"
            :class="form.resources.includes('tools') ? 'border-blue-500' : 'border-gray-200'"
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
            :class="form.resources.includes('car') ? 'border-blue-500' : 'border-gray-200'"
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
            :class="form.resources.includes('public_transport') ? 'border-blue-500' : 'border-gray-200'"
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
            :class="form.resources.includes('none') ? 'border-blue-500' : 'border-gray-200'"
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

      <div>
        <h3 class="text-xl font-bold mb-4">
          {{ t(Labels.becomeTaskerStep5Subtitle) }}
        </h3>

        <UTextarea
            id="additionalInfo"
            v-model="form.additionalInfo"
            :placeholder="t(Labels.becomeTaskerPlaceholderAdditionalInfo)"
            :rows="4"
            class="w-full"
            size="xl"
        />
      </div>

      <div class="mt-2 w-full flex justify-start">
        <UButton
            type="submit"
            color="blue"
            class="rounded-[18px] py-3 px-8 text-base font-medium"
            :disabled="!isValid"
        >
          {{ t(Labels.next) }}
        </UButton>
      </div>

    </form>
  </div>
</template>

<script setup lang="ts">
import { Labels } from '~/models/Locale'
import { reactive, computed, watch } from 'vue'
import type { PartnerApplication, PartnerStep5 } from "~/models/Tasker"

const props = defineProps<{
  val: PartnerApplication
}>()

const emit = defineEmits<{
  (e: 'next', payload: Partial<PartnerStep5>): void
  (e: 'back'): void
}>()

const { t } = useI18n()

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

const isValid = computed(() => form.resources.length > 0)

function onNext() {
  if (!isValid.value) return

  emit('next', {
    resources: form.resources,
    additionalInfo: form.additionalInfo.trim()
  })
}
</script>