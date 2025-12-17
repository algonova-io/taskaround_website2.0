<template>
  <div class="w-full">

    <h2 class="text-2xl font-bold mb-6">
      {{ t(Labels.newTaskStepTitle, { city }) }}
    </h2>

    <form @submit.prevent="onNext" class="flex flex-col gap-6">

      <div>
        <label for="what" class="block mb-2 font-semibold">
          {{ t(Labels.newTaskFieldWhich) }}
        </label>
        <UInput
            id="what"
            name="what"
            v-model="payload.what"
            :placeholder="t(Labels.newTaskPlaceholderWhich)"
            class="w-full"
            size="xl"
        />
      </div>

      <div>
        <label for="model" class="block mb-2 font-semibold">
          {{ t(Labels.newTaskFieldBrand) }}
        </label>
        <UInput
            id="model"
            name="model"
            v-model="payload.brand"
            :placeholder="t(Labels.newTaskPlaceholderBrand)"
            class="w-full"
            size="xl"
        />
      </div>

      <div class="flex items-center justify-between">
        <div>
          <label class="font-semibold mb-2">
            {{ t(Labels.newTaskFieldHasManual) }}
          </label>
        </div>

        <div class="flex items-center gap-6">
          <URadioGroup
              name="hasManual"
              orientation="horizontal"
              v-model="payload.hasManual"
              :items="[
                { label: t(Labels.yes), value: 'yes' },
                { label: t(Labels.no), value: 'no' }
              ]"
              class="flex gap-4"
              :ui="{ legend: 'sr-only' }"
          />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div>
          <label class="font-semibold mb-2">
            {{ t(Labels.newTaskFieldCondition) }}
          </label>
        </div>

        <div class="flex items-center gap-6">
          <URadioGroup
              name="condition"
              orientation="horizontal"
              v-model="payload.condition"
              :items="[
                { label: t(Labels.new), value: 'new' },
                { label: t(Labels.used), value: 'used' }
              ]"
              class="flex gap-4"
              :ui="{ legend: 'sr-only' }"
          />
        </div>
      </div>

      <div class="mt-6 w-full flex justify-end">
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
import type { NewTaskStep1, NewTask } from '~/models/Tasks'
import { reactive, computed } from 'vue'

const emit = defineEmits<{
  (e: 'next', payload: NewTaskStep1): void
}>()

const props = defineProps<{
  val: NewTask
}>()

const { t } = useI18n()
const route = useRoute()
const city = (route.params.city as string | undefined) || 'Karlsruhe'

const payload = reactive<NewTaskStep1>({
  what: props.val.what ?? '',
  brand: props.val.brand ?? '',
  hasManual: props.val.hasManual ?? '',
  condition: props.val.condition ?? ''
})

const isValid = computed(() => {
  return (
      (payload.what?.trim().length ?? 0) > 0 &&
      (payload.brand?.trim().length ?? 0) > 0 &&
      payload.condition !== '' &&
      payload.hasManual !== ''
  )
})

function onNext() {
  if (!isValid.value) return
  emit('next', { ...payload })
}
</script>