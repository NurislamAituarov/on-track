<template>
  <div class="wrapper flex flex-col min-h-screen">
    <TheHeader />
    <TheMain />
    <TheNav
      @open-page="openPage"
      :nav-items="navItems"
      :current-page="currentPage"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import TheMain from "@/components/TheMain.vue";
import TheNav from "@/components/TheNav.vue";
import TheHeader from "@/components/TheHeader.vue";

import {
  ClockIcon,
  ListBulletIcon,
  ChartBarIcon,
} from "@heroicons/vue/24/outline";

import {
  PAGE_TIMELINE,
  PAGE_ACTIVITIES,
  PAGE_PROGRESS,
} from "../lib/constants";

import { INavItems } from "@/types";
//////////////////////////////////////////////////////////////////

const navItems: INavItems[] = [
  { title: PAGE_TIMELINE, id: 1, icon: ClockIcon },
  { title: PAGE_ACTIVITIES, id: 2, icon: ListBulletIcon },
  { title: PAGE_PROGRESS, id: 3, icon: ChartBarIcon },
];

// взять из url имя странаицы
const currentPage = ref(normalizeHash());
function normalizeHash(): string {
  const hash = window.location.hash.slice(1);
  const titleNavItems = navItems.map((el) => el.title);

  if (titleNavItems.includes(hash)) return window.location.hash.substring(1);
  window.location.hash = PAGE_TIMELINE;

  return PAGE_TIMELINE;
}
// Открыть новую страницу
function openPage(page: string) {
  currentPage.value = page;
}
</script>
