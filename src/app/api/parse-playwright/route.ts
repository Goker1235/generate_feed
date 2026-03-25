import { NextRequest, NextResponse } from "next/server";
import { chromium } from "playwright";

export async function POST(req: NextRequest) {
  try {
    const { url, selectors } = await req.json() as {
      url: string;
      selectors: {
        container: string;
        title: string;
        price: string;
        image: string;
      };
    };

    // Локальный Chromium
    const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle" });

    const data = await page.$$eval(
      selectors.container,
      (elements, selectors) =>
        elements.map(el => ({
          title: el.querySelector(selectors.title)?.textContent?.trim() || "",
          price: el.querySelector(selectors.price)?.textContent?.trim() || "",
          image: el.querySelector(selectors.image)?.getAttribute("src") || ""
        })),
      selectors
    );

    await browser.close();

    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Playwright error:", err);
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
}