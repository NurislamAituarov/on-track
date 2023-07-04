<template>
  <li class="flex flex-col gap-2 p-4 text-start">
    <div class="flex items-center gap-2">
      <BaseButton>
        <TrashIcon class="h-8" />
      </BaseButton>
      <span class="truncate text-xl">{{ activity }}</span>
    </div>
    <div>
      <BaseSelect
        class="font-mono"
        :options="periodSelectOptions"
        placeholder="h:mm"
        :selected="selectedActivityId"
        @select="selectActivity"
        @reset-selected-item="resetSelectedItem"
      />
    </div>
  </li>
</template>


<script lang="ts" setup>
import BaseButton from "@/components/base/BaseButton.vue";
import BaseSelect from "@/components/base/BaseSelect.vue";
import { TrashIcon } from "@heroicons/vue/24/outline";

interface Props {
  activity: string;
}
defineProps<Props>();

import { ref } from "vue";

const periodSelectOptions = [
  {
    value: 15,
    label: "0:15",
  },
  {
    value: 30,
    label: "0:30",
  },
  {
    value: 45,
    label: "0:45",
  },
];
const selectedActivityId = ref();

function selectActivity(value: number) {
  selectedActivityId.value = value;
}

function resetSelectedItem() {
  selectedActivityId.value = null;
}
</script>