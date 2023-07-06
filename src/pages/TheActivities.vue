<template>
  <div class="flex flex-col grow">
    <ul
      v-if="activities.length"
      ref="refContainerActivities"
      class="divide-y grow"
    >
      <ActivityItem
        v-for="activity of activities"
        :key="activity.id"
        :activity="activity"
        @delete-activity-item="emit('delete-activity-item', $event)"
      />
    </ul>

    <TheActivitiesEmptyState v-else />

    <TheActivityForm @submit="addActivityItem" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ActivityItem from "@/components/ActivityItem.vue";
import TheActivityForm from "@/components/TheActivityForm.vue";
import TheActivitiesEmptyState from "@/components/TheActivitiesEmptyState.vue";
import { IActivitiesItem } from "@/types";

interface Props {
  activities: IActivitiesItem[];
}

defineProps<Props>();
const emit = defineEmits(["delete-activity-item", "add-activity-item"]);

const refContainerActivities = ref();

async function addActivityItem(value: string) {
  await emit("add-activity-item", value);

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