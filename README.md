# Inland Empire AI

A responsive, static marketing website for **inland-empire-ai.com**. Plain HTML, CSS, and JavaScript; no package installation, backend, or build step required.

## Local preview

From this folder:

```sh
python3 -m http.server 8080
```

Open <http://localhost:8080>. Stop the server with Ctrl+C.

## Pages and editing

- [Home](index.html): positioning, services, and local service area.
- [Services](services.html): filterable service details and FAQs.
- [24-hour kickoff](kickoff.html): process, readiness requirements, and scope.
- [Contact](contact.html): email draft builder and privacy information.
- [Styles](assets/styles.css): shared palette, fonts, gradients, and responsive layout.
- [JavaScript](assets/site.js): mobile navigation, filters, and inquiry drafts.

Each page has real HTML content and links so the core website remains usable without JavaScript. The mobile menu, service filters, and contact draft builder enhance that content when JavaScript is available. Google Fonts supplies Space Grotesk and Manrope; system sans-serif fonts are the fallback.

The contact builder does **not** submit a message. It validates entries and generates a draft for the visitor to send using an email app. Visitors without a configured app can copy the draft and use webmail. The direct contact address is **john.dohoney@inland-empire-ai.com**. No form entries are stored by site code, and no analytics are installed. Keep this explanation accurate if you add integrations.

## Publish with GitHub Pages

1. Create a GitHub repository and push this folder to its `main` branch. This workspace is not yet a Git repository. GitHub Pages is available for public repositories on GitHub Free; private repository availability depends on your plan.
2. In **Settings → Pages → Build and deployment**, choose **GitHub Actions** as the source.
3. Run **Deploy static site to GitHub Pages** from the Actions tab, or push a change to `main`. The included [workflow](.github/workflows/pages.yml) uploads only public site files, not this README or the original prompt.
4. Wait for the deployment to succeed. No GitHub repository or live deployment is created just by generating these files.

If you prefer branch-based publishing, select **Deploy from a branch → main → /(root)** in Pages settings and remove the Actions workflow to avoid two deployment methods. The `.nojekyll` file disables Jekyll processing. Branch publishing makes all repository-root files publicly addressable, so remove anything you do not want published.

## Connect inland-empire-ai.com

Verify ownership of the domain in your GitHub account's **Settings → Pages** first, following [GitHub’s verification instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages).

1. In the repository’s **Settings → Pages → Custom domain**, enter `inland-empire-ai.com` and save it **before changing DNS**. The included [CNAME](CNAME) supports branch publishing; Actions deployments still require this setting because the CNAME file is ignored by Actions.
2. At your DNS provider, set these apex (`@`) A records:

   | Type | Host | Value |
   | --- | --- | --- |
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |

3. For `www`, add a CNAME pointing to `<your-github-username>.github.io` (replace the placeholder; do not include a repository path).
4. Remove conflicting web A/AAAA/CNAME records, but **preserve your email MX and email-related TXT records**. Avoid wildcard DNS records.
5. Wait for DNS and certificate provisioning, then enable **Enforce HTTPS** in Pages settings. DNS propagation can take up to 24 hours.
6. Test the apex domain, the `www` redirect, page navigation, and the contact email on the deployed site.

Use [GitHub’s current custom-domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) as the authority for DNS values and settings.

## Search visibility

The site includes unique titles and descriptions, canonical URLs, Open Graph metadata, semantic headings, local service copy, ProfessionalService structured data, a [sitemap](sitemap.xml), and [robots.txt](robots.txt). These help search engines understand the site but do not guarantee rankings.

After the domain is live, verify it in Google Search Console and Bing Webmaster Tools and submit `https://inland-empire-ai.com/sitemap.xml`. Keep business details consistent with any business directory profiles. Do not add a physical address, testimonials, certifications, or ratings unless they are real and approved for publication.

The metadata and 404 links target the custom domain. If you use a different final domain, update those URLs, the sitemap, robots file, structured data, CNAME, and Pages settings together. Normal navigation and assets use relative links and also work on a GitHub project URL before the custom domain is enabled.
