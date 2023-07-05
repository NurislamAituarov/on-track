<template>
  <main class="main flex flex-grow flex-col">
    <TheTimeline
      v-show="page === PAGE_TIMELINE"
      :activity-select-options="activitySelectOptions"
    />
    <TheActivities
      v-show="page === PAGE_ACTIVITIES"
      :activities="activities"
      @delete-activity-item="deleteActivityItem"
      @add-activity-item="addActivityItem"
    />
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
import { reactive, watch } from "vue";

defineProps<{ page: string }>();

const activities = reactive(["Coding", "Reading", "Training"]);
let activitySelectOptions = reactive(generateActivitySelectOptions(activities));

watch(activities, (value) => {
  activitySelectOptions = generateActivitySelectOptions(value);
});

function deleteActivityItem(value: string) {
  console.log(value);
  activities.splice(activities.indexOf(value), 1);
}

function addActivityItem(value: string) {
  activities.push(value);
}
</script>