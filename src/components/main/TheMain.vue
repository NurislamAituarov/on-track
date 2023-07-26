<template>
  <main class="main flex flex-grow flex-col">
    <TheTimeline
      v-show="page === PAGE_TIMELINE"
      :activity-select-options="activitySelectOptions"
      :activities="activities"
      :timelineItems="timelineItems"
      :page="page"
      @select-activity="selectActivity"
    />
    <TheActivities
      v-show="page === PAGE_ACTIVITIES"
      :activities="activities"
      @delete-activity-item="deleteActivityItem"
      @add-activity-item="addActivityItem"
      @select-time-activity="selectTimeActivity"
    />
    <TheProgress v-show="page === PAGE_PROGRESS" />
  </main>
</template>

<script lang="ts" setup>
import { computed, reactive } from "vue";

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
  generateTimelineItems,
  id,
} from "@/lib/helper";
import { ISelectActivity, ISelectTimeActivity, THourItem } from "@/types";

defineProps<{ page: string }>();

// Обьявление state
let activities = reactive(generateActivities());
let activitySelectOptions = computed(() =>
  generateActivitySelectOptions(activities)
);
let timelineItems: THourItem[] = reactive(generateTimelineItems(activities));

//  Методы для управлении состоянием активности
function deleteActivityItem(id: string) {
  timelineItems.forEach((el) => {
    if (el.activityId === id) {
      el.activityId = null;
      el.activitySeconds = 0;
    }
  });
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

function selectActivity({ timelineItem, activity }: ISelectActivity) {
  timelineItem.activityId = activity?.id || null;
}

function selectTimeActivity({ activity, value }: ISelectTimeActivity) {
  activity.secondsToComplete = value;
}
</script>