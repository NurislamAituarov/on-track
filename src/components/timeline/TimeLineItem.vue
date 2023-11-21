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
  nextTick,
  onMounted,
  ref,
  watch,
  watchPostEffect,
} from "vue";

import BaseSelect from "@/components/base/BaseSelect.vue";
import TimeLineHour from "./TimeLineHour.vue";
import TimeLineStopWatch from "./TimeLineStopWatch.vue";
import { IOptionsItem, THourItem } from "@/types";
import { scrollToCurrentTimeLineItem } from "@/lib/helper";
import { PAGE_TIMELINE } from "@/lib/constants";
import { now } from "@/module/time";

interface Props {
  timelineItem: THourItem;
  page: string;
}

const props = defineProps<Props>();

const activitySelectOptions = inject(
  "activity-select-options"
) as IOptionsItem[];

const selectActivity = inject("select-activity") as (
  timelineItem: THourItem,
  activityId: number
) => void;
const logoTime = inject("logo-time") as () => string;

const refTimelineItem = ref<HTMLLIElement | null>(null);
const isCurrentHourTimeline = computed(() => {
  return (
    props.page === PAGE_TIMELINE &&
    props.timelineItem.hour === now.value.getHours()
  );
});

onMounted(() => {
  if (isCurrentHourTimeline.value) {
    scrollToCurrentTimeLineItem(refTimelineItem.value);
  }
});

watchPostEffect(async () => {
  if (isCurrentHourTimeline.value) {
    await nextTick();
    scrollToHour();
  }
});

watch(logoTime, (value) => {
  if (value === "scroll" && props.timelineItem.hour === now.value.getHours())
    scrollToHour();
});

async function scrollToHour() {
  scrollToCurrentTimeLineItem(refTimelineItem.value, true);
}
</script>


