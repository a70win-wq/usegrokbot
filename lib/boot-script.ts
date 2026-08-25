export const BOOT_STORAGE_KEY = "usegrokbot:boot";

/** Max time the full-screen overlay may stay up. Never wait for images or `window.load`. */
export const BOOT_MAX_MS = 400;

/**
 * Runs before first paint (inline in `<body>`). Hides the boot overlay as soon as
 * the DOM is ready, or after BOOT_MAX_MS, whichever comes first. Repeat visits in
 * the same tab skip the overlay entirely.
 */
export const bootBootScript = `(function(){var h=document.documentElement;function skip(){h.setAttribute("data-boot","skip");try{window.__ugbBootDone=true;}catch(e){}}function off(){if(h.getAttribute("data-boot")==="skip")return;h.setAttribute("data-boot","off");try{window.__ugbBootDone=true;sessionStorage.setItem("${BOOT_STORAGE_KEY}","1");}catch(e){}}try{if(sessionStorage.getItem("${BOOT_STORAGE_KEY}")==="1"){skip();return;}if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches){skip();return;}}catch(e){}h.setAttribute("data-boot","1");if(document.readyState!=="loading"){off();return;}document.addEventListener("DOMContentLoaded",off,{once:true});setTimeout(off,${BOOT_MAX_MS});})();`;
