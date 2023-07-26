<template>
  <div class="flex w-full items-center gap-2">
    <BaseButton type="danger" @click="reset" :disabled="!seconds">
      <ArrowPathIcon class="h-8" />
    </BaseButton>
    <div
      class="flex w-full flex-grow items-center bg-gray-100 px-2 py-2.5 font-mono text-3xl"
    >
      {{ formattedSeconds }}
    </div>
    <BaseButton v-if="isRunning" type="warning" @click="stop">
      <PauseIcon class="h-8" />
    </BaseButton>
    <BaseButton
      v-else
      type="success"
      @click="start"
      :disabled="isStartButtonDisabled"
    >
      <PlayIcon class="h-8" />
    </BaseButton>
  </div>
</template>

<script lang="ts" setup>
import { ArrowPathIcon, PauseIcon, PlayIcon } from "@heroicons/vue/24/outline";
import BaseButton from "./base/BaseButton.vue";
import { formatSeconds } from "@/lib/helper";
import { computed, ref } from "vue";
import { MILlISECONDS_IN_SECONDS } from "@/lib/constants";

interface Props {
  seconds: number;
  hour: number;
}
const props = defineProps<Props>();

const seconds = ref(props.seconds);
const isRunning = ref<boolean | number>(false);

const formattedSeconds = computed(() => {
  return formatSeconds(seconds.value);
});

const isStartButtonDisabled = props.hour !== new Date().getHours();

function start() {
  isRunning.value = setInterval(() => {
    seconds.value++;
  }, MILlISECONDS_IN_SECONDS);
}

function stop() {
  if (typeof isRunning.value === "number") {
    clearInterval(isRunning.value);
    isRunning.value = false;
  }
}

function reset() {
  stop();
  seconds.value = 0;
}
</script>