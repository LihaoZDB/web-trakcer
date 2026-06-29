import { report } from "@/report";
import type { PerformanceDto, TrackerConfig } from "@en/common/tracker";
import { onINP, onCLS } from "web-vitals";

export const reportPerformance = async (
  visitorId: string,
  config: TrackerConfig,
) => {
  let fp = 0; // 首次绘制时间
  let fcp = 0; // 首次内容绘制时间
  let lcp = 0; // 最大内容绘制时间
  let inp = 0; // 交互性能指标
  let cls = 0; // 累积布局偏移
  let url = config.baseUrl + config.performance.api;
  let performanceEntries = performance.getEntriesByType("paint");
  const fnEntry = performanceEntries.find(
    (entry) => entry.name === "first-paint",
  );
  const fcpEntry = performanceEntries.find(
    (entry) => entry.name === "first-contentful-paint",
  );
  if (fnEntry) fp = fnEntry.startTime;
  if (fcpEntry) fcp = fcpEntry.startTime;

  let lcpPromise = new Promise<{
    lcpTime: number;
    lcpObserver: PerformanceObserver;
  }>((resolve) => {
    let lcpObserver = new PerformanceObserver((entryList) => {
      resolve({
        lcpTime: entryList.getEntries().at(-1)?.startTime || 0,
        lcpObserver,
      });
    });
    lcpObserver.observe({ type: "largest-contentful-paint", buffered: true }); // buffer: true 历史记录和新的LCP性能都监听
  });

  const { lcpTime, lcpObserver } = await lcpPromise;
  lcpObserver.disconnect();
  lcp = lcpTime;

  onINP((metric) => {
    inp = metric.value;
  });

  onCLS((metric) => {
    cls = metric.value;
  });

  window.addEventListener(
    "visibilitychange",
    () => {
      if (document.visibilityState === "hidden") {
        // 页面不可见，报告性能数据
        console.log("reportPerformance", {
          visitorId,
          fp,
          fcp,
          lcp,
          inp,
          cls,
        });
        const body: PerformanceDto = {
          visitorId,
          fp,
          fcp,
          lcp,
          inp,
          cls,
        };
        report(url, body);
      }
    },
    { once: true },
  );
};
