# Form Başvurularını Google E-Tablo'ya Bağlama (Kurulum)

Bu kılavuz, hesaplayıcı formunu dolduran müşterilerin bilgilerinin **otomatik olarak bir
Google E-Tablo'ya** işlenmesini ve isterseniz size **e-posta bildirimi** gönderilmesini sağlar.
Tek seferlik, yaklaşık 5 dakikalık bir kurulumdur. Teknik bilgi gerektirmez.

---

## Adım 1 — Google E-Tablo oluşturun
1. https://sheets.google.com adresine girin, **Boş e-tablo** açın.
2. Adını "Teminat Group Başvurular" yapın (isteğe bağlı).

## Adım 2 — Apps Script'i açın
1. Üst menüden **Uzantılar → Apps Komut Dosyası** (Extensions → Apps Script) tıklayın.
2. Açılan kod editöründeki tüm metni silin ve aşağıdaki kodu **olduğu gibi** yapıştırın:

```javascript
function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Başvurular') || ss.insertSheet('Başvurular');
  var p = e.parameter;

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Tarih','Ad Soyad','Telefon','Şehir','Avukat','Araç','Yıl','Marka',
      'Model','KM','Piyasa Değeri','Kusur','Son 2 Yıl','Önceden Tazminat',
      'Hasarlı Parçalar','Tramer Tutarı','Tahmini Değer Kaybı','Kaynak']);
  }

  sheet.appendRow([p.tarih, p.adSoyad, p.telefon, p.sehir, p.avukat, p.arac, p.yil,
    p.marka, p.model, p.kilometre, p.piyasaDegeri, p.kusurOrani, p.sonIkiYil,
    p.oncedenTazminat, p.hasarliParcalar, p.tramerTutari, p.tahminiDegerKaybi, p.kaynak]);

  // --- İsteğe bağlı: her başvuruda size e-posta bildirimi ---
  // Aşağıdaki 3 satırın başındaki // işaretlerini kaldırırsanız e-posta da gelir:
  // MailApp.sendEmail('info@teminatgroup.com',
  //   'Yeni Değer Kaybı Başvurusu: ' + p.adSoyad,
  //   'Telefon: ' + p.telefon + '\nŞehir: ' + p.sehir + '\nAraç: ' + p.arac +
  //   '\nHasarlı parçalar: ' + p.hasarliParcalar + '\nTramer: ' + p.tramerTutari +
  //   '\nTahmini değer kaybı: ' + p.tahminiDegerKaybi);

  return ContentService.createTextOutput('OK');
}
```

3. Sol üstten **kaydet** (disket simgesi) tıklayın.

## Adım 3 — Web uygulaması olarak yayınlayın
1. Sağ üstten **Dağıt → Yeni dağıtım** (Deploy → New deployment) tıklayın.
2. "Tür seçin" yanındaki dişli simgesine basıp **Web uygulaması**'nı seçin.
3. Ayarlar:
   - **Şununla çalıştır (Execute as):** Ben (kendi hesabınız)
   - **Erişimi olanlar (Who has access):** **Herkes** (Anyone)
4. **Dağıt** deyin. Google izin isteyecek → hesabınızı seçip **İzin ver** deyin.
   (Uyarı çıkarsa: "Gelişmiş → (proje adı) sayfasına git → İzin ver".)
5. Karşınıza çıkan **Web uygulaması URL'sini kopyalayın.**
   Şuna benzer: `https://script.google.com/macros/s/AKfycb..../exec`

## Adım 4 — URL'yi siteye yapıştırın
1. GitHub'da depo içinde `assets/config.js` dosyasını açın → kalem (Edit) simgesine basın.
2. `sheetEndpoint: ""` satırındaki tırnakların arasına kopyaladığınız URL'yi yapıştırın:
   ```javascript
   sheetEndpoint: "https://script.google.com/macros/s/AKfycb..../exec",
   ```
3. **Commit changes** ile kaydedin. (Bana söylerseniz bu adımı sizin için ben de yapabilirim.)

## Bitti! ✅
Artık her form gönderiminde yeni bir satır E-Tablo'nuza düşer. Birkaç dakika içinde
canlıya yansır. Test için siteden bir başvuru yapıp E-Tablo'yu kontrol edebilirsiniz.

---

### Notlar
- Kodu **güncellerseniz** Apps Script'te tekrar **Dağıt → Dağıtımları yönet → düzenle → Yeni sürüm → Dağıt** yapın.
- E-posta bildirimini açmak için Adım 2'deki ilgili satırların `//` işaretlerini kaldırın ve yeni sürüm dağıtın.
- Veriler yalnızca sizin Google hesabınızda tutulur; site bu verileri saklamaz.
