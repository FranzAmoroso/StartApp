/* =========================================================
   Logica del portfolio. I contenuti stanno in data.js.
   ========================================================= */
(function () {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const mobile = window.matchMedia("(max-width: 760px)");

  const ICONE = {
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>',
    cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>',
    code: '<path d="M8 6l-6 6 6 6"/><path d="M16 6l6 6-6 6"/>',
    window: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/>',
    file: '<path d="M4 4h11l5 5v11H4z"/><path d="M15 4v5h5"/><path d="M8 14h8M8 17h5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'
  };
  const icona = (nome, size = 20) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONE[nome] || ICONE.star}</svg>`;
  const X = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  /* ---------- Stato ---------- */
  let selezionata = null;   // id categoria
  let guidaAperta = null;   // indice risorsa aperta nel pannello

  /* ---------- Profilo ---------- */
  function riempiProfilo() {
    $("#hero-foto").src = PROFILO.foto;
    $("#side-foto").src = PROFILO.foto;
    $("#lightbox-img").src = PROFILO.foto;
    $("#hero-nome").innerHTML = esc(PROFILO.nome).replace(" ", ' <br class="nl">');
    $("#hero-ruolo").textContent = PROFILO.ruolo;
    $("#hero-sottotitolo").textContent = PROFILO.sottotitolo;
    const cvBtn = $("#hero-cv"); if (cvBtn) cvBtn.href = PROFILO.cv; // il bottone può essere commentato in index.html    $("#hero-github").href = PROFILO.github;
    $("#hero-linkedin").href = PROFILO.linkedin;
    $("#side-nome").textContent = PROFILO.nome;
    $("#side-qualifica").textContent = PROFILO.qualifica;
    $("#side-bio").textContent = PROFILO.bio;
    $("#side-lingue").innerHTML = PROFILO.lingue.map((l) => `<span>${esc(l)}</span>`).join("");
    $("#anno").textContent = new Date().getFullYear();
  }

  /* ---------- Menu categorie ---------- */
  function disegnaMenu() {
    $("#cat-nav").innerHTML = CATEGORIE.map((c) => `
      <button class="cat-btn" data-cat="${esc(c.id)}" aria-label="${esc(c.titolo)}" aria-current="${c.id === selezionata}">
        ${icona(c.icona)}
        <span class="lbl">${esc(c.titolo)}</span>
      </button>`).join("");
  }

  /* ---------- Renderer per tipo ---------- */
  const R = {
    timeline(c) {
      return `<div class="timeline">${c.voci.map((v) => `
        <div class="tl-item ${v.attuale ? "now" : ""}">
          <div class="when">${esc(v.periodo)}</div>
          <div class="title">${esc(v.titolo)}</div>
          ${v.sottotitolo ? `<div class="sub">${esc(v.sottotitolo)}</div>` : ""}
          ${v.testo ? `<p class="txt">${esc(v.testo)}</p>` : ""}
          ${v.tag?.length ? `<div class="tags">${v.tag.map((t) => `<span class="tile plain">${esc(t)}</span>`).join("")}</div>` : ""}
        </div>`).join("")}</div>`;
    },

    formazione(c) {
      const [prima, ...altre] = c.voci;
      const voce = (v) => `
        <div class="when">${esc(v.periodo)}</div>
        <div class="title">${esc(v.titolo)}</div>
        ${v.ente ? `<div class="sub">${esc(v.ente)}</div>` : ""}
        ${v.testo ? `<p class="txt">${esc(v.testo)}</p>` : ""}
        ${v.elenco?.length ? `<ul class="course-list">${v.elenco.map((e) => `<li>${esc(e)}</li>`).join("")}</ul>` : ""}`;
      const comm = c.community?.length ? `
        <div class="card">
          <div class="when">Community</div>
          <div class="community">${c.community.map((m) => `
            <a href="${esc(m.url)}" target="_blank" rel="noopener" title="${esc(m.nome)}" aria-label="${esc(m.nome)}">
              <img src="${esc(m.logo)}" alt="${esc(m.nome)}" loading="lazy">
            </a>`).join("")}</div>
        </div>` : "";
      return `
        ${prima ? `<div class="card">${voce(prima)}</div>` : ""}
        <div class="grid-2">${altre.map((v) => `<div class="card">${voce(v)}</div>`).join("")}${comm}</div>`;
    },

    competenze(c) {
      const tile = (s) => {
        if (!s.logo && !s.sigla) return `<span class="tile plain">${esc(s.nome)}</span>`;
        // se il logo esiste lo mostra, se manca o non si carica mostra la sigla
        const mg = `<span class="mg"${s.logo ? " hidden" : ""}>${esc(s.sigla || s.nome.slice(0, 2))}</span>`;
        const img = s.logo ? `<img src="${esc(s.logo)}" alt="" loading="lazy" data-fallback>` : "";
        return `<span class="tile">${img}${mg}${esc(s.nome)}</span>`;
      };
      return `<div class="skills-grid">${c.gruppi.filter((g) => g.visibile !== false).map((g) => `
        <div>
          <div class="group-title ${g.titolo.toLowerCase().includes("apprend") ? "new" : ""}">${esc(g.titolo)}</div>
          <div class="tiles">${g.skills.map(tile).join("")}</div>
        </div>`).join("")}</div>`;
    },

    progetti(c) {
      const host = (u) => { try { return new URL(u).host.replace(/^www\./, ""); } catch { return u; } };
      const finestre = (c.finestre || []).map((f) => `
        <div class="browser">
          <div class="browser-bar">
            <span class="dot" style="background:#E07A5F"></span><span class="dot" style="background:#E9C46A"></span><span class="dot" style="background:#5EC8C0"></span>
            <span class="url">${esc(host(f.url))}</span>
            <a href="${esc(f.url)}" target="_blank" rel="noopener">Apri ↗</a>
          </div>
          <div class="viewport">
            ${f.screenshot
              ? `<img src="${esc(f.screenshot)}" alt="Anteprima di ${esc(f.nome)}" loading="lazy">`
              : `<iframe src="${esc(f.url)}" title="Anteprima di ${esc(f.nome)}" loading="lazy" tabindex="-1" sandbox="allow-scripts allow-same-origin"></iframe>`}
          </div>
          <div class="browser-body">
            <div class="title" style="font-size:16px;margin:0">${esc(f.nome)}</div>
            <p class="txt" style="font-size:13px;margin-top:4px">${esc(f.testo)}</p>
          </div>
        </div>`).join("");
      const altri = (c.altri || []).map((a) => `
        <a class="card link-card" href="${esc(a.url)}" target="_blank" rel="noopener">
          <div class="title" style="font-size:16px;margin:0">${esc(a.nome)}</div>
          <div class="txt" style="font-size:13px;margin-top:4px">${esc(a.tech)}</div>
        </a>`).join("");
      return `<div class="grid-2">${finestre}</div>${altri ? `<div class="grid-2">${altri}</div>` : ""}`;
    },

    risorse(c) {
      if (guidaAperta !== null) {
        const g = c.voci[guidaAperta];
        return `<iframe class="viewer-frame" src="${esc(g.file)}" title="${esc(g.titolo)}"></iframe>`;
      }
      return `<div class="grid-2">${c.voci.map((v, i) => `
        <div class="card res-card">
          <div class="when">HTML · guida</div>
          <div class="title" style="margin:0">${esc(v.titolo)}</div>
          <div class="txt" style="margin:0">${esc(v.testo)}</div>
          <button class="btn" data-guida="${i}">Apri la guida</button>
        </div>`).join("")}</div>`;
    },

    contatti() {
      const tel = PROFILO.telefono.replace(/\s+/g, "");
      const ln = PROFILO.linkedin.replace(/\/$/, "").split("/").pop();
      const gh = PROFILO.github.replace(/\/$/, "").split("/").pop();
      return `<div class="contacts">
        <a class="contact" href="mailto:${esc(PROFILO.email)}"><span class="k">Email</span><span class="v">${esc(PROFILO.email)}</span></a>
        <a class="contact" href="tel:${esc(tel)}"><span class="k">Telefono</span><span class="v">${esc(PROFILO.telefono)}</span></a>
        <a class="contact" href="${esc(PROFILO.linkedin)}" target="_blank" rel="noopener"><span class="k">LinkedIn</span><span class="v">${esc(ln)} ↗</span></a>
        <a class="contact" href="${esc(PROFILO.github)}" target="_blank" rel="noopener"><span class="k">GitHub</span><span class="v">${esc(gh)} ↗</span></a>
      </div>`;
      /* Aggiungere quando si aggiorna il CV */
      // <a class="contact cv" href="${esc(PROFILO.cv)}" download><span class="k">Curriculum (PDF)</span><span class="v">Scarica ↓</span></a>

    },

    testo(c) { return `<div class="txt" style="font-size:16px">${c.html || ""}</div>`; }
  };

  /* ---------- Pannello di destra ---------- */
  function disegnaDettaglio() {
    const det = $("#detail");
    const c = CATEGORIE.find((x) => x.id === selezionata);
    if (!c) { det.innerHTML = ""; return; }
    const i = CATEGORIE.indexOf(c) + 1;
    const corpo = (R[c.tipo] || R.testo)(c);

    let testa;
    if (c.tipo === "risorse" && guidaAperta !== null) {
      testa = `<div class="viewer-head">
          <div><div class="eyebrow">RISORSE / GUIDA</div><h2>${esc(c.voci[guidaAperta].titolo)}</h2></div>
          <button class="icon-btn" data-chiudi-guida aria-label="Chiudi la guida">${X}</button>
        </div>`;
    } else {
      testa = `<header>
          <div class="eyebrow">${String(i).padStart(2, "0")} · ${esc(c.titolo.toUpperCase())}</div>
          <h2>${esc(c.titoloPagina || c.titolo)}</h2>
          ${c.tipo === "risorse" ? `<p class="intro">Si aprono qui, dentro il pannello.</p>` : ""}
        </header>`;
    }
    det.classList.toggle("viewer", c.tipo === "risorse" && guidaAperta !== null);
    det.innerHTML = `<div class="detail-inner fade-in">${testa}${corpo}</div>`;
    det.scrollTop = 0;
    scalaAnteprime();
  }

  function seleziona(id, { scorri = false } = {}) {
    selezionata = id;
    guidaAperta = null;
    $("#pannelli").classList.toggle("has-sel", !!id);
    document.querySelectorAll(".cat-btn").forEach((b) => b.setAttribute("aria-current", b.dataset.cat === id));
    disegnaDettaglio();
    if (id) history.replaceState(null, "", "#" + id);
    else history.replaceState(null, "", location.pathname);
    if (scorri || mobile.matches) $("#pannelli").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* Le mini-finestre dei progetti: scala l'iframe alla larghezza del riquadro */
  function scalaAnteprime() {
    document.querySelectorAll(".viewport iframe").forEach((f) => {
      const w = f.parentElement.clientWidth;
      f.style.transform = `scale(${w / 1280})`;
    });
  }

  /* ---------- Luna che sale ---------- */
  function luna() {
    let ticking = false;
    const aggiorna = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? Math.min(1, scrollY / max) : 0;
      const root = document.documentElement.style;
      root.setProperty("--p", p.toFixed(3));
      root.setProperty("--hero", Math.max(0.05, 1 - (scrollY / innerHeight) * 1.1).toFixed(3));
      ticking = false;
    };
    addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(aggiorna); ticking = true; } }, { passive: true });
    addEventListener("resize", () => { aggiorna(); scalaAnteprime(); });
    aggiorna();
  }

  /* ---------- Foto ingrandita ---------- */
  function lightbox() {
    const dlg = $("#lightbox");
    document.querySelectorAll("[data-photo]").forEach((b) => b.addEventListener("click", () => dlg.showModal()));
    dlg.addEventListener("click", (e) => { if (e.target === dlg || e.target.closest("[data-close]")) dlg.close(); });
  }

  /* ---------- Eventi ---------- */
  function eventi() {
    $("#cat-nav").addEventListener("click", (e) => {
      const b = e.target.closest(".cat-btn");
      if (b) seleziona(b.dataset.cat);
    });
    $("#back").addEventListener("click", () => seleziona(null));
    $("#detail").addEventListener("click", (e) => {
      const g = e.target.closest("[data-guida]");
      if (g) { guidaAperta = +g.dataset.guida; disegnaDettaglio(); return; }
      if (e.target.closest("[data-chiudi-guida]")) { guidaAperta = null; disegnaDettaglio(); }
    });
    // logo mancante → mostra la sigla
    document.addEventListener("error", (e) => {
      const img = e.target;
      if (img.tagName === "IMG" && img.hasAttribute("data-fallback")) {
        img.nextElementSibling?.removeAttribute("hidden");
        img.remove();
      }
    }, true);
    addEventListener("hashchange", () => {
      const id = location.hash.slice(1);
      if (CATEGORIE.some((c) => c.id === id)) seleziona(id, { scorri: true });
    });
    mobile.addEventListener("change", () => { if (!mobile.matches && !selezionata) seleziona(CATEGORIA_INIZIALE); });
  }

  /* ---------- Avvio ---------- */
  riempiProfilo();
  const daHash = location.hash.slice(1);
  selezionata = CATEGORIE.some((c) => c.id === daHash) ? daHash : (mobile.matches ? null : CATEGORIA_INIZIALE);
  disegnaMenu();
  $("#pannelli").classList.toggle("has-sel", !!selezionata);
  disegnaDettaglio();
  eventi();
  lightbox();
  luna();
  if (daHash && selezionata === daHash) requestAnimationFrame(() => $("#pannelli").scrollIntoView({ block: "start" }));
})();
