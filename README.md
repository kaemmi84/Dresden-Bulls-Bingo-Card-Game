# Dresden Bulls · Drachenboot-Bingo

Eine statische Bingo-Website mit 25 illustrierten Drachenboot-Aufgaben für die Dresden Bulls vom Verein Kanusport Dresden. Fünf markierte Felder in einer Reihe, Spalte oder Diagonale ergeben ein Bingo. Insgesamt gibt es zwölf Gewinnlinien.

Die Website bietet Deutsch und Englisch, ein helles und ein dunkles Farbschema sowie eine Einstellung, die dem Systemdesign folgt. Der Browser speichert Spielstand, Sprache und Farbschema auf dem jeweiligen Gerät.

## Lokal öffnen

Öffne `Website/index.html` im Browser. Für die Vorschau über einen lokalen Webserver kannst du aus dem Projektordner auch Python 3 verwenden.

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory Website
```

Öffne anschließend [die lokale Vorschau](http://127.0.0.1:8000/). Die Website besteht aus HTML, CSS und JavaScript und braucht keinen Build-Schritt.

## Projektstruktur

| Pfad | Inhalt |
| --- | --- |
| [`Website/index.html`](Website/index.html) | Spielfeld, deutsche Texte und Bedienelemente |
| [`Website/bingo.css`](Website/bingo.css) | Bildschirm- und Drucklayout, Farbschemata und Animationen |
| [`Website/bingo.js`](Website/bingo.js) | Spielregeln, Spielstand, Sprachwechsel und Detailkarten |
| [`Website/english.js`](Website/english.js) | Englische Texte für die Aufgaben und die Bedienoberfläche |
| [`Website/assets/`](Website/assets/) | 25 Motive, Altstadtsilhouette und Vereinswappen |
| [`AGENTS.md`](AGENTS.md) | Hinweise für Änderungen am Projekt |

## Spielen und drucken

Tippe auf ein Feld, um es abzuhaken. Das Eselsohr unten rechts öffnet die Detailkarte mit Bild und Aufgabe. Im Handy-Hochformat kannst du seitlich durch die fünf Spalten wischen. Im Handy-Querformat sind alle 25 Felder auf einmal sichtbar.

Über das Druckersymbol öffnest du die Druckvorschau. Die Karte ist für ein A4-Blatt im Hochformat ausgelegt. Der Ausdruck enthält alle Aufgaben und die aktuellen Markierungen.

## Dateien fürs Repository

Übernimm die Website-Dateien einschließlich `Website/assets/` und die beiden Markdown-Dateien in die Versionsverwaltung. Das HTML-ZIP dient als Downloadpaket. `.DS_Store` ist eine lokale macOS-Datei.
