/* =========================================================
   CONTENUTI DEL PORTFOLIO
   Modifica solo questo file per aggiornare testi, progetti,
   competenze, community e risorse. Il layout si adatta da solo.
   ========================================================= */

const PROFILO = {
  nome: "Franz Amoroso",
  ruolo: "System Test Engineer",
  sottotitolo: "Test e validazione di sistemi e qualità del software. Studente di Informatica (L-31) all'Università di Catania.",
  qualifica: "Junior Consultant · AYES",
  bio: "Sono uno studente universitario L-31 con un percorso di studi orientato verso lo sviluppo software e la Internet security. Ho maturato competenze attraverso corsi e progetti di Web e Mobile Development.",
  foto: "img/franz.jpg",
  email: "amoroso.franz1@gmail.com",
  telefono: "+39 377 591 1088",
  github: "https://github.com/FranzAmoroso",
  linkedin: "https://www.linkedin.com/in/franz-amoroso", // verifica che sia corretto
  cv: "cv/CV_Franz_Amoroso.pdf",
  lingue: ["Tedesco B2", "Inglese B1"]
};

/* ---------------------------------------------------------
   CATEGORIE
   Ogni oggetto = un bottone nel pannello di sinistra.
   Per aggiungere una categoria: copia un blocco, cambia id,
   titolo, icona e contenuto. "tipo" decide come viene disegnata:
   timeline | formazione | competenze | progetti | risorse | contatti | testo
   Icone disponibili: briefcase, cap, code, window, file, mail, star
   --------------------------------------------------------- */
const CATEGORIE = [
  {
    id: "esperienze",
    titolo: "Esperienze",
    titoloPagina: "Dove ho lavorato",
    icona: "briefcase",
    tipo: "timeline",
    voci: [
      {
        periodo: "Ottobre 2026 — oggi",
        titolo: "Junior Consultant · AYES Management & Technology Consulting",
        sottotitolo: "Programmatore e operatore specialista",
        testo: "Percorso di apprendistato come programmatore e operatore specialista, con affiancamento a un Senior Engineer.",
        tag: [
          "Analisi e sviluppo software",
          "Documentazione tecnica e manuali d'uso",
          "Modelli UML, prototipi e mockup",
          "Manutenzione del software",
          "Algoritmi, controlli e simulazioni"
        ],
        attuale: true
      },
      {
        periodo: "Prima · Italia e estero",
        titolo: "Qualità, produzione e servizio",
        testo: "Controllo qualità in Amazon, responsabile di produzione all'estero, ristorazione, panificazione, portalettere. Da qui vengono attenzione al dettaglio e sangue freddo sotto pressione."
      }
    ]
  },
  {
    id: "formazione",
    titolo: "Formazione",
    titoloPagina: "Cosa sto studiando",
    icona: "cap",
    tipo: "formazione",
    voci: [
      {
        periodo: "2024 — in corso",
        titolo: "Scienze e Tecnologie Informatiche (L-31)",
        ente: "Università degli Studi di Catania",
        // Aggiungi qui i corsi/esami: la lista compare solo se non è vuota.
        elenco: []
      },
      {
        periodo: "2024",
        titolo: "PHP Development · ClickAccademy",
        testo: "PHP, SQL e MySQL, JavaScript e DOM, Bootstrap e Tailwind."
      }
    ],
    community: [
      { nome: "GDG Catania", url: "https://www.gdgcatania.org", logo: "img/community/gdg-catania.jpg" },
      { nome: "UNICT Devs", url: "https://t.me/unict_devs", logo: "img/community/unict-devs.jpg" },
      { nome: "Python Catania", url: "https://catania.python.it/#/", logo: "img/community/python-catania.jpg" },
      { nome: "Flutter Catania", url: "https://t.me/fluttercatania", logo: "img/community/flutter-catania.jpg" },
      { nome: "Coderful", url: "https://www.coderful.io/", logo: "img/community/coderful.jpg" }
    ]
  },
  {
    id: "competenze",
    titolo: "Competenze",
    titoloPagina: "Strumenti che uso",
    icona: "code",
    tipo: "competenze",
    // logo: se il file esiste viene mostrato, altrimenti compare la sigla
    gruppi: [
      { titolo: "Linguaggi", skills: [
        { nome: "C", sigla: "C", logo: "img/logos/c.png" },
        { nome: "C++", sigla: "C++", logo: "img/logos/cpp.png" },
        { nome: "Java", sigla: "JV", logo: "img/logos/java.png" },
        { nome: "Python", sigla: "PY", logo: "img/logos/python.png" },
        { nome: "PHP", sigla: "PHP", logo: "img/logos/php.png" },
        { nome: "JavaScript", sigla: "JS", logo: "img/logos/javascript.png" },
        { nome: "Dart", sigla: "DT", logo: "img/logos/dart.png"}
      ]},
      { titolo: "Web & Mobile", skills: [
        { nome: "React", sigla: "RE", logo: "img/logos/react.png" },
        { nome: "Flutter", sigla: "FL", logo: "img/logos/flutter.png" },
        { nome: "Tailwind", sigla: "TW", logo: "img/logos/tailwind.png" },
      ]},
      { titolo: "Dati", skills: [
        { nome: "REST API", sigla: "API", logo: "img/logos/api.png" },
        { nome: "MySQL", sigla: "SQL", logo: "img/logos/mysql.png" },
        { nome: "PostgreSQL", sigla: "PG", logo:"img/logos/postgresql.png" },
        { nome: "NoSQL", sigla: "NO", logo: "img/logos/mongodb.png" }
      ]},
      { titolo: "Server & Cloud", skills: [
        { nome: "Apache", sigla: "AP", logo: "img/logos/apache.png" },
        { nome: "Vercel", sigla: "VC", logo: "img/logos/vercel.jpeg" },
        { nome: "Firebase", sigla: "FB", logo: "img/logos/firebase.png" },
        { nome: "GitHub Pages", sigla: "GH", logo: "img/logos/github.jpg" }
      ]},
      { titolo: "Strumenti & Progettazione", skills: [
        { nome: "Git", sigla: "GIT", logo: "img/logos/git.png" },
        { nome: "Linux", sigla: "LX", logo: "img/logs/linux.png"},
        { nome: "UML", sigla: "UML", logo: "img/logos/uml.png"},
        { nome: "Design pattern", sigla: "GoF", logo:"img/logos/design-pattern.svg" }
      ]},
      { titolo: "Trasversali", skills: [
        { nome: "Lavoro sotto pressione" },
        { nome: "Problem solving" },
        { nome: "Attenzione al dettaglio" }
      ]},
      // Metti visibile: true quando vuoi mostrarle
      { titolo: "In apprendimento", visibile: false, skills: [
        { nome: "Internet security", sigla: "SEC" },
        { nome: "Sistemi embedded", sigla: "ESP" }
      ]}
    ]
  },
  {
    id: "progetti",
    titolo: "Progetti",
    titoloPagina: "Cose che ho costruito",
    icona: "window",
    tipo: "progetti",
    // finestre: anteprime "mini browser". Se il sito non si lascia
    // incorporare, aggiungi screenshot: "img/progetti/nome.jpg"
    finestre: [
      { nome: "DMI StudentLab", url: "https://studentlab.net", testo: "Laboratorio per studenti del Dipartimento di Matematica e Informatica." },
      { nome: "CLARA", url: "https://claraedil.it", testo: "Automazione dei processi per le imprese edili." }
    ],
/*     altri: [
      { nome: "E-commerce + gestionale", url: "https://github.com/FranzAmoroso/ecommerce", tech: "PHP · React" },
      { nome: "Rubrica aziendale", url: "https://techsolutions-six.vercel.app/", tech: "React · JavaScript" }
    ] */
  },
  {
    id: "risorse",
    titolo: "Risorse",
    titoloPagina: "Appunti e guide interattive",
    icona: "file",
    tipo: "risorse",
    // Per aggiungere una guida: metti il file .html nella cartella risorse/
    voci: [
      { titolo: "Algoritmi e Strutture Dati", testo: "Riepilogo del corso con esempi.", file: "risorse/algoritmi-e-strutture-dati.html" },
      { titolo: "Design Pattern GoF", testo: "I 23 pattern della Gang of Four.", file: "risorse/design-pattern-gof.html" }
    ]
  },
  {
    id: "contatti",
    titolo: "Contatti",
    titoloPagina: "Parliamone",
    icona: "mail",
    tipo: "contatti"
  }
];

/* Categoria aperta all'avvio su desktop (su telefono si parte dall'elenco) */
const CATEGORIA_INIZIALE = "competenze";
