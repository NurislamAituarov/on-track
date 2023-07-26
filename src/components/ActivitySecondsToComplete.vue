<template>
  <div
    class="flex items-center rounded bg-purple-100 px-2 font-mono text-xl text-purple-600"
  >
    {{
      activity.secondsToComplete && formatSeconds(activity.secondsToComplete)
    }}
    {{ false ? SECONDS_IN_MINUTE : "" }}
  </div>
</template>

<script lang="ts" setup>
import { SECONDS_IN_MINUTE } from "@/lib/constants";
import { formatSeconds } from "@/lib/helper";
import { IActivitiesItem } from "@/types";

interface Props {
  activity: IActivitiesItem;
}

defineProps<Props>();
</script>