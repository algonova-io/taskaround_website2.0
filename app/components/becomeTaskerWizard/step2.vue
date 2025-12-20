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

    <UForm
        :schema="schema"
        :state="form"
        class="flex flex-col gap-6"
        @submit="onSubmit"
    >

      <div class="flex flex-col md:flex-row gap-6">
        <div class="w-full md:w-1/2">
          <UFormField name="firstName" :label="t(Labels.becomeTaskerFieldFirstName)" required>
            <UInput
                id="firstName"
                v-model="form.firstName"
                :placeholder="t(Labels.becomeTaskerPlaceholderFirstName)"
                class="w-full"
                size="xl"
                autocomplete="given-name"
            />
          </UFormField>
        </div>

        <div class="w-full md:w-1/2">
          <UFormField name="lastName" :label="t(Labels.becomeTaskerFieldLastName)" required>
            <UInput
                id="lastName"
                v-model="form.lastName"
                :placeholder="t(Labels.becomeTaskerPlaceholderLastName)"
                class="w-full"
                size="xl"
                autocomplete="family-name"
            />
          </UFormField>
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-6">
        <div class="w-full md:w-1/2">
          <UFormField name="email" :label="t(Labels.becomeTaskerFieldEmail)" required>
            <UInput
                id="email"
                type="email"
                v-model="form.email"
                :placeholder="t(Labels.becomeTaskerPlaceholderEmail)"
                class="w-full"
                size="xl"
                autocomplete="email"
            />
          </UFormField>
        </div>

        <div class="w-full md:w-1/2">
          <UFormField name="phone" :label="t(Labels.becomeTaskerFieldPhone)" required>
            <UInput
                id="phone"
                type="tel"
                v-model="form.phone"
                :placeholder="t(Labels.becomeTaskerPlaceholderPhone)"
                class="w-full"
                size="xl"
                autocomplete="tel"
            />
          </UFormField>
        </div>
      </div>

      <div>
        <UFormField name="city" :label="t(Labels.becomeTaskerFieldCity)" required>
          <div class="relative">
            <UInputMenu
                id="city"
                v-model="form.city"
                v-model:search-term="searchTerm"
                :items="suggestions"
                :loading="isLoading"
                value-key="full_address"
                :placeholder="t(Labels.becomeTaskerPlaceholderCity)"
                icon="i-heroicons-map-pin"
                class="w-full"
                size="xl"
                trailing-icon="i-heroicons-chevron-down"
            >
            </UInputMenu>
          </div>
        </UFormField>
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

    </UForm>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch, onMounted } from 'vue'
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { Labels } from '~/models/Locale'
import type { PartnerApplication, PartnerStep2 } from "~/models/Tasker"
import { usePlacesAutocomplete, } from '~/composables/usePlacesAutocomplete'
import {nameRegex, phoneRegex} from "~/models/validation";

const props = defineProps<{ val: PartnerApplication }>()
const emit = defineEmits<{
  (e: 'next', payload: Partial<PartnerStep2>): void
  (e: 'back'): void
}>()

const { t } = useI18n()
const { suggestions, isLoading, search, initPlaces } = usePlacesAutocomplete()

// --- State ---
const form = reactive<PartnerStep2>({
  firstName: props.val.firstName ?? '',
  lastName: props.val.lastName ?? '',
  email: props.val.email ?? '',
  phone: props.val.phone ?? '',
  city: props.val.city ?? ''
})

const searchTerm = ref('')
let debounceTimer: ReturnType<typeof setTimeout> | null = null

// --- Zod Schema ---
const schema = z.object({
  firstName: z.string().min(1, t(Labels.formErrorRequired))
      .min(2, t(Labels.formErrorMinLength, ['2']))
      .regex(nameRegex, t(Labels.formErrorFormat)),
  lastName: z.string().min(1, t(Labels.formErrorRequired ))
      .regex(nameRegex, t(Labels.formErrorFormat))
      .min(2, t(Labels.formErrorFormat)),
  email: z.email(t(Labels.formErrorEmail))
      .min(1, t(Labels.formErrorRequired )),

  phone: z.string()
      .min(1, t(Labels.formErrorRequired ))
      .regex(phoneRegex, t(Labels.formErrorPhone ))
      .min(7, t(Labels.formErrorPhone)),

  city: z.string().min(1, t(Labels.formErrorRequired))
})

// --- Methods ---

function onSubmit(event: FormSubmitEvent<PartnerStep2>) {
  emit('next', { ...form })
}

// --- Lifecycle & Watchers ---

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