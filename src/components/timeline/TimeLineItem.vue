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
      @reset-selected-item="selectActivity(timelineItem, $event)"
    />
    <TimeLineStopWatch :timeline-item="timelineItem" />
  </li>
</template>

<script lang="ts" setup>
import { inject, nextTick, ref, watchPostEffect } from "vue";

import BaseSelect from "@/components/base/BaseSelect.vue";
import TimeLineHour from "./TimeLineHour.vue";
import TimeLineStopWatch from "./TimeLineStopWatch.vue";
import { IOptionsItem, THourItem } from "@/types";
import { scrollToCurrentTimeLineItem } from "@/lib/helper";
import { PAGE_TIMELINE } from "@/lib/constants";

interface Props {
  timelineItem: THourItem;
  page: string;
}

const props = defineProps<Props>();
defineEmits(["reset-selected-item", "scroll-to-hour"]);

const activitySelectOptions = inject(
  "activity-select-options"
) as IOptionsItem[];

const selectActivity = inject("select-activity") as (
  timelineItem: THourItem,
  activityId: number
) => void;

const refTimelineItem = ref<HTMLLIElement | null>(null);

watchPostEffect(async () => {
  if (
    props.page === PAGE_TIMELINE &&
    props.timelineItem.hour === new Date().getHours()
  ) {
    await nextTick();
    scrollToCurrentTimeLineItem(refTimelineItem.value);
  }
});

async function scrollToHour() {
  scrollToCurrentTimeLineItem(refTimelineItem.value, true);
}
</script>


