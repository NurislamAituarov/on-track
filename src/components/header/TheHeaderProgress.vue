<template>
  <a :href="`#${PAGE_PROGRESS}`" class="text-sm">
    <div v-if="false" class="flex items-center gap-2">
      <p>Day complete!</p>
      <CheckCircleIcon class="h-7 text-green-500" />
    </div>
    <div v-else class="flex items-center gap-2">
      <p>Progress: <span>20%</span></p>
      <div class="h-3 w-3 rounded-full bg-red-500"></div>
    </div>
  </a>
</template>

<script lang="ts" setup>
import { CheckCircleIcon } from "@heroicons/vue/24/solid";
import { PAGE_PROGRESS } from "@/lib/constants";
</script>