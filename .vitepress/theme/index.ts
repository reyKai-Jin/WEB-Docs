import DefaultTheme from "vitepress/theme";

import "./style/var.css";
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件 app 就是 vue 的 app
    if (typeof window !== "undefined") {
      if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
          navigator.serviceWorker
            .register("./sw.js")
            .then((registration) => {
              console.log("SW registered: ");
            })
            .catch((registrationError) => {
              console.log("SW registration failed: ");
            });
        });
      }
    }
  },
};
