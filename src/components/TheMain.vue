<template>
  <main class="main flex flex-grow flex-col p-4">
    <TheActivities v-show="page === PAGE_ACTIVITIES" />
    <TheProgress v-show="page === PAGE_PROGRESS" />
    <TheTimeline v-show="page === PAGE_TIMELINE" />
  </main>
</template>

<script lang="ts" setup>
import TheActivities from "@/pages/TheActivities.vue";
import TheProgress from "@/pages/TheProgress.vue";
import TheTimeline from "@/pages/TheTimeline.vue";

import {
  PAGE_TIMELINE,
  PAGE_ACTIVITIES,
  PAGE_PROGRESS,
} from "../lib/constants";

defineProps<{ page: string }>();
</script>