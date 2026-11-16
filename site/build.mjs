// Builds the site GitHub Pages serves (docs/) from the pages in site/pages: `node site/build.mjs`.
//
// Each page is a fragment of HTML whose first line is a comment with its title and description:
//   <!-- {"title": "Install and set up", "description": "…"} -->
// In a page, {{icon:inbox}} draws an icon, {{shot:today|What the alt text says|An optional caption}} a screen of the app,
// and {{download}} the two download buttons. The docs pages share a sidebar, in the order DOCS gives.

import { readFileSync, writeFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');
const write = (path, text) => writeFileSync(new URL(path, root), text, 'utf8');

const SITE = 'Command Center';
const RELEASES = 'https://github.com/sKittyKat/command-center-releases/releases';

/** The docs, in reading order, by group. */
const DOCS = [
  { group: 'Start', pages: ['get-started'] },
  { group: 'Every day', pages: ['today', 'touchpoints', 'inbox', 'projects', 'agents', 'money', 'accounts'] },
  { group: 'Your settings', pages: ['claude', 'notion', 'data'] },
  { group: 'Help', pages: ['help', 'releases'] },
];
const ORDER = DOCS.flatMap((group) => group.pages);

const icons = JSON.parse(read('site/icons.json'));

function icon(name) {
  const body = icons[name];
  if (!body) throw new Error(`No icon called ${name}`);
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

const escape = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function shot(name, alt, caption) {
  const image = `<div class="shot"><img src="assets/screens/${name}.png" width="1100" height="700" alt="${escape(alt)}" loading="lazy" decoding="async"></div>`;
  return caption ? `<figure>${image}<figcaption>${caption}</figcaption></figure>` : `<figure>${image}</figure>`;
}

const DOWNLOAD = `<div class="buttons">
  <a class="button button--primary" data-download="mac" href="${RELEASES}/latest">${icon('download')}Download for Mac <small>Apple silicon or Intel</small></a>
  <a class="button button--secondary" data-download="windows" href="${RELEASES}/latest">${icon('download')}Download for Windows <small>10 or 11</small></a>
</div>`;

function fill(html) {
  return html
    .replace(/\{\{icon:([a-z0-9-]+)\}\}/g, (_, name) => icon(name))
    .replace(/\{\{shot:([a-z0-9-]+)\|([^|}]*)(?:\|([^}]*))?\}\}/g, (_, name, alt, caption) => shot(name, alt, caption))
    .replace(/\{\{download\}\}/g, DOWNLOAD);
}

function page(name) {
  const source = read(`site/pages/${name}.html`);
  const match = /^<!--\s*(\{[\s\S]*?\})\s*-->\n/.exec(source);
  if (!match) throw new Error(`${name}.html needs its title and description on the first line`);
  const meta = JSON.parse(match[1]);
  return { name, title: meta.title, description: meta.description, body: fill(source.slice(match[0].length)) };
}

const MARK = `<svg class="mark" viewBox="0 0 72 72" aria-hidden="true"><circle class="ring" cx="36" cy="36" r="35.5"/><circle class="ring" cx="36" cy="36" r="26"/><circle class="ring" cx="36" cy="36" r="17"/><circle class="dot" cx="36" cy="36" r="8"/><circle class="centre" cx="36" cy="36" r="2.8"/></svg>`;

/** Where GitHub Pages serves the site; the 404 page, shown at any depth, finds its files from here. */
const BASE = '/command-center-releases/';

function shell({ name, title, description, main, docs }) {
  const full = name === 'index' ? `${SITE}: your business admin, handled` : `${title} · ${SITE}`;
  const current = (target) => (target === name || (docs && target === 'docs') ? ' aria-current="page"' : '');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">${name === '404' ? `\n<base href="${BASE}">` : ''}
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(full)}</title>
<meta name="description" content="${escape(description)}">
<meta property="og:title" content="${escape(full)}">
<meta property="og:description" content="${escape(description)}">
<meta property="og:image" content="assets/screens/today.png">
<meta name="theme-color" content="#ffffff">
<link rel="icon" href="assets/icon.png" type="image/png">
<link rel="preload" href="assets/fonts/inter-latin-opsz-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/site.css">
<script src="assets/site.js" defer></script>
</head>
<body>
<a class="skip" href="#main">Skip to the content</a>
<header class="top">
  <a class="brand" href="./"><img src="assets/icon.png" alt="" width="28" height="28">${SITE}</a>
  <nav aria-label="Site">
    <a href="get-started.html"${current('docs')}>Docs</a>
    <a class="hide-narrow" href="help.html"${current('help-top')}>Help</a>
    <a href="${RELEASES}">Releases</a>
  </nav>
</header>
${main}
<footer class="foot">
  <div class="wrap">
    <span>${SITE} · free · local-first. Your data stays on your computer.</span>
    <span><a href="get-started.html">Docs</a> · <a href="data.html#privacy">Privacy</a> · <a href="${RELEASES}">Releases</a></span>
  </div>
</footer>
</body>
</html>
`;
}

function sidebar(current) {
  const groups = DOCS.map(
    (group) =>
      `<h2>${group.group}</h2><ul>${group.pages
        .map((name) => `<li><a href="${name}.html"${name === current ? ' aria-current="page"' : ''}>${escape(page(name).title)}</a></li>`)
        .join('')}</ul>`,
  ).join('');
  return `<aside class="sidebar" aria-label="Docs"><details open><summary>All docs</summary><nav>${groups}</nav></details></aside>`;
}

function pager(name) {
  const at = ORDER.indexOf(name);
  const before = at > 0 ? page(ORDER[at - 1]) : null;
  const after = at < ORDER.length - 1 ? page(ORDER[at + 1]) : null;
  return `<nav class="pager" aria-label="More docs">${before ? `<a href="${before.name}.html"><span>Before</span><strong>${escape(before.title)}</strong></a>` : ''}${
    after ? `<a class="next" href="${after.name}.html"><span>Next</span><strong>${escape(after.title)}</strong></a>` : ''
  }</nav>`;
}

// The home page.
const home = page('index');
write('docs/index.html', shell({ name: 'index', title: home.title, description: home.description, main: `<main id="main">${home.body.replace('{{mark}}', MARK)}</main>` }));

// The docs.
for (const name of ORDER) {
  const doc = page(name);
  const main = `<div class="docs">${sidebar(name)}<main id="main" class="content">${doc.body}${pager(name)}</main></div>`;
  write(`docs/${name}.html`, shell({ name, title: doc.title, description: doc.description, main, docs: true }));
}

// Not found.
const missing = page('404');
write('docs/404.html', shell({ name: '404', title: missing.title, description: missing.description, main: `<main id="main" class="wrap">${missing.body}</main>` }));

console.log(`Built ${ORDER.length + 2} pages into docs/.`);
