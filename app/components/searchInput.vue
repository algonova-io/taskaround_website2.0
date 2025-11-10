<template>
  <form
      class="w-full max-w-xl flex items-center rounded-full border border-black/20
           bg-white shadow-[0_2px_4px_rgba(0,0,0,0.15)] overflow-hidden"
      @submit.prevent="onSubmit"

  >
    <input
        v-model="query"
        class="flex-1 px-6 py-3 text-base text-gray-700 placeholder-gray-400
             focus:outline-none focus:ring-0"
        type="text"
        :placeholder="placeholderText"
        @input="onInput"

    >
    <button
        type="submit"
        class="bg-black text-white flex items-center justify-center w-12 h-12
             rounded-full mr-1 transition hover:bg-gray-900 active:scale-95"
    >
      <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-5 h-5"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
      </svg>
    </button>
  </form>
</template>

<script setup>
import {Labels} from "~/types/Locale.ts";
const {t} = useI18n()
const props = defineProps({
  placeholder: {
    type: String,
    default: ''
  }
})

const placeholderText = computed(
    () => props.placeholder || t(Labels.inputDefaultPlaceholder)
)
const emit = defineEmits(['update', 'submit'])
const query = ref('')
const onInput = () => emit('update', query.value)
const onSubmit = () => {
  if (!query.value().trim()) return
  emit('submit', query.value().trim())
  query.value('')
}
</script>
