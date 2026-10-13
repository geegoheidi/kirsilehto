# Kirsi Lehto – seminaari- ja tukisivut

Kirsi Lehdon eduskuntavaalikampanjan (2027, Hämeen vaalipiiri) seminaarisivut, lipunmyynti ja lahjoitussivu.
Tämä dokumentti on tehty niin, että projektin voi luovuttaa seuraavalle henkilölle ilman erillistä perehdytystä.

| | |
|---|---|
| **Seminaarit** | https://seminaarit.kirsilehto.fi |
| **Tue kampanjaa** | https://tue.kirsilehto.fi |
| **Holvi-kauppa** | https://holvi.com/shop/kirsilehto/ |
| **Kampanjan pääsivu** | https://www.kirsilehto.fi (Wix, erillinen) |
| **Myyjä / rahat** | Kasvun Tekijät ry (Holvi-tili) |

---

## 1. Miten kokonaisuus toimii

```
GitHub (tämä repo)  ──push──▶  Netlify (julkaisu)  ──▶  seminaarit.kirsilehto.fi / tue.kirsilehto.fi
                                    │
                                    └── Netlify Forms: laskupyynnöt sähköpostiin
Sivun "Osta lippu" ──▶ Holvi-tuotesivu ──▶ maksu (kortti, verkkopankki, MobilePay) ──▶ kuitti = lippu
Wix (kirsilehto.fi) ──linkit──▶ seminaarit.kirsilehto.fi ja tue.kirsilehto.fi
```

- **Sivut** ovat tavallisia HTML-tiedostoja. Ei build-vaihetta, ei riippuvuuksia. Kun muutos pushataan `main`-haaraan, Netlify julkaisee sen noin minuutissa.
- **Maksut** hoitaa Holvi. Sivut vain linkittävät Holvin tuotteisiin. Rahat, kuitit ja kirjanpito ovat Holvissa.
- **Laskulla maksavat yritykset** täyttävät kassassa lomakkeen. Pyyntö tulee Netlify Formsin kautta sähköpostiin, ja lasku tehdään käsin Holvin Laskutus-osiossa.

## 2. Tiedostot

| Tiedosto | Mitä se on |
|---|---|
| `index.html` | Seminaarit-listaus (seminaarit.kirsilehto.fi) |
| `puolustus.html` | Puolustusalan seminaari 14.1.2027 |
| `kasvu.html` | Kasvuseminaari (sisältö vielä paikkamerkkeinä) |
| `tue.html` | Lahjoitussivu (tue.kirsilehto.fi) |
| `kiitos.html` | Kiitossivu maksun jälkeen, kalenterilinkki. `?e=puolustus` tai `?e=kasvu` |
| `kirsi.css` | Kaikkien sivujen yhteinen tyyli (värit, fontit) |
| `kassa.js` | Kassapaneeli: lipunvalinta, hinta, Holvi-linkki, laskupyyntölomake |
| `_redirects` | Netlify-sääntö: tue.kirsilehto.fi näyttää `tue.html`:n |
| `kuvat/` | Puhujakuvat (webp, 320×400, kasvot samassa kohdassa) |

## 3. Yleisimmät muutokset

### Hinnat, lipputyypit ja Holvi-linkit
Jokaisen seminaarisivun alussa on yksi asetuslohko. Muuta vain sitä:

```js
window.SEMINAARI = {
  alv: 0,              // 0 = ei arvonlisäveroa. Jos yhdistys rekisteröityy: 0.255
  liput: [
    { id: "yksi", nimi: "Yrityslippu", netto: 390, holvi: "https://holvi.com/shop/kirsilehto/product/…" },
    ...
  ]
};
```

Hinnat näkyvät myös lippukorteissa (`<div class="card">`) samalla sivulla. Päivitä molemmat kohdat.
**Holvin tuotteen hinnan pitää aina olla sama kuin sivulla.**

### Holvi-linkit

| Paikkamerkki | Tiedosto | Holvi-tuote | Hinta |
|---|---|---|---|
| ✅ `https://holvi.com/shop/kirsilehto/product/3575a949d08936ff895dcc2daa77395c/` | puolustus.html | Yrityslippu – Puolustusalan seminaari 14.1.2027 | 390 € |
| ✅ `https://holvi.com/shop/kirsilehto/product/29a79d50ad71131787589d6ca171136a/` | puolustus.html, kasvu.html | Molemmat seminaarit – Yrityslippu | 700 € |
| ✅ `https://holvi.com/shop/kirsilehto/product/63d7841f84b4aee8773481b9bc2c5423/` | puolustus.html | 3 lippua – Puolustusalan seminaari 14.1.2027 | 1 000 € |
| `HOLVI_LINKKI_KASVU_YRITYS` | kasvu.html | *ei vielä luotu* | 390 € |
| `HOLVI_LINKKI_KASVU_3` | kasvu.html | *ei vielä luotu* | 1 000 € |
| `HOLVI_LINKKI_20` … `_250`, `_10` | tue.html | *lahjoitustuotteet, ei vielä luotu* | 20–250 € |

Niin kauan kuin linkki on paikkamerkki, kassa näyttää keltaisen huomautuksen eikä nappi toimi.

### Uusi puhuja tai kuva
1. Kuva `kuvat/`-kansioon, **320×400 px, webp**, kasvot suunnilleen samankokoisina kuin muissa.
2. Lisää puhuja heroon (`<div class="sp">`) ja ohjelmaan (`<article class="item">`).

### Kasvuseminaarin julkaisu
1. Täytä `kasvu.html`:n hakasulkeiset kohdat ja `kiitos.html`:n `kasvu`-rivi (päivä, kellonaika, paikka).
2. Luo Holviin kasvuseminaarin tuotteet ja lisää linkit.
3. `index.html`: poista kasvukortista `soon`-luokka ja leima, ja muuta kortti linkiksi (`<a class="sem" href="kasvu.html">`) kuten puolustuskortti.

## 4. Holvi

- **Tili:** Kasvun Tekijät ry. **Kauppa:** holvi.com/shop/kirsilehto (osoitetta ei voi muuttaa).
- **Tulokategoria:** Seminaarilipputulot. Näin lipputulot erottuvat kirjanpidossa ja vaalirahoitusraportissa.
- **Tuotteiden lisäkysymykset:** yrityksen nimi ja Y-tunnus (pakollinen) sekä osallistujan nimi.
- **Kuittiviesti** sisältää kiitossivun linkin `https://seminaarit.kirsilehto.fi/kiitos.html?e=puolustus`.
- **ALV:** yhdistystä ei ole merkitty Holviin ALV-velvolliseksi, joten hinnat ovat lopullisia. Jos tämä muuttuu, päivitä Holvin kirjanpitoasetukset, kaupan myyntiehdot ja sivujen `alv`-arvo.
- **Verkkokaupan ehtojen hyväksyntä ja käyttäjähallinta** vaativat Holvissa tilin ylläpitäjän oikeudet.

## 5. Vaalirahoitus (muistilista)

- Eduskuntavaaleissa samalta tukijalta saa ottaa vastaan enintään **6 000 €**. Seuraa tätä Holvin ostajalistasta, jos sama ostaja ostaa useita kertoja.
- Yli **2 000 €:n** tuki ilmoitetaan nimellä vaalirahoitusilmoituksessa.
- Lipputulot ja niihin liittyvä mahdollinen tukiosuus: sovi kirjauskäytäntö taloudenhoitajan kanssa.
- Vaalirahoitusilmoitus tehdään VTV:lle vaalien jälkeen. Holvin raportit (Raportit-osio) ovat sen pohjana.

## 6. Domainit ja Wix

- Domain **kirsilehto.fi** on ostettu Planeetalta. Pääsivusto on Wixissä.
- **seminaarit.kirsilehto.fi** ja **tue.kirsilehto.fi**: CNAME-tietueet → Netlify-sivuston osoite. Tietueet lisätään siellä, missä domainin DNS:ää hallitaan (Wix, jos domain on kytketty nimipalvelimilla, muuten Planeetta).
- Netlifyssä molemmat on lisätty sivuston domaineiksi (Domain management). HTTPS tulee automaattisesti.
- Wixin valikossa linkit "Seminaarit" ja "Tue" osoittavat näihin osoitteisiin.

## 7. Luovutus seuraavalle henkilölle

Kaikki tilit on tarkoitus pitää **yhdistyksen nimissä, ei henkilökohtaisina**, jotta luovutus on vain käyttöoikeuksien siirto.

| Palvelu | Mitä annetaan | Missä |
|---|---|---|
| GitHub | Jäsenyys organisaatioon tai repon collaborator | Repo → Settings → Collaborators |
| Netlify | Team member | Team settings → Members |
| Holvi | Käyttäjä (verkkokauppa + laskutus) | Asetukset → Käyttäjät |
| Wix | Site contributor (vain valikkolinkit) | Wix → Roles & Permissions |
| DNS (Wix/Planeetta) | Tarvitaan vain domain-muutoksiin | – |
| Netlify Forms -ilmoitukset | Vaihda sähköpostiosoite | Netlify → Forms → Notifications |

**Ennen luovutusta tarkista:**
- [ ] Holvin kaupan yhteyssähköposti (Verkkokauppa → Asetukset) on oikean henkilön
- [ ] Netlify Formsin ilmoitukset menevät oikeaan osoitteeseen
- [ ] Sivujen footerin yhteystiedot ja `[Kirsi Lehdon tukiryhmä ry, Y-tunnus]` -kohdat on päivitetty
- [ ] Avoimet tilaukset ja laskupyynnöt on käsitelty

## 8. Testaus ennen julkaisua

1. Avaa sivu puhelimella ja tietokoneella.
2. Paina jokaista "Osta lippu" -nappia ja tarkista, että hinta on sama kassassa ja Holvissa.
3. Tee yksi oikea osto halvimmalla tuotteella, tarkista kuitti ja kiitossivun linkki ja hyvitä osto Holvista.
4. Lähetä testilaskupyyntö ja varmista, että sähköposti tulee perille.
