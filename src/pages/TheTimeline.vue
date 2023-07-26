<template>
  <div class="mt-7">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        :activity-select-options="activitySelectOptions"
        :activities="activities"
        :page="page"
        @select-activity="
          $emit('select-activity', { timelineItem, activity: $event })
        "
      />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import TimelineItem from "@/components/TimeLineItem.vue";
import { IActivitiesItem, IOptionsItem, THourItem } from "@/types";
interface Props {
  activitySelectOptions: IOptionsItem[];
  activities: IActivitiesItem[];
  timelineItems: THourItem[];
  page: string;
}

defineProps<Props>();
defineEmits(["select-activity"]);
</script>