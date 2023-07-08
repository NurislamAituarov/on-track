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
        placeholder="h:mm"
        :selected="secondsToComplete"
        @select="selectActivity"
        @reset-selected-item="resetSelectedItem"
      />
    </div>
  </li>
</template>


<script lang="ts" setup>
import { ref } from "vue";
import { TrashIcon } from "@heroicons/vue/24/outline";

import BaseButton from "@/components/base/BaseButton.vue";
import BaseSelect from "@/components/base/BaseSelect.vue";
import { periodSelectOptions } from "@/lib/constants";
import { IActivitiesItem } from "@/types";

interface Props {
  activity: IActivitiesItem;
}
defineProps<Props>();
const emit = defineEmits(["delete-activity-item"]);

const secondsToComplete = ref();

function selectActivity(value: number) {
  secondsToComplete.value = value;
}

function resetSelectedItem() {
  secondsToComplete.value = null;
}
</script>