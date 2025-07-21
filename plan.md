# Firestore Hasta Profili ve Profil Bilgisi Doldurma Planı

## Notlar
- Firestore veritabanı kullanılacak.
- Kullanıcılar sisteme sadece 'patient' olarak giriş yapacak, 'user' tablosu olmayacak.
- Profil bilgisi doldurma kısmında Firestore'dan hasta bilgisi çekilemiyor.
- Firestore'da 'patient' (doğru koleksiyon adı: 'patients') adında bir koleksiyon AuthContext register fonksiyonunda oluşturuluyor.
- Profil sayfası doğrudan 'patients' koleksiyonundan veri çekiyor.
- Profil bulunamama hatası, kaydın eksik veya hatalı oluşturulmasından kaynaklanabilir.
- İletişim dili Türkçe olacak.
- ProfilePage ve AuthContext güncellendi: Profil bulunamazsa otomatik oluşturuluyor, hata yönetimi iyileştirildi, lint hatası giderildi.
- Başvuru nedeni alanı radio button olarak "muayene" veya "kontrol" seçilmeli.
- Yer (il) alanı TürkiyeCities typedan çekilerek seçilmeli.
- Kaydet butonu çalışmıyor, debug için bolca console log eklenecek.
- Formun yüksekliği ve gölge sorunu için UI iyileştirmesi yapılacak.
- Layout ve standart font kullanılacak, login sayfasındaki gibi UI odaklı tasarım uygulanacak.
- Inputlara özel validasyonlar eklenecek: TC 11 haneli, telefon Türkiye formatında, isimler büyük harf ile başlayacak.

## Görev Listesi
- [x] Firestore'da 'patient' tablosunun varlığını ve yapısını kontrol et.
- [x] Profil bilgisi doldurma kısmında Firestore'dan 'patient' verisinin çekilmesini sağla.
- [x] Giriş yapan kullanıcıların 'patient' olarak kaydedildiğinden emin ol.
- [x] Kullanıcı arayüzünde profil bilgisi doldurma sürecini test et.
- [ ] Son değişiklikleri test et ve doğrula.
- [x] Başvuru nedeni alanını radio button olarak güncelle.
- [x] Yer (il) alanını TürkiyeCities tipinden çekerek listele.
- [x] Kaydet butonunun çalışmasını ve debug loglarını ekle.
- [x] Form yüksekliği/gölge ve layout UI iyileştirmesini uygula.
- [x] Standart font ve login sayfası benzeri UI tasarımı uygula.
- [x] Input validasyonlarını (TC, telefon, isim) uygula.
- [ ] ProfilePage'in navbar ve layout ile uyumlu olmasını sağla.

## Mevcut Hedef
ProfilePage'i navbar ve layout ile uyumlu hale getir.