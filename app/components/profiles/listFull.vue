<template>
  <UContainer class="mb-10" >
    <h2 class="py-10 title-medium text-black">
      {{ t(Labels.categoryFurnitureAssemblyDiscover, { city }) }}
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProfilesCard
          v-for="tasker in taskers"
          :key="tasker.id"
          v-bind="tasker"
          @book="onBook(tasker)"
      />
    </div>


  </UContainer>
</template>
<script setup lang="ts">
import { Labels } from '~/types/Locale'
const { t } = useI18n()
const route = useRoute()
const city = computed(() => route.params.city || 'karlsruhe')
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