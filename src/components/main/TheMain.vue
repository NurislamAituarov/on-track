<template>
  <main class="main flex flex-grow flex-col">
    <TheTimeline
      v-show="page === PAGE_TIMELINE"
      :activity-select-options="activitySelectOptions"
    />
    <TheActivities v-show="page === PAGE_ACTIVITIES" :activities="activities" />
    <TheProgress v-show="page === PAGE_PROGRESS" />
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
} from "../../lib/constants";
import { generateActivitySelectOptions } from "@/lib/helper";

defineProps<{ page: string }>();

const activities = ["Coding", "Reading", "Training"];
const activitySelectOptions = generateActivitySelectOptions(activities);
</script>