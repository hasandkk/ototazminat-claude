# Form Başvurularını Google E-Tablo'ya + E-postaya Bağlama

Form başvuruları hem **Google E-Tablo'ya satır olarak** işlenir hem de her başvuruda
**e-posta bildirimi** gönderilir. Aşağıdaki kod, e-tabloyu **ID ile** açtığı için
"tabloya yazmıyor" sorununu da çözer (en sık karşılaşılan hata budur).

---

## Adım 1 — Tablo ID'nizi alın
Google E-Tablonuzun adres çubuğundaki bağlantı şuna benzer:

```
https://docs.google.com/spreadsheets/d/1AbCDefGhIJKlmNoPQRstUVwxyz1234567890/edit#gid=0
```

Buradaki `/d/` ile `/edit` arasındaki kısım sizin **Tablo ID'nizdir**:
`1AbCDefGhIJKlmNoPQRstUVwxyz1234567890`

## Adım 2 — Apps Script kodunu güncelleyin
1. E-Tabloda **Uzantılar → Apps Komut Dosyası**.
2. Editördeki her şeyi silin, aşağıdaki kodu yapıştırın.
3. En üstteki `SHEET_ID` değerini, Adım 1'deki kendi ID'nizle değiştirin.
4. Kaydedin (disket).

```javascript
var SHEET_ID = 'BURAYA_TABLO_ID_YAPISTIRIN';
var BILDIRIM_EPOSTA = 'info@teminatgroup.com'; // bildirimleri almak istediğiniz e-posta

function doPost(e) {
  try {
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName('Başvurular') || ss.insertSheet('Başvurular');
    var p = (e && e.parameter) ? e.parameter : {};

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Tarih','Ad Soyad','Telefon','Şehir','Avukat','Araç','Yıl','Marka',
        'Model','KM','Piyasa Değeri','Kusur','Son 2 Yıl','Önceden Tazminat',
        'Hasarlı Parçalar','Tramer Tutarı','Tahmini Değer Kaybı','Kaynak']);
    }

    sheet.appendRow([p.tarih, p.adSoyad, p.telefon, p.sehir, p.avukat, p.arac, p.yil,
      p.marka, p.model, p.kilometre, p.piyasaDegeri, p.kusurOrani, p.sonIkiYil,
      p.oncedenTazminat, p.hasarliParcalar, p.tramerTutari, p.tahminiDegerKaybi, p.kaynak]);

    if (BILDIRIM_EPOSTA) {
      MailApp.sendEmail(BILDIRIM_EPOSTA,
        'Yeni Değer Kaybı Başvurusu: ' + (p.adSoyad || ''),
        'Ad Soyad: ' + (p.adSoyad || '') +
        '\nTelefon: ' + (p.telefon || '') +
        '\nŞehir: ' + (p.sehir || '') +
        '\nAraç: ' + (p.arac || '') +
        '\nHasarlı parçalar: ' + (p.hasarliParcalar || '') +
        '\nTramer tutarı: ' + (p.tramerTutari || '') +
        '\nPiyasa değeri: ' + (p.piyasaDegeri || '') +
        '\nKusur oranı: ' + (p.kusurOrani || '') +
        '\nTahmini değer kaybı: ' + (p.tahminiDegerKaybi || '') +
        '\nAvukat vekaleti: ' + (p.avukat || '') +
        '\nTarih: ' + (p.tarih || ''));
    }

    return ContentService.createTextOutput('OK');
  } catch (err) {
    return ContentService.createTextOutput('ERROR: ' + err);
  }
}

function doGet() {
  return ContentService.createTextOutput('Teminat Group form servisi çalışıyor.');
}
```

## Adım 3 — Yeniden yayınlayın (ÖNEMLİ)
Kodu her değiştirdiğinizde **yeni sürüm** yayınlamanız gerekir:
1. Sağ üst **Dağıt → Dağıtımları yönet** (Deploy → Manage deployments).
2. Mevcut dağıtımda **kalem (Düzenle)** simgesine basın.
3. **Sürüm: Yeni sürüm** seçin.
4. **Erişimi olanlar: Herkes (Anyone)** olduğundan emin olun.
5. **Dağıt**. (İlk kez izin istenirse hesabınızı seçip izin verin.)
6. URL aynı kalır — değişmez.

> İlk kez kuruyorsanız: **Dağıt → Yeni dağıtım → Web uygulaması**, *Çalıştır: Ben*,
> *Erişim: Herkes* → URL'yi alıp `assets/config.js` içine yapıştırın.

## Adım 4 — Çalışıyor mu test edin
1. **Servis testi:** Web App URL'sini tarayıcıda açın. "Teminat Group form servisi çalışıyor."
   yazısını görmelisiniz. (Görmüyorsanız dağıtım/erişim ayarı eksiktir.)
2. **Uçtan uca test:** Siteden bir başvuru yapın → E-Tabloda yeni satır + e-posta gelmeli.
   (E-posta ilk seferde Spam/Tüm Postalar klasörüne düşebilir.)

---

## "Tabloya yazmıyor" — Hızlı kontrol listesi
- [ ] `SHEET_ID` doğru mu? (URL'deki `/d/ ... /edit` arası)
- [ ] Dağıtımda **Erişim: Herkes** seçili mi?
- [ ] Kod değiştikten sonra **Yeni sürüm** dağıtıldı mı?
- [ ] `assets/config.js` içindeki URL `/exec` ile mi bitiyor?
- [ ] Test ederken sayfayı **sert yenileme** (Ctrl+F5) yaptınız mı? (eski dosya önbellekte kalmış olabilir)
