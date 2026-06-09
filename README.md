# Teminat Group — Değer Kaybı Tazminatı Web Sitesi

OtoTazminat tarzında, **Teminat Group** markası ve bilgileriyle hazırlanmış statik web sitesi.
Build adımı gerektirmez — saf HTML + [Tailwind CSS](https://tailwindcss.com) (CDN) + vanilla JS.

## Yapı

```
index.html                      # Ana sayfa (hero + hesaplayıcı, süreç, 5 adımlı timeline, SSS, iletişim)
deger-kaybi-hesaplayici.html    # 4 adımlı değer kaybı hesaplama sihirbazı
assets/
  logo.svg                      # Teminat Group logosu (açık/beyaz versiyon)
  icon.svg                      # Favicon
  main.js                       # Mobil menü, SSS akordeon, araç verisi, hero formu
pages/
  kullanim-kosullari.html
  gizlilik-politikasi.html
  aydinlatma-metni.html         # KVKK
  cerez-politikasi.html
```

## Firma Bilgileri
- **Adres:** Seyhan Auto City, Fevzipaşa, Turhan Cemal Berikel Bulvarı, 01190 Seyhan / Adana
- **Telefon:** 0552 602 20 79
- **E-posta:** info@teminatgroup.com

## Çalıştırma
Herhangi bir statik sunucu yeterli:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Notlar
- OtoTazminat'taki **Portal Girişi / Müşteri Portalı** bölümü kaldırıldı.
- Orijinaldeki yeşil tema, logoyla uyumlu olması için **kırmızı (brand)** vurguya uyarlandı.
- Görseldeki **"5 Adımda Sonuç — Başvurudan Tahsilata Kadar Yanınızdayız"** timeline bölümü eklendi.
- Hesaplayıcıdaki tahmini tutar yalnızca ön bilgilendirme amaçlıdır (gerçek backend entegrasyonu yoktur).
- Logo, iletilen görsele yakın bir SVG olarak yeniden oluşturulmuştur; orijinal PNG dosyanız varsa `assets/` altına ekleyip referansları güncelleyebilirsiniz.
