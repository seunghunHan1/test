const f = [
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
const s = [
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
const t = [
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

const firstCondition = {
  A: [
    ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅣ"],
    ["ㅗ", "ㅛ", "ㅡ"],
    ["ㅜ", "ㅠ"],
    ["ㅘ", "ㅙ", "ㅚ", "ㅢ"],
    ["ㅝ", "ㅞ", "ㅟ"],
  ],
  B: [
    ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅣ"],
    ["ㅗ", "ㅛ", "ㅡ", "ㅜ", "ㅠ"],
    ["ㅘ", "ㅙ", "ㅚ", "ㅢ", "ㅝ", "ㅞ", "ㅟ"],
  ],
};

const secondCondition = [
  ["ㄱ", "ㅋ"],
  ["ㅅ", "ㅈ", "ㅊ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅇ", "ㅌ", "ㅍ", "ㅎ"],
];

const thirdCondition = [
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
  const result = tn < 0 ? [f[fn], s[sn]] : [f[fn], s[sn], t[tn]];
  return result;
};

/**
 * @param word 한 단어의 철자 배열
 * @param type 0: 초성, 1: 중성, 2: 종성
 */
export const getRowIndex = (word: string[], type: number): number => {
  const isThirdSpell = word.length === 3; // 종성의 여부
  const startRowIndex = getRowStartIndex(type, isThirdSpell);

  let result = 0;

  if (type === 0 && isThirdSpell) {
    firstCondition.B.forEach((data, i) => {
      if (data.indexOf(word[1]) !== -1) {
        result = startRowIndex + i;
      }
    });
  } else if (type === 0) {
    firstCondition.A.forEach((data, i) => {
      if (data.indexOf(word[1]) !== -1) {
        result = startRowIndex + i;
      }
    });
  } else if (type === 1) {
    secondCondition.forEach((data, i) => {
      if (data.indexOf(word[0]) !== -1) {
        result = startRowIndex + i;
      }
    });
  } else if (type === 2) {
    thirdCondition.forEach((data, i) => {
      if (data.indexOf(word[1]) !== -1) {
        result = startRowIndex + i;
      }
    });
  }
  return result;
};

/**
 * @param spell 철자
 * @param type 0: 초성, 1: 중성, 2: 종성
 */
export const getColIndex = (spell: string, type: number): number => {
  switch (type) {
    case 0:
      return f.indexOf(spell);
    case 1:
      return s.indexOf(spell);
    case 2:
      return t.indexOf(spell);
    default:
      return 0;
  }
};

/**
 * @param type 0: 초성, 1: 중성, 2: 종성
 */
const getRowStartIndex = (type: number, isThirdSpell: boolean): number => {
  switch (type) {
    case 0:
      return isThirdSpell ? 7 : 2;
    case 1:
      return isThirdSpell ? 12 : 10;
    case 2:
      return 14;
    default:
      return 0;
  }
};
