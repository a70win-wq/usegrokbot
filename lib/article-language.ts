export const articleContentLanguages = ["en", "zh-Hant", "zh-Hans", "other"] as const;

export type ArticleContentLanguage = (typeof articleContentLanguages)[number];

export type ArticleLanguageFields = {
  contentLanguage?: ArticleContentLanguage;
  title?: string;
  headline?: string;
  body?: string;
};

const URL_TOKEN_RE = /https?:\/\/\S+/gi;
const HAN_RE = /\p{Script=Han}/gu;
const HIRAGANA_RE = /\p{Script=Hiragana}/gu;
const KATAKANA_RE = /\p{Script=Katakana}/gu;
const HANGUL_RE = /\p{Script=Hangul}/gu;
const LATIN_RE = /[A-Za-z]/g;

const TRADITIONAL_CHARS = new Set(
  "國對會這個來時說過關與為麼裡裏後從將還沒發經於並們條點長門開東車電語讓實現體業區萬學請見問題機寫讀聽視網頁選擇確認臺灣據".split(""),
);

const SIMPLIFIED_CHARS = new Set(
  "国对会这个来时说过关与为么里后从将还没发经于并们条点长门开东车电语让实现体业区万学请见问题机写读听视网页选择确认台湾据".split(""),
);

export function isArticleContentLanguage(value: string | undefined): value is ArticleContentLanguage {
  return value === "en" || value === "zh-Hant" || value === "zh-Hans" || value === "other";
}

export function detectArticleContentLanguage(text: string): ArticleContentLanguage {
  const sample = text.replace(URL_TOKEN_RE, " ").trim();
  if (!sample) return "other";

  const han = countMatches(sample, HAN_RE);
  const hiragana = countMatches(sample, HIRAGANA_RE);
  const katakana = countMatches(sample, KATAKANA_RE);
  const hangul = countMatches(sample, HANGUL_RE);
  const latin = countMatches(sample, LATIN_RE);

  if (hiragana + katakana >= 2 || hangul >= 2) return "other";

  if (han >= 2 && han >= latin * 0.15) {
    let traditional = 0;
    let simplified = 0;
    for (const char of sample) {
      if (TRADITIONAL_CHARS.has(char) && !SIMPLIFIED_CHARS.has(char)) traditional += 1;
      if (SIMPLIFIED_CHARS.has(char) && !TRADITIONAL_CHARS.has(char)) simplified += 1;
    }
    if (traditional > simplified) return "zh-Hant";
    if (simplified > traditional) return "zh-Hans";
    return "zh-Hans";
  }

  if (latin >= 8 && han < 2) return "en";
  if (latin > han && han < 2) return "en";
  return "other";
}

export function storyContentLanguage(story: ArticleLanguageFields): ArticleContentLanguage {
  if (isArticleContentLanguage(story.contentLanguage)) return story.contentLanguage;
  return detectArticleContentLanguage([story.title, story.headline, story.body].filter(Boolean).join("\n"));
}

function countMatches(text: string, pattern: RegExp) {
  const re = new RegExp(pattern.source, pattern.flags);
  return (text.match(re) ?? []).length;
}
