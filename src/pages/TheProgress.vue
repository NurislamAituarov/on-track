<template>
  <ul class="divide-y">
    <ProgressItem
      v-for="(item, ind) of trackedActivities"
      :key="item.id"
      :index="ind"
      :activity="item"
    />
  </ul>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";
import ProgressItem from "@/components/progress/ProgressItem.vue";
import { IActivitiesItem } from "@/types";

const activities = inject<IActivitiesItem[]>("activities");

const trackedActivities = computed(() => {
  return activities?.filter((el) => el.secondsToComplete);
});
</script>