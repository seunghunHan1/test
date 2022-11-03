<template>
  <div class="wrap">
    <div class="answer_wrap">
      <div class="answer_word" v-for="(data, i) in answerData" :key="i">
        <span :class="{ show: !isStart, finish: isFinish[i] }">
          {{ data }}
        </span>
        <div class="characters" :class="isStart && !isFinish[i] ? 'show' : ''">
          <SpellingComponent
            v-for="(spelling, j) in answerConvertData[i]"
            :key="j"
            :spellingInfo="spelling"
          />
        </div>
      </div>
    </div>
    <button class="answer_button" @click="clickNextBtn">정답 버튼</button>
  </div>
</template>

<script setup lang="ts">
import { SpellingInfo } from "@/data/data";
import { ref, watch } from "vue";
import store from "@/store";
import { computed } from "@vue/reactivity";
import { getColIndex, getConstantVowel, getRowIndex } from "@/data/hangul";
import SpellingComponent from "./SpellingComponent.vue";

const answerConvertData = ref<SpellingInfo[][]>([]);
const answerData = computed(() => store.state.answer);

const spreadKor = ref<string[][]>([]);

watch(
  () => answerData.value,
  (newVal) => {
    resetConfig();

    spreadKor.value = [];
    // 문자열 초성 중성 종성으로 분리
    newVal.split("").forEach((word) => {
      spreadKor.value.push(getConstantVowel(word));
    });

    answerConvertData.value = convertData(spreadKor.value);
  }
);

const currentCharIndex = ref(0);
const maxCharIndex = computed(() => answerConvertData.value.length - 1);
const clickCount = ref(0);

const isStart = ref(false);
const isFinish = ref<boolean[]>([]);

const resetConfig = () => {
  currentCharIndex.value = 0;
  clickCount.value = 0;
  isStart.value = false;
  isFinish.value = [];
  for (let i = 0; i < answerData.value.length; i++) {
    isFinish.value.push(false);
  }
};

const convertData = (data: string[][]): SpellingInfo[][] => {
  let result: SpellingInfo[][] = [];
  data.forEach((word) => {
    const comvertedChar: SpellingInfo[] = [];
    word.forEach((spell, j) => {
      comvertedChar.push({
        type: "answer",
        column: getColIndex(spell, j),
        row: getRowIndex(word, j),
      });
    });
    result.push(comvertedChar);
  });
  return result;
};

const clickNextBtn = () => {
  if (isFinish.value[maxCharIndex.value]) return;
  if (!isStart.value) isStart.value = true;

  const lastIndex = answerConvertData.value[currentCharIndex.value].length - 1;
  answerConvertData.value[currentCharIndex.value][clickCount.value].type =
    "default";

  // 모두 맞춤
  if (
    maxCharIndex.value === currentCharIndex.value &&
    lastIndex === clickCount.value
  ) {
    isStart.value = false;
  }
  if (lastIndex === clickCount.value) {
    clickCount.value = 0;
    isFinish.value[currentCharIndex.value] = true;
    currentCharIndex.value++;
  } else {
    clickCount.value++;
  }
};
</script>
