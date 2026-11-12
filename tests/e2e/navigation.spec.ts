import { expect, test } from "@playwright/test";

test.describe("Navigation (desktop)", () => {
  test("home renders primary nav links", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "التنقل الرئيسي" });
    await expect(nav.getByRole("link", { name: "الرئيسية" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "الأذكار" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "القرآن" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "الرقية" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "التسبيح" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "المفضلة" })).toBeVisible();
  });

  test("hash navigation updates the URL and scrolls", async ({ page }) => {
    await page.goto("/");
    const desktopNav = page.getByRole("navigation", { name: "التنقل الرئيسي" });
    await desktopNav.getByRole("link", { name: "الأذكار" }).click();
    await expect(page).toHaveURL(/#adhkar$/);
    await expect(page.locator("#adhkar")).toBeInViewport();
  });

  test("favorites route loads", async ({ page }) => {
    await page.goto("/");
    const desktopNav = page.getByRole("navigation", { name: "التنقل الرئيسي" });
    await desktopNav.getByRole("link", { name: "المفضلة" }).click();
    await expect(page).toHaveURL("/favorites");
    await expect(page.getByText("لم تحفظ شيئًا بعد")).toBeVisible();
  });

  test("quran index and reader navigation", async ({ page }) => {
    await page.goto("/");
    const desktopNav = page.getByRole("navigation", { name: "التنقل الرئيسي" });
    await desktopNav.getByRole("link", { name: "القرآن" }).click();
    await expect(page).toHaveURL(/#quran$/);

    await page.goto("/quran");
    await expect(page.getByRole("heading", { name: "سور القرآن" })).toBeVisible();

    const firstSurah = page.locator('a[href="/quran/1"]').first();
    await firstSurah.click();
    await expect(page).toHaveURL(/\/quran\/1$/);
    await expect(page.locator("h1")).toBeVisible();

    await page.getByRole("link", { name: "السورة التالية" }).click();
    await expect(page).toHaveURL(/\/quran\/2$/);
  });

  test("adhkar index and reader navigation", async ({ page }) => {
    await page.goto("/adhkar");
    await expect(page.getByRole("heading", { name: "اختر ذكرك" })).toBeVisible();

    await page.getByRole("link", { name: /أذكار الصباح/ }).first().click();
    await expect(page).toHaveURL(/\/adhkar\/morning$/);
    await expect(page.locator("#main-content").getByRole("link", { name: "الرئيسية" })).toBeVisible();
  });

  test("invalid route shows 404", async ({ page }) => {
    await page.goto("/adhkar/does-not-exist");
    await expect(page.getByText("404")).toBeVisible();
    await expect(page.getByRole("link", { name: "العودة إلى الرئيسية" })).toBeVisible();
  });

  test("refresh keeps hash route working", async ({ page }) => {
    await page.goto("/#quran");
    await page.reload();
    await expect(page).toHaveURL(/#quran$/);
    await expect(page.locator("#quran")).toBeInViewport();
  });

  test("back and forward navigation", async ({ page }) => {
    await page.goto("/");
    await page.goto("/favorites");
    await page.goBack();
    await expect(page).toHaveURL("/");
    await page.goForward();
    await expect(page).toHaveURL("/favorites");
  });
});

test.describe("Navigation (mobile)", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("mobile menu opens, closes on escape, and restores focus", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "فتح القائمة" });
    await expect(toggle).toBeVisible();

    await toggle.click();
    await expect(page.getByRole("button", { name: "إغلاق القائمة" })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "فتح القائمة" })).toBeVisible();
    await expect(toggle).toBeFocused();
  });

  test("mobile menu closes when a link is chosen", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "فتح القائمة" }).click();
    const mobileNav = page.getByRole("navigation", { name: "قائمة التنقل في الهاتف" });
    await mobileNav.getByRole("link", { name: "المفضلة" }).click();
    await expect(page).toHaveURL("/favorites");
    await expect(page.getByRole("button", { name: "فتح القائمة" })).toBeVisible();
  });

  test("mobile menu traps focus", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "فتح القائمة" }).click();

    const mobileNav = page.getByRole("navigation", { name: "قائمة التنقل في الهاتف" });
    const firstLink = mobileNav.getByRole("link", { name: "الرئيسية" });
    await expect(firstLink).toBeFocused();

    // Tab through all menu items; focus should wrap instead of leaving the menu.
    const menuItemCount = await mobileNav.locator("a[href], button:not([disabled])").count();
    for (let i = 0; i < menuItemCount; i += 1) {
      await page.keyboard.press("Tab");
    }
    await expect(firstLink).toBeFocused();
  });
});

test.describe("Keyboard navigation", () => {
  test("skip link is focusable and points to main content", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "انتقل إلى المحتوى الرئيسي" });
    await expect(skip).toBeFocused();
    await expect(skip).toHaveAttribute("href", "#main-content");
  });
});