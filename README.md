# 🎭 playwright-hypertextual

End-to-end tests for [hipertextual.com](https://hipertextual.com) built with **Playwright + TypeScript**.  
This project uses a lightweight **Page Object Model (POM)** to keep tests readable 🧩 and maintainable 🛠️.

---

## 🧾 Table of contents
- 📁 Project structure
- ⚙️ Prerequisites
- 🧩 Install
- 🧪 Run tests
- 🪄 Debugging / Reporting
- 🧱 Page Objects (overview)
- 💡 Troubleshooting


---

## 📁 Project structure
- `pages/`  
  - `LandingPage.ts` — helpers for the site landing (search, privacy modal).  
  - `SearchResultsPage.ts` — infinite-scroll search results helpers.  
  - `ArticlePage.ts` — article assertions (title, URL).
- `tests/tests/`  
  - `searchArticle.spec.ts` — main example test that searches and verifies an article.
- `playwright.config.ts` — Playwright configuration (baseURL, viewport, artifacts).
- `.gitignore` — ignored files.
- `README.md` — this file.

---

## ⚙️ Prerequisites
- 💻 macOS (commands below are Mac-friendly 😄)
- 🧩 Node.js >= 16 (recommended)
- 📦 npm (or yarn)

---

## 🧩 Install


install dependencies
```bash
npm install
```
install Playwright browsers (if not already)
```bash
npx playwright install

```
---
## 🧪 Run tests

Run all tests:
```bash
npx playwright test
```
Run all tests in parallel:
```bash
npx playwright test --workers=4
```
Run headed (visually):
```bash
npx playwright test --headed
```

---
## 🪄 Debugging & Reports

- 🖼️ HTML Report:
```bash
npx playwright show-report
# or open manually:
open playwright-report/index.html
```
- 📸 Screenshots & Videos: configured in playwright.config.ts

    - `screenshot: only-on-failure`
    - `video: retain-on-failure`
- 🔍 Traces:
    - Enable via `--trace` or in `config (use.trace).`

    - Then inspect with:
```bash
npx playwright show-trace trace.zip

```
---
## 🧱 Page Objects (overview)

#### LandingPage

- `acceptPrivacyDisclaimerIfVisible()` — dismiss cookie/privacy modal 🍪
- `clickSearchIcon()` — open site search 🔎
- `searchForArticle(title)` — type and submit search

#### SearchResultsPage

- `clickEntryHeaderContaining(word, maxAttempts?, delayMs?)` — scrolls through infinite results until a match is found (with a guard to avoid infinite loops).

#### ArticlePage

- `verifyArticleTitle(expectedTitle)` — asserts title match 📰
- `verifyArticleUrlContains(expectedSlug)` — asserts URL contains expected slug 🔗
---

## 💡 Troubleshooting

- 🧱 Missing browsers?
```bash
npx playwright install
```
- 🔄 Tests hang on infinite scroll?

    - Adjust `maxAttempts` / `delayMs` in `SearchResultsPage`.
- ⚡ Flaky search results?

    - Assert input value and wait for results before scrolling.
- 🧩 CI failures?

    - Check your `baseURL` in `playwright.config.ts` or override via environment vars.
