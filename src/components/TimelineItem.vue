<template>
  <li
    ref="refTimelineItem"
    class="relative flex flex-col gap-2 border-t py-10 px-4"
  >
    <TimeLineHour :timelineItem="timelineItem" />
    <BaseSelect
      :options="options"
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
import { options } from "@/lib/constants";
import { THourItem } from "@/types";

interface Props {
  timelineItem: THourItem;
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


