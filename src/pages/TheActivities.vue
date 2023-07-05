<template>
  <div>
    <ul ref="refContainerActivities" class="divide-y">
      <ActivityItem
        v-for="activity of activities"
        :key="activity"
        :activity="activity"
        @delete-activity-items="emit('delete-activity-item', activity)"
      />
    </ul>

    <form
      @submit.prevent="addActivityItem(nameActivity)"
      class="sticky bottom-[67px] flex gap-2 border-t bg-white p-4"
    >
      <input
        ref="refValue"
        v-model="nameActivity"
        type="text"
        class="w-full rounded border px-4 text-xl focus:outline-none focus:border-2 focus:border-purple-300"
        placeholder="Activity name"
      />
      <BaseButton type="primary">
        <PlusIcon class="h-8" />
      </BaseButton>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ActivityItem from "@/components/ActivityItem.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import { PlusIcon } from "@heroicons/vue/24/outline";

interface Props {
  activities: string[];
}

defineProps<Props>();
const emit = defineEmits(["delete-activity-item", "add-activity-item"]);

const nameActivity = ref("");
const refValue = ref();
const refContainerActivities = ref();

async function addActivityItem(value: string) {
  if (!value) {
    refValue.value.focus();

    return;
  }

  await emit("add-activity-item", value);
  nameActivity.value = "";

  const lastItem =
    refContainerActivities.value.children[
      refContainerActivities.value.children.length - 1
    ];
  const height = lastItem.offsetTop;
  window.scrollTo({
    top: height,
    behavior: "smooth",
  });
}
</script>