<template>
  <a
    href="#"
    class="absolute -top-4 left-1/2 -translate-x-1/2 rounded px-2 font-mono text-lg"
    :class="[
      timelineItem.hour === new Date().getHours()
        ? 'bg-purple-900 font-black text-white'
        : 'bg-gray-100 text-gray-500',
    ]"
    >{{ formatterHour }}</a
  >
</template>

<script lang="ts" setup>
import { THourItem } from "@/types";
import { computed } from "vue";

interface Props {
  timelineItem: THourItem;
}

const props = defineProps<Props>();

const formatterHour = computed(() => {
  const hour = props.timelineItem.hour;

  return `${hour.toString().padStart(2, "0")}:00`;
});
</script>