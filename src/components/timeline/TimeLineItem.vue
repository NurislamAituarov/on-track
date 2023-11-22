<template>
  <li
    ref="refTimelineItem"
    class="relative flex flex-col gap-2 border-t py-10 px-4"
  >
    <TimeLineHour
      :timelineItem="timelineItem"
      @click.prevent="scrollToHour()"
    />
    <BaseSelect
      :options="activitySelectOptions"
      placeholder="Rest"
      :selected="timelineItem.activityId"
      @select="selectActivity(timelineItem, $event)"
    />
    <TimeLineStopWatch :timeline-item="timelineItem" />
  </li>
</template>

<script lang="ts" setup>
import {
  computed,
  inject,
  onActivated,
  onMounted,
  ref,
  watch,
  watchEffect,
} from "vue";

import BaseSelect from "@/components/base/BaseSelect.vue";
import TimeLineHour from "./TimeLineHour.vue";
import TimeLineStopWatch from "./TimeLineStopWatch.vue";
import { scrollToCurrentTimeLineItem } from "@/lib/helper";
import { PAGE_TIMELINE } from "@/lib/constants";
import { activitySelectOptions } from "@/module/activities";
import { now } from "@/module/time";
import { selectActivity } from "@/module/timeline-items";
import { THourItem } from "@/types";

interface Props {
  timelineItem: THourItem;
}

const props = defineProps<Props>();

const logoTime = inject("logo-time") as () => string;
const page = inject("current-page") as () => string;
const refTimelineItem = ref<HTMLLIElement | null>(null);

const isCurrentHourTimeline = computed(() => {
  return (
    page.value === PAGE_TIMELINE &&
    props.timelineItem.hour === now.value.getHours()
  );
});

onActivated(() => {
  if (isCurrentHourTimeline.value) {
    scrollToCurrentTimeLineItem(refTimelineItem.value);
  }
});

watch(logoTime, (value) => {
  if (value === "scroll" && props.timelineItem.hour === now.value.getHours()) {
    scrollToHour();
  }
});

async function scrollToHour() {
  scrollToCurrentTimeLineItem(refTimelineItem.value, true);
}
</script>


