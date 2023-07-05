<template>
  <div class="flex gap-2">
    <BaseButton @click="emit('reset-selected-item')" type="neutral">
      <XMarkIcon class="h-8" />
    </BaseButton>

    <div
      class="w-full truncate rounded py-1 px-2 bg-gray-100 text-2xl flex items-center wrapper__select"
    >
      <div
        ref="refSelectItem"
        class="default-option w-full flex justify-between items-center"
        @click="openModalSelect"
      >
        {{ options.find((el) => el.value === selected)?.label || placeholder }}
        <ChevronDownIcon class="h-5" :class="{ 'rotate-180': selectWindow }" />
      </div>

      <ul class="wrapper__select-item" v-if="selectWindow">
        <li
          class="option"
          :style="[value === selected ? 'background: rgb(245, 245, 245)' : '']"
          v-for="{ value, label } of options"
          :key="value"
          @click="selectItem(value)"
        >
          {{ label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IOptionsItem } from "@/types";
import { XMarkIcon, ChevronDownIcon } from "@heroicons/vue/24/outline";
import BaseButton from "@/components/base/BaseButton.vue";
import { onMounted, onUnmounted, onUpdated, ref } from "vue";

interface Props {
  options: IOptionsItem[];
  placeholder: string;
  selected: number | undefined;
}
defineProps<Props>();

const emit = defineEmits(["select", "reset-selected-item"]);
const refSelectItem = ref();
const selectWindow = ref(false);

// component lifecycle //
onMounted(() => {
  document.addEventListener("click", listener);
});
onUnmounted(() => {
  document.removeEventListener("click", listener);
});
onUpdated(() => {
  console.log("update");
});

// Methods //
function openModalSelect() {
  selectWindow.value = !selectWindow.value;
}

function selectItem(value: number) {
  emit("select", value);
  selectWindow.value = false;
}

function listener(e: Event) {
  if (
    e.target !== refSelectItem.value &&
    !refSelectItem.value.contains(e.target)
  ) {
    selectWindow.value = false;
  }
}
</script>


<style scoped lang="scss">
.wrapper__select {
  position: relative;
  overflow: visible;
  cursor: pointer;
}
.wrapper__select-item {
  width: 100%;
  position: absolute;
  left: 0;
  top: 100%;
  background: white;
  z-index: 100;
  border: 1px solid rgb(222, 222, 222);
  box-shadow: 1px 1px 15px 2px rgb(237, 237, 237);
  border-radius: 5px;
}

.option {
  border-bottom: 1px solid rgb(222, 222, 222);
  cursor: pointer;
  padding: 6px;
  &:hover {
    background: rgb(245, 245, 245);
  }
}
</style>


