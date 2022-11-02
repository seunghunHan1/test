type SpellingType = "answer" | "default";

export interface SpellingInfo {
  type: SpellingType;
  row: number;
  column: number;
}

export const answerTestData: SpellingInfo[][] = [
  [
    { type: "answer", row: 2, column: 6 },
    { type: "answer", row: 10, column: 1 },
  ],
  [
    { type: "answer", row: 7, column: 11 },
    { type: "answer", row: 12, column: 20 },
    { type: "answer", row: 14, column: 7 },
  ],
];
