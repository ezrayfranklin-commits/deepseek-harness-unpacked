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
    assert page.locator("html").get_attribute("lang") == "zh-CN"
    assert "发出一条消息以后" in page.locator(".hero-copy").inner_text()
    assert page.locator(".star-cta").get_attribute("href") == "https://github.com/ezrayfranklin-commits/deepseek-harness-unpacked"
    assert "Star" in page.locator(".star-cta").inner_text()
    assert page.locator("#languageList button:visible").count() == 4
    assert page.locator("#toolCatalog button").count() == 52
    assert page.locator("#architectureGroups .architecture-group").count() == 49
    assert page.locator("#commandCatalog article").count() == 7
    page.locator("#toolSearch").fill("cordis_")
    assert page.locator("#toolCatalog button").count() == 7
    page.locator("#toolCatalog button").first.click()
    assert "@deepseek-ai/dsh-tool-cordis" in page.locator("#toolDetail").inner_text()
    page.locator("#toolSearch").fill("")
    page.locator("#architectureSearch").fill("ui-model-selection")
    assert page.locator("#architectureGroups .architecture-group").count() == 1
    page.locator("#architectureGroups .architecture-group>button").click()
    assert page.locator("#architectureGroups a:visible").count() == 1
    page.locator("#architectureSearch").fill("")
    line = page.locator(".assembly-lines .p1")
    animation = line.evaluate("el => ({name: getComputedStyle(el).animationName, state: getComputedStyle(el).animationPlayState})")
    assert animation["name"] == "drawLine" and animation["state"] == "running"
    for locale, title_text in [("en", "Source Unpacked"), ("es", "Código al descubierto"), ("ja", "ソースコード解説"), ("zh-CN", "源码解构")]:
        page.locator(f'#languageList [data-locale="{locale}"]').click()
        assert page.locator("html").get_attribute("lang") == locale
        assert title_text in page.locator(".hero h1").inner_text()
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
    comment_view = browser.new_page(viewport={"width": 571, "height": 660}, device_scale_factor=1)
    comment_view.goto("http://127.0.0.1:4173/#architecture", wait_until="networkidle")
    assert comment_view.locator("#languageList button:visible").count() == 4
    assert comment_view.locator(".map-stage .node:visible").count() == 5
    comment_view.screenshot(path=str(shots / "comment-571.png"), full_page=False)
    assert not errors, errors
    print("PASS desktop+mobile, interactions, console")
    browser.close()
