# Dresden Bulls · Dragon Boat Bingo

A static bingo website with 25 illustrated dragon boat challenges for the Dresden Bulls team at Verein Kanusport Dresden. Mark five squares in a row, column, or diagonal to get a bingo. The board has twelve winning lines.

The site supports German and English and offers light, dark, and system appearance settings. The browser saves your progress, language, and appearance settings locally.

## Run locally

Open [Website/index.html](Website/index.html) in your browser. To preview the site over HTTP, run this command from the project directory with Python 3 installed.

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory Website
```

Then open the [local preview](http://127.0.0.1:8000/). The browser loads the HTML, CSS, and JavaScript directly from the project files.

## Project structure

| Path | Contents |
| --- | --- |
| [`Website/index.html`](Website/index.html) | Bingo board, German text, and controls |
| [`Website/bingo.css`](Website/bingo.css) | Screen and print layouts, appearance settings, and animations |
| [`Website/bingo.js`](Website/bingo.js) | Game logic, saved progress, language switching, and task details |
| [`Website/english.js`](Website/english.js) | English task and interface text |
| [`Website/assets/`](Website/assets/) | 25 illustrations, the Dresden old town skyline, and the team crest |
| [`AGENTS.md`](AGENTS.md) | Guidance for making and verifying changes |

## Play and print

Tap a square to mark it as complete. The folded corner at the bottom right opens a detail card with the illustration and task. In phone portrait mode, swipe sideways to reach all five columns. In phone landscape mode, all 25 squares fit on screen.

Use the printer icon to open the print preview. The print layout fits on one portrait A4 page and includes all tasks and current marks.

## Repository contents

Track the website files, including `Website/assets/`, and both Markdown files. The HTML ZIP is a downloadable bundle. `.DS_Store` is local macOS metadata.
