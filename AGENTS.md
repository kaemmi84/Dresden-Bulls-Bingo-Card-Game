# Coding agent instructions

Read the [README](README.md) for the project structure, entry point, and local preview command. Keep relative asset paths working when the browser opens the site directly from `Website/` or loads it over HTTP.

## Board changes

- Treat each `data-scene` value as a stable ID. Saved progress uses these IDs.
- Preserve the 25-square, 5×5 layout and the current square order. When a change requires reordering the squares, verify the winning-line indices in `bingo.js`.
- Update the German title and description in `index.html` and the English equivalents under the same scene ID in `english.js`. Verify new interface text in both languages.
- Use the corresponding square's title, description, and image for its detail card.

## Verification

- **Game logic:** Mark squares, reload to confirm progress is saved, and complete a row, column, and diagonal. Confirm that the celebration plays when a line is completed and stays quiet when an existing bingo is restored after reload.
- **Layout:** Check sideways swiping in phone portrait mode and verify that all 25 squares fit on screen in phone landscape mode. Open a detail card with a long German title in both orientations.
- **Language and appearance:** Switch between German and English and between System, Light, and Dark. Reload and verify the selected settings and saved progress.
- **Print:** Verify a single portrait A4 page with all five rows, task descriptions, and current marks.
