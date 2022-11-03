<template>
  <div class="home">
    <AnswerInput />
    <div class="wrap">
      <AnswerComponent />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AnswerInput from "@/components/AnswerInput.vue";
import AnswerComponent from "@/components/AnswerComponent.vue";
</script>
