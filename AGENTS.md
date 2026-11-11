# AGENTS.md – Idag, tre saker

Det viktigaste om appen, för den som ska jobba i koden (människa eller AI).

## Vad appen gör

En liten webbsida som visar dagens tre saker. Stor text, stora knappar, inget krångel.

- Tre rader där man skriver in en sak per rad (max 100 tecken).
- Varje rad har en **Klar**-knapp. Avbockad sak blir överstruken. Tryck igen för att ångra.
- När alla tre är klara visas "Alla tre är klara. Bra jobbat!".
- **Ny dag** rensar allt, men frågar först "Rensa alla tre och börja om?".
- Allt sparas i webbläsaren (localStorage, nyckel `idag.v1`). Inget skickas någonstans.
- Dagens datum visas överst, på svenska.
- Enter i ett fält hoppar till nästa fält.

## Teknik

- Ren HTML, CSS och JavaScript. Inga ramverk, inget byggsteg. Själva appen har inga paket.
- Ingen server. Sidan är helt statisk och funkar utan nät när den väl är laddad.
- Fungerar på mobil och dator. Allt är på svenska, även variabelnamn i koden.
- Testerna använder Playwright (ett verktyg som styr en riktig webbläsare). Det är det enda paketet, och det används bara vid test.

| Fil | Vad den gör |
|---|---|
| `index.html` | Sidan: tre rader, Ny dag-knappen och bekräftelserutan |
| `style.css` | Utseendet: varma färger, stor text, stora knappar |
| `app.js` | Logiken: läsa, spara, bocka av, rensa |
| `favicon.svg` | Ikonen i webbläsarfliken |
| `tests/idag.spec.js` | Testerna, ett per punkt i checklistan nedan |
| `playwright.config.js` | Inställningar för testerna |
| `package.json` | Talar om att Playwright behövs för test. Kommandot `npm test` |
| `.github/workflows/test.yml` | Kör testerna automatiskt på GitHub vid varje pull request |

## Starta

Öppna `index.html` direkt i en webbläsare. Det räcker.

Vill man köra via en liten lokal server (bra för att testa på mobilen i samma nätverk):

```bash
python3 -m http.server 8000
```

Gå sedan till `http://localhost:8000`.

## Testa

### Automatiskt

Första gången, installera testverktyget (kräver Node, laddar ner en Chromium-webbläsare):

```bash
npm install
npx playwright install chromium
```

Kör sedan testerna:

```bash
npm test
```

Alla rader ska vara gröna. Testerna öppnar `index.html` i en riktig webbläsare och gör samma saker som checklistan nedan.

På GitHub körs samma tester automatiskt på varje pull request (jobbet heter `test`). Är det rött ska det inte mergas.

### För hand

Checklista, bra att gå igenom i en riktig mobil också:

1. Öppna sidan. Datumet syns överst och tre tomma rader visas.
2. Skriv text i alla tre fälten. Ladda om sidan. Texten ska finnas kvar.
3. Tryck Klar på en rad. Raden blir överstruken och knappen säger Klart. Tryck igen, det ångras.
4. Bocka av alla tre. Texten "Alla tre är klara. Bra jobbat!" visas.
5. Tryck Ny dag, sedan Avbryt. Inget ska rensas.
6. Tryck Ny dag, sedan Ja, rensa. Alla fält töms och "Rensat. Ny dag!" visas.
7. Öppna webbläsarens Console (F12). Det ska inte finnas några röda fel.
8. Testa på en mobil eller gör fönstret smalt. Knapparna ska vara lätta att träffa.
9. Räknaren under datumet visar "0 av 3 klara" och ändras när du bockar av eller ångrar.

## Regler för arbete

- Jobba alltid på en branch, aldrig direkt på `main`. Ändringar går in via pull request.
- Små steg, commit ofta. Kolla checklistan ovan innan något kallas klart.
- Håll det enkelt. Inga paket eller byggverktyg om det inte verkligen behövs.
- Inga nycklar eller lösenord i koden. Appen har inga hemligheter idag, så ska det förbli.
- Skriv ner varje större beslut och varför här nedanför.

## Beslut

- **Ingen server, ingen inloggning.** Datan ligger i webbläsaren. Enklast möjliga. Nackdel: byter man webbläsare eller enhet följer inte datan med.
- **Ren JavaScript utan ramverk.** Appen är så liten att ett ramverk bara skulle göra den svårare att förstå.
- **Playwright för tester, trots regeln om inga paket.** Alternativet var att låtsas vara en webbläsare i Node med egen kod, men då testas inte `index.html` på riktigt. Playwright testar hela sidan i riktig Chromium. Paketet behövs bara för test, aldrig för att köra appen.

## Changelog

- 2026-11-06: Första versionen av appen (index.html, style.css, app.js, favicon.svg, README.md).
- 2026-11-06: AGENTS.md skapad.
- 2026-11-06: Tester med Playwright (tests/idag.spec.js) och GitHub Actions-workflow som kör dem på varje pull request.
