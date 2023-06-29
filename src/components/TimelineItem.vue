<template>
  <li class="relative flex flex-col gap-2 border-t py-10 px-4">
    <a
      href="#"
      class="absolute -top-4 left-1/2 -translate-x-1/2 rounded px-2 font-mono text-lg"
      :class="hourLinkClasses"
      >{{ timelineItem.hour }}:00</a
    >
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
import BaseSelect from "@/components/base/BaseSelect.vue";
import { IOptionsItem, THourItem } from "@/types";
import { ref } from "vue";
interface Props {
  timelineItem: THourItem;
}
const props = defineProps<Props>();

const hourLinkClasses = [
  props.timelineItem.hour === new Date().getHours()
    ? "bg-purple-900 font-black text-white"
    : "bg-gray-100 text-gray-500",
];

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


