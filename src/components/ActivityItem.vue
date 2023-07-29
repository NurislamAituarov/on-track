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
        @select="selectTimeActivity(activity, $event)"
        @reset-selected-item="selectTimeActivity(activity, $event)"
      />

      <ActivitySecondsToComplete :activity="activity" />
    </div>
  </li>
</template>


<script lang="ts" setup>
import { TrashIcon } from "@heroicons/vue/24/outline";

import BaseButton from "@/components/base/BaseButton.vue";
import BaseSelect from "@/components/base/BaseSelect.vue";
import ActivitySecondsToComplete from "@/components/ActivitySecondsToComplete.vue";
import { periodSelectOptions } from "@/lib/constants";
import { IActivitiesItem } from "@/types";
import { inject } from "vue";

interface Props {
  activity: IActivitiesItem;
}
defineProps<Props>();
const selectTimeActivity = inject("select-time-activity") as (
  activity: IActivitiesItem,
  value: number
) => void;

const deleteActivityItem = inject("delete-activity-item") as (
  id: string
) => void;
</script>