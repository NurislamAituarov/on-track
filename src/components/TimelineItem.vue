<template>
  <li
    ref="refTimelineItem"
    class="relative flex flex-col gap-2 border-t py-10 px-4"
  >
    <TimeLineHour :timelineItem="timelineItem" />
    <BaseSelect
      :options="activitySelectOptions"
      placeholder="Rest"
      :selected="timelineItem.activityId"
      @select="selectActivity"
      @reset-selected-item="selectActivity"
    />
  </li>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

import BaseSelect from "@/components/base/BaseSelect.vue";
import TimeLineHour from "./TimeLineHour.vue";
import { IActivitiesItem, IOptionsItem, THourItem } from "@/types";

interface Props {
  timelineItem: THourItem;
  activitySelectOptions: IOptionsItem[];
  activities: IActivitiesItem[];
}
const props = defineProps<Props>();
const emit = defineEmits(["select-activity", "reset-selected-item"]);

onMounted(() => {
  if (props.timelineItem.hour === new Date().getHours()) {
    const height = refTimelineItem.value.offsetTop;
    window.scrollTo({
      top: height - 400,
      behavior: "smooth",
    });
  }
});

const refTimelineItem = ref();

function selectActivity(id: number | string) {
  emit("select-activity", props.activities.find((el) => el.id === id) || null);
}
</script>


