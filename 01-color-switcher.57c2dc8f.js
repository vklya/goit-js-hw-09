!function(){var t={body:document.querySelector("body"),start:document.querySelector("[data-start]"),stop:document.querySelector("[data-stop]")},e=null;function o(){t.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}function n(e){t.start.disabled=e}t.start.addEventListener("click",(function(){e=setInterval(o,1e3),n(!0)})),t.stop.addEventListener("click",(function(){clearInterval(e),n(!1)}))}();
//# sourceMappingURL=01-color-switcher.57c2dc8f.js.map
