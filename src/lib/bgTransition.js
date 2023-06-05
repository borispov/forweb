import inView from "./viewport";

export default function bgTransitionOnElement(sel = "[data-bg='dark']", win, doc) {
  let document = doc || document;
  let window = win || window;

  let e = document.querySelector(sel);

  window.addEventListener('scroll', function() {
    let isV = inView(e);
    let isDark = document.body.getAttribute("data-color-mode") === "dark";
    if (isV && !isDark) {
      document.body.setAttribute("data-color-mode", "dark");
    } else if (!isV && isDark) {
      document.body.setAttribute("data-color-mode", "light");
    }
  })
}


