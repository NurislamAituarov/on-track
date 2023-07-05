<template>
  <div>
    <ul class="divide-y">
      <TimeLineActivity
        v-for="activity of activities"
        :key="activity"
        :activity="activity"
      />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import TimeLineActivity from "@/components/ActivityItem.vue";

interface Props {
  activities: string[];
}

defineProps<Props>();
</script>