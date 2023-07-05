<template>
  <div class="mt-7">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        :activity-select-options="activitySelectOptions"
      />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import TimelineItem from "@/components/TimelineItem.vue";
import { generateTimelineItems } from "@/lib/helper";
import { IOptionsItem, THourItem } from "@/types";
interface Props {
  activitySelectOptions: IOptionsItem[];
}

defineProps<Props>();

const timelineItems: THourItem[] = generateTimelineItems();
</script>