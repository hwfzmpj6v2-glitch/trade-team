# Osobní web — fitness trenér a online coach

Statická jednostránková prezentace zaměřená na získávání klientů na coaching.
Čisté HTML, CSS a trocha JavaScriptu — žádný build, žádné závislosti, žádné
externí CDN. Stačí otevřít `index.html`.

## Struktura

```
index.html      celá stránka
css/style.css   styly (barvy jsou nahoře jako CSS proměnné)
js/main.js      přepínač motivu, mobilní menu, skládání e-mailu
assets/         favicon, místo pro fotku
.nojekyll       vypne zpracování Jekyllem na GitHub Pages
CNAME.example   předloha pro vlastní doménu
```

Sekce v pořadí: úvod → čísla → služby → jak spolupráce probíhá → o mně →
závodní výsledky → reference → kontakt.

## Co doplnit

V `index.html` jsou zástupné texty v hranatých závorkách. Najdete je takto:

```bash
grep -n '\[' index.html
```

**Priorita podle dopadu na to, kolik lidí napíše:**

1. **Reference klientů** — nejsilnější část stránky. Vyžádejte si od klientů
   pár vět, ideálně s konkrétním popisem změny, a nahraďte jimi zástupné citace.
2. **Úvodní odstavec** v sekci hero — komu pomáháte a s čím. Nejčtenější text
   na celé stránce.
3. **Fotka** — lidé si kupují člověka, ne text. Viz níže.
4. **Odkazy na sítě** — Instagram, YouTube, TikTok v sekci kontakt.
5. Zbytek: jméno, město, e-mail, počet klientů, certifikace, roky soutěží.

Závodní výsledky jsou vyplněné reálně: Kahan Cup 1× absolutní vítězství
a 3× první místo, Grand Prix Ostrava 2× druhé a 1× třetí místo. Doplňte
roky a kategorie — konkrétní údaje působí věrohodněji než souhrn.

## E-mail

E-mail není v textu stránky, ale ve dvou atributech. JavaScript ho složí až
v prohlížeči, takže ho spamoví roboti nevysbírají ze zdroje:

```html
<a class="contact__value js-email" href="#" data-user="jmeno" data-domain="domena.cz">
```

Stejné atributy má i tlačítko „Napsat e-mail" (`js-email-btn`) — u něj zůstane
popisek a mění se jen cíl odkazu. Dokud jsou v atributech zástupné texty
v hranatých závorkách, odkazy zůstanou neaktivní.

## Fotka

Vložte soubor do `assets/` a v `index.html` v sekci „O mně" odkomentujte blok
`<figure class="about__photo">`. Doporučení: na výšku, kolem 800 × 1000 px,
obličej dobře vidět. Před nahráním zmenšete pod 300 kB, ať se stránka
načítá rychle.

## Spuštění lokálně

```bash
python3 -m http.server 8000
```

Pak otevřete <http://localhost:8000>.

## Publikace na GitHub Pages

1. V repozitáři otevřete **Settings → Pages**
2. V sekci *Build and deployment* zvolte **Deploy from a branch**
3. Vyberte větev `main` a složku `/ (root)`, uložte
4. Za chvíli poběží web na `https://<uzivatel>.github.io/<repo>/`

## Vlastní doména

Až doménu budete mít:

1. Přejmenujte `CNAME.example` na `CNAME` a napište do něj holou doménu
   (např. `jmeno.cz`, bez `https://` a bez `www`)
2. U registrátora nastavte A záznamy pro holou doménu na adresy GitHub Pages:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. Pro `www` přidejte CNAME záznam na `<uzivatel>.github.io`
4. V **Settings → Pages** doménu vyplňte a zaškrtněte *Enforce HTTPS*

## Barvy

Všechny barvy jsou nahoře v `css/style.css` v bloku `:root`. Akcentní barva je
záměrně jen jedna — `--accent`. Změňte ji tam a promítne se do celé stránky;
nezapomeňte na tmavý režim, který má vlastní sadu hodnot níže, a na barvu
v `assets/favicon.svg`.
