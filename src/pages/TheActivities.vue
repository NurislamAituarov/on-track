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
import TimeLineActivity from "@/components/TimeLineActivity.vue";
const activities = ["Coding", "Reading", "Training"];
</script>