<template>
  <div
    :class="`spell ${spellingInfo?.type}`"
    :style="`background-position: ${backgroundPosition.x}px ${backgroundPosition.y}px`"
  ></div>
</template>

<script lang="ts" setup>
import { defineProps, computed, PropType } from "vue";
import { SpellingInfo } from "@/data/data";

const props = defineProps({
  spellingInfo: {
    type: Object as PropType<SpellingInfo>,
    defalut: 0,
  },
});

const backgroundPosition = computed(() => ({
  x: -((props.spellingInfo?.column ? props.spellingInfo.column : 0) * 100),
  y: -((props.spellingInfo?.row ? props.spellingInfo.row : 0) * 100),
}));
</script>
