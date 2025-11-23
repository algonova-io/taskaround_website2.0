<template>
  <div>
    <search-input
        placeholder="Suchen Sie nach einer Dienstleistung"
        class="mb-4"

    />
    <category-slider>
      <category-card
          v-for="i in 10" :key="i"
          title="Umzugshilfe"
          cta="Mehr erfahren"
          description="Benötigen Sie Preisinformationen zu einem Auftrag in dieser Dienstleistung/Kategorie? Um Ihnen eine Vorstellung von den Leistungen und den durchschnittlichen Kosten unserer Handwerker zu geben, haben wir eine..."
          href="/Karlsruhe/umzugshilfe/"
          image="/images/category-1.png"
          class="snap-start shrink-0 min-w-[85%] sm:min-w-[45%] lg:min-w-[30%]"

      />
    </category-slider>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProfileCard
          v-for="tasker in taskers"
          :key="tasker.id"
          v-bind="tasker"
          @book="onBook(tasker)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
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
    name: "Tim Wagner",
    location: "Köln",
    rating: 4.7,
    description: "Gardening and outdoor maintenance expert with fast and clean execution.",
    avatar: "/images/category-1.png",
    buttonText: "Jetzt buchen"
  },
  {
    id: 5,
    name: "Emily Hoffmann",
    location: "Frankfurt",
    rating: 4.9,
    description: "Pet sitter and dog walker with a passion for animals and safety.",
    avatar: "/images/category-1.png",
    buttonText: "Jetzt buchen"
  },
  {
    id: 6,
    name: "Jonas Fischer",
    location: "Stuttgart",
    rating: 4.8,
    description: "Reliable moving helper with experience in lifting, packing and transport.",
    avatar: "/images/category-1.png",
    buttonText: "Jetzt buchen"
  }
])

function onBook(tasker) {
  console.log(tasker)
}
</script>