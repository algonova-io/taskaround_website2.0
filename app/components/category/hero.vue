<template>
  <section class="w-full bg-primary-500 py-10 md:py-14">
    <UContainer >
      <div class="flex flex-col ">
        <p class="text-sm font-semibold text-black mb-4">
          {{ t(Labels.categoryHeroBreadcrumbServices) }}
          /
          {{ t(breadcrumbCategoryKey) }}
          /
          {{ cityLabel }}
        </p>

        <h1 class="mb-4 text-black">
          {{ t(titleKey, { city: cityLabel }) }}
        </h1>

        <p class="text-black max-w-3xl leading-relaxed">
          {{ t(descriptionKey, { city: cityLabel }) }}
        </p>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from '#imports'
import { useI18n } from 'vue-i18n'
import { Labels } from '~/types/Locale'

const props = defineProps<{
  breadcrumbCategoryKey: Labels
  titleKey: Labels
  descriptionKey: Labels
}>()

const { t } = useI18n()
const route = useRoute()

const cityParam = computed(
    () => (route.params.city as string | undefined) || 'karlsruhe'
)

const cityLabel = computed(() => {
  const map: Record<string, Labels> = {
    karlsruhe: Labels.cityKarlsruhe,
  }
  const key = map[cityParam.value]
  return key ? t(key) : cityParam.value
})
</script>
