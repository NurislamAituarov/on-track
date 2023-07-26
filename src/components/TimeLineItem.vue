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
      @select="selectActivity"
      @reset-selected-item="selectActivity"
    />
    <TimeLineStopWatch :timeline-item="timelineItem" />
  </li>
</template>

<script lang="ts" setup>
import { nextTick, ref, watchPostEffect } from "vue";

import BaseSelect from "@/components/base/BaseSelect.vue";
import TimeLineHour from "./TimeLineHour.vue";
import TimeLineStopWatch from "./TimeLineStopWatch.vue";
import { IActivitiesItem, IOptionsItem, THourItem } from "@/types";
import { scrollToCurrentTimeLineItem } from "@/lib/helper";
import { PAGE_TIMELINE } from "@/lib/constants";

interface Props {
  timelineItem: THourItem;
  activitySelectOptions: IOptionsItem[];
  activities: IActivitiesItem[];
  page: string;
}

const props = defineProps<Props>();
const emit = defineEmits([
  "select-activity",
  "reset-selected-item",
  "scroll-to-hour",
]);

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

// watch(props, (value) => {
//   if (
//     value.page === PAGE_TIMELINE &&
//     props.timelineItem.hour === new Date().getHours()
//   )
//     scrollToCurrentTimeLineItem(props.timelineItem.hour, refTimelineItem.value);
// });

function selectActivity(id: number | string) {
  emit("select-activity", props.activities.find((el) => el.id === id) || null);
}
</script>


