import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("theme reaches workflow previews and assistant preview remains honest", async ({ page }) => {
  await openSite(page);
  const automation = page.locator(".automation-demo");
  const consulting = page.locator("#consulting .engagement-demo");
  const themedParts = [
    ".engagement-top",
    ".engagement-handoff",
    ".engagement-track button[aria-pressed='true'] > span",
    ".engagement-output",
  ];
  const lightColor = await automation.evaluate(
    (element) => getComputedStyle(element).backgroundColor,
  );
  const lightParts = await Promise.all(
    themedParts.map((selector) =>
      consulting.locator(selector).evaluate((element) => getComputedStyle(element).backgroundColor),
    ),
  );
  await page.getByRole("button", { name: "Toggle light and dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect
    .poll(() => automation.evaluate((element) => getComputedStyle(element).backgroundColor))
    .not.toBe(lightColor);
  for (const [index, selector] of themedParts.entries()) {
    await expect
      .poll(() =>
        consulting
          .locator(selector)
          .evaluate((element) => getComputedStyle(element).backgroundColor),
      )
      .not.toBe(lightParts[index]);
  }
  await expect(page.locator(".workflow-agent")).toContainText("Quentagon AI");
  const agentFits = await page.locator(".workflow-agent .automation-core").evaluate((element) => {
    const parent = element.closest(".workflow-agent")!.getBoundingClientRect();
    const child = element.getBoundingClientRect();
    return child.left >= parent.left && child.right <= parent.right;
  });
  expect(agentFits).toBe(true);
  await page.getByRole("button", { name: "Open Quentagon Bot preview" }).click();
  await expect(page.getByText("Chat and WhatsApp support are on the way.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Close Quentagon Bot" })).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  await page.getByRole("button", { name: "Close Quentagon Bot" }).click();
  await expect(page.getByText("Chat and WhatsApp support are on the way.")).toHaveCount(0);
});

async function openSite(page: Page) {
  await page.goto("/", { waitUntil: "load" });
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

for (const width of [320, 360, 390, 430, 768, 834, 1024, 1180, 1440, 1920, 2560]) {
  test(`layout remains usable without horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await openSite(page);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expectNoHorizontalOverflow(page);
    for (const selector of ["#services", "#process", "#contact", "footer.site-footer"]) {
      await page.locator(selector).scrollIntoViewIfNeeded();
      await expectNoHorizontalOverflow(page);
    }
    await expect(page.getByRole("button", { name: "Open email draft" })).toBeAttached();
  });
}

for (const viewport of [
  { width: 667, height: 375 },
  { width: 1024, height: 768 },
  { width: 2560, height: 1440 },
  { width: 3840, height: 2160 },
]) {
  test(`landscape layout stays within ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await openSite(page);
    for (const selector of ["#services", "#consulting", "#contact", "footer.site-footer"]) {
      await page.locator(selector).scrollIntoViewIfNeeded();
      await expectNoHorizontalOverflow(page);
    }
  });
}

test("visible buttons meet the minimum target size on narrow and wide screens", async ({
  page,
}) => {
  for (const width of [320, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await openSite(page);
    const small = await page.locator("button").evaluateAll((buttons) =>
      buttons.flatMap((button) => {
        const rect = button.getBoundingClientRect();
        if (
          rect.width === 0 ||
          rect.height === 0 ||
          getComputedStyle(button).visibility === "hidden"
        )
          return [];
        return rect.width < 24 || rect.height < 24
          ? [
              `${button.textContent?.trim() || button.getAttribute("aria-label")}: ${Math.round(rect.width)}x${Math.round(rect.height)}`,
            ]
          : [];
      }),
    );
    expect(small, `${width}px`).toEqual([]);
  }
});

test("service infographics respond to operations, devices and platforms", async ({ page }) => {
  await openSite(page);
  const software = page.locator("#custom-software");
  await expect(software.locator(".enterprise-window")).toContainText("Management System");
  await expect(software.locator(".enterprise-window")).not.toContainText("CYMS");
  await software
    .getByRole("group", { name: "Explore Management System dashboards" })
    .getByRole("button", { name: "Finance" })
    .click();
  await expect(software.locator(".system-finance")).toContainText("Spend against forecast");
  await software
    .getByRole("group", { name: "Explore Management System dashboards" })
    .getByRole("button", { name: "Projects" })
    .click();
  await expect(software.locator(".system-kanban-column")).toHaveCount(3);
  await software.getByRole("button", { name: "People" }).click();
  await expect(software.locator(".system-roster")).toContainText("Team availability");
  await software.getByRole("button", { name: "Command" }).click();
  await expect(software.locator(".system-command")).toContainText("PORTFOLIO PULSE");

  const web = page.locator("#web-commerce");
  await web
    .getByRole("group", { name: "Preview website screen size" })
    .getByRole("button", { name: "Mobile" })
    .click();
  await expect(web.locator(".web-device")).toHaveClass(/web-device-mobile/);
  await expect(
    web.getByRole("img", { name: "Illustration of the Form 01 table lamp" }),
  ).toBeVisible();
  await web.getByRole("button", { name: "Explore the collection" }).click();
  await expect(web.locator(".web-story")).toContainText("LIGHTING / FORM 01");
  await web.getByRole("button", { name: /Add to bag/ }).click();
  await expect(web.locator(".web-checkout")).toContainText("SECURE CHECKOUT");
  await expect(
    web.getByRole("img", { name: "Illustration of the Form 01 table lamp" }),
  ).toBeVisible();
  await web
    .getByRole("group", { name: "Preview website screen size" })
    .getByRole("button", { name: "Tablet" })
    .click();
  await expect(web.locator(".web-device")).toHaveClass(/web-device-tablet/);
  await web
    .getByRole("group", { name: "Preview website screen size" })
    .getByRole("button", { name: "Desktop" })
    .click();
  await expect(web.locator(".web-device")).toHaveClass(/web-device-desktop/);

  const mobile = page.locator("#mobile-apps");
  await mobile
    .getByRole("group", { name: "Preview mobile platform" })
    .getByRole("button", { name: "Android" })
    .click();
  await expect(mobile.locator(".app-phone")).toHaveClass(/app-phone-android/);
  await mobile.getByRole("button", { name: "Save item" }).click();
  await expect(mobile.getByRole("button", { name: "Saved" })).toBeVisible();
  await mobile
    .getByRole("group", { name: "Explore app screens" })
    .getByRole("button", { name: "Orders" })
    .click();
  await expect(mobile.locator(".app-order")).toContainText("Order on its way");

  await expect(page.locator("#ai-automation .automation-octagon")).toBeVisible();
  await expect(page.locator("#ai-automation .robot-head")).toBeVisible();
  await expect(page.locator("#ai-automation .automation-footer")).toContainText("Human oversight");
  await expect(page.getByRole("button", { name: "Run example" })).toHaveCount(0);
  await page
    .getByRole("group", { name: "Explore security layers" })
    .getByRole("button", { name: "Review" })
    .click();
  await expect(page.locator(".security-explanation")).toContainText("qualified specialist");
  await page
    .getByRole("group", { name: "Explore deployment stages" })
    .getByRole("button", { name: "Deploy" })
    .click();
  await expect(page.locator(".deployment-explanation")).toContainText("agreed deployment plan");
  await expect(page.locator("[data-service-index]")).toHaveCount(7);
});

test("commerce preview follows viewport size and keeps mobile actions inside its frame", async ({
  page,
}) => {
  await page.setViewportSize({ width: 768, height: 900 });
  await openSite(page);
  const web = page.locator("#web-commerce");
  const controls = web.getByRole("group", { name: "Preview website screen size" });
  await expect(controls.getByRole("button", { name: "Tablet" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.setViewportSize({ width: 360, height: 800 });
  await expect(controls.getByRole("button", { name: "Mobile" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  for (const action of ["Explore the collection", "Add to bag", "Explore again"]) {
    const button = web.getByRole("button", { name: new RegExp(action) });
    await expect(button).toBeVisible();
    const fits = await button.evaluate((element) => {
      const frame = element.closest(".web-screen")!.getBoundingClientRect();
      const bounds = element.getBoundingClientRect();
      return (
        bounds.left >= frame.left && bounds.right <= frame.right && bounds.bottom <= frame.bottom
      );
    });
    expect(fits, action).toBe(true);
    await button.click();
  }
  await page.setViewportSize({ width: 320, height: 800 });
  await expect(web.locator(".web-device")).toHaveClass(/web-device-mobile/);
  expect(
    await web.locator(".web-product").evaluate((element) => element.getBoundingClientRect().width),
  ).toBeGreaterThan(150);
  await expectNoHorizontalOverflow(page);
});

test("cloud and consulting workspaces expose clear stages and deliverables", async ({ page }) => {
  await openSite(page);
  const cloud = page.locator("#cloud-devops");
  await cloud
    .getByRole("group", { name: "Explore deployment stages" })
    .getByRole("button", { name: "Connect" })
    .click();
  await expect(cloud.locator(".infra-detail")).toContainText("Routes validated");
  await cloud.getByRole("button", { name: "Deploy" }).click();
  await expect(cloud.locator(".deployment-explanation")).toContainText("agreed deployment plan");

  const consulting = page.locator("#consulting");
  await consulting
    .getByRole("group", { name: "Explore your starting point" })
    .getByRole("button", { name: "Improve a system" })
    .click();
  await expect(consulting.locator(".engagement-story")).toContainText("Locate the friction");
  await consulting
    .getByRole("group", { name: "Explore consultancy story phases" })
    .getByRole("button", { name: "Deliver" })
    .click();
  await expect(consulting.locator(".engagement-output")).toContainText("Reliable updated system");
});

test("automatic product stories animate and the AI eyes follow the pointer", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await openSite(page);
  const software = page.locator("#custom-software");
  await expect(
    software
      .getByRole("group", { name: "Explore Management System dashboards" })
      .getByRole("button", { name: "Projects" }),
  ).toHaveAttribute("aria-pressed", "true", { timeout: 7000 });
  await expect(software.locator(".system-demo-pointer")).toBeVisible();

  const web = page.locator("#web-commerce");
  await web.scrollIntoViewIfNeeded();
  await web.getByRole("button", { name: "Mobile" }).click();
  const commerceShot = testInfo.outputPath("commerce-mobile.png");
  await web.screenshot({ path: commerceShot });
  await testInfo.attach("commerce-mobile", {
    path: commerceShot,
    contentType: "image/png",
  });

  const mobile = page.locator("#mobile-apps");
  await mobile.scrollIntoViewIfNeeded();
  await expect(mobile.locator(".app-hand")).toBeVisible();
  await expect
    .poll(() => mobile.locator(".app-content").evaluate((element) => element.scrollTop), {
      timeout: 7000,
    })
    .toBeGreaterThan(20);
  await mobile.getByRole("button", { name: "Android / Galaxy" }).click();
  await expect(mobile.locator(".app-phone")).toHaveCSS("opacity", "1");
  const galaxyShot = testInfo.outputPath("galaxy-preview.png");
  await mobile.screenshot({ path: galaxyShot });
  await testInfo.attach("galaxy-preview", {
    path: galaxyShot,
    contentType: "image/png",
  });

  const automation = page.locator("#ai-automation .automation-demo");
  await automation.scrollIntoViewIfNeeded();
  const initial = await automation.locator(".flow-result").textContent();
  await expect
    .poll(() => automation.locator(".flow-result").textContent(), { timeout: 4000 })
    .not.toBe(initial);
  await expect(automation.locator(".binary-stream")).toHaveCount(2);
  const bounds = await automation.boundingBox();
  expect(bounds).not.toBeNull();
  await page.mouse.move(bounds!.x + bounds!.width * 0.85, bounds!.y + bounds!.height * 0.5);
  await expect
    .poll(() =>
      automation.evaluate((element) =>
        Number.parseFloat(element.style.getPropertyValue("--eye-x")),
      ),
    )
    .toBeGreaterThan(0);
  const automationShot = testInfo.outputPath("automation-preview.png");
  await automation.screenshot({ path: automationShot });
  await testInfo.attach("automation-preview", {
    path: automationShot,
    contentType: "image/png",
  });

  const cloud = page.locator("#cloud-devops .infra-demo");
  await cloud.scrollIntoViewIfNeeded();
  const initialCloudStage = await cloud.locator(".infra-canvas").getAttribute("class");
  await expect
    .poll(() => cloud.locator(".infra-canvas").getAttribute("class"), { timeout: 6000 })
    .not.toBe(initialCloudStage);
  await expect(cloud.locator(".infra-wire i").first()).toHaveCSS("animation-name", "infra-packet");

  const consulting = page.locator("#consulting .engagement-demo");
  await consulting.scrollIntoViewIfNeeded();
  const selectedPhase = await consulting
    .getByRole("group", { name: "Explore consultancy story phases" })
    .getByRole("button", { pressed: true })
    .textContent();
  await expect
    .poll(
      () =>
        consulting
          .getByRole("group", { name: "Explore consultancy story phases" })
          .getByRole("button", { pressed: true })
          .textContent(),
      { timeout: 6000 },
    )
    .not.toBe(selectedPhase);
});
test("global connections respond to market selections", async ({ page }) => {
  await openSite(page);
  const map = page.locator("#global-network");
  await map
    .getByRole("group", { name: "Explore global markets" })
    .getByRole("button", { name: "New Zealand" })
    .click();
  await expect(map.locator(".market-story")).toContainText("New Zealand");
  await expect(map.locator(".review-preview")).toContainText("Illustrative review");
  await expect(map.locator(".map-routes .is-selected")).toHaveCount(1);
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
  const hydrationErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" && message.text().includes("hydrated"))
      hydrationErrors.push(message.text());
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openSite(page);
  expect(hydrationErrors).toEqual([]);
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
      "footer.site-footer",
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
  await page.locator("footer.site-footer").scrollIntoViewIfNeeded();
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
