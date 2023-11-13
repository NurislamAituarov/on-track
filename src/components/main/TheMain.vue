<template>
  <main class="main flex flex-grow flex-col">
    <KeepAlive>
      <div>
        <TheTimeline
          v-if="page === PAGE_TIMELINE"
          :activity-select-options="activitySelectOptions"
          :timelineItems="timelineItems"
          :page="page"
        />
        <TheActivities
          v-if="page === PAGE_ACTIVITIES"
          :activities="activities"
        />
        <TheProgress v-if="page === PAGE_PROGRESS" />
      </div>
    </KeepAlive>
  </main>
</template>

<script lang="ts" setup>
import { provide, watch } from "vue";
import TheActivities from "@/pages/TheActivities.vue";
import TheProgress from "@/pages/TheProgress.vue";
import TheTimeline from "@/pages/TheTimeline.vue";
import {
  PAGE_TIMELINE,
  PAGE_ACTIVITIES,
  PAGE_PROGRESS,
} from "../../lib/constants";
import { timelineItems, selectActivity } from "@/module/timeline-items";
import {
  activities,
  activitySelectOptions,
  createActivityItem,
  deleteActivityItem,
  updateTimeActivity,
} from "@/module/activities";

defineProps<{ page: string }>();

watch(timelineItems, () => {
  // console.log(timelineItems);
});

// Provide
provide("activities", activities);
provide("activity-select-options", activitySelectOptions);
provide("select-activity", selectActivity);
provide("update-time-activity", updateTimeActivity);
provide("create-activity-item", createActivityItem);
provide("delete-activity-item", deleteActivityItem);
</script>