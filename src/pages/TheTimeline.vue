<template>
  <div class="relative mt-7">
    <TheTimelineIndicator :timeline-items="timelineItems" />

    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        :page="page"
      />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import TheTimelineIndicator from "@/components/timeline/TheTimelineIndicator.vue";
import TimelineItem from "@/components/timeline/TimeLineItem.vue";
import { THourItem } from "@/types";

interface Props {
  timelineItems: THourItem[];
  page: string;
}
defineProps<Props>();
</script>