<template>
  <section class="w-full py-16">
    <UContainer>

      <div class="flex items-center mb-8 justify-between items-start">
        <div>
          <h2 class="text-3xl font-extrabold text-black">
            {{ t(Labels.helpersTitle) }}
          </h2>

          <p class="text-lg text-black mt-2">
            {{ t(Labels.helpersSubtitle1) }}<br/>
            {{ t(Labels.helpersSubtitle2) }}
          </p>
        </div>
        <NuxtLink
            to="/taskers"
            class="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          {{ t(Labels.helpersViewAll) }}
          <UIcon name="i-tabler-arrow-right" class="w-5 h-5"/>
        </NuxtLink>
      </div>

      <UCarousel
          v-slot="{ item }"
          :items="taskers"
          :ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/3 snap-start' }"
          class="rounded-lg overflow-hidden"
          arrows
      >
        <div class="p-4 w-full">
          <ProfilesHeader
              v-bind="item"
              class="h-full"
              @book="onBook(item)"
          />
        </div>
      </UCarousel>

    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { Labels } from '~/models/Locale'
import type {Tasker} from "~/models/Tasker";

const { t } = useI18n()

// Expanded Mock Data
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
    name: "Max Weber",
    location: "Frankfurt",
    rating: 4.7,
    description: "Expert mover and heavy lifter. Can help with relocations and furniture transport.",
    avatar: "/images/category-1.png",
    buttonText: "Jetzt buchen"
  },
  {
    id: 5,
    name: "Julia Fischer",
    location: "Stuttgart",
    rating: 4.9,
    description: "Detail-oriented cleaner and organizer. Loves making spaces shine.",
    avatar: "/images/category-1.png",
    buttonText: "Jetzt buchen"
  },
  {
    id: 6,
    name: "Tim Wagner",
    location: "Köln",
    rating: 4.6,
    description: "Tech-savvy helper for smart home setups, TV mounting, and WiFi configuration.",
    avatar: "/images/category-1.png",
    buttonText: "Jetzt buchen"
  }
])

function onBook(tasker: Tasker) {
  console.log('Booking tasker:', tasker.name)
}
</script>