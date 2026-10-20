/* Render del resume a partir de data.js. Sin dependencias. */
(function () {
  const D = window.RESUME;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };
  const urlLang = new URLSearchParams(location.search).get("lang");
  let lang = (urlLang === "en" || urlLang === "es") ? urlLang : (store.get("jv-lang") || ((navigator.language || "es").startsWith("es") ? "es" : "en"));
  let filter = "all";

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const cssVar = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const catColor = { ai: "--w-indigo", data: "--w-gamboge", infra: "--w-viridian", gov: "--w-rose" };

  const ICON = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1v5.46h-4v-4.84c0-1.16-.02-2.64-1.61-2.64-1.61 0-1.86 1.26-1.86 2.56v4.92h-4V9.75Z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.32l4.37 5.78L17.75 3Zm-1.08 16.2h1.7L7.4 4.7H5.57l11.1 14.5Z"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3v12m0 0-5-5m5 5 5-5M4 20h16"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>',
  };

  const mono = (t) => `
    <svg class="mono" viewBox="-40 -40 400 420" role="img" aria-label="JV">
      <g fill="none" stroke="var(--line)" stroke-width="1.6">
        <circle cx="160" cy="160" r="140"/>
        <circle cx="160" cy="160" r="118" stroke-width=".8" stroke-dasharray="2 5"/>
        <path d="M160 -10 V330 M-10 160 H330" stroke-width=".8" stroke-dasharray="16 4 2 4"/>
        <path d="M20 360 H300" stroke="var(--cota)" stroke-width="1"/>
        <path d="M20 352 V368 M300 352 V368" stroke="var(--cota)" stroke-width="1"/>
        <path d="M20 360 l10 -4 v8 Z M300 360 l-10 -4 v8 Z" fill="var(--cota)" stroke="none"/>
        <path d="M335 20 V300" stroke="var(--cota)" stroke-width="1"/>
        <path d="M327 20 H343 M327 300 H343" stroke="var(--cota)" stroke-width="1"/>
        <path d="M335 20 l-4 10 h8 Z M335 300 l-4 -10 h8 Z" fill="var(--cota)" stroke="none"/>
        <path d="M60 60 L80 80 M260 60 L240 80" stroke-width=".8"/>
      </g>
      <text x="160" y="212" text-anchor="middle" font-family="Barlow Condensed, Arial Narrow, sans-serif" font-weight="700" font-size="150" fill="var(--ink)" letter-spacing="-4">JV</text>
      <text x="160" y="352" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="12" fill="var(--cota)">${esc(t.dimA)}</text>
      <text x="350" y="164" font-family="IBM Plex Mono, monospace" font-size="12" fill="var(--cota)" transform="rotate(90 350 164)" text-anchor="middle">${esc(t.dimB)}</text>
      <text x="160" y="250" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="11" letter-spacing="3" fill="var(--line)">YUMBO · VALLE</text>
    </svg>`;

  function render() {
    const T = D[lang], S = D.shared, ui = T.ui, sec = T.sections;
    document.documentElement.lang = lang;
    const extra = lang === "es"
      ? { dimA: "2014 — HOY", dimB: "TINTA + AGUA", noteA: "ingeniería", noteB: "y un poco de arte", proj: "Hoja de vida", drew: "Dibujó", scale: "Escala", sheet: "Lámina", rev: "Revisión", place: "Ubicación", years: "8+ años", sheets: "6 láminas" }
      : { dimA: "2014 — NOW", dimB: "INK + WATER", noteA: "engineering", noteB: "and a bit of art", proj: "Resume", drew: "Drawn by", scale: "Scale", sheet: "Sheet", rev: "Revision", place: "Location", years: "8+ years", sheets: "6 sheets" };
    const cvHref = `cv/Jaime-Velez-CV-${lang.toUpperCase()}.pdf`;
    const sheets = [["perfil", sec.about], ["proyectos", sec.projects], ["experiencia", sec.experience], ["habilidades", sec.skills], ["formacion", sec.education], ["contacto", sec.contact]];
    const cats = Object.keys(T.categories);
    const fmtEnd = (e) => e || ui.present;

    const projects = T.projects.map((p, i) => `
      <article class="project${i === T.projects.length - 1 ? " wide" : ""}" data-cat="${p.cat}" ${filter !== "all" && filter !== p.cat ? "hidden" : ""}>
        <span class="blot" style="background:var(${catColor[p.cat]})"></span>
        <div class="p-meta"><span class="cat">${esc(T.categories[p.cat])}</span><span>P-${String(i + 1).padStart(2, "0")}</span></div>
        <h3>${esc(p.title)}</h3>
        <div class="ctx">${esc(p.context)}</div>
        <p>${esc(p.desc)}</p>
        <p class="impact">${esc(p.impact)}</p>
        <div class="tags">${p.stack.map((s) => `<span>${esc(s)}</span>`).join("")}</div>
      </article>`).join("");

    const jobs = T.experience.filter((j) => !j.hvOnly).map((j) => `
      <div class="job">
        <div class="when"><b>${esc(j.start.replace(/^\D+\s?/, "") || j.start)}</b>${j.start === j.end ? "" : esc(j.start) + " — " + esc(fmtEnd(j.end))}</div>
        <div class="body">
          <h3>${esc(j.role)}</h3>
          <div class="org">${esc(j.org)} · ${esc(j.place)}</div>
          <p>${esc(j.summary)}</p>
          ${j.bullets.length ? `<ul>${j.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}
        </div>
      </div>`).join("");

    const app = document.getElementById("app");
    app.innerHTML = `
    <header class="top"><div class="wrap">
      <a class="brand" href="#top" aria-label="${esc(S.name)}"><svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="14" fill="var(--w-gamboge)" opacity=".5"/><circle cx="16" cy="16" r="13" fill="none" stroke="var(--line)" stroke-width="2"/><text x="16" y="21" font-family="Barlow Condensed, Arial Narrow, sans-serif" font-weight="700" font-size="14" text-anchor="middle" fill="var(--line)">JV</text></svg>Jaime Vélez</a>
      <nav class="nav" aria-label="${esc(ui.menu)}">${sheets.map(([id, l]) => `<a href="#${id}">${esc(l)}</a>`).join("")}</nav>
      <div class="tools">
        <button class="btn-ghost" id="lang-btn" type="button" aria-label="Language">${esc(ui.langSwitch)}</button>
        <button class="btn-ghost" id="theme-btn" type="button" aria-label="${esc(ui.theme)}">${ICON.moon}</button>
      </div>
    </div></header>

    <main id="top">
      <section class="hero">
        <div class="wrap split">
          <div>
            <div class="kicker">${esc(extra.proj)} · ${esc(S.location.split("—")[0].trim())}</div>
            <h1>Jaime<br><span class="thin">Vélez</span> Escandón</h1>
            <p class="role">${esc(T.title)}</p>
            <p class="tagline">${esc(T.tagline)}</p>
            <p class="pitch">${esc(T.pitch)}</p>
            <div class="cta">
              <a class="btn solid" href="${cvHref}" target="_blank" rel="noopener">${ICON.download}${esc(ui.downloadCv)}</a>
              <a class="btn" href="#contacto">${ICON.mail}${esc(ui.contactMe)}</a>
            </div>
            <div class="socials">${S.links.map((l) => `<a href="${l.url}" target="_blank" rel="noopener">${ICON[l.id]}${esc(l.handle)}</a>`).join("")}</div>
          </div>
          <div class="drawing">
            <canvas class="wash-c" data-wash="hero" aria-hidden="true"></canvas>
            ${mono(extra)}
            <span class="note a">${esc(extra.noteA)}</span>
            <span class="note b">${esc(extra.noteB)}</span>
          </div>
        </div>
        <div class="wrap">
          <dl class="cajetin">
            <div><dt>${extra.proj}</dt><dd>J. Vélez E.<small>${esc(T.title)}</small></dd></div>
            <div><dt>${extra.scale}</dt><dd>1 : 1<small>${extra.years}</small></dd></div>
            <div><dt>${extra.sheet}</dt><dd>L-00 / L-06<small>${extra.sheets}</small></dd></div>
            <div><dt>${extra.rev}</dt><dd>2026-10<small>Rev. 04</small></dd></div>
            <div><dt>${extra.place}</dt><dd>Yumbo, CO<small>Valle del Cauca</small></dd></div>
          </dl>
        </div>
      </section>

      <section class="sheet" id="perfil"><div class="wrap">
        <div class="sheet-head"><span class="sheet-no">L-01</span><h2><span class="swatch" style="background:var(--w-gamboge)"></span>${esc(sec.about)}</h2></div>
        <div class="about">
          <div>${T.profile.map((p) => `<p>${esc(p)}</p>`).join("")}</div>
          <div class="stats">${T.stats.map((s) => `<div class="stat"><b>${esc(s.n)}</b><span>${esc(s.l)}</span></div>`).join("")}</div>
        </div>
      </div></section>

      <section class="sheet" id="proyectos"><div class="wrap">
        <div class="sheet-head"><span class="sheet-no">L-02</span><h2><span class="swatch" style="background:var(--w-indigo)"></span>${esc(sec.projects)}</h2><p class="aside">${esc(ui.note)}</p></div>
        <div class="filters" role="group" aria-label="Filtro">
          <button class="chip" type="button" data-f="all" aria-pressed="${filter === "all"}">${esc(ui.all)} · ${T.projects.length}</button>
          ${cats.map((c) => `<button class="chip" type="button" data-f="${c}" aria-pressed="${filter === c}"><i style="background:var(${catColor[c]})"></i>${esc(T.categories[c])}</button>`).join("")}
        </div>
        <div class="projects">${projects}</div>
      </div></section>

      <section class="sheet" id="experiencia"><div class="wrap">
        <div class="sheet-head"><span class="sheet-no">L-03</span><h2><span class="swatch" style="background:var(--w-viridian)"></span>${esc(sec.experience)}</h2></div>
        <div class="timeline">${jobs}</div>
      </div></section>

      <section class="sheet" id="habilidades"><div class="wrap">
        <div class="sheet-head"><span class="sheet-no">L-04</span><h2><span class="swatch" style="background:var(--w-rose)"></span>${esc(sec.skills)}</h2></div>
        <div class="skills">${T.skills.map((g) => `<div class="skill"><h3>${esc(g.g)}</h3><ul>${g.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`).join("")}</div>
      </div></section>

      <section class="sheet" id="formacion"><div class="wrap">
        <div class="sheet-head"><span class="sheet-no">L-05</span><h2><span class="swatch" style="background:var(--w-gamboge)"></span>${esc(sec.education)}</h2></div>
        <div class="edu">
          <div>
            <div class="edu-list">${T.education.map((e) => `<div class="edu-item"><h3>${esc(e.t)}</h3><div class="o">${esc(e.o)}${e.d ? " · " + esc(e.d) : ""}</div>${e.n ? `<p>${esc(e.n)}</p>` : ""}</div>`).join("")}</div>
            ${T.strategic.length ? `<h3 class="subhead" style="margin-top:32px">${esc(sec.strategic)}</h3><ul class="docs">${T.strategic.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>` : ""}
          </div>
          <div>
            <h3 class="subhead">${esc(sec.courses)}</h3>
            <ul class="courses">${T.courses.slice(0, 10).map((c) => `<li>${esc(c[0])}<span>${esc(c[1])} · ${esc(c[2])}</span></li>`).join("")}</ul>
          </div>
        </div>
        <h3 class="subhead" style="margin-top:48px">${esc(sec.beyond)}</h3>
        <div class="beyond">${T.beyond.map((b, i) => `<div class="b-item"><canvas data-wash="b${i}" aria-hidden="true"></canvas><b>${esc(b.k)}</b><p>${esc(b.t)}</p></div>`).join("")}</div>
      </div></section>

      <section class="sheet" id="contacto"><div class="wrap">
        <div class="sheet-head"><span class="sheet-no">L-06</span><h2><span class="swatch" style="background:var(--w-indigo)"></span>${esc(sec.contact)}</h2></div>
        <div class="contact">
          <p class="big">${esc(ui.contactText)}</p>
          <div>
            <div class="mailbox"><code id="mail">${esc(S.email)}</code><button class="btn-ghost" id="copy-btn" type="button">${lang === "es" ? "Copiar" : "Copy"}</button><span class="copied" id="copied" hidden>${lang === "es" ? "Copiado" : "Copied"}</span></div>
            <div class="socials">${S.links.map((l) => `<a href="${l.url}" target="_blank" rel="noopener">${ICON[l.id]}${esc(l.label)} ${esc(l.handle)}</a>`).join("")}</div>
          </div>
        </div>
      </div></section>
    </main>
    <footer><div class="wrap"><span>© 2026 ${esc(S.name)}</span><span>${esc(ui.madeWith)}</span></div></footer>`;

    bind();
    paintAll();
  }

  /* ---------- acuarela generativa (polígonos deformados en capas translúcidas) ---------- */
  function rand(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
  function deform(pts, depth, r, R) {
    if (!depth) return pts;
    const out = [];
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i], b = pts[(i + 1) % pts.length];
      const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
      const g = () => { let s = 0; for (let k = 0; k < 6; k++) s += R(); return (s - 3) / 3; };
      out.push(a, [(a[0] + b[0]) / 2 + g() * len * r, (a[1] + b[1]) / 2 + g() * len * r]);
    }
    return deform(out, depth - 1, r, R);
  }
  function blob(ctx, cx, cy, rad, color, R, layers) {
    const base = [];
    const n = 10;
    for (let i = 0; i < n; i++) { const t = (i / n) * Math.PI * 2; const rr = rad * (0.8 + R() * 0.4); base.push([cx + Math.cos(t) * rr, cy + Math.sin(t) * rr]); }
    const shape = deform(base, 2, 0.45, R);
    ctx.fillStyle = color;
    for (let l = 0; l < layers; l++) {
      const p = deform(shape, 3, 0.3, R);
      ctx.globalAlpha = 0.045;
      ctx.beginPath(); p.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath(); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
  function paint(cv) {
    const w = cv.clientWidth, h = cv.clientHeight;
    if (!w || !h) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = w * dpr; cv.height = h * dpr;
    const ctx = cv.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const key = cv.dataset.wash;
    const R = rand(key.split("").reduce((a, c) => a * 31 + c.charCodeAt(0), 7));
    const m = Math.min(w, h);
    const c = { i: cssVar("--w-indigo"), g: cssVar("--w-gamboge"), v: cssVar("--w-viridian"), r: cssVar("--w-rose") };
    if (key === "hero") {
      blob(ctx, w * 0.42, h * 0.45, m * 0.3, c.i, R, 26);
      blob(ctx, w * 0.62, h * 0.6, m * 0.22, c.g, R, 24);
      blob(ctx, w * 0.3, h * 0.66, m * 0.14, c.v, R, 18);
    } else {
      const pal = key === "b0" ? [c.i, c.r] : key === "b1" ? [c.v, c.g] : [c.g, c.i];
      blob(ctx, w * 0.3, h * 0.45, m * 0.55, pal[0], R, 22);
      blob(ctx, w * 0.75, h * 0.6, m * 0.4, pal[1], R, 18);
    }
  }
  function paintAll() { document.querySelectorAll("canvas[data-wash]").forEach(paint); }

  function bind() {
    document.getElementById("lang-btn").onclick = () => { lang = lang === "es" ? "en" : "es"; store.set("jv-lang", lang); render(); };
    document.getElementById("theme-btn").onclick = () => {
      const root = document.documentElement;
      const cur = root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      root.dataset.theme = cur === "dark" ? "light" : "dark";
      store.set("jv-theme", root.dataset.theme);
      paintAll();
    };
    document.querySelectorAll(".chip").forEach((b) => (b.onclick = () => {
      filter = b.dataset.f;
      document.querySelectorAll(".chip").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      document.querySelectorAll(".project").forEach((p) => (p.hidden = !(filter === "all" || p.dataset.cat === filter)));
    }));
    const copyBtn = document.getElementById("copy-btn");
    copyBtn.onclick = () => {
      const done = () => { const c = document.getElementById("copied"); c.hidden = false; setTimeout(() => (c.hidden = true), 1800); };
      const sel = () => { const r = document.createRange(); r.selectNodeContents(document.getElementById("mail")); const s = getSelection(); s.removeAllRanges(); s.addRange(r); };
      try { navigator.clipboard.writeText(D.shared.email).then(done, sel); } catch (e) { sel(); }
    };
  }

  const savedTheme = store.get("jv-theme");
  if (savedTheme === "dark" || savedTheme === "light") document.documentElement.dataset.theme = savedTheme;
  matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", paintAll);
  let rt; window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(paintAll, 150); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(paintAll);
  render();
})();
