<template>
  <section class="hidden md:block">
    <UContainer>
      <p class="text-lg mb-8 font-bold text-xl leading-snug"> {{t(Labels.homeTopCategoriesTitle)}}</p>
      <div
          class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1   gap-2 snap-x snap-mandatory pb-2 mt-3 mb-3 "
      >
        <category-card
            v-for="i in 3" :key="i"
            title="Umzugshilfe"
            cta="Mehr erfahren"
            description="Benötigen Sie Preisinformationen zu einem Auftrag in dieser Dienstleistung/Kategorie? Um Ihnen eine Vorstellung von den Leistungen und den durchschnittlichen Kosten unserer Handwerker zu geben, haben wir eine..."
            href="/Karlsruhe/umzugshilfe/"
            image="/images/category-1.png"
            class="snap-start shrink-0 min-w-[85%] sm:min-w-[45%] lg:min-w-[30%]"
        />    </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
  import {Labels} from "~/models/Locale";

  const {t} = useI18n();
</script>