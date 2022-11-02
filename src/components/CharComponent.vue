<template>
  <div class="characters">
    <SpellingComponent
      v-for="(spelling, j) in charData"
      :key="j"
      :spellingInfo="spelling"
    />
  </div>
</template>

<script lang="ts" setup>
import SpellingComponent from "@/components/SpellingComponent.vue";
import { defineProps, PropType } from "vue";
import { SpellingInfo } from "@/data/data";

const props = defineProps({
  charData: {
    type: Array as PropType<SpellingInfo[]>,
    defalut: 0,
  },
});
</script>
