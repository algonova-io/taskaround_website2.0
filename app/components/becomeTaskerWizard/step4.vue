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

    <form @submit.prevent="onNext" class="flex flex-col gap-8">

      <div>
        <UTextarea
            id="motivation"
            v-model="form.motivation"
            :placeholder="t(Labels.becomeTaskerPlaceholderMotivation)"
            :rows="4"
            class="w-full text-lg rounded-[18px] p-4"
        />
      </div>

      <div>
        <h3 class="text-xl font-semibold mb-4">
          {{ t(Labels.becomeTaskerStep4Subtitle) }}
        </h3>

        <div class="space-y-4">

          <label
              class="flex items-center gap-4 p-4 border rounded-[18px] cursor-pointer transition-colors"
              :class="form.problemSolving === 'calm' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'"
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
              :class="form.problemSolving === 'ask' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'"
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
              :class="form.problemSolving === 'team' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'"
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
  motivation: string
  problemSolving: string
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
  motivation: props.val.motivation ?? '',
  problemSolving: props.val.problemSolving ?? ''
})

// Validation: Both fields required
const isValid = computed(() => {
  return form.motivation.trim().length > 0 && form.problemSolving !== ''
})

function onNext() {
  if (!isValid.value) return

  emit('next', {
    motivation: form.motivation.trim(),
    problemSolving: form.problemSolving
  })
}
</script>