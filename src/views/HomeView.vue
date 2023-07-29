<template>
  <div class="wrapper flex flex-col min-h-screen">
    <TheHeader
      @go-to-timeline="goTo('timeline')"
      @go-to-progress="goTo('progress')"
    />
    <TheMain :page="currentPage" />
    <TheNav
      @open-page="goTo"
      :nav-items="navItems"
      :current-page="currentPage"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import TheMain from "@/components/main/TheMain.vue";
import TheNav from "@/components/nav/TheNav.vue";
import TheHeader from "@/components/header/TheHeader.vue";

import { normalizeHash } from "@/lib/helper";
import { PAGE_ACTIVITIES, navItems } from "@/lib/constants";
//////////////////////////////////////////////////////////////////

// взять из url имя странаицы
const currentPage = ref(normalizeHash(navItems));
const wrapperRef = ref();

// Открыть новую страницу
function goTo(page: string) {
  currentPage.value = page;

  if (page === PAGE_ACTIVITIES) {
    document.body.scrollIntoView();
  }
}
</script>


<style scoped>
</style>