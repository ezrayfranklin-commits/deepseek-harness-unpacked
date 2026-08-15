from pathlib import Path

from playwright.sync_api import sync_playwright


output = Path("docs/images")
output.mkdir(parents=True, exist_ok=True)

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 920}, device_scale_factor=1)
    page.goto("http://127.0.0.1:4173", wait_until="networkidle")
    page.screenshot(path=output / "hero.png", full_page=False)
    page.locator("#loopPlay").click()
    page.locator(".topbar").evaluate("el => el.style.position = 'absolute'")

    page.locator("#architecture .section-head").evaluate("el => el.scrollIntoView({block: 'start'})")
    page.wait_for_timeout(900)
    page.screenshot(path=output / "architecture.png", full_page=False)

    tools = page.locator("#tools .tool-system")
    tools.scroll_into_view_if_needed()
    page.wait_for_timeout(300)
    tools.screenshot(path=output / "tool-system.png")
    browser.close()
