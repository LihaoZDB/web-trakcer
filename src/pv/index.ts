import { report } from "@/report";
import type { PvDto, TrackerConfig } from "@en/common/tracker";

const reportView = (visitorId: string, config: TrackerConfig) => {
  let url = config.baseUrl + config.pv.api;
  const isHash = window.location.href.includes("#");
  const body: PvDto = {
    visitorId,
    url: window.location.protocol + "//" + window.location.host,
    referrer: document.referrer,
    path: isHash ? "/" + window.location.hash : window.location.pathname,
  };
  report(url, body);
};

export const reportPv = (visitorId: string, config: TrackerConfig) => {
  // 路由的模式 hash history
  window.addEventListener("hashchange", (e) => {
    reportView(visitorId, config);
  });
  // 监听 popstate 事件，处理浏览器前进 后退按钮
  window.addEventListener("popstate", (e) => {
    reportView(visitorId, config);
  });

  // 监听 pushState 事件，处理路由跳转
  const originalPushState = history.pushState;
  history.pushState = function (...args) {
    originalPushState.apply(history, args);
    reportView(visitorId, config);
  };

  // 监听 replaceState 事件，处理路由跳转
  const originalReplaceState = history.replaceState;
  history.replaceState = function (...args) {
    originalReplaceState.apply(history, args);
    reportView(visitorId, config);
  };
};
