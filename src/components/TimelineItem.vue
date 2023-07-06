<template>
  <li
    ref="refTimelineItem"
    class="relative flex flex-col gap-2 border-t py-10 px-4"
  >
    <TimeLineHour :timelineItem="timelineItem" />
    <BaseSelect
      :options="activitySelectOptions"
      placeholder="Rest"
      :selected="selectedActivityId"
      @select="selectActivity"
      @reset-selected-item="resetSelectedItem"
    />
  </li>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

import BaseSelect from "@/components/base/BaseSelect.vue";
import TimeLineHour from "./TimeLineHour.vue";
import { IOptionsItem, THourItem } from "@/types";

interface Props {
  timelineItem: THourItem;
  activitySelectOptions: IOptionsItem[];
}
const props = defineProps<Props>();

onMounted(() => {
  if (props.timelineItem.hour === new Date().getHours()) {
    const height = refTimelineItem.value.offsetTop;
    window.scrollTo({
      top: height - 400,
      behavior: "smooth",
    });
  }
});

const refTimelineItem = ref();
const selectedActivityId = ref();

function selectActivity(value: number) {
  selectedActivityId.value = value;
}

function resetSelectedItem() {
  selectedActivityId.value = null;
}
</script>


