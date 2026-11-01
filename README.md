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
| `puolustus.html` | Kansallinen puolustusalan seminaari 14.1.2027 (sininen) |
| `kasvu.html` | Kansallinen talouskasvun seminaari 17.2.2027 (vihreä teema: `<body class="teema-kasvu">`) |
| `tue.html` | Lahjoitussivu (tue.kirsilehto.fi): MobilePay 47849 "Kirsi Eduskuntaan!" (Kasvun tekijät ry), QR `kuvat/mobilepay-qr.png` |
| `kiitos.html` | Kiitossivu maksun jälkeen, kalenterilinkki. `?e=puolustus`, `?e=kasvu` tai `?e=molemmat` |
| `kirsi.css` | Kaikkien sivujen yhteinen tyyli (värit, fontit) |
| `kassa.js` | Kassapaneeli: lipunvalinta, hinta, Holvi-linkki, laskupyyntölomake |
| `_redirects` | Netlify-sääntö: tue.kirsilehto.fi näyttää `tue.html`:n |
| `kuvat/` | Puhujakuvat (webp, 320×400, kasvot samassa kohdassa) |

**Sisältö:** seminaarisivujen otsikot, nimet, väliotsikot ja tekstit ovat sanatarkasti seminaarien PDF-materiaalista (Canva, 22.10.2026). Älä muokkaa tekstejä ilman hyväksyntää.

**Teemat:** värit ovat `kirsi.css`:n alussa muuttujina. `.teema-kasvu` vaihtaa ne vihreiksi (#01925E / #01784E). Saman luokan voi antaa yksittäiselle elementille, kuten index-sivun kortille.

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

### Holvi-tuotteet ja linkit

| Holvi-tuote | Sivu / id | Hinta |
|---|---|---|
| Yrityslippu – Kansallinen puolustusalan seminaari 14.1.2027 | puolustus.html `yksi` | 390 € |
| Molemmat seminaarit – Yrityslippu (14.1. + 17.2.2027) | puolustus.html + kasvu.html `molemmat` | 700 € |
| 3 lippua – Kansallinen puolustusalan seminaari 14.1.2027 | puolustus.html `kolme` | 1 000 € |
| Yrityslippu – Kansallinen talouskasvun seminaari 17.2.2027 | kasvu.html `yksi` | 390 € |
| 3 lippua – Kansallinen talouskasvun seminaari 17.2.2027 | kasvu.html `kolme` | 1 000 € |

Tuote-id:t (osoite `https://holvi.com/shop/kirsilehto/product/<id>/`): puolustus yksi `3575a949…`, molemmat `29a79d50…`, puolustus 3 lippua `63d7841f…`, kasvu yksi `0394681e…`, kasvu 3 lippua `8779e169…`.

Linkit ovat sivujen `window.SEMINAARI`-lohkossa. Niin kauan kuin linkki on paikkamerkki (`HOLVI_…`), kassa näyttää keltaisen huomautuksen eikä nappi toimi.

### Uusi puhuja tai kuva
1. Kuva `kuvat/`-kansioon, **320×400 px, webp**, kasvot suunnilleen samankokoisina kuin muissa.
2. Lisää puhuja heroon (`<div class="sp">`) ja ohjelmaan (`<article class="item">`).

## 4. Holvi

- **Tili:** Kasvun Tekijät ry. **Kauppa:** holvi.com/shop/kirsilehto (osoitetta ei voi muuttaa).
- **Tulokategoria:** Seminaarilipputulot. Näin lipputulot erottuvat kirjanpidossa ja vaalirahoitusraportissa.
- **Tuotteiden lisäkysymykset:** yrityksen nimi ja Y-tunnus (pakollinen) sekä osallistujan nimi.
- **Kuittiviesti** sisältää kiitossivun linkin `https://seminaarit.kirsilehto.fi/kiitos.html?e=puolustus` (kasvu: `?e=kasvu`, molemmat: `?e=molemmat`).
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

## 9. Hakukoneet ja jakokuvat

- Jokaisella sivulla on oma `<title>`, kuvaus, `canonical`-osoite sekä Open Graph- ja Twitter-tagit. Linkin jakokuva on `kuvat/og-*.jpg` (1200×630).
- Seminaarisivuilla on Event-rakenteinen data (JSON-LD): päivä, paikka, puhujat ja lippuhinnat. Google voi näyttää ne tapahtumahaussa.
- `robots.txt` ja `sitemap.xml` ovat juuressa, ja kiitossivu on `noindex`.
- Jos jakokuva ei päivity LinkedInissä tai Facebookissa, pakota uusi haku: LinkedIn Post Inspector (linkedin.com/post-inspector) ja Facebook Sharing Debugger (developers.facebook.com/tools/debug). WhatsApp käyttää välimuistia, joten uusi kuva näkyy vasta jonkin ajan päästä.
- Sitemapin voi lähettää Googlelle Search Consolessa (search.google.com/search-console). Se vaatii domainin vahvistuksen DNS:ssä.

## 10. Laskupyynnöt

1. Kassan "Lasku yritykselle" -lomake tallentuu Netlifyyn (Forms → laskupyynto). Netlify lähettää ilmoituksen osoitteeseen kasvuntekijat@gmail.com.
2. Zapier (kirjautuminen Googlella, kasvuntekijat@gmail.com) lähettää asiakkaalle automaattisen vahvistuksen Gmailista. Zap: "Laskupyyntö → vahvistus asiakkaalle". Ilmaisversiossa 100 viestiä/kk.
   - Vahvistuksen sisältö: otsikko "Tilausvahvistus: [tapahtuma]"; tilaus vastaanotettu, aika (kahvitus klo 12.30, ohjelma klo 13.00–16.00), paikka (Museo Militaria, Tykkihalli, Vanhankaupunginkatu 19, Hämeenlinna) + karttalinkki, sisäänpääsy (ei lippua, ovella kerrotaan yrityksen tai oman nimen), tilauksen tiedot (lippu, summa, yritys, osallistujat). Vastaukset menevät osoitteeseen kasvuntekijat@gmail.com.
3. Lasku tehdään käsin Holvissa: Laskutus → Uusi lasku. Tiedot (yritys, Y-tunnus, verkkolaskuosoite, lippu, summa) löytyvät Netlifyn ilmoitusviestistä.
