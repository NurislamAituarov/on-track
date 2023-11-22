<template>
  <main class="main flex flex-grow flex-col">
    <KeepAlive>
      <component :is="routes[page]" />
    </KeepAlive>
  </main>
</template>

<script lang="ts" setup>
import { inject, provide } from "vue";
import TheActivities from "@/pages/TheActivities.vue";
import TheProgress from "@/pages/TheProgress.vue";
import TheTimeline from "@/pages/TheTimeline.vue";
import {
  PAGE_TIMELINE,
  PAGE_ACTIVITIES,
  PAGE_PROGRESS,
} from "../../lib/constants";

const routes = {
  [PAGE_TIMELINE]: TheTimeline,
  [PAGE_ACTIVITIES]: TheActivities,
  [PAGE_PROGRESS]: TheProgress,
};

const page = inject("current-page") as () => string;
</script>