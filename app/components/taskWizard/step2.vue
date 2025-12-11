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
      {{ t(Labels.newTaskStep2Title) }}
    </h2>

    <form @submit.prevent="onNext" class="flex flex-col gap-6">

      <div>
        <label for="location" class="block mb-2 font-semibold">
          {{ t(Labels.newTaskFieldLocation) }}
        </label>
        <div class="relative">
          <UInput
              id="location"
              name="location"
              v-model="payload.location"
              :placeholder="t(Labels.newTaskPlaceholderLocation)"
              icon="i-heroicons-map-pin"
              class="w-full  rounded-[18px] p-4 text-lg"
          >
            <template #trailing>
              <UButton
                  color="black"
                  variant="solid"
                  icon="i-heroicons-arrow-right"
                  class="rounded-full w-8 h-8 flex items-center justify-center mr-1"
                  @click="useCurrentLocation"
              />
            </template>
          </UInput>
        </div>
      </div>

      <div>
        <label class="block mb-2 font-semibold">
          {{ t(Labels.newTaskFieldDateTime) }}
        </label>
        <div class="flex gap-4">
          <UInput
              name="date"
              v-model="payload.date"
              type="text"
              placeholder="So. 19.11"
              class="w-1/2  rounded-[18px] p-4 text-lg"
          />
          <UInput
              name="time"
              v-model="payload.time"
              type="text"
              placeholder="12 - 13"
              class="w-1/2  rounded-[18px] p-4 text-lg"
          />
        </div>
      </div>

      <div>
        <label for="notes" class="block mb-2 font-semibold">
          {{ t(Labels.newTaskFieldNotes) }}
        </label>
        <UTextarea
            id="notes"
            name="notes"
            v-model="payload.notes"
            :placeholder="t(Labels.newTaskPlaceholderNotes)"
            :rows="4"
            class="w-full rounded-[18px] p-4 text-lg"
        />
      </div>

      <div class="mt-6 w-full flex justify-start">
        <UButton
            type="submit"
            color="blue"
            class="px-8 py-3 rounded-[18px] text-base font-medium"
        >
          {{ t(Labels.next) }}
        </UButton>
      </div>

    </form>
  </div>
</template>

<script setup lang="ts">
import { Labels } from '~/models/Locale'
import type { NewTaskStep2,NewTask } from '~/models/Tasks'
const props = defineProps<{
  val: NewTask
}>()
/**
 * Emits:
 * - next (payload: form data)
 * - back (void)
 */
const emit = defineEmits<{
  (e: 'next', payload: Record<string, any>): void
  (e: 'back'): void
}>()

const { t } = useI18n()

const payload = reactive<NewTaskStep2>({
  location: props.val.location ?? '',
  date: props.val.date,
  time: props.val.time,
  notes: props.val.notes
})

function useCurrentLocation() {
  // Logic to fetch location would go here
  console.log('Fetching current location...')
}

const isValid = computed(() => {
  return payload.location?.trim().length > 0 &&
      payload.date?.trim().length > 0 &&
      payload.time?.trim().length > 0
})

function onNext() {
  if (!isValid.value) return
  emit('next', payload)
}

</script>