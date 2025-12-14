<template>
  <UContainer class="w-full h-full flex justify-center items-center">
    <div class="w-full border-none mt-3">

      <div class="flex items-center justify-between mb-3">
        <p class="text-sm text-deepGrey-500">
          {{ t(Labels.partnerWizardHeader) }}
        </p>

        <button class="p-1" @click="onClose">
          <UIcon name="i-tabler-x" class="w-5 h-5 text-deepGrey-700" />
        </button>
      </div>

      <UProgress
          v-model="step"
          :max="totalSteps"
          color="blue"
          size="xs"
          class="mb-6"
      />

      <KeepAlive>
        <component
            :is="currentComponent"
            :val="formData"
            @next="handleNext"
            @back="handleBack"
            @sendApplication="handleSubmit"
            @close="onClose"
        />
      </KeepAlive>
    </div>

  </UContainer>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { Labels } from '~/models/Locale'
import type { PartnerApplication } from '~/models/Tasker'
import Step1 from "~/components/becomeTaskerWizard/step1.vue";
import Step2 from '~/components/becomeTaskerWizard/step2.vue'
import Step3 from '~/components/becomeTaskerWizard/step3.vue'
import Step4 from '~/components/becomeTaskerWizard/step4.vue'
import Step5 from '~/components/becomeTaskerWizard/step5.vue'
import Step6 from '~/components/becomeTaskerWizard/step6.vue'

const { t } = useI18n()
const emit = defineEmits(['close'])
const toast = useToast()
const router = useRouter() // Inject Router for navigation

const step = ref(1)
const totalSteps = 6
const isSubmitting = ref(false)

// Reactive state for the entire application form
const formData = reactive<PartnerApplication>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  city: '',
  experience: '',
  motivation: '',
  problemSolving: '',
  resources: [],
  additionalInfo: ''
})

const currentComponent = computed(() => {
  switch (step.value) {
    case 1: return Step1
    case 2: return Step2
    case 3: return Step3
    case 4: return Step4
    case 5: return Step5
    case 6: return Step6
    default: return Step1
  }
})

// --- Navigation Handlers ---

function handleNext(payload?: Partial<PartnerApplication>) {
  if (payload) {
    Object.assign(formData, payload)
  }

  if (step.value < totalSteps) {
    step.value++
  }
}

function handleBack() {
  if (step.value > 1) {
    step.value--
  }
}

function onClose() {
  // Go back to the previous route in history
  router.back()
}

// --- Submission Handler ---

async function handleSubmit() {
  if (isSubmitting.value) return
  isSubmitting.value = true

  try {
    // --- MOCK SERVER REQUEST START ---
    console.log('🚀 Sending Application:', JSON.parse(JSON.stringify(formData)))

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    // --- MOCK SERVER REQUEST END ---

    // 1. Show Success Toast
    toast.add({
      title: t(Labels.toastSuccessTitle),
      description: t(Labels.becomeTaskerStep6Body),
      icon: 'i-heroicons-check-circle',
      color: 'green',
      timeout: 5000
    })

    // 2. Navigate Home
    await router.push('/')

  } catch (error) {
    console.error('❌ Application failed:', error)
    toast.add({
      title: 'Error',
      description: 'Something went wrong. Please try again.',
      color: 'red'
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>