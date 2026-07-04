# TRIVOX AI — SEO Action Plan (audit 2026-07-03)

**SEO Health Score: ~85/100.** On-page + technical are strong. The gap is **off-page + local + content depth**. Nothing is blocking indexing.

## ✅ Already solid (no action)
- Title 64 chars, meta description 157 chars, single H1, canonical present
- 3× JSON-LD (ProfessionalService + WebSite + FAQPage + OfferCatalog)
- robots.txt (welcomes GPTBot/Perplexity/Claude/Gemini), sitemap.xml (3 URLs), llms.txt present
- HSTS on, OG image resolves (200), 0 images missing alt, mobile responsive

---

## 🔴 CRITICAL — do now
1. **www vs apex canonical mismatch.** Canonical says `https://trivox.ca/` but the site serves on `https://www.trivox.ca`. Pick ONE primary and 301 the other; make canonical match the one that actually serves. (Ties into the pending Namecheap apex A-record `@ → 75.2.60.5` from `trivox-site-dns-fix`.) Duplicate-domain signals hurt ranking.

## 🟠 HIGH — this week
2. **Google Business Profile (THE off-page lever).** Create/claim GBP for TRIVOX AI:
   - Category: *Software company* (secondary: *Marketing agency* / *Business management consultant*)
   - Service-area business = Toronto + GTA (no public address needed)
   - NAP identical to site (name TRIVOX AI, info@trivox.ca, area Toronto ON CA)
   - Add website link, services, 5-10 photos, first posts
   - **Get 5+ reviews** from existing clients (Carlos, Marco, etc.) — reviews are the #1 local ranking factor and TRIVOX has near-zero
3. **Add `X-Content-Type-Options: nosniff`** (+ basic security headers) via a Netlify `_headers` file. 2-min fix.

## 🟡 MEDIUM — this month
4. **Content depth.** 3 pages ranks for brand only. Add dedicated service pages (`/ai-automation-toronto`, `/ai-voice-agents`, `/workflow-automation`) + start the blog/case-study engine already in the business plan. Each targets a keyword cluster. Internal-link them from the homepage ledger.
5. **Citations / directories.** Submit consistent NAP to Clutch, Google, LinkedIn company page, local Toronto directories → early backlinks + trust.
6. **Case-study pages** off the 80+ demos → real "work" URLs (not just the external demo hub) so trivox.ca itself gains indexable depth.

## 🟢 LOW — backlog
7. Add `BreadcrumbList` schema on inner pages.
8. `Organization.foundingDate` / `sameAs` GBP link once GBP exists.
9. Add an OG image per key page (currently one global OG).

---

### The one-liner
Site is technically clean — stop optimizing code. **Growth now comes from: (1) fix the www/apex canonical, (2) stand up Google Business Profile + collect reviews, (3) add content depth (service pages + case studies).** GBP + reviews is the highest-leverage move for "AI automation agency Toronto".
