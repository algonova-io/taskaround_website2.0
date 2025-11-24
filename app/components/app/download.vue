<template>
  <section class="w-full bg-surface-50 py-16">
    <div
        class="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
    >
      <div class="flex flex-col gap-6">
        <div>
          <h2 class="text-3xl font-extrabold text-text">
            {{ title }}
          </h2>

          <p class="mt-3 text-lg text-text leading-relaxed whitespace-pre-line">
            {{ text }}
          </p>

          <p class="mt-4 text-lg text-text">
            {{ t(Labels.appDownloadCtaLine) }}
          </p>
        </div>

        <!-- Store badges -->
        <div class="flex flex-wrap items-center gap-4 mt-2">
          <NuxtLink to="https://play.google.com" target="_blank">
            <img
                src="/images/play-store.svg"
                :alt="t(Labels.appDownloadGoogleAlt)"
                class="h-12 w-auto"
            />
          </NuxtLink>

          <NuxtLink to="https://www.apple.com/app-store/" target="_blank">
            <img
                src="/images/app-store.svg"
                :alt="t(Labels.appDownloadAppleAlt)"
                class="h-12 w-auto"
            />
          </NuxtLink>
        </div>
      </div>

      <div class="flex justify-center lg:justify-end">
        <img
            src="/images/app.svg"
        alt="Taskaround app preview"
        class="w-[360px] lg:w-[420px] h-auto object-contain"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Labels } from '~/types/Locale'

const props = defineProps<{
  titleKey?: Labels
  textKey?: Labels
}>()

const { t } = useI18n()

const title = computed(() => t(props.titleKey ?? Labels.appDownloadTitle))
const text = computed(() => t(props.textKey ?? Labels.appDownloadText))
</script>
