import { chromium } from "playwright";

export async function POST(req: Request) {
  const { url, selectors } = await req.json();

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle" });

  // 👇 прокрутка страницы (очень важно для каталогов)
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 500;

      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve(true);
        }
      }, 300);
    });
  });

  // пауза после скролла
  await page.waitForTimeout(2000);

  await page.waitForSelector(selectors.container, {
    timeout: 15000,
  });

  const data = await page.evaluate((selectors) => {
    const items: any[] = [];

    const containers = document.querySelectorAll(selectors.container || "body");

    containers.forEach((el) => {
      const item: any = {};

      const get = (sel: string, attr?: string) => {
        const node = el.querySelector(sel);
        if (!node) return "";

        return attr
          ? node.getAttribute(attr) || ""
          : node.textContent?.trim() || "";
      };

      Object.entries(selectors).forEach(([key, selector]) => {
        if (key === "container") return;

        if (key.toLowerCase().includes("image") || key.includes("картинка")) {
          item[key] =
            get(selector as string, "src") ||
            get(selector as string, "data-src") ||
            get(selector as string, "srcset");
        } else {
          item[key] = get(selector as string);
        }
      });

      if (Object.values(item).some((v) => v)) {
        items.push(item);
      }
    });

    return items;
  }, selectors);

  await browser.close();

  return Response.json(data);
}
