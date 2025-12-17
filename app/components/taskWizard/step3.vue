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
      {{ t(Labels.newTaskStep3Title) }}
    </h2>

    <form @submit.prevent="onNext" class="flex flex-col gap-6">

      <div>
        <label for="name" class="block mb-2 font-semibold">
          {{ t(Labels.newTaskFieldName) }}
        </label>
        <UInput
            id="name"
            v-model="payload.name"
            :placeholder="t(Labels.newTaskPlaceholderName)"
            class="w-full"
            size="xl"
            autocomplete="name"
        />
      </div>

      <div class="flex flex-col md:flex-row gap-6">
        <div class="w-full md:w-1/2">
          <label for="email" class="block mb-2 font-semibold">
            {{ t(Labels.newTaskFieldEmail) }}
          </label>
          <UInput
              id="email"
              type="email"
              v-model="payload.email"
              :placeholder="t(Labels.newTaskPlaceholderEmail)"
              class="w-full"
              size="xl"
              autocomplete="email"
          />
        </div>

        <div class="w-full md:w-1/2">
          <label for="phone" class="block mb-2 font-semibold">
            {{ t(Labels.newTaskFieldPhone) }}
          </label>
          <UInput
              id="phone"
              type="tel"
              name="phone"
              v-model="payload.phone"
              :placeholder="t(Labels.newTaskPlaceholderPhone)"
              class="w-full"
              size="xl"
              autocomplete="tel"
          />
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
import { reactive, computed } from 'vue'
import type { NewTaskStep3, NewTask } from '~/models/Tasks'

const props = defineProps<{
  val: NewTask
}>()

const emit = defineEmits<{
  (e: 'next', payload: NewTaskStep3): void
  (e: 'back'): void
}>()

const { t } = useI18n()
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const payload = reactive<NewTaskStep3>({
  name: props.val.name ?? '',
  email: props.val.email ?? '',
  phone: props.val.phone ?? ''
})

const isValid = computed(() => {
  const isNameValid = (payload.name?.trim().length ?? 0) > 0
  const isEmailValid = emailRegex.test(payload.email)
  const isPhoneValid = (payload.phone?.trim().length ?? 0) > 0

  return isNameValid && isEmailValid && isPhoneValid
})

function onNext() {
  if (!isValid.value) return
  emit('next', { ...payload })
}
</script>