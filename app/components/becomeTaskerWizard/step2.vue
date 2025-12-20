<template>
  <div class="w-full">
    <div class="mb-4">
      <UButton
          variant="ghost"
          color="blue"
          class="p-0 hover:bg-transparent"
          icon="i-heroicons-arrow-left"
          @click="$emit('back')"
      >
        {{ t(Labels.back) }}
      </UButton>
    </div>

    <h2 class="text-2xl font-bold mb-6">
      {{ t(Labels.becomeTaskerStep2Title) }}
    </h2>

    <form @submit.prevent.stop="onNext" class="flex flex-col gap-6">

      <div class="flex flex-col md:flex-row gap-6">
        <div class="w-full md:w-1/2">
          <label for="firstName" class="block mb-2 font-semibold">
            {{ t(Labels.becomeTaskerFieldFirstName) }}
          </label>
          <UInput
              id="firstName"
              v-model="form.firstName"
              :placeholder="t(Labels.becomeTaskerPlaceholderFirstName)"
              class="w-full"
              size="xl"
              autocomplete="off"
          />
        </div>
        <div class="w-full md:w-1/2">
          <label for="lastName" class="block mb-2 font-semibold">
            {{ t(Labels.becomeTaskerFieldLastName) }}
          </label>
          <UInput
              id="lastName"
              v-model="form.lastName"
              :placeholder="t(Labels.becomeTaskerPlaceholderLastName)"
              class="w-full"
              size="xl"
              autocomplete="off"
          />
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-6">
        <div class="w-full md:w-1/2">
          <label for="email" class="block mb-2 font-semibold">
            {{ t(Labels.becomeTaskerFieldEmail) }}
          </label>
          <UInput
              id="email"
              type="email"
              v-model="form.email"
              :placeholder="t(Labels.becomeTaskerPlaceholderEmail)"
              class="w-full"
              size="xl"
              autocomplete="off"
          />
        </div>
        <div class="w-full md:w-1/2">
          <label for="phone" class="block mb-2 font-semibold">
            {{ t(Labels.becomeTaskerFieldPhone) }}
          </label>
          <UInput
              id="phone"
              type="tel"
              v-model="form.phone"
              :placeholder="t(Labels.becomeTaskerPlaceholderPhone)"
              class="w-full"
              size="xl"
              autocomplete="off"
          />
        </div>
      </div>

      <div>
        <label for="city" class="block mb-2 font-semibold">
          {{ t(Labels.becomeTaskerFieldCity) }}
        </label>
        <div class="relative">
          <UInputMenu
              id="city"
              v-model="form.city"
              v-model:search-term="searchTerm"
              :items="suggestions"
              :loading="isLoading"
              value-key="description"
              :placeholder="t(Labels.becomeTaskerPlaceholderCity)"
              icon="i-heroicons-map-pin"
              class="w-full"
              size="xl"
              trailing-icon="i-heroicons-chevron-down"
          >
          </UInputMenu>
        </div>
      </div>

      <div class="mt-6 w-full flex justify-start">
        <UButton
            type="submit"
            color="blue"
            class="px-8 py-3 rounded-[18px] text-base font-medium"
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
import { reactive, computed, ref, watch, onMounted } from 'vue'
import type {PartnerApplication, PartnerStep2} from "~/models/Tasker"

const props = defineProps<{ val: PartnerApplication }>()
const emit = defineEmits<{
  (e: 'next', payload: Partial<PartnerStep2>): void
  (e: 'back'): void
}>()

const { t } = useI18n()

const { suggestions, isLoading, search, initPlaces } = usePlacesAutocomplete()

const form = reactive<PartnerStep2>({
  firstName: props.val.firstName ?? '',
  lastName: props.val.lastName ?? '',
  email: props.val.email ?? '',
  phone: props.val.phone ?? '',
  city: props.val.city ?? ''
})

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,}$/

const isValid = computed(() => {
  return (
      form.firstName.trim().length > 0 &&
      form.lastName.trim().length > 0 &&
      emailRegex.test(form.email) &&
      phoneRegex.test(form.phone) &&
      form.city.trim().length > 0
  )
})

function onNext() {
  if (!isValid.value) return
  emit('next', { ...form })
}

const searchTerm = ref('')
let debounceTimer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  initPlaces()
})

watch(searchTerm, (newQuery) => {
  if (debounceTimer) clearTimeout(debounceTimer)

  if (form.city && newQuery === form.city) return

  if (!newQuery || newQuery.length < 2) {
    suggestions.value = []
    return
  }

  debounceTimer = setTimeout(() => {
    search(newQuery, 'city')
  }, 400)
})
</script>