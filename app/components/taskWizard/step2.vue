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
          <UInputMenu
              id="location"
              v-model="payload.location"
              v-model:search-term="searchTerm"
              :items="suggestions"
              :loading="isLoading"
              value-key="description"
              :placeholder="t(Labels.newTaskPlaceholderLocation)"
              icon="i-heroicons-map-pin"
              class="w-full"
              size="xl"
              trailing-icon="i-heroicons-chevron-down"
          >
            <template #item="{ item }">
              <div class="flex flex-col gap-0.5 text-left w-full">
                <span class="text-sm font-medium truncate">{{ item.main_text }}</span>
                <span class="text-xs text-gray-500 truncate">{{ item.secondary_text }}</span>
              </div>
            </template>
          </UInputMenu>
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
              class="w-1/2"
              size="xl"
          />
          <UInput
              name="time"
              v-model="payload.time"
              type="text"
              placeholder="12 - 13"
              class="w-1/2"
              size="xl"
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
            class="w-full"
            size="xl"
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
import type { NewTaskStep2, NewTask } from '~/models/Tasks'
import { usePlacesAutocomplete } from '~/composables/usePlacesAutocomplete'
import { reactive, computed, ref, watch, onMounted } from 'vue'

const props = defineProps<{
  val: NewTask
}>()

const emit = defineEmits<{
  (e: 'next', payload: Partial<NewTaskStep2>): void
  (e: 'back'): void
}>()

const { t } = useI18n()
const { suggestions, isLoading, search, initPlaces } = usePlacesAutocomplete()

const payload = reactive<NewTaskStep2>({
  location: props.val.location ?? '',
  date: props.val.date ?? '',
  time: props.val.time ?? '',
  notes: props.val.notes ?? ''
})

const isValid = computed(() => {
  return (
      (payload.location?.trim().length ?? 0) > 0 &&
      (payload.date?.trim().length ?? 0) > 0 &&
      (payload.time?.trim().length ?? 0) > 0
  )
})

function onNext() {
  if (!isValid.value) return
  emit('next', { ...payload })
}

const searchTerm = ref('')
let debounceTimer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  initPlaces()
})

watch(searchTerm, (newQuery) => {
  if (debounceTimer) clearTimeout(debounceTimer)

  if (payload.location && newQuery === payload.location) return

  if (!newQuery || newQuery.length < 2) {
    suggestions.value = []
    return
  }

  debounceTimer = setTimeout(() => {
    search(newQuery, 'address')
  }, 400)
})
</script>