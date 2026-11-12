# Hinweise für Coding Agents

Lies die [README](README.md), wenn du den Einstiegspunkt, die Projektstruktur oder den lokalen Start brauchst. Die Website läuft mit HTML, CSS und JavaScript direkt aus `Website/`. Halte relative Dateipfade und den Start im Browser funktionsfähig.

## Änderungen am Spielfeld

- Behandle `data-scene` als dauerhafte ID. Gespeicherte Spielstände verwenden diese IDs.
- Halte die 25 Felder in ihrer Reihenfolge im 5×5-Raster. Prüfe bei Änderungen der Reihenfolge die Zuordnung der Gewinnlinien in `bingo.js`.
- Pflege Aufgabentitel und Beschreibung in `index.html` und den englischen Gegenpart unter derselben ID in `english.js`. Prüfe neue UI-Texte in beiden Sprachen.
- Verwende bei Änderungen an den Detailkarten den bestehenden Titel, Aufgabentext und Bildpfad des jeweiligen Felds.

## Prüfung nach Änderung

- **Spiellogik:** Prüfe das Abhaken, das Neuladen mit gespeichertem Spielstand und die Erkennung einer Reihe, Spalte und Diagonale. Beim erneuten Laden eines bereits erreichten Bingos bleibt die Feier aus.
- **Layout:** Prüfe das Handy-Hochformat mit seitlichem Wischen und das Handy-Querformat mit allen 25 sichtbaren Feldern. Öffne in beiden Ansichten eine Detailkarte mit langem deutschen Titel.
- **Sprache und Darstellung:** Wechsle zwischen DE und EN sowie zwischen System, Hell und Dunkel. Prüfe nach dem Neuladen die gewählte Einstellung und den Spielstand.
- **Druck:** Prüfe in der Druckvorschau eine A4-Seite im Hochformat mit allen fünf Reihen, Aufgabenbeschreibungen und Markierungen.
