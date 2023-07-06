<template>
  <form
    @submit.prevent="addActivity"
    class="sticky bottom-[67px] flex gap-2 border-t bg-white p-4"
  >
    <input
      ref="refValue"
      v-model.trim="nameActivity"
      type="text"
      class="w-full rounded border px-4 text-xl focus:outline-none focus:border-2 focus:border-purple-300"
      placeholder="Activity name"
    />
    <BaseButton type="primary">
      <PlusIcon class="h-8" />
    </BaseButton>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import BaseButton from "@/components/base/BaseButton.vue";
import { PlusIcon } from "@heroicons/vue/24/outline";
// interface Props {}

// defineProps<Props>();

const emit = defineEmits(["submit"]);

const nameActivity = ref("");
const refValue = ref();

function addActivity() {
  if (!nameActivity.value) return refValue.value.focus();

  emit("submit", nameActivity.value);
  nameActivity.value = "";
}
</script>