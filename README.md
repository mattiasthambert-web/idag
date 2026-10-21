# Idag – tre saker

En liten webbapp som visar de tre saker som gäller idag. Stor text, stora knappar, inget krångel.

## Vad den gör

- Tre rader där du skriver in dagens tre saker.
- Varje rad har en stor **Klar**-knapp. Avbockade saker blir överstrukna. Tryck igen för att ångra.
- Knappen **Ny dag** rensar allt (med en bekräftelsefråga först).
- Allt sparas i webbläsaren (localStorage), så det finns kvar när du laddar om sidan.
- Fungerar lika bra på mobil som på dator.

## Så kör du den

Öppna `index.html` i en webbläsare. Ingen server, inget byggsteg, inga paket.

Vill du lägga den på GitHub Pages: ladda upp mappen som den är. Alla sökvägar är relativa, så sidan fungerar direkt.

## Filer

- `index.html` – sidan
- `style.css` – utseendet
- `app.js` – logik och sparning
- `favicon.svg` – ikonen i fliken
