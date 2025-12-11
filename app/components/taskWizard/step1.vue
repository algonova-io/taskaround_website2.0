<template>
  <div class="w-full">

    <h2 class="title-large mb-6">
      {{ t(Labels.newTaskStepTitle, {city}) }}
    </h2>

    <form @submit.prevent="onNext" class="flex flex-col gap-6">

      <div>
        <label for="what" class="block mb-2 font-semibold">{{ t(Labels.newTaskFieldWhich) }}</label>
        <UInput
            id="what"
            name="what"
            v-model="payload.what"
            :placeholder="t(Labels.newTaskPlaceholderWhich)"
            class="w-full rounded-[18px] py-6 px-6 text-lg"
        />
      </div>

      <div>
        <label for="model" class="block mb-2 font-semibold">{{ t(Labels.newTaskFieldBrand) }}</label>
        <UInput
            id="model"
            name="model"
            v-model="payload.brand"
            :placeholder="t(Labels.newTaskPlaceholderBrand)"
            class="w-full rounded-[18px] py-6 px-6 text-lg"
        />
      </div>

      <div class="flex items-center justify-between">
        <div>
          <label for="hasManual"  class="font-semibold mb-2">
            {{ t(Labels.newTaskFieldHasManual) }}
          </label>
        </div>

        <div class="flex items-center gap-6">
          <URadioGroup name="hasManual" id="hasManual" orientation="horizontal"
                       v-model="payload.hasManual" :items="[
        { label: $t(Labels.yes), value: 'yes' },
        { label: $t(Labels.no), value: 'no' }
      ]" class="flex gap-2"/>

        </div>
      </div>

      <!-- New or used -->
      <div class="flex items-center justify-between">
        <div>
          <label for="condition" class="font-semibold mb-2">{{ t(Labels.newTaskFieldCondition) }}</label>
        </div>

        <div class="flex items-center gap-6">
          <URadioGroup name="condition" id="condition" orientation="horizontal"
                       v-model="payload.condition" :items="[
              { label: $t(Labels.new), value: 'new' },
              { label: $t(Labels.used), value: 'used' }]
" class="flex gap-2"/>
        </div>
      </div>

      <!-- Next button -->
      <div class="mt-6 w-full justify-end">
        <UButton
            type="submit"
            color="blue"
            class="px-6 py-3 rounded-[18px]"
        >
          {{ t(Labels.next) }}
        </UButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {Labels} from '~/models/Locale'
import type {NewTaskStep1, NewTask} from '~/models/Tasks'

/**
 * Emits:
 *  - next (payload: form data)
 */
const emit = defineEmits<{
  (e: 'next', payload: Record<string, any>): void
}>()

const props = defineProps<{
  val: NewTask
}>()

const {t} = useI18n()
const route = useRoute()
const city = (route.params.city as string | undefined) || 'Karlsruhe'

const payload = reactive<NewTaskStep1>({
  what: props.val.what,
  brand: props.val.brand,
  hasManual: props.val.hasManual,
  condition: props.val.condition
})

const isValid = computed(() => {
  return payload.what?.trim().length > 0 &&
      payload.brand?.trim().length > 0 &&
      payload.condition !== '' &&
      payload.hasManual !== ''
})

function onNext() {
  if (!isValid.value) return
  emit('next', payload)
}
</script>
