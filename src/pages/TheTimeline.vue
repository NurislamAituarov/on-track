<template>
  <div class="mt-7">
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
import TimelineItem from "@/components/TimelineItem.vue";
import { generateTimelineItems } from "@/lib/helper";
import { THourItem } from "@/types";

const timelineItems: THourItem[] = generateTimelineItems();
</script>