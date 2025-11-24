<template>
  <section class="w-full py-16">
    <div class="flex items-center justify-between items-start">
      <div>
        <h2 class="text-3xl font-extrabold text-text">
          {{ t(Labels.helpersTitle) }}
        </h2>

        <p class="text-lg text-text mt-2">
          {{ t(Labels.helpersSubtitle1) }}<br />
          {{ t(Labels.helpersSubtitle2) }}
        </p>
      </div>
      <NuxtLink
          to="/karlsruhe/taskers"
          class="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
      >
        {{ t(Labels.helpersViewAll) }}
        <UIcon name="i-tabler-arrow-right" class="w-5 h-5" />
      </NuxtLink>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-4">
      <ProfilesHeader
          v-for="(tasker, i) in taskers"
          :key="tasker.id"
          :class="i !== 1 ? 'hidden md:flex ' : 'flex'"
          v-bind="tasker"
          @book="onBook(tasker)"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
import { Labels } from '~/types/Locale'
const { t } = useI18n()

const taskers = ref([
  {
    id: 1,
    name: "Anna Müller",
    location: "Berlin",
    rating: 4.9,
    description: "Reliable household helper with 5+ years of experience in cleaning and organization.",
    avatar: "/images/category-1.png",
    buttonText: "Jetzt buchen"
  },
  {
    id: 2,
    name: "Lukas Schneider",
    location: "Hamburg",
    rating: 4.8,
    description: "Professional handyman specializing in small repairs, furniture assembly and installations.",
    avatar: "/images/category-1.png",
    buttonText: "Jetzt buchen"
  },
  {
    id: 3,
    name: "Sofia Becker",
    location: "München",
    rating: 5.0,
    description: "Experienced babysitter and tutor offering flexible support for families.",
    avatar: "/images/category-1.png",
    buttonText: "Jetzt buchen"
  },
])

function onBook(tasker: any) {
  console.log(tasker)
}
</script>