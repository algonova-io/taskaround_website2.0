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
            :class="form.resources.includes('tools') ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'"
        >
          <input
              type="checkbox"
              value="tools"
              v-model="form.resources"
              class="hidden"
          />
          <div class="w-6 h-6 rounded border-2 flex items-center justify-center bg-white"
               :class="form.resources.includes('tools') ? 'border-blue-500 bg-blue-500' : 'border-gray-300'">
            <UIcon v-if="form.resources.includes('tools')" name="i-heroicons-check" class="text-white w-4 h-4" />
          </div>
          <span class="text-lg">{{ t(Labels.becomeTaskerOptionTools) }}</span>
        </label>

        <label
            class="flex items-center gap-4 p-4 border rounded-[18px] cursor-pointer transition-colors"
            :class="form.resources.includes('car') ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'"
        >
          <input
              type="checkbox"
              value="car"
              v-model="form.resources"
              class="hidden"
          />
          <div class="w-6 h-6 rounded border-2 flex items-center justify-center bg-white"
               :class="form.resources.includes('car') ? 'border-blue-500 bg-blue-500' : 'border-gray-300'">
            <UIcon v-if="form.resources.includes('car')" name="i-heroicons-check" class="text-white w-4 h-4" />
          </div>
          <span class="text-lg">{{ t(Labels.becomeTaskerOptionCar) }}</span>
        </label>

        <label
            class="flex items-center gap-4 p-4 border rounded-[18px] cursor-pointer transition-colors"
            :class="form.resources.includes('public_transport') ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'"
        >
          <input
              type="checkbox"
              value="public_transport"
              v-model="form.resources"
              class="hidden"
          />
          <div class="w-6 h-6 rounded border-2 flex items-center justify-center bg-white"
               :class="form.resources.includes('public_transport') ? 'border-blue-500 bg-blue-500' : 'border-gray-300'">
            <UIcon v-if="form.resources.includes('public_transport')" name="i-heroicons-check" class="text-white w-4 h-4" />
          </div>
          <span class="text-lg">{{ t(Labels.becomeTaskerOptionPublicTransport) }}</span>
        </label>

        <label
            class="flex items-center gap-4 p-4 border rounded-[18px] cursor-pointer transition-colors"
            :class="form.resources.includes('none') ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'"
        >
          <input
              type="checkbox"
              value="none"
              v-model="form.resources"
              @change="handleNoneSelection"
              class="hidden"
          />
          <div class="w-6 h-6 rounded border-2 flex items-center justify-center bg-white"
               :class="form.resources.includes('none') ? 'border-blue-500 bg-blue-500' : 'border-gray-300'">
            <UIcon v-if="form.resources.includes('none')" name="i-heroicons-check" class="text-white w-4 h-4" />
          </div>
          <span class="text-lg">{{ t(Labels.becomeTaskerOptionNone) }}</span>
        </label>

      </div>

      <div>
        <h3 class="text-xl font-semibold mb-4">
          {{ t(Labels.becomeTaskerStep5Subtitle) }}
        </h3>

        <UTextarea
            id="additionalInfo"
            v-model="form.additionalInfo"
            :placeholder="t(Labels.becomeTaskerPlaceholderAdditionalInfo)"
            :rows="4"
            class="w-full text-lg rounded-[18px] p-4"
        />
      </div>

      <div class="mt-2 w-full flex justify-start">
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

interface PartnerFormData {
  resources: string[]
  additionalInfo: string
}

const props = defineProps<{
  val: PartnerFormData
}>()

const emit = defineEmits<{
  (e: 'next', payload: Partial<PartnerFormData>): void
  (e: 'back'): void
}>()

const { t } = useI18n()

const form = reactive({
  resources: props.val.resources ? [...props.val.resources] : [] as string[],
  additionalInfo: props.val.additionalInfo ?? ''
})

// Logic: If "Just Motivation" is clicked, clear others. If others clicked, clear "Just Motivation".
function handleNoneSelection() {
  if (form.resources.includes('none')) {
    // If 'none' was just added, clear everything else
    // But since v-model updates the array, we check if 'none' is present and if it was the last action.
    // A simpler approach for UX:
    if (form.resources.includes('none')) {
      // If user explicitly checked 'none', we might want to uncheck others
      // However, with standard checkbox logic, let's just leave them or filter manually on submit.
      // For this specific UI pattern often "Just me" excludes "Tools".
      // Let's force exclusive behavior for 'none':
      form.resources = ['none']
    }
  }
}

// Watcher or change handler for other inputs to remove 'none' if they are selected
watch(() => form.resources, (newVal, oldVal) => {
  if (newVal.includes('none') && newVal.length > 1) {
    // If 'none' is there and user selects something else, remove 'none'
    if (newVal.indexOf('none') === 0) {
      // 'none' was already there, user added something else -> remove 'none'
      form.resources = newVal.filter(i => i !== 'none')
    }
  }
})

// Validation: At least one resource option must be selected
const isValid = computed(() => form.resources.length > 0)

function onNext() {
  if (!isValid.value) return

  emit('next', {
    resources: form.resources,
    additionalInfo: form.additionalInfo.trim()
  })
}
</script>