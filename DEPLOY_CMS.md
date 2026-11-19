# Admin Panel / CMS: setup guide

## What this is
A dependency-free Node.js server that serves your website, a protected Admin Panel at `/admin`, and a JSON API. Content lives in a SQLite database (`data/cms.db`); uploads live in `uploads/`. When you publish in the admin, the server regenerates the public pages (static HTML), `sitemap.xml` and `robots.txt`.

## Requirements
* Node.js **22.13 or newer** (uses the built-in `node:sqlite`; no `npm install` is needed).
* A host with a **persistent disk** (VPS, Render, Railway, Fly.io, etc.). Static-only hosts and serverless platforms cannot run it, because the database and uploads must persist.

## Run it
```
node server.js        # or: npm start
```
* Website: http://localhost:3000
* Admin: http://localhost:3000/admin
* The initial admin login was given to you in the chat. You are forced to choose a new password at first login. Then change the admin email in Account Settings.
* If `data/cms.db` does not exist, the first start creates it from your current site content and prints a one-time admin password in the console (or uses `ADMIN_EMAIL` / `ADMIN_PASSWORD` if set).

## Environment variables
Copy `.env.example` to `.env`. All are optional for local use.
| Variable | Purpose |
|---|---|
| `PUBLIC_URL` | Public site address. Used in password-reset links. |
| `COOKIE_SECURE` | `true` if served over HTTPS directly. Behind a proxy that sends `X-Forwarded-Proto: https` it is automatic. |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Email delivery through Resend (resend.com): contact notifications and password reset emails. |
| `SEND_ACK` | `true` sends visitors a short acknowledgment. |
| `ALLOWED_ORIGIN` | Reject cross-site form posts. |
| `CMS_DB` | Custom database path. |

## Deploy checklist
1. Upload the project folder (including `data/cms.db`) to your host. Run `node server.js` behind HTTPS (a reverse proxy or the host's TLS).
2. Put `.env` on the server, never in the repository.
3. Log in, set a new password, change the admin email.
4. In **SEO Settings**, set the real **Site URL** and publish. This fixes canonical URLs and the sitemap (they use `https://www.example.com` until you do).
5. In **Profile Settings**, replace the placeholder email, and upload your photo and CV. Publish.
6. In **Website Settings**, review navigation and footer. Publish.

## Password reset
Login page > "Forgot your password?". With Resend configured the link is emailed. Without email, the link is written to the server console/log. You can also reset from the server: `node scripts/create-admin.js you@example.com "new-strong-password"`.

## Backups
* Admin > Account Settings > "Create backup now" (writes a consistent copy to `backups/`), or `npm run backup` (also copies `uploads/`).
* Copy `backups/` and `uploads/` off the server regularly (cron + rsync/S3). Restoring = stop the server, replace `data/cms.db` and `uploads/`, start again.

## How publishing works
* **Save draft** stores changes privately. Visitors never see drafts.
* **Preview** renders the public page with your saved draft (noindex, only visible to you).
* **Publish** makes the change live and rebuilds the static pages, sitemap and robots.txt.
* Articles: Draft, Published, Scheduled (published automatically by the server at the chosen time) and Archived. Only Published articles get public pages, appear in the sitemap and are indexable.

## Case-study pages (/portfolio/<project>)
Five detailed case studies are included: VPNRanks, All About AI, Medical Lien Management, GreenSense Billing and Virtual MoJoe. They are managed in **Portfolio > edit a project > "Case study"** (hero, snapshot, challenges, strategy blocks, verified metric cards, role, related projects, optional screenshots). Turn the "Publish a dedicated case-study page" toggle on for any other project to give it a page too. The Portfolio and Home cards link to these pages automatically.
* Replace the website preview placeholders with real screenshots and logos in **Media Library**, then choose them in the project's Media fields. Add Search Console or Ahrefs screenshots under "Supporting screenshots" (they only appear once added).
* Only verified metrics are shown. Edit or remove any metric card in the admin if a figure changes.

## Strategy pages (/strategies and four dedicated strategy pages)
Managed in **Admin > Strategies**. Each page is a list of content **blocks** (headings, paragraphs, lists, tables, callouts, card grids, and ready-made diagrams: comparison, flow, numbered workflow, hub/entity map, tiers/cluster, content hierarchy, page wireframe, keyword map, readability before/after), plus a hero, closing call to action, related links, an overview card and SEO fields.
* **Edit**: open a page, use the tabs (Page & hero, Content blocks, Closing & related, Strategy card, SEO). In Content blocks, expand a block to edit it; use the arrows to reorder, + to add a block below, the copy icon to duplicate, and the cross to delete. Use `**bold**` and `[text](/strategies/on-page-seo)` in text for emphasis and internal links.
* **Images and diagrams**: add an "Image / uploaded diagram" block and choose a file from the Media Library. "Screenshot" blocks show a labelled placeholder until you choose a real screenshot (the GEO page has four for the AI citation and ChatGPT referral evidence).
* **Preview / publish**: Preview opens the saved draft (noindex). Publish rebuilds the static pages and the sitemap. Unpublish removes a page from the site, the sitemap and the overview cards.
* **Add a new strategy page**: Strategies > New strategy page. Fill in the hero, blocks and "Strategy card" tab; once published it appears on the overview automatically and in other pages' "Other strategies" section. No code changes are needed.
* **Pages included**: Overview, On-Page SEO, GEO & AI SEO, Off-Page SEO & Digital PR (`/strategies/off-page-seo`) and Technical SEO & Website Performance (`/strategies/technical-seo`). The two newest pages are added to existing sites automatically on first start (a one-time migration; your existing edits are kept). On the GEO page the former "coming soon" off-page card becomes a link to the Off-Page page.
* **Code snippets**: use the "Code snippet" block for robots.txt, HTML or JSON-LD examples. They are shown as plain text. In normal text, wrap short code in backticks, like `rel="sponsored"`.
* The navigation entries "Strategies" and "Certifications" were added to Website Settings > Navigation by a one-time migration on first start. "Certifications" links to the dedicated `/certifications` page.
* The overview page always lives at `/strategies` and cannot be deleted (only unpublished).

## Certifications page (/certifications)
Managed in the admin under **Certifications** (add, edit, reorder with the arrows, feature, publish or unpublish, archive, delete) plus **Pages > Certifications** for the headings, section order, learning topic cards and SEO.
* The eight Semrush course titles are pre-loaded. No completion dates, credential IDs or verification links are included: add them only when you have them. The **Verify Credential** button appears only when a verification URL is filled in.
* Upload a certificate as an image (PNG, JPG, WebP). Until you do, the card shows a plain placeholder, not a fake certificate. PDF certificates are not supported as card images.
* The overview counts (number of certificates, provider, focus areas) are calculated from the published certificates every time you publish.

## Services pages (/services and /services/<name>)
Managed in **Admin > Service Pages**, with the same block editor as Strategies.
* The **Services overview** (`/services`) holds the hero, the service card grid (add, remove, reorder, change icon, text and link), the five-stage approach, industries, strengths, selected results, tools, FAQs and the closing call to action. Each is a content block you can edit. The page SEO title, description and social sharing fields are on the SEO tab.
* **FAQs**: edit the "FAQ accordion" block (question and answer pairs). **Tools**: edit the "Tools and platforms" block; a logo can be chosen from the Media Library for each tool, otherwise a lettered tile is shown.
* The eight **service pages** (`/services/technical-seo`, `/services/on-page-seo`, `/services/off-page-seo`, `/services/local-seo`, `/services/semantic-seo-entity-optimization`, `/services/geo-ai-search-optimization`, `/services/seo-audits-competitor-analysis`, `/services/keyword-research-content-strategy`) are basic pages that link to the detailed strategy pages. Change a page's address by editing its slug (and the card link on the overview). Add a new service with Service Pages > New service page.
* `/services/` with a trailing slash also works. The "Services" navigation link points to `/services`.
* A one-time migration adds these pages to an existing database on first start. It also applied the 2026-11-18 site edits: home buttons now go to the portfolio, six portfolio entries were archived (restore them under Portfolio by changing status), the professional experience was replaced, and the contact email was changed to rajahamza.parvaiz@gmail.com.

## Security summary
Scrypt password hashing, HttpOnly SameSite=Strict session cookie, CSRF token on every change, login rate limiting, forced first-login password change, all admin pages and APIs require a session, uploads validated by file content and served with `nosniff`, rich text sanitized with an allowlist (server side), strict Content-Security-Policy on the admin, no secrets in frontend code, parameterized SQL.

## Limits worth knowing
* Image conversion to WebP/resizing happens in the admin browser before upload (no server image library is used).
* Rate limits are in memory (they reset when the server restarts).
* There is one admin role today. The users table already has a `role` column for future roles.
* There is no standalone Services page on the public site; the Services editor controls the services grid on the Home page (and stores detail, deliverables and skills for a future page).
* Per-project SEO fields are stored, but projects have no individual public URL yet (case study pages are not built).
* Traffic analytics are not connected, so the dashboard shows a setup message instead of numbers.

## Tests
`npm test` runs the contact-handler tests and a 99-check end-to-end CMS test (it copies the project to a temp folder, starts the server there and exercises the API).

## Homepage sections (v14)
The homepage has an editable **SEO strategies** section (Pages > Home) whose cards come automatically from published strategy pages, and a button under *What I Bring to the Table* that links to Services.
