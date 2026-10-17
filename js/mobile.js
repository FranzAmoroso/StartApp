/* =========================================================
   VERSIONE MOBILE (schermi fino a 760 px)
   Una sezione per schermata: Intro → Competenze → Progetti →
   Risorse → Community → Contatti. La luna sale a ogni sezione
   (usa la variabile --p che app.js aggiorna già con lo scroll).
   I contenuti arrivano da data.js: non serve duplicarli.
   ========================================================= */
(function () {
  "use strict";

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const cat = (tipo) => CATEGORIE.find((c) => c.tipo === tipo);
  const MAX_SCHEDE_RISORSE = 3; // oltre questo numero le guide diventano un elenco compatto

  const freccia = (target) => `
    <a class="m-scroll" href="#${target}" aria-label="Vai alla sezione successiva">
        <span>SCORRI</span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14"/><path d="M6 13l6 6 6-6"/></svg>
    </a>`;

  /* ---------- Sezioni ---------- */
  function intro() {
    return `
      <div class="m-intro">
        <button class="m-photo" data-m-photo aria-label="Ingrandisci la foto">
          <img src="${esc(PROFILO.foto)}" alt="Foto di ${esc(PROFILO.nome)}">
        </button>
        <h1>${esc(PROFILO.nome).replace(" ", "<br>")}</h1>
        <p class="m-ruolo">${esc(PROFILO.ruolo)}</p>
        <p class="m-sub">${esc(PROFILO.sottotitolo)}</p>
        <div class="m-actions">
          <a class="m-btn m-btn-primary" href="${esc(PROFILO.github)}" target="_blank" rel="noopener">GitHub</a>
          <a class="m-btn" href="${esc(PROFILO.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>
        </div>
      </div>`;
  }

  function competenze() {
    const c = cat("competenze");
    if (!c) return "";
    // su mobile niente "Trasversali" né gruppi nascosti
    const gruppi = c.gruppi.filter((g) => g.visibile !== false && g.skills.some((s) => s.visibile !== false && (s.logo || s.sigla)));    return `
      <h2>${esc(c.titolo)}</h2>
      <div class="m-groups">${gruppi.map((g) => `
        <div>
          <div class="m-glabel">${esc(g.titolo)}</div>
          <div class="m-chips">${g.skills.filter((s) => s.visibile !== false).map((s) => `
            <span class="m-chip">
              ${s.logo ? `<img src="${esc(s.logo)}" alt="" loading="lazy" data-fallback>` : ""}
              <span class="m-sigla"${s.logo ? " hidden" : ""}>${esc(s.sigla || s.nome.slice(0, 2))}</span>
              ${esc(s.nome)}
            </span>`).join("")}
          </div>
        </div>`).join("")}
      </div>`;
  }

  function progetti() {
    const c = cat("progetti");
    if (!c) return "";
    const host = (u) => { try { return new URL(u).host.replace(/^www\./, ""); } catch { return u; } };
    const lista = c.finestre || []; // "altri" (e-commerce, rubrica) non compaiono su mobile
    return `
      <h2>${esc(c.titolo)}</h2>
      <div class="m-carousel">${lista.map((f) => `
        <div class="m-project">
          <div class="m-bar">
            <span class="m-dot" style="background:#E07A5F"></span><span class="m-dot" style="background:#E9C46A"></span><span class="m-dot" style="background:#5EC8C0"></span>
            <span class="m-url">${esc(host(f.url))}</span>
            <a href="${esc(f.url)}" target="_blank" rel="noopener">Apri ↗</a>
          </div>
          <div class="m-preview">
            ${f.screenshot
              ? `<img src="${esc(f.screenshot)}" alt="Anteprima di ${esc(f.nome)}" loading="lazy">`
              : `<iframe src="${esc(f.url)}" title="Anteprima di ${esc(f.nome)}" loading="lazy" tabindex="-1" sandbox="allow-scripts allow-same-origin"></iframe>`}
          </div>
          <div class="m-pbody"><div class="m-ptitle">${esc(f.nome)}</div><div class="m-ptext">${esc(f.testo)}</div></div>
        </div>`).join("")}
      </div>
      `;
  }

  function risorse() {
    const c = cat("risorse");
    if (!c) return "";
    const voci = c.voci || [];
    const corpo = voci.length <= MAX_SCHEDE_RISORSE
      ? `<div class="m-res-cards">${voci.map((v, i) => `
          <div class="m-glass m-res-card">
            <div class="m-glabel" style="color:#8D9AB8">HTML · GUIDA</div>
            <div class="m-res-title">${esc(v.titolo)}</div>
            <div class="m-ptext">${esc(v.testo)}</div>
            <button class="m-btn m-btn-outline" data-m-guida="${i}">Apri la guida</button>
          </div>`).join("")}</div>`
      : `<div class="m-glass m-res-list">${voci.map((v, i) => `
          <button class="m-res-row" data-m-guida="${i}">
            <span class="m-num">${String(i + 1).padStart(2, "0")}</span>
            <span class="m-res-text"><span class="m-res-name">${esc(v.titolo)}</span><span class="m-ptext">${esc(v.testo)}</span></span>
            <span class="m-chev" aria-hidden="true">›</span>
          </button>`).join("")}</div>`;
    return `<h2>${esc(c.titolo)}</h2><p class="m-lead">Guide interattive</p>${corpo}`;
  }

  function community() {
    const c = cat("formazione");
    const lista = c?.community || [];
    if (!lista.length) return "";
    return `
      <h2>Community</h2><p class="m-lead">Dove mi puoi trovare</p>
      <div class="m-glass m-comm">${lista.map((m) => `
        <a href="${esc(m.url)}" target="_blank" rel="noopener" aria-label="${esc(m.nome)}"><img src="${esc(m.logo)}" alt="${esc(m.nome)}" loading="lazy"></a>`).join("")}
      </div>`;
  }

  function contatti() {
    const tel = PROFILO.telefono.replace(/\s+/g, "");
    const ln = PROFILO.linkedin.replace(/\/$/, "").split("/").pop();
    const gh = PROFILO.github.replace(/\/$/, "").split("/").pop();
    return `
      <h2>Contatti</h2>
      <div class="m-contacts">
        <a class="m-row" href="mailto:${esc(PROFILO.email)}"><span class="m-k">Email</span><span class="m-v">${esc(PROFILO.email)}</span></a>
        <a class="m-row" href="tel:${esc(tel)}"><span class="m-k">Telefono</span><span class="m-v">${esc(PROFILO.telefono)}</span></a>
        <a class="m-row" href="${esc(PROFILO.linkedin)}" target="_blank" rel="noopener"><span class="m-k">LinkedIn</span><span class="m-v">${esc(ln)} ↗</span></a>
        <a class="m-row" href="${esc(PROFILO.github)}" target="_blank" rel="noopener"><span class="m-k">GitHub</span><span class="m-v">${esc(gh)} ↗</span></a>
      </div>
      <div class="m-copy">© ${new Date().getFullYear()} ${esc(PROFILO.nome)}</div>`;

      /*      Aggiungi quando aggiorni il cv   
      <a class="m-btn m-btn-primary" href="${esc(PROFILO.cv)}" download>Scarica il CV (PDF) ↓</a>*/
 
  }

  /* ---------- Montaggio ---------- */
  const sezioni = [intro, competenze, progetti, risorse, community, contatti]
    .map((fn) => fn())
    .filter(Boolean);

  const root = document.createElement("div");
  root.id = "m-root";
  root.innerHTML = sezioni.map((html, i) => `
    <section class="m-sec" id="m-sec-${i}">
      <div class="m-inner">${html}</div>
      ${i < sezioni.length - 1 ? freccia("m-sec-" + (i + 1)) : ""}
    </section>`).join("") + `
    <div class="m-guide" id="m-guide" hidden role="dialog" aria-modal="true" aria-labelledby="m-guide-title">
      <div class="m-guide-head">
        <div><div class="m-eyebrow">RISORSE / GUIDA</div><div class="m-guide-title" id="m-guide-title"></div></div>
        <button class="m-close" data-m-close aria-label="Chiudi la guida">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </div>
      <iframe class="m-guide-frame" title="Guida"></iframe>
    </div>`;
  const main = document.querySelector("main");
  if (main) main.after(root); else document.body.appendChild(root);

  /* Anteprime progetti: scala l'iframe (1280 px) alla larghezza della scheda */
  function scala() {
    root.querySelectorAll(".m-preview iframe").forEach((f) => {
      const w = f.parentElement.clientWidth;
      if (w) f.style.transform = `scale(${w / 1280})`;
    });
  }
  addEventListener("resize", scala);
  scala();

  /* Guida a tutto schermo */
  const guida = root.querySelector("#m-guide");
  const frame = guida.querySelector("iframe");
  function apriGuida(i) {
    const v = cat("risorse").voci[i];
    guida.querySelector("#m-guide-title").textContent = v.titolo;
    frame.src = v.file;
    frame.title = v.titolo;
    guida.hidden = false;
    document.documentElement.classList.add("m-lock");
    guida.querySelector("[data-m-close]").focus();
  }
  function chiudiGuida() {
    guida.hidden = true;
    frame.src = "about:blank";
    document.documentElement.classList.remove("m-lock");
  }

  root.addEventListener("click", (e) => {
    const g = e.target.closest("[data-m-guida]");
    if (g) return apriGuida(+g.dataset.mGuida);
    if (e.target.closest("[data-m-close]")) return chiudiGuida();
    if (e.target.closest("[data-m-photo]")) document.getElementById("lightbox")?.showModal();
  });
  addEventListener("keydown", (e) => { if (e.key === "Escape" && !guida.hidden) chiudiGuida(); });

  /* Logo mancante → sigla */
  root.addEventListener("error", (e) => {
    const img = e.target;
    if (img.tagName === "IMG" && img.hasAttribute("data-fallback")) {
      img.nextElementSibling?.removeAttribute("hidden");
      img.remove();
    }
  }, true);
})();
