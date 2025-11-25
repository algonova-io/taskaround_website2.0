<template>
  <footer class="w-full bg-green text-white py-16">
    <UContainer class=" md:flex items-start justify-between">

      <div class="flex-col flex gap-10">

        <div>
          <p class="font-bold text-lg mb-2">
            {{ t(Labels.footerPopularServices) }}
          </p>
          <ul class="flex flex-col gap-2">
            <li v-for="link in popularServices" :key="link.label">
              <NuxtLink :to="link.href" class="underline hover:text-surface-200">
                {{ t(link.label) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <p class="font-bold text-lg mb-2">
            {{ t(Labels.footerPopularRegions) }}
          </p>
          <ul class="grid grid-cols-2 gap-2">
            <li v-for="region in popularRegions" :key="region.label">
              <NuxtLink :to="region.href" class="underline hover:text-surface-200">
                {{ t(region.label) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <p class="font-bold text-lg mb-2">
            {{ t(Labels.footerAbout) }}
          </p>
          <ul class="grid grid-cols-5 gap-1">
            <li v-for="link in aboutLinks" :key="link.label">
              <NuxtLink :to="link.href" class="underline hover:text-surface-200">
                {{ t(link.label) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

      </div>

      <div class="flex flex-col  items-start justify-start mt-4 md:mt-0   gap-6">
        <img
            src="/images/task-around-logo-white.svg"
            alt="Taskaround Logo"
            class="w-40 h-auto"
        />

        <div class="text-white text-sm leading-relaxed">
          <p>Taskaround GmbH</p>
          <p>Bismarckstraße 00, 76133 Karlsruhe</p>
          <p>E-Mail: team@taskaround.io</p>
          <p>© 2025 Taskaround. {{ t(Labels.footerAllRights) }}</p>
        </div>

        <div class="flex gap-4 mt-2">
          <NuxtLink to="https://play.google.com" target="_blank">
            <img
                src="/images/play-store.svg"
                alt="Google Play"
                class="h-12 w-auto"
            />
          </NuxtLink>

          <NuxtLink to="https://apple.com/app-store" target="_blank">
            <img
                src="/images/app-store.svg"
                alt="App Store"
                class="h-12 w-auto"
            />
          </NuxtLink>
        </div>
      </div>

    </UContainer>
  </footer>
</template>

<script setup lang="ts">
import { Labels } from "~/types/Locale";

const { t } = useI18n();

const popularServices = [
  { label: Labels.footerServiceFurnitureAssembly, href: "/services/furniture" },
  { label: Labels.footerServiceIkea, href: "/services/ikea" },
  { label: Labels.footerServiceShelves, href: "/services/shelves" }
];

const popularRegions = [
  { label: Labels.footerRegionKarlsruhe, href: "/karlsruhe" },
  { label: Labels.footerRegionEttlingen, href: "/ettlingen" },
  { label: Labels.footerRegionDurlach, href: "/durlach" },
  { label: Labels.footerRegionRheinstetten, href: "/rheinstetten" },
  { label: Labels.footerRegionBruchsal, href: "/bruchsal" },
  { label: Labels.footerRegionPforzheim, href: "/pforzheim" }
];

const aboutLinks = [
  { label: Labels.footerAboutUs, href: "/about" },
  { label: Labels.footerContact, href: "/contact" },
  { label: Labels.footerPartner, href: "/partner" },
  { label: Labels.footerFaq, href: "/faq" },
  { label: Labels.footerPrivacy, href: "/privacy" },
  { label: Labels.footerTerms, href: "/terms" }
];
</script>
