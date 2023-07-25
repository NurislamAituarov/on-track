<template>
  <div class="flex w-full items-center gap-2">
    <BaseButton type="danger">
      <ArrowPathIcon class="h-8" />
    </BaseButton>
    <div
      class="flex w-full flex-grow items-center bg-gray-100 px-2 py-2.5 font-mono text-3xl"
    >
      {{ formatSeconds(seconds) }}
    </div>
    <BaseButton type="warning">
      <PauseIcon class="h-8" />
    </BaseButton>
    <BaseButton type="success">
      <PlayIcon class="h-8" />
    </BaseButton>
  </div>
</template>

<script lang="ts" setup>
import { ArrowPathIcon, PauseIcon, PlayIcon } from "@heroicons/vue/24/outline";
import BaseButton from "./base/BaseButton.vue";
import { formatSeconds } from "@/lib/helper";

interface Props {
  seconds: number;
}
defineProps<Props>();
</script>