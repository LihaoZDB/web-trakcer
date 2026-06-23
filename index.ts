import type { TrackerConfig } from "@en/common/tracker";
import { getFingerprint } from "@/uv";
import { reportEvent } from "@/event";
import { reportError } from "@/error";
import { reportPv } from "@/pv";
import { reportPerformance } from "@/performance";

export class Tracker {
  constructor(private config: TrackerConfig) {
    this.init(config); // 初始化方法
  }

  // protected 允许子类和内部使用
  protected async init(config: TrackerConfig) {
    await getFingerprint();
    reportEvent("asasdasd");
    reportError("asasdasd");
    reportPv("asasdasd");
    reportPerformance("asasdasd");
  }

  public setUserId(userId: string) {}
}

const tracker = new Tracker({
  baseUrl: "http://localhost:3000",
  uv: {
    api: "/api/uv",
    updateApi: "/api/uv/update",
  },
  pv: {
    api: "/api/pv",
  },
  event: {
    api: "/api/event",
  },
  error: {
    api: "/api/error",
  },
  performance: {
    api: "/api/performance",
  },
});
