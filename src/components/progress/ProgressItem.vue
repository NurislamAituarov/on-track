<template>
  <li class="flex flex-col gap-1 p-4 text-start">
    <div class="truncate text-xl">{{ activity.name }}</div>

    <div class="flex h-5 overflow-hidden rounded bg-neutral-200">
      <div :class="`bg-${color}-500`" :style="`width: ${progress}`"></div>
    </div>

    <div class="flex justify-between font-mono text-sm">
      <span>{{ progress }}</span>
      <span>{{ timeProgress }}</span>
    </div>
  </li>
</template>


<script setup lang="ts">
import { IActivitiesItem } from "@/types";

interface Props {
  index: number;
  activity: IActivitiesItem;
}

const props = defineProps<Props>();

const color = ["red", "yellow", "purple", "green"][props.index];
const progress = ["10%", "50%", "70%", "100%"][props.index];
const timeProgress = [
  "03:00 / 30:00",
  "15:00 / 30:00",
  "21:00 / 30:00",
  "30:00 / 30:00",
][props.index];
</script>