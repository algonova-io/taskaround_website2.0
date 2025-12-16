<template>
  <section class="hidden md:block py-8">
    <UContainer>
      <p class="text-xl mb-8 font-bold leading-snug">
        {{ t(Labels.homeTopCategoriesTitle) }}
      </p>

      <UCarousel
          v-slot="{ item }"
          :items="categories"
          :ui="{
            item: 'basis-full md:basis-1/2 lg:basis-1/3 snap-start',
            container: 'snap-x snap-mandatory scroll-smooth'
          }"
          class="rounded-lg overflow-hidden"
          arrows
      >
        <div class="p-2 w-full h-full">
          <category-card
              :title="item.title"
              :cta="item.cta"
              :description="item.description"
              :href="item.href"
              :image="item.image"
              class="h-full"
          />
        </div>
      </UCarousel>

    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { Labels } from "~/models/Locale";

const { t } = useI18n();

const categories = ref([
  {
    title: "Umzugshilfe",
    cta: "Mehr erfahren",
    description: "Benötigen Sie Hilfe beim Umzug? Unsere Helfer packen mit an, tragen Kisten und montieren Möbel.",
    href: "/Karlsruhe/umzugshilfe/",
    image: "/images/category-1.png"
  },
  {
    title: "Möbelmontage",
    cta: "Mehr erfahren",
    description: "Professionelle Montage für IKEA-Möbel, Küchen und Regale. Schnell, sauber und zuverlässig.",
    href: "/Karlsruhe/moebelmontage/",
    image: "/images/category-1.png"
  },
  {
    title: "Reinigung",
    cta: "Mehr erfahren",
    description: "Gründliche Reinigung für Privathaushalte und Büros. Fensterputzen, Endreinigung und mehr.",
    href: "/Karlsruhe/reinigung/",
    image: "/images/category-1.png"
  },
  {
    title: "Gartenarbeit",
    cta: "Mehr erfahren",
    description: "Rasenmähen, Hecke schneiden oder Laub rechen. Wir bringen Ihren Garten auf Vordermann.",
    href: "/Karlsruhe/gartenarbeit/",
    image: "/images/category-1.png"
  },
  {
    title: "Malerarbeiten",
    cta: "Mehr erfahren",
    description: "Frische Farbe für Ihre Wände. Unsere Experten streichen sauber und effizient.",
    href: "/Karlsruhe/maler/",
    image: "/images/category-1.png"
  }
])
</script>