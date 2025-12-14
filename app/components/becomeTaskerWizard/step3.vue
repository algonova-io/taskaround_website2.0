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

    <form @submit.prevent="onNext" class="flex flex-col gap-6">

      <div class="space-y-4">

        <label
            class="flex items-center gap-4 p-4 border rounded-[18px] cursor-pointer transition-colors"
            :class="form.experience === 'high' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'"
        >
          <input
              type="radio"
              v-model="form.experience"
              value="high"
              class="hidden"
          />
          <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white"
               :class="form.experience === 'high' ? 'border-blue-500' : 'border-gray-300'">
            <div v-if="form.experience === 'high'" class="w-3 h-3 rounded-full bg-blue-500" />
          </div>

          <span class="text-lg font-medium">{{ t(Labels.becomeTaskerOptionHigh) }}</span>
        </label>

        <label
            class="flex items-center gap-4 p-4 border rounded-[18px] cursor-pointer transition-colors"
            :class="form.experience === 'medium' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'"
        >
          <input
              type="radio"
              v-model="form.experience"
              value="medium"
              class="hidden"
          />
          <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white"
               :class="form.experience === 'medium' ? 'border-blue-500' : 'border-gray-300'">
            <div v-if="form.experience === 'medium'" class="w-3 h-3 rounded-full bg-blue-500" />
          </div>

          <span class="text-lg font-medium">{{ t(Labels.becomeTaskerOptionMedium) }}</span>
        </label>

        <label
            class="flex items-center gap-4 p-4 border rounded-[18px] cursor-pointer transition-colors"
            :class="form.experience === 'low' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'"
        >
          <input
              type="radio"
              v-model="form.experience"
              value="low"
              class="hidden"
          />
          <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white"
               :class="form.experience === 'low' ? 'border-blue-500' : 'border-gray-300'">
            <div v-if="form.experience === 'low'" class="w-3 h-3 rounded-full bg-blue-500" />
          </div>

          <span class="text-lg font-medium">{{ t(Labels.becomeTaskerOptionLow) }}</span>
        </label>

      </div>

      <div class="mt-6 w-full flex justify-start">
        <UButton
            type="submit"
            color="blue"
            class="rounded-[18px] py-3 px-8 text-base font-medium"
            :disabled="!isValid"
            :class="{ 'opacity-50 cursor-not-allowed': !isValid }"
        >
          {{ t(Labels.next) }}
        </UButton>
      </div>

    </form>
  </div>
</template>

<script setup lang="ts">
import { Labels } from '~/models/Locale'
import { reactive, computed } from 'vue'

// Define the interface locally or import it
interface PartnerFormData {
  experience: string
}

const props = defineProps<{
  val: PartnerFormData
}>()

const emit = defineEmits<{
  (e: 'next', payload: { experience: string }): void
  (e: 'back'): void
}>()

const { t } = useI18n()

// Initialize local state
const form = reactive({
  experience: props.val.experience ?? ''
})

// Validation: User must select one option
const isValid = computed(() => form.experience !== '')

function onNext() {
  if (!isValid.value) return

  emit('next', { experience: form.experience })
}
</script>