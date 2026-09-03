import type { Locale } from "@/lib/i18n/types";

export const templateTeamCardCopy: Readonly<Record<string, Readonly<Record<Locale, string>>>> = {
  "-kSMWtBCorQFkgUhm0DLk": {
    en: "A Japanese-language desk that passes each request to the matching specialist Bot.",
    "zh-Hant": "用日文交代事情，它會把每件事分給最合適的 Bot。",
    "zh-Hans": "用日文交代事情，它会把每件事分给最合适的 Bot。",
  },
  KZ9xav0Qad1U5QigEn7rh: {
    en: "Designs the Bot roster your company needs, and reshapes it as the business changes.",
    "zh-Hant": "幫你決定要有哪些 Bots，並按需要增加或停止使用它們。",
    "zh-Hans": "帮你决定要有哪些 Bots，并按需要增加或停止使用它们。",
  },
  "JugVUSPe_wSZg-in69owM": {
    en: "Assigns one owner Bot per request, then alerts you only when it finishes, stalls, or needs you.",
    "zh-Hant": "每件事只交給一個 Bot，完成、卡住或要你決定時才通知你。",
    "zh-Hans": "每件事只交给一个 Bot，完成、卡住或要你决定时才通知你。",
  },
  "8dB3XPIA8XIopvQUIC73P": {
    en: "Add this Head Bot and it creates the coding specialist Bots on your account.",
    "zh-Hant": "加入後，它會替你建立一組會寫程式的 Bots。",
    "zh-Hans": "加入后，它会替你建立一组会写程序的 Bots。",
  },
  FaRchqvTT6ZCRVPf0JABl: {
    en: "Type START after adding Kirk, and six specialist Bots join the bridge.",
    "zh-Hant": "輸入 START 後，它會替你建立 6 個不同角色的 Bots。",
    "zh-Hans": "输入 START 后，它会替你建立 6 个不同角色的 Bots。",
  },
  "6I-yjMRU1BmiYNfZgWXBK": {
    en: "A personal inbox that opens rooms and creates the specialist Bot each request needs.",
    "zh-Hant": "你把生活上的事情告訴它，它會建立合適的 Bot 幫你處理。",
    "zh-Hans": "你把生活上的事情告诉它，它会建立合适的 Bot 帮你处理。",
  },
  j7B5LHnEIPTuPQZxxQwpx: {
    en: "Sends each request to the right specialist Bot and confirms the handoff; it does not handle it itself.",
    "zh-Hant": "把每件事交給合適的 Bot，並告訴你已經交給誰。",
    "zh-Hans": "把每件事交给合适的 Bot，并告诉你已经交给谁。",
  },
  GU4KJSYtPZeiLf8ubPMXY: {
    en: "Coordinates artwork, LightBurn, and machine-setup Bots; the laser waits for your approval.",
    "zh-Hant": "幫你安排圖案和機器，你同意後才開始雕刻。",
    "zh-Hans": "帮你安排图案和机器，你同意后才开始雕刻。",
  },
  "FU-Ev6_Ju4lFGWwWRD0GD": {
    en: "Runs projects from Notion, where specialist Bots claim items from a shared board.",
    "zh-Hant": "查看 Notion 裡要做的事情，再分給不同的 Bots。",
    "zh-Hans": "查看 Notion 里要做的事情，再分给不同的 Bots。",
  },
  "rrvGu13S5uYCc09WP7A-9": {
    en: "Manages specialist Bots and only brings you the decisions that truly need you.",
    "zh-Hant": "幫你管理一隊 Bots，只有需要你決定時才通知你。",
    "zh-Hans": "帮你管理一队 Bots，只有需要你决定时才通知你。",
  },
  _2vi1lOY4oiBaJDA3S8l1: {
    en: "Asks a few questions, then creates the starter Bots you need.",
    "zh-Hant": "先問你幾個簡單問題，再替你建立需要的 Bots。",
    "zh-Hans": "先问你几个简单问题，再替你建立需要的 Bots。",
  },
  vOipeiu0AZ7CuC5ynw5h0: {
    en: "A professional inbox that opens a room and creates one specialist Bot for each named request.",
    "zh-Hant": "你把工作上的事情告訴它，它會建立對應的 Bot。",
    "zh-Hans": "你把工作上的事情告诉它，它会建立对应的 Bot。",
  },
  Bt48h63v32_q_shWVlEBb: {
    en: "Routes requests to specialist Bots and steps in only when no teammate owns one.",
    "zh-Hant": "把事情分給其他 Bots，沒有 Bot 處理時才自己處理。",
    "zh-Hans": "把事情分给其他 Bots，没有 Bot 处理时才自己处理。",
  },
  y_D2m_51Lww_oWJwIEHSg: {
    en: "Reads how a WhatsApp group speaks, drafts friend Bots, and waits for your approval before creating them.",
    "zh-Hant": "查看 WhatsApp 群組怎樣聊天，先寫出像朋友一樣說話的 Bot，你同意後才建立。",
    "zh-Hans": "查看 WhatsApp 群组怎样聊天，先写出像朋友一样说话的 Bot，你同意后才建立。",
  },
};

export function getTemplateTeamCardCopy(id: string, locale: Locale) {
  return templateTeamCardCopy[id]?.[locale];
}
