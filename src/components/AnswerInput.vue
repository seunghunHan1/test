<template>
  <div class="answer_box">
    <CharComponent
      v-for="(char, i) in answerConvertData"
      :key="i"
      :charData="char"
    />
  </div>
  <div>
    <input type="text" v-model="inputTestValue" />
    <button @click="clickHandler">확인</button>
  </div>
</template>

<script setup lang="ts">
import CharComponent from "@/components/CharComponent.vue";
import { SpellingInfo } from "@/data/data";
import { getConstantVowel, getRowIndex, getColIndex } from "@/data/hangul";
import { ref } from "vue";

const inputTestValue = ref("");
let resultValue: string[][] = [];

const answerConvertData = ref<SpellingInfo[][]>([]);

const clickHandler = () => {
  resultValue = [];

  // 문자열 초성 중성 종성으로 분리
  inputTestValue.value.split("").forEach((word) => {
    resultValue.push(getConstantVowel(word));
  });

  answerConvertData.value = convertData(resultValue);
};

const convertData = (data: string[][]): SpellingInfo[][] => {
  let result: SpellingInfo[][] = [];
  data.forEach((word) => {
    const comvertedChar: SpellingInfo[] = [];
    word.forEach((spell, j) => {
      console.log(getColIndex(spell, j), getRowIndex(word, j));
      comvertedChar.push({
        type: "default",
        column: getColIndex(spell, j),
        row: getRowIndex(word, j),
      });
    });
    result.push(comvertedChar);
  });
  return result;
};
</script>
