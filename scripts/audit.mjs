import { chromium } from "@playwright/test";
import lighthouse from "lighthouse";
import { mkdir, writeFile } from "node:fs/promises";

const url = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3003";
const port = 9224;
const browser = await chromium.launch({ args: [`--remote-debugging-port=${port}`] });
try {
  const result = await lighthouse(url, {
    port,
    logLevel: "error",
    output: "json",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
  });
  if (!result) throw new Error("Lighthouse did not produce a report");
  await mkdir("artifacts", { recursive: true });
  await writeFile("artifacts/lighthouse-mobile.json", result.report);
  const { lhr } = result;
  console.log(
    JSON.stringify(
      {
        scores: Object.fromEntries(
          Object.entries(lhr.categories).map(([key, value]) => [key, value.score]),
        ),
        metrics: Object.fromEntries(
          [
            "first-contentful-paint",
            "largest-contentful-paint",
            "total-blocking-time",
            "cumulative-layout-shift",
          ].map((key) => [key, lhr.audits[key].displayValue]),
        ),
        warnings: lhr.runWarnings,
      },
      null,
      2,
    ),
  );
  if (lhr.runtimeError) throw new Error(lhr.runtimeError.message);
} finally {
  await browser.close();
}
