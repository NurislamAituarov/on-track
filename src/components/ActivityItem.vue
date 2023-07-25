<template>
  <li class="flex flex-col gap-2 p-4 text-start">
    <div class="flex items-center gap-2">
      <BaseButton
        type="danger"
        @click="emit('delete-activity-item', activity.id)"
      >
        <TrashIcon class="h-8" />
      </BaseButton>
      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>
    <div>
      <BaseSelect
        class="font-mono"
        :options="periodSelectOptions"
        placeholder="hh:mm"
        :selected="activity.secondsToComplete"
        @select="selectTimeActivity"
        @reset-selected-item="resetTimeActivity"
      />
    </div>
  </li>
</template>


<script lang="ts" setup>
import { TrashIcon } from "@heroicons/vue/24/outline";

import BaseButton from "@/components/base/BaseButton.vue";
import BaseSelect from "@/components/base/BaseSelect.vue";
import { periodSelectOptions } from "@/lib/constants";
import { IActivitiesItem } from "@/types";

interface Props {
  activity: IActivitiesItem;
}
defineProps<Props>();
const emit = defineEmits(["delete-activity-item", "select-time-activity"]);

function selectTimeActivity(value: number) {
  emit("select-time-activity", value);
}

function resetTimeActivity() {
  emit("select-time-activity", null);
}
</script>