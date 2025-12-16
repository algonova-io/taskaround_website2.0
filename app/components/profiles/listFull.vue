<template>
  <UContainer class="mb-10">
    <h2 class="py-10 title-medium text-black">
      {{ t(Labels.categoryFurnitureAssemblyDiscover, { city }) }}
    </h2>

    <UCarousel
        v-slot="{ item }"
        :items="taskers"
        :ui="{ item: 'basis-full sm:basis-1/2 lg:basis-1/3 snap-start' }"
        class="rounded-lg overflow-hidden"
        arrows
    >
      <div class="p-2 w-full h-full">
        <ProfilesCard
            v-bind="item"
            class="h-full"
            @book="onBook(item)"
        />
      </div>
    </UCarousel>

  </UContainer>
</template>

<script setup lang="ts">
import { Labels } from '~/models/Locale'
import { computed, ref } from 'vue'
import type {Tasker} from "~/models/Tasker";

const { t } = useI18n()
const route = useRoute()
const city = computed(() => route.params.city || 'karlsruhe')

// Expanded list for testing the slider
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
  {
    id: 4,
    name: "Maximilian Wolf",
    location: "Frankfurt",
    rating: 4.7,
    description: "Expert in furniture assembly, moving help, and heavy lifting tasks.",
    avatar: "/images/category-1.png",
    buttonText: "Jetzt buchen"
  },
  {
    id: 5,
    name: "Lena Fischer",
    location: "Stuttgart",
    rating: 4.9,
    description: "Detail-oriented cleaner who loves organizing spaces and decluttering.",
    avatar: "/images/category-1.png",
    buttonText: "Jetzt buchen"
  }
])

function onBook(tasker: Tasker) {
  console.log(tasker)
}
</script>