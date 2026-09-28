import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function openSite(page: Page) {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("button", { name: "Pause decorative animation" })).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
}

async function expectNoHorizontalOverflow(page: Page) {
  const widths = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
  }));
  expect(widths.document, JSON.stringify(widths)).toBeLessThanOrEqual(widths.viewport + 1);
  expect(widths.body, JSON.stringify(widths)).toBeLessThanOrEqual(widths.viewport + 1);
}

for (const width of [360, 390, 768, 1024, 1440, 1920]) {
  test(`layout remains usable without horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await openSite(page);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expectNoHorizontalOverflow(page);
    for (const selector of ["#services", "#process", "#contact", "footer"]) {
      await page.locator(selector).scrollIntoViewIfNeeded();
      await expectNoHorizontalOverflow(page);
    }
    await expect(page.getByRole("button", { name: "Open email draft" })).toBeAttached();
  });
}

test("seven service chapters expose distinct working interactions", async ({ page }) => {
  await openSite(page);
  const navigation = page.getByRole("navigation", { name: "Explore services" });
  await expect(navigation.getByRole("link")).toHaveCount(7);
  await navigation.getByRole("link", { name: /Custom software/ }).click();
  await page
    .getByRole("group", { name: "Explore software workflows" })
    .getByRole("button", { name: "Projects", exact: true })
    .click();
  await expect(page.locator(".workspace-content")).toContainText("Customer portal");
  await page.getByRole("button", { name: "Preview checkout", exact: true }).click();
  await expect(page.locator(".checkout-detail")).toContainText("Item selected");
  await page.getByRole("button", { name: "Back to collection", exact: true }).click();
  await expect(page.locator(".store-preview")).toContainText("A considered collection");
  await page.getByRole("button", { name: "Android", exact: true }).click();
  await expect(page.getByRole("button", { name: "Android", exact: true })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page
    .getByRole("group", { name: "Mobile screen" })
    .getByRole("button", { name: "Activity" })
    .click();
  await expect(page.locator(".phone-note")).toContainText("Project review recorded");
  await page.getByRole("button", { name: "Run example", exact: true }).click();
  await expect(page.locator(".flow-result")).toContainText("Example complete");
  await page
    .getByRole("group", { name: "Explore security layers" })
    .getByRole("button", { name: "Review", exact: true })
    .click();
  await expect(page.locator(".security-explanation")).toContainText("qualified specialist");
  await page
    .getByRole("group", { name: "Explore deployment stages" })
    .getByRole("button", { name: "Deploy" })
    .click();
  await expect(page.locator(".deployment-explanation")).toContainText("agreed deployment plan");
  await page.getByRole("button", { name: "Improve a system" }).click();
  await expect(page.locator(".decision-route")).toContainText("Understand the friction");
  await expect(page.locator("[data-service-index]")).toHaveCount(7);
});

test("mobile navigation closes with Escape, restores focus and follows section links", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openSite(page);
  const open = page.getByRole("button", { name: "Open navigation" });
  const dialog = page.getByRole("dialog", { name: "Explore Quentagon" });
  await open.click();
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Close navigation" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(open).toBeFocused();
  await open.click();
  await dialog.getByRole("link", { name: "Services" }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page).toHaveURL(/#services$/);
  await expect(page.locator("#services")).toBeInViewport();
});

test("light is the default regardless of system preference and overrides persist", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await openSite(page);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Toggle light and dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(await page.evaluate(() => localStorage.getItem("quentagon-theme"))).toBe("dark");
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.emulateMedia({ colorScheme: "dark" });
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

for (const action of ["Sign in", "Sign up"]) {
  test(`${action} opens an honest coming-soon preview without authentication fields`, async ({
    page,
  }) => {
    await openSite(page);
    const trigger = page.getByRole("button", { name: action, exact: true });
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: /Your project/ });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText("Coming soon", { exact: true })).toBeVisible();
    await expect(dialog).toContainText(`${action} will be available`);
    await expect(dialog.locator("input, form")).toHaveCount(0);
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
    await expect(page).toHaveURL("/");
  });
}

test("contact enforces valid details and clearly offers an email draft", async ({ page }) => {
  await openSite(page);
  const name = page.getByLabel("Your name");
  const email = page.getByLabel("Email address", { exact: true });
  const message = page.getByLabel("A little about your project");
  const submit = page.getByRole("button", { name: "Open email draft" });
  const form = page.locator("form.contact-form");
  const outgoingSubmissions: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "POST") outgoingSubmissions.push(request.url());
  });
  await submit.click();
  await expect(name).toBeFocused();
  expect(await name.evaluate((input: HTMLInputElement) => input.validity.valueMissing)).toBe(true);
  await name.fill("Alex Customer");
  await email.fill("not-an-email");
  await message.fill("We need to connect stock records with our online store.");
  await submit.click();
  await expect(email).toBeFocused();
  expect(await email.evaluate((input: HTMLInputElement) => input.validity.typeMismatch)).toBe(true);
  await email.fill("alex@example.com");
  expect(await form.evaluate((element: HTMLFormElement) => element.checkValidity())).toBe(true);
  await expect(form).toContainText("Opens a draft in your email app.");
  await expect(form).toContainText("Nothing is sent automatically.");
  await expect(form.getByRole("link", { name: "rizad.dev@gmail.com" })).toHaveAttribute(
    "href",
    "mailto:rizad.dev@gmail.com",
  );
  await expect(form.locator(".form-status")).toBeEmpty();
  expect(outgoingSubmissions).toEqual([]);
  // Deliberately do not submit the valid form: the browser must not launch an
  // external email client during automation, and no real message is sent.
});

for (const theme of ["dark", "light"] as const) {
  test(`page passes automated WCAG A and AA checks in ${theme} theme`, async ({ page }) => {
    test.setTimeout(90_000);
    await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
    await page.addInitScript((value) => localStorage.setItem("quentagon-theme", value), theme);
    await openSite(page);
    await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

test("reduced motion preserves content and uses immediate scrolling", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openSite(page);
  expect(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(
    true,
  );
  expect(
    await page.locator("html").evaluate((element) => getComputedStyle(element).scrollBehavior),
  ).toBe("auto");
  await page.getByRole("link", { name: "Explore our services", exact: true }).first().click();
  await expect(page.locator("#services")).toBeInViewport();
  await expect(page.locator("#cybersecurity")).toContainText("specialists");
  await expect(page.locator("#process")).toContainText("Discover");
  await expect(page.locator("#contact")).toContainText("conversation");
});

for (const variant of [
  { name: "desktop-dark", width: 1440, height: 1000, theme: "dark" },
  { name: "desktop-light", width: 1440, height: 1000, theme: "light" },
  { name: "mobile-light", width: 390, height: 844, theme: "light" },
] as const) {
  test(`capture ${variant.name} for visual review`, async ({ page }, testInfo) => {
    test.setTimeout(90_000);
    await page.setViewportSize({ width: variant.width, height: variant.height });
    await page.emulateMedia({ colorScheme: variant.theme, reducedMotion: "reduce" });
    await page.addInitScript(
      (value) => localStorage.setItem("quentagon-theme", value),
      variant.theme,
    );
    await openSite(page);
    // Visit each section so lazy images and any in-view presentation are ready.
    for (const selector of [
      "#services",
      "#process",
      "#work",
      "#products",
      "#about",
      "#contact",
      "footer",
    ]) {
      await page.locator(selector).scrollIntoViewIfNeeded();
    }
    await expect(page.locator(".hero-visual svg.pentagon-art")).toBeAttached();
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expectNoHorizontalOverflow(page);
    const path = testInfo.outputPath(`${variant.name}.png`);
    await page.screenshot({ path, animations: "disabled" });
    await testInfo.attach(variant.name, { path, contentType: "image/png" });
  });
}

test("project journey exposes deliverables and decisions through stage controls", async ({
  page,
}) => {
  await openSite(page);
  const process = page.locator("#process");
  const stages = process.getByRole("tablist", { name: "Project stages" });
  await expect(stages.getByRole("tab")).toHaveCount(8);
  const discover = stages.getByRole("tab", { name: /Discover/ });
  const design = stages.getByRole("tab", { name: /Design/ });
  const build = stages.getByRole("tab", { name: /Build/ });
  await design.click();
  await expect(design).toHaveAttribute("aria-selected", "true");
  let panel = process.getByRole("tabpanel", { name: /Design/ });
  await expect(panel).toContainText("Your input");
  await expect(panel).toContainText("reviewable prototype");
  await expect(panel).toContainText("design feedback and agreed changes");
  await design.press("ArrowRight");
  await expect(build).toBeFocused();
  await expect(build).toHaveAttribute("aria-selected", "true");
  panel = process.getByRole("tabpanel", { name: /Build/ });
  await expect(panel).toContainText("Working software increments and demonstrations.");
  await expect(panel).toContainText("Track completed work, open issues and change requests.");
  await process.getByRole("button", { name: "Previous stage" }).click();
  await expect(design).toHaveAttribute("aria-selected", "true");
  await discover.click();
  await expect(process.getByRole("button", { name: "Previous stage" })).toBeDisabled();
  await process.getByRole("button", { name: "Next stage" }).click();
  await expect(stages.getByRole("tab", { name: /Define/ })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await stages.getByRole("tab", { name: /Support/ }).click();
  await expect(process.getByRole("button", { name: "Next stage" })).toBeDisabled();
  await expect(process.getByRole("tabpanel", { name: /Support/ })).toContainText(
    "agreed improvement backlog",
  );
  await expect(process).toContainText("Illustrative view");
  await expect(stages.getByRole("tab", { selected: true })).toHaveCount(1);
});

test("decorative motion can be paused without a WebGL renderer", async ({ page }) => {
  await openSite(page);
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.locator("[data-service-index]")).toHaveCount(7);
  await page.getByRole("button", { name: "Pause decorative animation" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "paused");
  await page.getByRole("button", { name: "Resume decorative animation" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "active");
});

test("runtime has no page errors and missing routes have a useful recovery", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await openSite(page);
  await page.locator("#ai-automation").scrollIntoViewIfNeeded();
  await page.locator("#project-brief").scrollIntoViewIfNeeded();
  expect(errors).toEqual([]);
  await page.goto("/not-a-real-page");
  await expect(page.getByRole("link", { name: "Return home" })).toBeVisible();
});

test("page remains interactive when WebGL is unavailable", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(HTMLCanvasElement.prototype, "getContext", { value: () => null });
  });
  await openSite(page);
  await expect(page.locator("canvas")).toHaveCount(0);
  await page
    .getByRole("group", { name: "Explore security layers" })
    .getByRole("button", { name: "Review", exact: true })
    .click();
  await expect(page.locator(".security-explanation")).toContainText("qualified specialist");
});

test("all navigation links and section CTAs reach an existing visible destination", async ({
  page,
}) => {
  test.setTimeout(120_000);
  await openSite(page);
  const links = await page
    .locator('a[href^="#"]:visible')
    .evaluateAll((nodes) =>
      nodes.map((n) => ({ href: n.getAttribute("href")!, text: n.textContent?.trim() })),
    );
  for (const { href, text } of links) {
    if (href === "#main") continue;
    const link = page
      .locator(`a[href="${href}"]:visible`)
      .filter({ hasText: text || "" })
      .first();
    await link.click();
    await expect(page.locator(href)).toBeInViewport();
  }
  for (const summary of await page.locator("#work summary").all()) {
    await summary.click();
    await expect(summary.locator("..")).toHaveAttribute("open", "");
    await summary.click();
  }
});

test("forward and reverse scrolling restore the cinematic hero without drift", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await openSite(page);
  const range = await page
    .locator(".hero-journey")
    .evaluate((el) => el.getBoundingClientRect().height - innerHeight);
  const camera = page.locator(".hero-camera");
  const initial = await camera.evaluate((el) => getComputedStyle(el).transform);
  for (const fraction of [0.3, 0.65, 1, 0.65, 0.3]) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), range * fraction);
    await expect
      .poll(() => camera.evaluate((el) => getComputedStyle(el).transform))
      .not.toBe(initial);
    await expectNoHorizontalOverflow(page);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect
    .poll(() => page.locator(".hero-copy").evaluate((el) => Number(getComputedStyle(el).opacity)))
    .toBeGreaterThan(0.999);
  await expect
    .poll(async () =>
      camera.evaluate((el) => Number(new DOMMatrixReadOnly(getComputedStyle(el).transform).m41)),
    )
    .toBeGreaterThan(-0.1);
  await expect(
    page.getByRole("link", { name: "Start your project", exact: true }),
  ).toBeInViewport();
});

test("every local resource downloads successfully and images decode", async ({ page }) => {
  const failed: string[] = [];
  page.on("requestfailed", (request) =>
    failed.push(request.url() + ": " + request.failure()?.errorText),
  );
  page.on("response", (response) => {
    if (response.status() >= 400) failed.push(response.url() + ": " + response.status());
  });
  await openSite(page);
  await page.locator("footer").scrollIntoViewIfNeeded();
  await page.waitForLoadState("networkidle");
  const images = await page.locator("img").evaluateAll((nodes) =>
    nodes.map((node) => {
      const img = node as HTMLImageElement;
      return { src: img.currentSrc, loaded: img.complete && img.naturalWidth > 0 };
    }),
  );
  expect(
    images.every((img) => img.loaded),
    JSON.stringify(images),
  ).toBe(true);
  expect(await page.evaluate(() => document.fonts.status)).toBe("loaded");
  expect(failed).toEqual([]);
});
