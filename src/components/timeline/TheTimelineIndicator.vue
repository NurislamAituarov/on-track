<template>
  <hr
    ref="indicatorRef"
    class="pointer-events-none absolute z-10 w-full border-b-2 border-red-600"
    :style="{ top: `${calculateTopOffset}px` }"
  />
</template>


<script setup lang="ts">
import {
  MILlISECONDS_IN_SECONDS,
  MINUTES_IN_HOUR,
  SECONDS_IN_DAY,
  SECONDS_IN_MINUTE,
} from "@/lib/constants";
import { THourItem } from "@/types";
import { computed, ref, watchEffect } from "vue";

interface Props {
  timelineItems: THourItem[];
}
defineProps<Props>();

const secondsSinceMidnight = ref(calculateSecondsSinceMidnight());
const indicatorRef = ref();

setInterval(
  () => (secondsSinceMidnight.value += 5 * 60),
  MILlISECONDS_IN_SECONDS
);

const calculateTopOffset = computed(() => {
  return (
    (calculateSecondsSinceMidnightInPercentage.value * getTimelineHeight()) /
    100
  );
});

const calculateSecondsSinceMidnightInPercentage = computed(() => {
  return (100 * secondsSinceMidnight.value) / SECONDS_IN_DAY;
});

watchEffect(() => {
  if (secondsSinceMidnight.value > SECONDS_IN_DAY) {
    secondsSinceMidnight.value = 0;
  }
});

function calculateSecondsSinceMidnight() {
  const now = new Date();

  return (
    SECONDS_IN_MINUTE * MINUTES_IN_HOUR * now.getHours() +
    SECONDS_IN_MINUTE * now.getMinutes() +
    now.getSeconds()
  );
}
function getTimelineHeight() {
  return indicatorRef.value?.parentNode.getBoundingClientRect().height;
}
</script>