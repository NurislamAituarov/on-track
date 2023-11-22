<template>
  <div class="relative mt-7">
    <TheTimelineIndicator :timeline-items="timelineItems" />

    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
      />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import TheTimelineIndicator from "@/components/timeline/TheTimelineIndicator.vue";
import TimelineItem from "@/components/timeline/TimeLineItem.vue";
import { endTimer, startTimer } from "@/module/time";
import { timelineItems } from "@/module/timeline-items";
import { onMounted, onUnmounted } from "vue";

onMounted(startTimer);
onUnmounted(endTimer);
</script>