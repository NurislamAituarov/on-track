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
      />
    </ul>

    <TheActivitiesEmptyState v-else />

    <TheActivityForm />
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
const refContainerActivities = ref();
</script>