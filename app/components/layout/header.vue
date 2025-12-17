<template>
  <section class="sticky top-0 z-50 bg-gray-100">
    <UHeader class="bg-white shadow-sm">

      <template #left>
        <NuxtLink to="/" class="flex items-center gap-2">
          <img src="/images/logo.svg" alt="TaskAround" class="h-6 w-auto"/>
          <span class="sr-only">TaskAround</span>
        </NuxtLink>
      </template>

      <template #right>
        <nav class="hidden lg:flex items-center gap-4 text-sm font-medium">
          <UButton
              v-for="item in items"
              :key="item.label"
              :to="item.to"
              color="black"
              variant="ghost"
              size="lg"
              class="font-bold px-4"
          >
            {{ item.label }}
          </UButton>

          <div class="h-6 w-px bg-gray-200 mx-2"/>

          <UDropdownMenu
              :items="languageOptions"
              :content="{
      align: 'center',
      side: 'bottom',
      sideOffset: 8
    }"
              :ui="{
      content: 'w-48'
    }"
          >
            <UButton
                color="neutral"
                variant="ghost"
                icon="i-heroicons-globe-alt"
                :label="currentLocale?.name"
                trailing-icon="i-heroicons-chevron-down-20-solid"
            />
          </UDropdownMenu>
        </nav>
      </template>

      <template #body>
        <div class="flex flex-col h-full py-4">

          <UNavigationMenu
              :items="items"
              orientation="vertical"
              class="-mx-2.5"
              :ui="{
               link: 'py-6 px-4 text-xl font-bold w-full flex items-center justify-between',

            }"
          />

          <div class="mt-8 border-t border-gray-100 pt-6 px-4">
            <p class="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">
              Language
            </p>
            <div class="flex flex-col gap-2">
              <UButton
                  v-for="l in availableLocales"
                  :key="l.code"
                  :color="locale === l.code ? 'black' : 'neutral'"
                  :variant="'ghost'"
                  block
                  size="xl"
                  class="justify-center"
                  @click="setLocale(l.code)"
              >
                {{ l.name }}
              </UButton>
            </div>
          </div>

        </div>
      </template>
    </UHeader>
  </section>
</template>

<script setup lang="ts">
import {Labels} from "~/models/Locale";
import type {NavigationMenuItem} from "#ui/components/NavigationMenu.vue";

const {t, locale, locales, setLocale} = useI18n()
const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: t(Labels.postTask),
    to: '/new-task',
    active: route.path.includes('/new-task')
  },
  {
    label: t(Labels.becomeTasker),

    to: '/become-tasker',
    active: route.path.includes('/become-tasker')
  },
])


const availableLocales = computed(() => {
  return (locales.value).map(l => ({
    code: l.code,
    name: l.name || l.code.toUpperCase()
  }))
})

const currentLocale = computed(() => {
  return availableLocales.value.find(l => l.code === locale.value)
})

const languageOptions = computed(() => [
  availableLocales.value.map(l => ({
    label: l.name,
    icon: 'i-heroicons-check',
    ui: {
      itemLeadingIcon: locale.value === l.code ? '' : 'opacity-0'
    },
    onSelect: () => {
      setLocale(l.code)
    }
  }))
])
</script>