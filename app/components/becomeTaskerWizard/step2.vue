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
      {{ t(Labels.becomeTaskerStep2Title) }}
    </h2>

    <form @submit.prevent="onNext" class="flex flex-col gap-6">

      <div class="flex flex-col md:flex-row gap-6">
        <div class="w-full md:w-1/2">
          <label for="firstName" class="block mb-2 font-semibold">
            {{ t(Labels.becomeTaskerFieldFirstName) }}
          </label>
          <UInput
              id="firstName"
              name="tasker_firstname"
              v-model="form.firstName"
              :placeholder="t(Labels.becomeTaskerPlaceholderFirstName)"
              class="w-full rounded-[18px] py-4 text-lg"
              autocomplete="off"
          />
        </div>

        <div class="w-full md:w-1/2">
          <label for="lastName" class="block mb-2 font-semibold">
            {{ t(Labels.becomeTaskerFieldLastName) }}
          </label>
          <UInput
              id="lastName"
              name="tasker_lastname"
              v-model="form.lastName"
              :placeholder="t(Labels.becomeTaskerPlaceholderLastName)"
              class="w-full rounded-[18px] py-4  text-lg"
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
              name="tasker_email"
              type="email"
              v-model="form.email"
              :placeholder="t(Labels.becomeTaskerPlaceholderEmail)"
              class="w-full rounded-[18px] py-4  text-lg"
              autocomplete="off"
          />
        </div>

        <div class="w-full md:w-1/2">
          <label for="phone" class="block mb-2 font-semibold">
            {{ t(Labels.becomeTaskerFieldPhone) }}
          </label>
          <UInput
              id="phone"
              name="tasker_phone"
              type="tel"
              v-model="form.phone"
              :placeholder="t(Labels.becomeTaskerPlaceholderPhone)"
              class="w-full rounded-[18px] py-4  text-lg"
              autocomplete="off"
          />
        </div>
      </div>

      <div>
        <label for="city" class="block mb-2 font-semibold">
          {{ t(Labels.becomeTaskerFieldCity) }}
        </label>
        <div class="relative">
          <UInput
              id="city"
              name="tasker_city"
              v-model="form.city"
              :placeholder="t(Labels.becomeTaskerPlaceholderCity)"
              icon="i-heroicons-map-pin"
              class="w-full rounded-[18px] py-4  text-lg"
              autocomplete="off"
          >
            <template #trailing>
              <UButton
                  color="black"
                  variant="solid"
                  icon="i-heroicons-arrow-right"
                  class="rounded-full w-8 h-8 flex items-center justify-center mr-1"
                  @click="onNext"
              />
            </template>
          </UInput>
        </div>
      </div>

      <div class="mt-6 w-full flex justify-start">
        <UButton
            type="submit"
            color="blue"
            class="px-8 py-3 rounded-[18px] text-base font-medium"
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
import type { PartnerFormData } from "~/models/Tasker";


const props = defineProps<{
  val: PartnerFormData
}>()

const emit = defineEmits<{
  (e: 'next', payload: Partial<PartnerFormData>): void
  (e: 'back'): void
}>()

const { t } = useI18n()

// Initialize form
const form = reactive<PartnerFormData>({
  firstName: props.val.firstName ?? '',
  lastName: props.val.lastName ?? '',
  email: props.val.email ?? '',
  phone: props.val.phone ?? '',
  city: props.val.city ?? ''
})

// Validation Regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,}$/

// Computed Validation
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

  const payload = {
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    city: form.city.trim()
  }

  emit('next', payload)
}
</script>