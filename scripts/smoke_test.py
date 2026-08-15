from pathlib import Path
from playwright.sync_api import sync_playwright

shots = Path("artifacts")
shots.mkdir(exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 1000}, device_scale_factor=1)
    errors = []
    page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)
    page.on("pageerror", lambda exc: errors.append(str(exc)))
    page.goto("http://127.0.0.1:4173", wait_until="networkidle")
    assert page.title() == "DeepSeek Harness · 源码解构"
    assert page.locator("section").count() >= 8
    page.locator('[data-detail="web"]').click()
    assert page.locator("#detailTitle").inner_text() == "dsh-web-app"
    page.locator('[data-pipe]').nth(3).click()
    assert "execute waterfall" in page.locator("#pipeText").inner_text()
    page.screenshot(path=str(shots / "desktop.png"), full_page=True)
    mobile = browser.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=1)
    mobile.goto("http://127.0.0.1:4173", wait_until="networkidle")
    overflow = mobile.locator("body").evaluate("""el => ({width: el.scrollWidth, viewport: innerWidth, offenders: [...document.querySelectorAll('*')].filter(n => n.getBoundingClientRect().right > innerWidth + 1 || n.getBoundingClientRect().left < -1).slice(0, 12).map(n => ({tag:n.tagName, cls:n.className, left:n.getBoundingClientRect().left, right:n.getBoundingClientRect().right}))})""")
    print(overflow)
    assert overflow["width"] <= overflow["viewport"]
    mobile.screenshot(path=str(shots / "mobile.png"), full_page=True)
    assert not errors, errors
    print("PASS desktop+mobile, interactions, console")
    browser.close()
