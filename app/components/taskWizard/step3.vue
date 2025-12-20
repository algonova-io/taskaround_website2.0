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

    <UForm
        :schema="schema"
        :state="payload"
        class="flex flex-col gap-6"
        @submit="onSubmit"
    >

      <UFormField name="name" :label="t(Labels.newTaskFieldName)" required>
        <UInput
            id="name"
            v-model="payload.name"
            :placeholder="t(Labels.newTaskPlaceholderName)"
            class="w-full"
            size="xl"
            autocomplete="name"
        />
      </UFormField>

      <div class="flex flex-col md:flex-row gap-6">

        <div class="w-full md:w-1/2">
          <UFormField name="email" :label="t(Labels.newTaskFieldEmail)" required>
            <UInput
                id="email"
                type="email"
                v-model="payload.email"
                :placeholder="t(Labels.newTaskPlaceholderEmail)"
                class="w-full"
                size="xl"
                autocomplete="email"
            />
          </UFormField>
        </div>

        <div class="w-full md:w-1/2">
          <UFormField name="phone" :label="t(Labels.newTaskFieldPhone)" required>
            <UInput
                id="phone"
                type="tel"
                v-model="payload.phone"
                :placeholder="t(Labels.newTaskPlaceholderPhone)"
                class="w-full"
                size="xl"
                autocomplete="tel"
            />
          </UFormField>
        </div>
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
import { reactive } from 'vue'
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { Labels } from '~/models/Locale'
import type { NewTaskStep3, NewTask } from '~/models/Tasks'
import {nameRegex, phoneRegex} from "~/models/validation";

const props = defineProps<{
  val: NewTask
}>()

const emit = defineEmits<{
  (e: 'next', payload: NewTaskStep3): void
  (e: 'back'): void
}>()

const { t } = useI18n()

// --- State ---
const payload = reactive<NewTaskStep3>({
  name: props.val.name ?? '',
  email: props.val.email ?? '',
  phone: props.val.phone ?? ''
})

// --- Zod Schema ---
const schema = z.object({
  name: z.string().min(1, t(Labels.formErrorRequired))
      .regex(nameRegex, t(Labels.formErrorFormat))
      .min(2, t(Labels.formErrorFormat)),
  email: z.email(t(Labels.formErrorEmail))
      .min(1, t(Labels.formErrorRequired)),

  phone: z.string()
      .min(1, t(Labels.formErrorRequired ))
      .regex(phoneRegex, t(Labels.formErrorPhone ))
      .min(7, t(Labels.formErrorPhone ))
})

// --- Submit Handler ---
function onSubmit(event: FormSubmitEvent<NewTaskStep3>) {
  emit('next', { ...payload })
}
</script>