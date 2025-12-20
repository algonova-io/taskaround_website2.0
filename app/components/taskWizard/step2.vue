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

    <UForm
        :schema="schema"
        :state="payload"
        class="flex flex-col gap-6"
        @submit="onSubmit"
    >

      <UFormField name="location" :label="t(Labels.newTaskFieldLocation)" required>
        <div class="relative w-full">
          <UInputMenu
              id="location"
              v-model="payload.location"
              v-model:search-term="searchTerm"
              :items="suggestions"
              :loading="isLoading"
              value-key="full_address"
              :placeholder="t(Labels.newTaskPlaceholderLocation)"
              icon="i-heroicons-map-pin"
              class="w-full"
              size="xl"
              trailing-icon="i-heroicons-chevron-down"
          >
          </UInputMenu>
        </div>
      </UFormField>

      <div>
        <label class="block mb-2 font-semibold text-sm">
          {{ t(Labels.newTaskFieldDateTime) }} <span class="text-red-500">*</span>
        </label>

        <div class="flex gap-4 items-start">

          <div class="w-1/2">
            <UFormField name="date">
              <UInputDate
                  v-model="dateModel"
                  size="xl"
                  class="w-full"
                  :min-value="minDate"
                  icon="i-heroicons-calendar"
              >
                <template #trailing>
                  <UPopover :content="{ align: 'end' }">
                    <UButton
                        variant="ghost"
                        color="neutral"
                        icon="i-heroicons-calendar"
                        class="p-1"
                    />
                    <template #content>
                      <UCalendar
                          v-model="dateModel"
                          class="p-2"
                          :min-value="minDate"
                      />
                    </template>
                  </UPopover>
                </template>
              </UInputDate>
            </UFormField>
          </div>

          <div class="w-1/2">
            <UFormField name="time">
              <USelectMenu
                  v-model="payload.time"
                  :items="timeSlots"
                  placeholder="Select time"
                  class="w-full"
                  size="xl"
                  icon="i-heroicons-clock"
              />
            </UFormField>
          </div>

        </div>
      </div>

      <UFormField name="notes" :label="t(Labels.newTaskFieldNotes)">
        <UTextarea
            v-model="payload.notes"
            :placeholder="t(Labels.newTaskPlaceholderNotes)"
            :rows="4"
            class="w-full"
            size="xl"
        />
      </UFormField>

      <div class="mt-6 w-full flex justify-start">
        <UButton
            type="submit"
            color="blue"
            class="px-8 py-3 rounded-[18px] text-base font-medium"
        >
          {{ t(Labels.next) }}
        </UButton>
      </div>

    </UForm>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref, watch, onMounted } from 'vue'
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { CalendarDate, parseDate, today, getLocalTimeZone } from '@internationalized/date'
import { Labels } from '~/models/Locale'
import type { NewTaskStep2, NewTask } from '~/models/Tasks'
import { usePlacesAutocomplete, } from '~/composables/usePlacesAutocomplete'

const props = defineProps<{ val: NewTask }>()
const emit = defineEmits<{
  (e: 'next', payload: Partial<NewTaskStep2>): void
  (e: 'back'): void
}>()

const { t } = useI18n()
const { suggestions, isLoading, search, initPlaces } = usePlacesAutocomplete()

// --- State ---
const payload = reactive<NewTaskStep2>({
  location: props.val.location ?? '',
  date: props.val.date ?? '',
  time: props.val.time ?? '',
  notes: props.val.notes ?? ''
})

const searchTerm = ref('')
let debounceTimer: ReturnType<typeof setTimeout> | null = null

// --- Zod Schema Validation ---
const schema = z.object({
  location: z.string().min(1, t(Labels.formErrorRequired)),
  date: z.string().min(1, t(Labels.formErrorRequired )),
  time: z.string().min(1, t(Labels.formErrorRequired )),
  notes: z.string().optional()
})

// --- Computed Properties ---

const minDate = computed(() => {
  return today(getLocalTimeZone()).add({ days: 1 })
})

const timeSlots = computed(() => {
  const slots: string[] = []
  for (let i = 7; i < 20; i++) {
    const pad = (n: number) => n.toString().padStart(2, '0')
    slots.push(`${pad(i)}:00 - ${pad(i + 1)}:00`)
  }
  return slots
})

const dateModel = computed({
  get: () => {
    if (!payload.date) return undefined
    try {
      return parseDate(payload.date)
    } catch {
      return undefined
    }
  },
  set: (val) => {
    if (!val) {
      payload.date = ''
      return
    }
    if (val.compare(minDate.value) < 0) {
    } else {
      payload.date = val.toString()
    }
  }
})

// --- Methods ---
function onSubmit(event: FormSubmitEvent<any>) {
  emit('next', { ...payload })
}

// --- Lifecycle & Watchers ---

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