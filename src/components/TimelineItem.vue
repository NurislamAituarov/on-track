<template>
  <li class="relative flex flex-col gap-2 border-t py-10 px-4">
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
import { ref } from "vue";
import { IOptionsItem, THourItem } from "@/types";
import BaseSelect from "@/components/base/BaseSelect.vue";
import TimeLineHour from "./TimeLineHour.vue";

interface Props {
  timelineItem: THourItem;
}
defineProps<Props>();

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

const selectedActivityId = ref();

function selectActivity(value: number) {
  selectedActivityId.value = value;
}

function resetSelectedItem() {
  selectedActivityId.value = null;
}
</script>


