<template>
  <section class="w-full py-16">
    <UContainer class="  grid grid-cols-1 lg:grid-cols-2   items-start">

        <div class="hidden lg:flex ">
          <img
              src="/images/join-taskaround.png"
              alt="Join Taskaround"
              class="w-[416px] h-[497px] border border-lightGrey-300 rounded-[18px] object-cover"
          />
        </div>

        <div class="flex flex-col gap-6">
          <div>
            <h2 class="text-3xl font-extrabold text-black">
              {{ t(Labels.joinTitle) }}
            </h2>
            <p class="text-xl font-semibold text-black mt-2">
              {{ t(Labels.joinSubtitle) }}
            </p>
          </div>

          <p class="text-lg text-black leading-relaxed whitespace-pre-line">
            {{ t(Labels.joinDescription) }}
          </p>

          <NuxtLink
              to="/apply"
              class="flex items-center gap-3 text-black underline underline-offset-4 hover:text-blue-600"
          >
            <UIcon name="i-tabler-circle-arrow-right-filled" class="w-6 h-6" />
            <span class="text-lg font-medium">
            {{ t(Labels.joinCta) }}
          </span>
          </NuxtLink>
        </div>

    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { Labels } from '~/types/Locale'

const { t } = useI18n()
</script>
