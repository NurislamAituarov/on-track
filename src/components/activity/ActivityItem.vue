<template>
  <li class="flex flex-col gap-2 p-4 text-start">
    <div class="flex items-center gap-2">
      <BaseButton type="danger" @click="deleteActivityItem(activity.id)">
        <TrashIcon class="h-8" />
      </BaseButton>
      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>
    <div class="flex gap-2">
      <BaseSelect
        class="font-mono grow"
        :options="periodSelectOptions"
        placeholder="hh:mm"
        :selected="activity.secondsToComplete"
        @select="updateTimeActivity(activity, $event)"
      />

      <ActivitySecondsToComplete :activity="activity" />
    </div>
  </li>
</template>


<script lang="ts" setup>
import { inject } from "vue";
import { TrashIcon } from "@heroicons/vue/24/outline";

import BaseButton from "@/components/base/BaseButton.vue";
import BaseSelect from "@/components/base/BaseSelect.vue";
import ActivitySecondsToComplete from "./ActivitySecondsToComplete.vue";
import { periodSelectOptions } from "@/lib/constants";
import { IActivitiesItem } from "@/types";

interface Props {
  activity: IActivitiesItem;
}
defineProps<Props>();
const updateTimeActivity = inject("update-time-activity") as (
  activity: IActivitiesItem,
  value: number
) => void;

const deleteActivityItem = inject("delete-activity-item") as (
  id: string
) => void;
</script>