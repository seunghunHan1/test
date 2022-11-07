const cho = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];
const joong = [
  "ㅏ",
  "ㅐ",
  "ㅑ",
  "ㅒ",
  "ㅓ",
  "ㅔ",
  "ㅕ",
  "ㅖ",
  "ㅗ",
  "ㅘ",
  "ㅙ",
  "ㅚ",
  "ㅛ",
  "ㅜ",
  "ㅝ",
  "ㅞ",
  "ㅟ",
  "ㅠ",
  "ㅡ",
  "ㅢ",
  "ㅣ",
];
const jong = [
  "ㄱ",
  "ㄲ",
  "ㄳ",
  "ㄴ",
  "ㄵ",
  "ㄶ",
  "ㄷ",
  "ㄹ",
  "ㄺ",
  "ㄻ",
  "ㄼ",
  "ㄽ",
  "ㄾ",
  "ㄿ",
  "ㅀ",
  "ㅁ",
  "ㅂ",
  "ㅄ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

enum positionType {
  cho = 0,
  joong,
  jong,
}

enum StartRowIndex {
  cho = 0,
  choJong = 8,
  joong = 13,
  joongJong = 15,
  jong = 17,
}

const choCondition = [
  ["ㅏ", "ㅑ", "ㅓ", "ㅕ", "ㅣ"],
  ["ㅐ", "ㅒ", "ㅔ", "ㅖ"],
  ["ㅗ", "ㅛ", "ㅡ"],
  ["ㅜ", "ㅠ"],
  ["ㅘ", "ㅚ", "ㅢ"],
  ["ㅙ"],
  ["ㅝ", "ㅟ"],
  ["ㅞ"],
  ["ㅏ", "ㅑ", "ㅓ", "ㅕ", "ㅣ"],
  ["ㅐ", "ㅒ", "ㅔ", "ㅖ"],
  ["ㅗ", "ㅛ", "ㅡ", "ㅜ", "ㅠ"],
  ["ㅘ", "ㅚ", "ㅢ", "ㅝ", "ㅟ"],
  ["ㅙ", "ㅞ"],
];

const joongCondition = [
  ["ㄱ", "ㅋ"],
  ["ㅅ", "ㅈ", "ㅊ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅇ", "ㅌ", "ㅍ", "ㅎ"],
];

const jongCondition = [
  ["ㅏ", "ㅑ", "ㅓ", "ㅕ", "ㅣ"],
  ["ㅘ", "ㅙ", "ㅚ", "ㅝ", "ㅞ", "ㅟ", "ㅢ"],
  ["ㅐ", "ㅒ", "ㅖ", "ㅔ"],
  ["ㅗ", "ㅛ", "ㅜ", "ㅠ", "ㅡ"],
];

/**
 * @param kor 분리할 글자
 * @returns ['ㅁ','ㅐ'] 또는 ['ㅇ', 'ㅣ', 'ㄹ']
 */
export const getConstantVowel = (kor: string) => {
  const ga = 44032;
  let uni = kor.charCodeAt(0);

  uni = uni - ga;

  const fn = parseInt(String(uni / 588));
  const sn = parseInt(String((uni - fn * 588) / 28));
  const tn = parseInt(String(uni % 28)) - 1;
  const result = tn < 0 ? [cho[fn], joong[sn]] : [cho[fn], joong[sn], jong[tn]];
  return result;
};

/**
 * @param word 한 단어의 철자 배열
 * @param type 0: 초성, 1: 중성, 2: 종성
 */
export const getRowIndex = (word: string[], type: number): number => {
  const isJong = word.length === 3; // 종성의 여부
  const startRowIndex = getStartRowIndex(type, isJong);
  const thisCondition = getCondition(type, isJong);
  const standartType =
    type === positionType.joong ? positionType.cho : positionType.joong;

  let result = 0;
  thisCondition.forEach((data, i) => {
    if (data.indexOf(word[standartType]) !== -1) {
      result = startRowIndex + i;
    }
  });

  return result;
};

/**
 * @param spell 철자
 * @param type 0: 초성, 1: 중성, 2: 종성
 */
export const getColIndex = (spell: string, type: number): number => {
  switch (type) {
    case 0:
      return cho.indexOf(spell);
    case 1:
      return joong.indexOf(spell);
    case 2:
      return jong.indexOf(spell);
    default:
      return 0;
  }
};

/**
 * @param type 0: 초성, 1: 중성, 2: 종성
 */
const getStartRowIndex = (
  type: positionType,
  isJong: boolean
): StartRowIndex => {
  switch (type) {
    case positionType.cho:
      return isJong ? StartRowIndex.choJong : StartRowIndex.cho;
    case positionType.joong:
      return isJong ? StartRowIndex.joongJong : StartRowIndex.joong;
    case positionType.jong:
      return StartRowIndex.jong;
    default:
      return 0;
  }
};

const getCondition = (type: positionType, isJong: boolean): string[][] => {
  switch (type) {
    case positionType.cho:
      return isJong
        ? choCondition.slice(StartRowIndex.choJong - StartRowIndex.cho)
        : choCondition.slice(0, StartRowIndex.choJong - StartRowIndex.cho);
    case positionType.joong:
      return joongCondition;
    case positionType.jong:
      return jongCondition;
    default:
      return jongCondition;
  }
};
