<template>
  <div class="sticky top-0 z-50 bg-gray-100">
    <UHeader
        class="bg-white shadow-sm"

    >
      <template #left>
        <NuxtLink to="/" class="flex items-center gap-2">
          <img src="/images/logo.svg" alt="TaskAround" class="h-6 w-auto" />
          <span class="sr-only">TaskAround</span>
        </NuxtLink>
      </template>

      <template #right>
        <nav class="hidden lg:flex items-center gap-8 text-sm font-medium">
          <UButton v-for="item in items" :key="item.label" :to="item.to" color="neutral" variant="solid" size="sm" class="rounded-full px-4">
            {{ item.label }}
          </UButton>

        </nav>

      </template>
      <template #body>
        <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
      </template>
    </UHeader>

  </div>
</template>

<script setup lang="ts">
import {Labels} from "~/types/Locale";
import type {NavigationMenuItem} from "#ui/components/NavigationMenu.vue";

const {t} = useI18n()
const route = useRoute()
const items = computed<NavigationMenuItem[]>(() => [
  {label: t(Labels.home), to: '/', active: route.path === '/'},
  {label: t(Labels.login), to: '/pro/me/auth', active: route.path.startsWith('/pro/me/auth')},
  {label: t(Labels.becomeTasker), to: '/pro/me/signup', active: route.path.startsWith('/pro/me/signup')},
])
</script>
