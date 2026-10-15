# Portfolio · Franz Amoroso

Sito statico (HTML, CSS e JavaScript senza framework). Si pubblica così com'è su GitHub Pages.

## Struttura
```
index.html          pagina unica
css/style.css       grafica (desktop, tablet, telefono)
js/data.js          TUTTI I CONTENUTI: modifica solo questo file
js/app.js           logica: luna, pannelli, guide, foto
img/                foto, loghi competenze, loghi community
risorse/            guide HTML che si aprono dentro il pannello
cv/                 curriculum scaricabile
```

## Come aggiornare
- **Corsi universitari**: in `data.js` → formazione → `elenco: ["Programmazione 1", "Analisi", ...]`. Se la lista è vuota, non compare.
- **Nuova competenza**: aggiungi `{ nome: "Docker", sigla: "DK", logo: "img/logos/docker.png" }`. Se il logo non c'è, o il file manca, compare la sigla.
- **Competenze in apprendimento**: metti `visibile: true` sul gruppo "In apprendimento".
- **Nuova guida**: copia il file `.html` in `risorse/` e aggiungi una voce in `risorse.voci`.
- **Nuova categoria**: aggiungi un oggetto in `CATEGORIE` (per testo libero usa `tipo: "testo"` e `html: "..."`). Menu, contatore e versione mobile si aggiornano da soli.
- **Anteprime progetti**: se un sito blocca l'anteprima nel riquadro, aggiungi `screenshot: "img/progetti/nome.jpg"`.

## Provarlo in locale
Le guide si aprono in un iframe, quindi serve un piccolo server:
```
python -m http.server 8000
```
poi apri http://localhost:8000
