import type { UvDto } from "@en/common/tracker";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { UAParser } from "ua-parser-js";

export const getBrowserInfo = () => {
  const ua = new UAParser();
  return {
    browser: ua.getBrowser().name,
    os: ua.getOS().name,
    device: ua.getDevice().type || "desktop",
  };
};

export const getFingerprint = async () => {
  const browserInfo = getBrowserInfo();
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  const body: UvDto = {
    anonymousId: result.visitorId,
    browser: browserInfo.browser,
    os: browserInfo.os,
    device: browserInfo.device,
  };
  console.log(body);
};
