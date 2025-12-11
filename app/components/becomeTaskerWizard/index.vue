<template>
  <UContainer class="w-full h-full flex justify-center items-center">
    <div class="w-full  border-none mt-3 ">

      <!-- Header -->
      <div class="flex items-center justify-between mb-3">
        <p class="text-sm text-deepGrey-500">
          {{ t(Labels.partnerWizardHeader) }}
        </p>

        <button class="p-1" @click="$emit('close')">
          <UIcon name="i-tabler-x" class="w-5 h-5 text-deepGrey-700" />
        </button>
      </div>

      <!-- Progress bar -->
      <UProgress v-model="step"  :max="totalSteps" color="blue" size="xs" class="mb-6" />

      <!-- Step renderer -->
      <component
          :is="currentComponent"
          @next="goNext"
          @close="$emit('close')"
      />
    </div>

  </UContainer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Labels } from '~/models/Locale'
import StepOne from "~/components/becomeTaskerWizard/stepOne.vue";

const { t } = useI18n()

const step = ref(1)
const totalSteps = 7


// Map step → component
const currentComponent = computed(() => {
  switch (step.value) {
    case 1:
      return StepOne
    default:
      return StepOne
  }
})

const goNext = () => {
  if (step.value < totalSteps) step.value++
}

defineEmits(['close'])
</script>
