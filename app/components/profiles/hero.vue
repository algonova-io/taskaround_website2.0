<template>
  <section class="w-full bg-primary-500 py-6 md:py-10">
    <UContainer class="  flex flex-col gap-6">
      <!-- Breadcrumb -->
      <p class="text-sm text-text">
        {{ t(Labels.breadcrumbHome) }}
        /
        {{ t(categoryKey) }}
        /
        {{ currentCity }}
        /
        {{ t(Labels.breadcrumbTaskers) }}
        /
        {{ tasker.name }}
      </p>

      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <!-- Left: avatar + info -->
        <div class="flex items-center gap-6">
          <img
              :src="tasker.avatar"
              :alt="tasker.name"
              class="w-[120px] h-[120px] rounded-full object-cover"
          />

          <div class="flex flex-col gap-2">
            <h1 class="text-text">
              {{ tasker.name }}
            </h1>

            <p class="text-lg text-text">
              {{ tasker.location }}
            </p>

            <div class="flex items-center gap-2 text-text">
              <span>{{ ratingLabel }}</span>
              <div class="flex gap-1">
                <UIcon
                    v-for="i in 5"
                    :key="i"
                    name="i-tabler-star-filled"
                    class="w-4 h-4 text-[#E3A623]"
                />
              </div>
            </div>
          </div>
        </div>

        <UButton
            color="green"
            size="lg"
            class="rounded-[18px] px-10 flex items-center gap-2 self-stretch md:self-auto justify-center"
            @click="$emit('book')"
        >
          <span>{{ t(Labels.bookNow) }}</span>
          <UIcon name="i-tabler-message-circle-2" class="w-5 h-5" />
        </UButton>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from '#imports'
import { useI18n } from 'vue-i18n'
import { Labels } from '~/models/Locale'

const props = defineProps<{
  tasker: {
    name: string
    avatar: string
    location: string
    rating: number
  }
  categoryKey: Labels // e.g. Labels.breadcrumbFurnitureAssembly
}>()

defineEmits<{
  (e: 'book'): void
}>()

const { t } = useI18n()
const route = useRoute()

const currentCity = computed(
    () => (route.params.city as string | undefined) || 'Karlsruhe'
)

const ratingLabel = computed(() =>
    props.tasker.rating.toString().replace('.', ',')
)
</script>
