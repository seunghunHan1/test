<template>
  <div class="">
    정답예시
    <input type="text" v-model="inputTestValue" @keyup.enter="clickHandler" />
    <button @click="clickHandler">확인</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import store from "@/store";

const inputTestValue = ref("");

const clickHandler = () => {
  store.commit("setAnswer", inputTestValue.value);
};
</script>

<style scoped>
div {
  margin-bottom: 3rem;
}
button {
  margin-left: 0.5rem;
  background: #dbdbdb;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  padding: 0.3rem;
  cursor: pointer;
  transition: 0.3s;
}
button:hover {
  background: #999;
}
input {
  border: 1px solid #dbdbdb;
  padding: 0.5rem;
  border-radius: 5px;
}
</style>
