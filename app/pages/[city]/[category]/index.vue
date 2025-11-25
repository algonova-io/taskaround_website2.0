<template>
  <div>
    <CategoryHero
        :breadcrumb-category-key="Labels.categoryHeroBreadcrumbCleaning"
        :title-key="Labels.categoryFurnitureAssemblyTitle"
        :description-key="Labels.categoryFurnitureAssemblyDescription"
    />
    <ProfilesListFull/>
    <CategoryHelp/>
    <AppDownload
        :title="Labels.appDownloadTitleTasks"
        :description="Labels.appDownloadTextTasks"
    />
    <CategoryPricing/>
    <CategoryServicesType/>
  </div>
</template>
<script setup lang="ts">
import {Labels} from "~/types/Locale";
</script>