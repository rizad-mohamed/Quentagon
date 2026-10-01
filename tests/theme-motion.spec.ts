import { test, expect, type Page } from "@playwright/test";

async function palette(page: Page) {
  return page.locator("#services").evaluate((section) => {
    const nodes = [section, ...section.querySelectorAll("*")];
    return nodes.flatMap((element) =>
      [null, "::before", "::after"].map((pseudo) => {
        const style = getComputedStyle(element, pseudo);
        return [
          style.color,
          style.backgroundColor,
          style.backgroundImage,
          style.borderColor,
          style.boxShadow,
          style.fill,
          style.stroke,
          style.stopColor,
        ];
      }),
    );
  });
}

for (const width of [390, 768, 1280, 1440, 1920]) {
  test(`Services palette updates immediately and restores across states at ${width}px`, async ({
    page,
  }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/", { waitUntil: "load" });
    const toggle = page.getByRole("button", { name: "Toggle light and dark theme" });
    await expect(page.locator("#services article")).toHaveCount(7);
    for (const state of [0, 1, 2, 3]) {
      await page.locator(".enterprise-rail button").nth(state).click();
      await page
        .locator(".device-controls button")
        .nth(state % 3)
        .click();
      await page
        .locator(".app-controls button")
        .nth(state % 2)
        .click();
      await page
        .locator(".app-tabs button")
        .nth(state % 3)
        .click();
      if (state < 3) await page.locator(".web-screen button").first().click();
      await expect(page.locator(".security-demo")).toHaveCSS(
        "background-color",
        "rgb(240, 244, 248)",
      );
      await expect(page.locator(".security-explanation")).toHaveCSS("color", "rgb(82, 107, 125)");
      const light = await palette(page);
      // Click inside evaluate to sample in the same frame, before any transition can finish.
      await toggle.evaluate((button: HTMLButtonElement) => button.click());
      await expect(page.locator(".security-demo")).toHaveCSS("background-color", "rgb(29, 41, 55)");
      await expect(page.locator(".security-explanation")).toHaveCSS("color", "rgb(179, 198, 213)");
      const dark = await palette(page);
      expect(dark).not.toEqual(light);
      await expect(page.locator(".enterprise-title h4")).toHaveCSS("color", "rgb(239, 247, 255)");
      await expect(page.locator(".app-phone")).toHaveCSS("background-color", "rgb(17, 30, 43)");
      await expect(page.locator(".web-screen")).toHaveCSS("background-color", "rgb(17, 30, 43)");
      await page.evaluate(
        () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())),
      );
      expect(
        JSON.stringify(await palette(page)) === JSON.stringify(dark),
        "Dark palette stays stable",
      ).toBe(true);
      await toggle.evaluate((button: HTMLButtonElement) => button.click());
      expect(
        JSON.stringify(await palette(page)) === JSON.stringify(light),
        "Light palette restores",
      ).toBe(true);
      await toggle.evaluate((button: HTMLButtonElement) => button.click());
      expect(
        JSON.stringify(await palette(page)) === JSON.stringify(dark),
        "Dark palette stays stable",
      ).toBe(true);
      await toggle.evaluate((button: HTMLButtonElement) => button.click());
      expect(
        JSON.stringify(await palette(page)) === JSON.stringify(light),
        "Light palette restores",
      ).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
    }
    await page.locator("#services").screenshot({ path: `artifacts/services-${width}-light.png` });
    await toggle.evaluate((button: HTMLButtonElement) => button.click());
    await page.locator("#services").screenshot({ path: `artifacts/services-${width}-dark.png` });
  });
}

test("live animations keep their theme and stop when reduced motion changes", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/", { waitUntil: "load" });
  await page.locator("#custom-software").scrollIntoViewIfNeeded();
  await expect(page.locator(".system-dashboard")).toHaveCSS("animation-duration", "0.22s");
  await page
    .getByRole("button", { name: "Toggle light and dark theme" })
    .evaluate((button: HTMLButtonElement) => button.click());
  await expect(page.locator(".enterprise-title h4")).toHaveCSS("color", "rgb(239, 247, 255)");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() =>
      page
        .locator("#services")
        .evaluate(
          (section) =>
            section
              .getAnimations({ subtree: true })
              .filter((animation) => animation.playState === "running").length,
        ),
    )
    .toBe(0);
  await page.locator(".enterprise-rail button").nth(2).click();
  await expect(page.locator(".enterprise-title h4")).toHaveText("Finance dashboard");
  await page.locator(".app-controls button").nth(1).click();
  await page.locator(".app-tabs button").nth(1).click();
  await expect(page.locator(".app-order")).toBeVisible();
  await page.locator(".app-tabs button").nth(0).focus();
  await page.keyboard.press("Tab");
  await expect(page.locator(".app-tabs button").nth(1)).toBeFocused();
  await expect(page.locator(".app-tabs button").nth(1)).toHaveCSS("outline-style", "solid");
});
