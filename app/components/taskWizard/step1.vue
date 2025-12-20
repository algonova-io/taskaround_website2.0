<template>
  <div class="w-full">

    <h2 class="text-2xl font-bold mb-6">
      {{ t(Labels.newTaskStepTitle, {city}) }}
    </h2>

    <UForm
        :schema="schema"
        :state="payload"
        class="flex flex-col gap-6"
        @submit="onSubmit"
    >

      <UFormField name="what" :label="t(Labels.newTaskFieldWhich)" required>
        <UInput
            v-model="payload.what"
            :placeholder="t(Labels.newTaskPlaceholderWhich)"
            class="w-full"
            size="xl"
        />
      </UFormField>

      <UFormField name="brand" :label="t(Labels.newTaskFieldBrand)" required>
        <UInput
            v-model="payload.brand"
            :placeholder="t(Labels.newTaskPlaceholderBrand)"
            class="w-full"
            size="xl"
        />
      </UFormField>

      <UFormField name="hasManual" :label="t(Labels.newTaskFieldHasManual)" required>
        <div class="flex items-center gap-6 mt-2">
          <URadioGroup
              v-model="payload.hasManual"
              orientation="horizontal"
              :items="[
                { label: t(Labels.yes), value: 'yes' },
                { label: t(Labels.no), value: 'no' }
              ]"
              class="flex gap-4"
              :ui="{ legend: 'sr-only' }"
          />
        </div>
      </UFormField>

      <UFormField name="condition" :label="t(Labels.newTaskFieldCondition)" required>
        <div class="flex items-center gap-6 mt-2">
          <URadioGroup
              v-model="payload.condition"
              orientation="horizontal"
              :items="[
                { label: t(Labels.new), value: 'new' },
                { label: t(Labels.used), value: 'used' }
              ]"
              class="flex gap-4"
              :ui="{ legend: 'sr-only' }"
          />
        </div>
      </UFormField>

      <div class="mt-6 w-full flex justify-end">
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
import {reactive} from 'vue'
import {z} from 'zod'
import type {FormSubmitEvent} from '#ui/types'
import {Labels} from '~/models/Locale'
import type {NewTaskStep1, NewTask} from '~/models/Tasks'

const emit = defineEmits<{
  (e: 'next', payload: NewTaskStep1): void
}>()

const props = defineProps<{
  val: NewTask
}>()

const {t} = useI18n()
const route = useRoute()
const city = (route.params.city as string | undefined) || 'Karlsruhe'

// --- State ---
const payload = reactive<NewTaskStep1>({
  what: props.val.what ?? '',
  brand: props.val.brand ?? '',
  hasManual: props.val.hasManual ?? '',
  condition: props.val.condition ?? ''
})

// --- Validation Schema ---
const schema = z.object({
  what: z.string().min(1, t(Labels.formErrorRequired)),
  brand: z.string().min(1, t(Labels.formErrorRequired)),
  // Radio groups must have a selection
  hasManual: z.string().min(1, t(Labels.formErrorRequired)),
  condition: z.string().min(1, t(Labels.formErrorRequired))
})

// --- Submit Handler ---
function onSubmit(event: FormSubmitEvent<NewTaskStep1>) {
  emit('next', {...payload})
}
</script>