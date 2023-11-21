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
import { endTimer, startTimer } from "@/module/time";
import { THourItem } from "@/types";
import { onMounted, onUnmounted } from "vue";

interface Props {
  timelineItems: THourItem[];
  page: string;
}
defineProps<Props>();

onMounted(() => {
  startTimer();
});
onUnmounted(endTimer);
</script>