import type { ErrorDto } from "@en/common/tracker";

export const reportError = (visitorId: string) => {
  // 捕获全局JS错误
  window.addEventListener("error", (e: ErrorEvent) => {
    console.log(e);
    const body: ErrorDto = {
      visitorId,
      error: "js",
      message: e.message,
      stack: e.error.stack,
      url: e.filename,
    };
    console.log(body);
  });
  // 捕获全局Promise错误
  window.addEventListener("unhandledrejection", (e: PromiseRejectionEvent) => {
    const isError = e.reason instanceof Error;
    const body: ErrorDto = {
      visitorId,
      error: "promise",
      message: isError ? e.reason.message : JSON.stringify(e.reason),
      stack: isError ? e.reason.stack : "Promise Rejection",
      url: window.location.href,
    };
    console.log(body);
  });
};
