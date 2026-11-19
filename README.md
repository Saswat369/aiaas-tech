# AIAAS TECH website

A local-first, responsive landing page for AIAAS TECH PRIVATE LIMITED. Plain HTML, CSS, and JavaScript; no build step, package installation, API keys, or backend required.

## Preview locally

Open `index.html` in your browser, or run a local server from this folder:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Then visit http://localhost:4173. Stop the server with Ctrl+C.

## Files

- `index.html`: all page content, contact details, service catalogue, and company information.
- `styles.css`: responsive styles and product illustrations.
- `script.js`: mobile navigation, service links, email draft builder, and the animated canvas sculpture.
- `assets/favicon.svg`: the original AIAAS mark.

## Contact behavior

The form validates required fields, then opens a prefilled draft in the visitor’s configured email app addressed to `contact@aiaas-tech.com`. The visitor must send the email. There is no server submission, database, or email delivery service. The page also provides direct email and telephone links. Confirm the mailbox is set up before launch.

## Fonts and accessibility

DM Sans and Instrument Serif load from Google Fonts when internet access is available. System fonts provide an offline fallback. The site includes keyboard focus styles, a skip link, semantic sections, native service accordions, a mobile navigation menu, and support for reduced motion. The canvas animation pauses while offscreen or when the tab is hidden.

## Future GitHub Pages deployment

This website is prepared for static hosting, including a repository subpath, through relative asset links. When ready, put **the contents of this folder** at the repository root, then select the main branch and root folder in Settings → Pages. A custom domain can be configured at that point. No custom domain or DNS changes have been made in this local version.

No CNAME file is included yet, so preview and future domain setup remain separate. The intended domain in the supplied brief is `www.aiaas-tech.com`.

The website describes product solution categories; it does not claim they are launched standalone applications or link to nonexistent product dashboards. The page uses no invented clients, testimonials, certifications, or performance statistics.
