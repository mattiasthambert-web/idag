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

- Ren HTML, CSS och JavaScript. Inga paket, inga ramverk, inget byggsteg.
- Ingen server. Sidan är helt statisk och funkar utan nät när den väl är laddad.
- Fungerar på mobil och dator. Allt är på svenska, även variabelnamn i koden.

| Fil | Vad den gör |
|---|---|
| `index.html` | Sidan: tre rader, Ny dag-knappen och bekräftelserutan |
| `style.css` | Utseendet: varma färger, stor text, stora knappar |
| `app.js` | Logiken: läsa, spara, bocka av, rensa |
| `favicon.svg` | Ikonen i webbläsarfliken |

## Starta

Öppna `index.html` direkt i en webbläsare. Det räcker.

Vill man köra via en liten lokal server (bra för att testa på mobilen i samma nätverk):

```bash
python3 -m http.server 8000
```

Gå sedan till `http://localhost:8000`.

## Testa

Det finns inga automatiska tester. Testa för hand så här efter varje ändring:

1. Öppna sidan. Datumet syns överst och tre tomma rader visas.
2. Skriv text i alla tre fälten. Ladda om sidan. Texten ska finnas kvar.
3. Tryck Klar på en rad. Raden blir överstruken och knappen säger Klart. Tryck igen, det ångras.
4. Bocka av alla tre. Texten "Alla tre är klara. Bra jobbat!" visas.
5. Tryck Ny dag, sedan Avbryt. Inget ska rensas.
6. Tryck Ny dag, sedan Ja, rensa. Alla fält töms och "Rensat. Ny dag!" visas.
7. Öppna webbläsarens Console (F12). Det ska inte finnas några röda fel.
8. Testa på en mobil eller gör fönstret smalt. Knapparna ska vara lätta att träffa.

## Regler för arbete

- Jobba alltid på en branch, aldrig direkt på `main`. Ändringar går in via pull request.
- Små steg, commit ofta. Kolla checklistan ovan innan något kallas klart.
- Håll det enkelt. Inga paket eller byggverktyg om det inte verkligen behövs.
- Inga nycklar eller lösenord i koden. Appen har inga hemligheter idag, så ska det förbli.
- Skriv ner varje större beslut och varför här nedanför.

## Beslut

- **Ingen server, ingen inloggning.** Datan ligger i webbläsaren. Enklast möjliga. Nackdel: byter man webbläsare eller enhet följer inte datan med.
- **Ren JavaScript utan ramverk.** Appen är så liten att ett ramverk bara skulle göra den svårare att förstå.

## Changelog

- 2026-11-06: Första versionen av appen (index.html, style.css, app.js, favicon.svg, README.md).
- 2026-11-06: AGENTS.md skapad.
