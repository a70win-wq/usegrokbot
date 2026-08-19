export const THEME_STORAGE_KEY = "usegrokbot:theme";

export const themeBootScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");document.documentElement.setAttribute("data-theme",t==="dark"?"dark":"light");document.documentElement.style.colorScheme=t==="dark"?"dark":"light";}catch(e){document.documentElement.setAttribute("data-theme","light");document.documentElement.style.colorScheme="light";}})();`;
