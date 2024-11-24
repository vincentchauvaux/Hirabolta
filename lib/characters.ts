export interface Character {
  char: string;
  row: string;
  romaji: string;
}

export const hiragana: Character[] = [
  // あ row
  { char: "あ", row: "a", romaji: "a" },
  { char: "い", row: "a", romaji: "i" },
  { char: "う", row: "a", romaji: "u" },
  { char: "え", row: "a", romaji: "e" },
  { char: "お", row: "a", romaji: "o" },
  // か row
  { char: "か", row: "k", romaji: "ka" },
  { char: "き", row: "k", romaji: "ki" },
  { char: "く", row: "k", romaji: "ku" },
  { char: "け", row: "k", romaji: "ke" },
  { char: "こ", row: "k", romaji: "ko" },
  // さ row
  { char: "さ", row: "sh", romaji: "sa" },
  { char: "し", row: "sh", romaji: "shi" },
  { char: "す", row: "sh", romaji: "su" },
  { char: "せ", row: "sh", romaji: "se" },
  { char: "そ", row: "sh", romaji: "so" },
  // た row
  { char: "た", row: "ts", romaji: "ta" },
  { char: "ち", row: "ts", romaji: "chi" },
  { char: "つ", row: "ts", romaji: "tsu" },
  { char: "て", row: "ts", romaji: "te" },
  { char: "と", row: "ts", romaji: "to" },
  // な row
  { char: "な", row: "n", romaji: "na" },
  { char: "に", row: "n", romaji: "ni" },
  { char: "ぬ", row: "n", romaji: "nu" },
  { char: "ね", row: "n", romaji: "ne" },
  { char: "の", row: "n", romaji: "no" },
  // は row
  { char: "は", row: "h", romaji: "ha" },
  { char: "ひ", row: "h", romaji: "hi" },
  { char: "ふ", row: "h", romaji: "fu" },
  { char: "へ", row: "h", romaji: "he" },
  { char: "ほ", row: "h", romaji: "ho" },
  // ま row
  { char: "ま", row: "m", romaji: "ma" },
  { char: "み", row: "m", romaji: "mi" },
  { char: "む", row: "m", romaji: "mu" },
  { char: "め", row: "m", romaji: "me" },
  { char: "も", row: "m", romaji: "mo" },
  // や row
  { char: "や", row: "y", romaji: "ya" },
  { char: "ゆ", row: "y", romaji: "yu" },
  { char: "よ", row: "y", romaji: "yo" },
  // ら row
  { char: "ら", row: "r", romaji: "ra" },
  { char: "り", row: "r", romaji: "ri" },
  { char: "る", row: "r", romaji: "ru" },
  { char: "れ", row: "r", romaji: "re" },
  { char: "ろ", row: "r", romaji: "ro" },
  // わ row
  { char: "わ", row: "w", romaji: "wa" },
  { char: "を", row: "w", romaji: "wo" },
  // ん
  { char: "ん", row: "n", romaji: "n" },
];

export const katakana: Character[] = [
  // ア row
  { char: "ア", row: "a", romaji: "a" },
  { char: "イ", row: "a", romaji: "i" },
  { char: "ウ", row: "a", romaji: "u" },
  { char: "エ", row: "a", romaji: "e" },
  { char: "オ", row: "a", romaji: "o" },
  // カ row
  { char: "カ", row: "k", romaji: "ka" },
  { char: "キ", row: "k", romaji: "ki" },
  { char: "ク", row: "k", romaji: "ku" },
  { char: "ケ", row: "k", romaji: "ke" },
  { char: "コ", row: "k", romaji: "ko" },
  // サ row
  { char: "サ", row: "sh", romaji: "sa" },
  { char: "シ", row: "sh", romaji: "shi" },
  { char: "ス", row: "sh", romaji: "su" },
  { char: "セ", row: "sh", romaji: "se" },
  { char: "ソ", row: "sh", romaji: "so" },
  // タ row
  { char: "タ", row: "ts", romaji: "ta" },
  { char: "チ", row: "ts", romaji: "chi" },
  { char: "ツ", row: "ts", romaji: "tsu" },
  { char: "テ", row: "ts", romaji: "te" },
  { char: "ト", row: "ts", romaji: "to" },
  // ナ row
  { char: "ナ", row: "n", romaji: "na" },
  { char: "ニ", row: "n", romaji: "ni" },
  { char: "ヌ", row: "n", romaji: "nu" },
  { char: "ネ", row: "n", romaji: "ne" },
  { char: "ノ", row: "n", romaji: "no" },
  // ハ row
  { char: "ハ", row: "h", romaji: "ha" },
  { char: "ヒ", row: "h", romaji: "hi" },
  { char: "フ", row: "h", romaji: "fu" },
  { char: "ヘ", row: "h", romaji: "he" },
  { char: "ホ", row: "h", romaji: "ho" },
  // マ row
  { char: "マ", row: "m", romaji: "ma" },
  { char: "ミ", row: "m", romaji: "mi" },
  { char: "ム", row: "m", romaji: "mu" },
  { char: "メ", row: "m", romaji: "me" },
  { char: "モ", row: "m", romaji: "mo" },
  // ヤ row
  { char: "ヤ", row: "y", romaji: "ya" },
  { char: "ユ", row: "y", romaji: "yu" },
  { char: "ヨ", row: "y", romaji: "yo" },
  // ラ row
  { char: "ラ", row: "r", romaji: "ra" },
  { char: "リ", row: "r", romaji: "ri" },
  { char: "ル", row: "r", romaji: "ru" },
  { char: "レ", row: "r", romaji: "re" },
  { char: "ロ", row: "r", romaji: "ro" },
  // ワ row
  { char: "ワ", row: "w", romaji: "wa" },
  { char: "ヲ", row: "w", romaji: "wo" },
  // ン
  { char: "ン", row: "n", romaji: "n" },
];

export const getAvailableRows = (characters: Character[]): string[] => {
  return Array.from(new Set(characters.map(char => char.row))).sort();
};

export const getCharactersByRow = (characters: Character[], row: string): Character[] => {
  return characters.filter(char => char.row === row);
};