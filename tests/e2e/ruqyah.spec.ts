import { expect, test } from "@playwright/test";

test.describe("Ruqyah (Arabic)", () => {
  test("homepage section previews sources and opens the reader", async ({
    page,
  }) => {
    await page.goto("/");

    const section = page.locator("#ruqyah");
    await expect(section).toBeVisible();
    await expect(
      section.getByRole("heading", {
        level: 2,
        name: "شِفاءٌ وطمأنينة من كتاب الله وسنة نبيه",
      }),
    ).toBeVisible();
    await expect(
      section.getByRole("heading", { level: 3, name: "آية الكرسي" }),
    ).toBeVisible();
    await expect(section.getByText(/الآية ٢٥٥/)).toBeVisible();
    await expect(
      section.getByRole("heading", {
        level: 4,
        name: "رقية جبريل عليه السلام",
      }),
    ).toBeVisible();
    await expect(section.getByText("٦ أدعية ثابتة")).toBeVisible();

    await section.getByRole("link", { name: "ابدأ الرقية" }).click();
    await expect(page).toHaveURL("/ruqyah");
    await expect(
      page.getByRole("heading", { level: 1, name: "آيات وأدعية الرقية" }),
    ).toBeVisible();
  });

  test("nav link scrolls to the section then opens the reader", async ({
    page,
  }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "التنقل الرئيسي" });
    await nav.getByRole("link", { name: "الرقية" }).click();

    await expect(page).toHaveURL(/\/#ruqyah$/);
    await expect(page.locator("#ruqyah")).toBeInViewport();

    await page
      .locator("#ruqyah")
      .getByRole("link", { name: "ابدأ الرقية" })
      .click();

    await expect(page).toHaveURL("/ruqyah");
    await expect(nav.getByRole("link", { name: "الرقية" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "آيات وأدعية الرقية",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("tab", { name: /آيات الرقية/ }),
    ).toHaveAttribute("aria-selected", "true");
    await expect(
      page.getByRole("heading", { level: 3, name: "سورة الفاتحة" }),
    ).toBeVisible();
    await expect(page.getByText(/الآيات ١-٧/)).toBeVisible();
    const reader = page.locator('section[dir="rtl"]');
    await expect(
      reader.getByText("من القرآن الكريم", { exact: true }),
    ).toBeVisible();
  });

  test("counter, next and progress persistence", async ({ page }) => {
    await page.goto("/ruqyah");

    const counter = page.getByRole("button", { name: "تسجيل مرة جديدة" });
    await counter.click();
    await expect(
      page.getByText("أحسنت، أتممت القراءة. يمكنك الانتقال إلى التالي."),
    ).toBeVisible();

    await page.getByRole("button", { name: "الآيات التالية" }).click();
    await expect(
      page.getByRole("heading", { level: 3, name: "آية الكرسي" }),
    ).toBeVisible();

    await page.reload();
    await expect(
      page.getByRole("heading", { level: 3, name: "آية الكرسي" }),
    ).toBeVisible();
  });

  test("supplications, favorites and deep links", async ({ page }) => {
    await page.goto("/ruqyah");

    await page.getByRole("tab", { name: /الأدعية النبوية/ }).click();
    await expect(
      page.getByRole("heading", { level: 3, name: "رقية جبريل عليه السلام" }),
    ).toBeVisible();
    await expect(page.getByText(/صحيح مسلم — ٢١٨٦/)).toBeVisible();

    await page.getByRole("button", { name: "إضافة إلى المفضلة" }).click();

    await page.goto("/favorites");
    const favoriteLink = page.getByRole("link", {
      name: "الرقية الشرعية — الأدعية",
    });
    await expect(favoriteLink).toBeVisible();
    await favoriteLink.click();

    await expect(page).toHaveURL(/\/ruqyah\?item=ruqyah-dua-jibril/);
    await expect(
      page.getByRole("heading", { level: 3, name: "رقية جبريل عليه السلام" }),
    ).toBeVisible();
  });

  test("only the established repeated count is shown", async ({ page }) => {
    await page.goto("/ruqyah?item=ruqyah-verse-ikhlas");

    await expect(
      page.getByRole("heading", { level: 3, name: "سورة الإخلاص" }),
    ).toBeVisible();
    await expect(page.getByText("تُقرأ ٣ مرات")).toBeVisible();
    await expect(page.getByText(/ورد في حديث عائشة/)).toBeVisible();
    await expect(page.getByText(/صحيح البخاري ٥٠١٧/).first()).toBeVisible();

    const counter = page.getByRole("button", { name: "تسجيل مرة جديدة" });
    await counter.click();
    await counter.click();
    await counter.click();

    await expect(
      page.getByText("أحسنت، أتممت القراءة. يمكنك الانتقال إلى التالي."),
    ).toBeVisible();
    await expect(counter).toBeDisabled();
  });
});

test.describe("Ruqyah (Arabic only)", () => {
  test("reader stays RTL and has no English route", async ({ page }) => {
    await page.goto("/ruqyah");

    const reader = page.locator('section[dir="rtl"]');
    await expect(reader).toBeVisible();
    await expect(reader).toHaveAttribute("lang", "ar");
    await expect(page.getByRole("link", { name: "English" })).toHaveCount(0);

    await page.goto("/ruqyah/en");
    await expect(page.getByText("404")).toBeVisible();
  });
});

test.describe("Ruqyah (mobile)", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("homepage section fits the viewport", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("#ruqyah")).toBeVisible();
    await expect(
      page.locator("#ruqyah").getByRole("link", { name: "ابدأ الرقية" }),
    ).toBeVisible();

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test("reader controls fit the viewport", async ({ page }) => {
    await page.goto("/ruqyah");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "آيات وأدعية الرقية",
      }),
    ).toBeVisible();
    await expect(page.getByRole("tab", { name: /آيات الرقية/ })).toBeVisible();
    await expect(
      page.getByRole("tab", { name: /الأدعية النبوية/ }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "تسجيل مرة جديدة" }),
    ).toBeVisible();

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
