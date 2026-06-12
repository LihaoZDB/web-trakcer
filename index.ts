import type { TrackerConfig } from "@en/common/tracker";
import { getFingerprint } from "@/uv";

export class Tracker {
  constructor(private config: TrackerConfig) {
    this.init(config);
  }

  protected async init(config: TrackerConfig) {
    await getFingerprint();
  }

  setUserId(userId: string) {}
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
