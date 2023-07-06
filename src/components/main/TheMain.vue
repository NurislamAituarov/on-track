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
import { reactive, watch } from "vue";

import TheActivities from "@/pages/TheActivities.vue";
import TheProgress from "@/pages/TheProgress.vue";
import TheTimeline from "@/pages/TheTimeline.vue";

import {
  PAGE_TIMELINE,
  PAGE_ACTIVITIES,
  PAGE_PROGRESS,
} from "../../lib/constants";
import {
  generateActivities,
  generateActivitySelectOptions,
  id,
} from "@/lib/helper";

defineProps<{ page: string }>();

let activities = reactive(generateActivities());
let activitySelectOptions = reactive(generateActivitySelectOptions(activities));

watch(activities, (value) => {
  activitySelectOptions = generateActivitySelectOptions(value);
});

function deleteActivityItem(id: string) {
  const activityItemId = activities.findIndex((el) => el.id === id);
  activities.splice(activityItemId, 1);
}

function addActivityItem(name: string) {
  activities.push({
    id: id(),
    name,
    secondsToComplete: 0,
  });
}
</script>