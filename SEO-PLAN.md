# TRIVOX AI — SEO / AEO Plan

**Site:** https://trivox.ca · **Geo:** Toronto base + Canada remote · **Type:** service-area business
**Goal:** inbound leads from search + get cited by AI engines (ChatGPT, Perplexity, Gemini, AI Overviews).

---

## Honest reality (read first)

- SEO is a **2–4 month** game minimum. A single landing page does **not** rank for competitive head terms ("AI automation Toronto") on its own — Google needs depth + authority + off-site signals.
- The single highest-ROI lead lever for a local agency is **Google Business Profile (GBP)**, not the website. Do that first (below). It can show in the local pack in weeks, not months.
- This plan does the on-page + technical foundation (done in code today) and lays the content + off-site path. Pair it with outbound — SEO is the compounding channel, not the fast one.

---

## ✅ Done today (in the `impeccable-overhaul` branch)

| Item | Status |
|---|---|
| Geo title + meta description (Toronto & Canada) | ✅ |
| Canonical, robots meta, keywords, theme-color | ✅ |
| Geo meta (CA-ON, Toronto, coords) | ✅ |
| Open Graph (10 tags) + Twitter card (5) + 1200×630 OG image | ✅ |
| JSON-LD: ProfessionalService + WebSite + FAQPage | ✅ |
| `robots.txt` (allows GPTBot/PerplexityBot/ClaudeBot/Google-Extended; blocks CCBot) | ✅ |
| `sitemap.xml` | ✅ |
| `llms.txt` (AEO roadmap file for AI engines) | ✅ |
| Visible FAQ section (6 Q&As, long-tail + AEO, ~400 words added) | ✅ |

**Page word count:** ~550 → ~950. Still thin for head terms; FAQ + future pages fix that.

---

## Keyword map

### Primary (head — long game, need content depth)
- `AI automation agency Toronto`
- `AI automation Toronto` / `AI automation Canada`
- `AI chatbot agency Toronto`
- `AI voice agent for business`

### Secondary (service intent)
- `CRM automation Toronto`, `workflow automation agency`, `lead automation system`, `AI receptionist Canada`, `business process automation Toronto`

### Long-tail (FAQ + blog — easiest wins, high intent, AEO-friendly)
- `how much does AI automation cost for a small business`
- `what is an AI voice agent`
- `AI automation for real estate agents / dental clinics / [niche]`
- `best AI automation agency in Toronto`
- `AI chatbot for [niche] website`

> Long-tail + niche-specific pages rank fastest and convert best. Go niche before head.

---

## Content roadmap (priority order)

1. **Niche service/landing pages** (1 per ICP from CLAUDE.md) — the real ranking + conversion engine:
   - `/ai-automation-real-estate`, `/ai-automation-dental-clinics`, `/ai-automation-for-[niche]`
   - Each: H1 with `[service] for [niche] in Toronto/Canada`, problem→system→outcome, a relevant demo embed (from the 42-demo hub), niche FAQ, CTA. 700–1,200 words. Service schema per page.
2. **Comparison / alternative pages** (≈33% of AI citations come from these):
   - "AI voice agent vs human receptionist", "TRIVOX vs DIY (ManyChat/Zapier) automation", "n8n vs Make for business automation"
3. **Definitive guides** (authority + AEO):
   - "AI automation for small business: the 2026 guide (Canada)" — comprehensive, data, cited stats, internal links to service pages.
4. **Case studies** (E-E-A-T, proof) — turn delivered builds (Carlos, clinic chatbot, etc.) into outcome-numbered stories. Add `Review`/`AggregateRating` schema once you have testimonials.

Cadence: 1 niche page/week > sporadic blog. Each page = a new keyword door.

---

## Off-site = the actual lead driver (do these)

1. **Google Business Profile** (service-area, hide address) — categories: "Software company" / "Business management consultant". Add services, photos, the trivox.ca link, post weekly. **Get reviews** (ask every delivered client). This drives local-pack leads faster than anything on the site.
2. **Directory citations** (NAP consistency): Clutch, GoodFirms, DesignRush, Bing Places, Apple Business Connect, local Toronto business dirs. Same name/email everywhere.
3. **Third-party presence** (6.5× more AI citations than your own domain): authentic Reddit answers (r/smallbusiness, r/Entrepreneur, r/Toronto), Quora, a thin but accurate LinkedIn company page, YouTube (record one demo walkthrough — AI Overviews cite YouTube heavily).
4. **Backlinks**: guest posts on Toronto SMB / marketing blogs, local chamber, partner cross-links (Focus, etc.).

---

## AEO (get cited by ChatGPT / Perplexity / Gemini)

- ✅ `llms.txt`, FAQ schema, allowed AI bots — done.
- Keep answer blocks **40–60 words, self-contained, lead with the answer** (FAQ already does this).
- Add **statistics with sources** to pages (+37% citation boost per Princeton GEO study).
- Monthly check: run your top 15 queries through ChatGPT/Perplexity/Google AI Overviews, log if TRIVOX is cited and who is instead.

---

## 30-day action list

- [ ] Deploy this branch to trivox.ca, then submit `sitemap.xml` in **Google Search Console** + **Bing Webmaster**.
- [ ] Set up / claim **Google Business Profile**, add services + 5 photos, request first 3 reviews.
- [ ] Build niche page #1 (`ai-automation-real-estate` or your strongest ICP).
- [ ] List on 5 directories (consistent NAP).
- [ ] Record 1 demo walkthrough → YouTube, embed on site.
- [ ] Verify OG preview (LinkedIn Post Inspector, Twitter Card Validator) + schema (Google Rich Results Test).

---
_Generated 2026-06-21 · pairs with on-page work in `impeccable-overhaul` branch._
