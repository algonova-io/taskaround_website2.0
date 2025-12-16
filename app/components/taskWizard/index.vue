<template>
  <UContainer class="w-full h-full flex justify-center items-center">
    <div class="w-full border-none mt-3">

      <div v-if="tasker" class="mb-6">
        <ProfilesHeader
            :name="tasker.name"
            :location="tasker.location"
            :rating="tasker.rating"
            :avatar="tasker.avatar"
            :small="true"
        />
      </div>

      <div class="flex items-center justify-between mb-3">
        <p class="text-sm text-deepGrey-500">
          {{ t(Labels.newTaskStepHeader) }}
        </p>

        <button class="p-1" @click="onClose()">
          <UIcon name="i-tabler-x" class="w-5 h-5 text-deepGrey-700"/>
        </button>
      </div>

      <UProgress v-model="step" :max="totalSteps" color="blue" size="xs" class="mb-6"/>

      <KeepAlive>
        <component
            :is="currentComponent"
            :val="formData"
            @next="handleNext"
            @back="handleBack"
            @sendApplication="handleSubmit"
        />
      </KeepAlive>
    </div>

  </UContainer>
</template>

<script setup lang="ts">
import { Labels } from '~/models/Locale'
import Step1 from "~/components/taskWizard/step1.vue";
import Step2 from "~/components/taskWizard/step2.vue";
import Step3 from "~/components/taskWizard/step3.vue";
import Step4 from "~/components/taskWizard/step4.vue";
import ProfilesHeader from "~/components/profiles/header.vue"; // Ensure this path is correct
import type { NewTask } from "~/models/Tasks";

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const toast = useToast()

const step = ref(1)
const totalSteps = 4
const isSubmitting = ref(false)

// Reactive state for the selected tasker
const tasker = ref<{ name: string; location: string; rating: number; avatar: string } | null>(null)

// Mock Data Dictionary
const MOCK_TASKERS: Record<string, any> = {
  '1': {
    name: "Anna Müller",
    location: "Berlin",
    rating: 4.9,
    avatar: "/images/category-1.png"
  },
  '2': {
    name: "Lukas Schneider",
    location: "Hamburg",
    rating: 4.8,
    avatar: "/images/category-1.png"
  }
}

onMounted(() => {
  // Check for 'taskerId' in the URL query parameters
  const id = route.query.taskerId as string

  if (id && MOCK_TASKERS[id]) {
    tasker.value = MOCK_TASKERS[id]
  } else if (id) {
    // Fallback if ID doesn't match specific mock
    tasker.value = MOCK_TASKERS['1']
  }
})

const formData = reactive<NewTask>({
  what: '',
  brand: '',
  hasManual: '',
  condition: '',
  location: '',
  date: '',
  time: '',
  notes: '',
  name: '',
  email: '',
  phone: ''
})

const currentComponent = computed(() => {
  switch (step.value) {
    case 1: return Step1
    case 2: return Step2
    case 3: return Step3
    case 4: return Step4
    default: return Step1
  }
})

const onClose = () => {
  router.back()
}

const handleNext = (payload: Record<string, any>) => {
  Object.assign(formData, payload)
  if (step.value < totalSteps) {
    step.value++
  }
}

const handleBack = () => {
  if (step.value > 1) {
    step.value--
  }
}

const handleSubmit = async () => {
  if (isSubmitting.value) return
  isSubmitting.value = true

  try {
    // Include the Tasker ID in the submission if it exists
    const payload = {
      ...formData,
      taskerId: route.query.taskerId || null
    }

    console.log('🚀 Sending data to server:', JSON.parse(JSON.stringify(payload)))

    await new Promise(resolve => setTimeout(resolve, 1500))

    console.log('✅ Task created successfully')

    toast.add({
      title: t(Labels.toastSuccessTitle),
      description: t(Labels.toastSuccessDescription),
      icon: 'i-heroicons-check-circle',
      color: 'green',
      duration: 5000
    })

    await router.push('/')

  } catch (error) {
    console.error('❌ Error submitting task:', error)
    toast.add({
      title: 'Error',
      description: 'Something went wrong.',
      color: 'red'
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>