<template>
  <div>
    <search-input
        placeholder="Suchen Sie nach einer Dienstleistung"
        class="mb-4"

    />
    <category-slider>
      <category-card v-for="i in 10" :key="i"

                title="Umzugshilfe"
                cta="Mehr erfahren"
                description="Benötigen Sie Preisinformationen zu einem Auftrag in dieser Dienstleistung/Kategorie? Um Ihnen eine Vorstellung von den Leistungen und den durchschnittlichen Kosten unserer Handwerker zu geben, haben wir eine..."
                href="/Karlsruhe/umzugshilfe/"
                image="/images/category-1.png"
                class="snap-start shrink-0 min-w-[85%] sm:min-w-[45%] lg:min-w-[30%]"

      />
    </category-slider>
  </div>
</template>
<script setup lang="ts">
</script>