# Osobní web / online CV

Statická jednostránková vizitka a životopis. Čisté HTML, CSS a trocha JavaScriptu —
žádný build, žádné závislosti, žádné externí CDN. Stačí otevřít `index.html`.

## Struktura

```
index.html      celá stránka
css/style.css   styly (barvy jsou nahoře jako CSS proměnné)
js/main.js      přepínač motivu, mobilní menu, skládání e-mailu
assets/         favicon, místo pro fotku a PDF verzi CV
.nojekyll       vypne zpracování Jekyllem na GitHub Pages
CNAME.example   předloha pro vlastní doménu
```

## Co doplnit

V `index.html` jsou zástupné texty v hranatých závorkách — `[VAŠE JMÉNO]`,
`[POZICE]` a podobně. Najdete je rychle takto:

```bash
grep -n '\[' index.html
```

Sekce **projekty** už obsahuje reálně popsaný projekt `trade-team`, sekce
**dovednosti** je předvyplněná podle toho, co je v něm použité. Zbytek je na vás.

**E-mail** se nezapisuje do textu, ale do dvou atributů — JavaScript ho složí
až v prohlížeči, takže ho roboti nevysbírají ze zdroje stránky:

```html
<a class="contact__value js-email" href="#" data-user="jmeno" data-domain="domena.cz">
```

Dokud tam zůstane zástupný text v hranatých závorkách, odkaz se nechá neaktivní.

**Fotka:** vložte soubor do `assets/` a v `index.html` na něj odkažte
přes `<img src="assets/foto.jpg" alt="Portrét — [VAŠE JMÉNO]">`.

**PDF verze CV:** stránka se dá vytisknout přes Ctrl+P (navigace a tlačítka se
netisknou). Výsledek uložte jako `assets/cv.pdf` — tlačítko „Stáhnout CV v PDF"
na něj už odkazuje.

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
