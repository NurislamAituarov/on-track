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
import { IOptionsItem, THourItem } from "@/types";
import BaseSelect from "@/components/base/BaseSelect.vue";
import TimeLineHour from "./TimeLineHour.vue";

interface Props {
  timelineItem: THourItem;
}
const props = defineProps<Props>();

const options: IOptionsItem[] = [
  {
    value: 1,
    label: "Coding",
  },
  {
    value: 2,
    label: "Reading",
  },
  {
    value: 3,
    label: "Training",
  },
];

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


