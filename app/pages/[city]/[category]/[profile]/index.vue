<!-- pages/[city]/taskers/[id].vue -->
<script setup lang="ts">
import { Labels } from '~/types/Locale'
import type {TaskerReview} from "~/types/Tasker";

/* Replace with real API later */
const tasker = {
  name: 'Jonas K.',
  avatar: '/images/category-1.png',
  location: 'Durlach, Karlsruhe',
  rating: 4.5
}

const aboutText = `
My name is Jonas, i have experience in offering moving an furniture assembly
services for over 6 years. I offer moving and disassembly of furniture in the
Karlsruhe area, i have my own van and a couple of people work with me.
Get in touch with a quick message so we can arrange your moving.
`

const reviews: TaskerReview[] = [
  {
    id: 1,
    name: 'Peter L.',
    rating: 5,
    date: '9. Okt 2025',
    text: 'Jonas war vom ersten Moment an super engagiert und professionell – ...'
  },
  {
    id: 2,
    name: 'Michael J.',
    rating: 5,
    date: '9. Okt 2025',
    text: 'Jonas war vom ersten Moment an super engagiert und professionell – ...'
  },
  {
    id: 3,
    name: 'Clotilde M.',
    rating: 5,
    date: '9. Okt 2025',
    text: 'Jonas war vom ersten Moment an super engagiert und professionell – ...'
  }
]

const openBookingModal = () => {
  console.log('Booking modal here')
}
</script>

<template>
 <section>
   <ProfilesHero
       :tasker="tasker"
       :category-key="Labels.breadcrumbFurnitureAssembly"
       @book="openBookingModal"
   />

   <!-- ABOUT -->
   <ProfilesAbout :about="aboutText" />

   <!-- REVIEWS -->
   <ProfilesReviewList :reviews="reviews" />
 </section>
</template>
