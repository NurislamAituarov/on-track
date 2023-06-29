<template>
  <div class="flex gap-2">
    <BaseButton @click="emit('reset-selected-item')">
      <XMarkIcon class="h-8" />
    </BaseButton>

    <select
      class="w-full truncate rounded py-1 px-2 bg-gray-100 text-2xl"
      @change="emit('select', +$event.target?.value)"
    >
      <option :selected="selected == null" disabled value="0">
        {{ placeholder }}
      </option>

      <option
        v-for="{ value, label } of options"
        :key="value"
        :value="value"
        :selected="selected === value"
      >
        {{ label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { IOptionsItem } from "@/types";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import BaseButton from "@/components/base/BaseButton.vue";

interface Props {
  options: IOptionsItem[];
  placeholder: string;
  selected: number;
}

defineProps<Props>();

const emit = defineEmits(["select", "reset-selected-item"]);
</script>


