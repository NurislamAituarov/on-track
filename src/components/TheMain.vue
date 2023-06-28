<template>
  <main class="main flex flex-grow flex-col p-4">
    <TheActivities v-show="page === PAGE_ACTIVITIES" />
    <TheProgress v-show="page === PAGE_PROGRESS" />
    <TheTimeline v-show="page === PAGE_TIMELINE" />
  </main>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

import TheActivities from "@/pages/TheActivities.vue";
import TheProgress from "@/pages/TheProgress.vue";
import TheTimeline from "@/pages/TheTimeline.vue";

import {
  PAGE_TIMELINE,
  PAGE_ACTIVITIES,
  PAGE_PROGRESS,
} from "../lib/constants";

const page = ref(window.location.hash.slice(1));
const route = useRoute();

watch(
  () => route.params,
  async () => {
    page.value = window.location.hash.slice(1);
  }
);
</script>