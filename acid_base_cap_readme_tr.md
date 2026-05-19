# ACID ve BASE Veritabanında Tutarlılık Konusu

<p align="center">
  <img src="https://img.shields.io/badge/Database-Consistency-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/CAP-Theorem-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/ACID-vs-BASE-green?style=for-the-badge" />
</p>

---

# İçindekiler

- [Giriş](#giriş)
- [CAP Teoremi](#cap-teoremi)
- [Consistency Nedir?](#consistency-nedir)
- [ACID Nedir?](#acid-nedir)
- [BASE Nedir?](#base-nedir)
- [ACID vs BASE Karşılaştırması](#acid-vs-base-karşılaştırması)
- [Gerçek Hayat Örnekleri](#gerçek-hayat-örnekleri)
- [Sonuç](#sonuç)

---

# Giriş

Modern yazılım sistemlerinde verinin:

- Doğru olması
- Kaybolmaması
- Tutarlı görünmesi
- Aynı anda milyonlarca kullanıcıya hizmet verebilmesi

çok önemlidir.

Özellikle:

- Bankacılık
- E-ticaret
- Sosyal medya
- Büyük veri sistemleri
- Dağıtık mimariler

bu kavramların merkezindedir.

Bu noktada karşımıza şu temel konular çıkar:

- CAP Theorem
- ACID
- BASE
- Consistency (Tutarlılık)

---

# CAP Teoremi

CAP Teoremi şunu söyler:

> Dağıtık bir sistem aynı anda 3 özelliğin tamamını kusursuz sağlayamaz.

Bu özellikler:

| Kısaltma | Açılımı | Anlamı |
|---|---|---|
| C | Consistency | Tutarlılık |
| A | Availability | Erişilebilirlik |
| P | Partition Tolerance | Ağ Bölünmesine Dayanıklılık |

---

## CAP Görseli

```text
           +----------------+
           | Consistency    |
           +----------------+
                 / \
                /   \
               /     \
              /       \
+----------------+   +----------------+
| Availability   |   | Partition Tol. |
+----------------+   +----------------+
```

---

## Consistency (Tutarlılık)

Tüm kullanıcılar aynı anda aynı veriyi görür.

### Örnek

Banka hesabında:

```text
1000 TL
```

varsa:

- ATM → 1000 TL
- Mobil → 1000 TL
- İnternet bankacılığı → 1000 TL

hepsi aynı değeri görüyorsa sistem tutarlıdır.

Ama:

- ATM → 900 TL
- Mobil → 1000 TL

ise veri tutarsızdır.

---

## Availability (Erişilebilirlik)

Sistem her zaman cevap verir.

Bazı sunucular çökse bile sistem ayakta kalır.

### Örnek

- WhatsApp
- Instagram
- Netflix

milyonlarca kullanıcıya aynı anda hizmet verebilir.

---

## Partition Tolerance

Sunucular arası ağ kopsa bile sistem çalışmaya devam eder.

Dağıtık sistemlerde:

- Sunucular farklı ülkelerde olabilir
- Ağ kesintileri yaşanabilir
- Node’lar birbirini göremeyebilir

Buna rağmen sistem tamamen durmamalıdır.

---

# CAP Seçimleri

## CP (Consistency + Partition Tolerance)

Tutarlılık önceliklidir.

Veri yanlış görünmesin diye bazı işlemler bekletilebilir.

### Kullanım Alanı

- Bankacılık
- Finans sistemleri
- Muhasebe

---

## AP (Availability + Partition Tolerance)

Sistem sürekli açık kalır.

Kısa süreli veri tutarsızlığı olabilir.

### Kullanım Alanı

- Sosyal medya
- Büyük veri sistemleri
- Mesajlaşma uygulamaları

---

# ACID Nedir?

ACID, ilişkisel veritabanlarının temelidir.

Özellikle SQL veritabanlarında kullanılır:

- PostgreSQL
- SQL Server
- Oracle
- MySQL

ACID güçlü veri tutarlılığı sağlar.

---

# ACID Açılımı

| Harf | Açılım | Anlam |
|---|---|---|
| A | Atomicity | Ya hep ya hiç |
| C | Consistency | Veri kuralları korunur |
| I | Isolation | İşlemler birbirini etkilemez |
| D | Durability | Veri kalıcıdır |

---

# A — Atomicity (Atomiklik)

Bir işlem ya tamamen gerçekleşir ya da hiç gerçekleşmez.

Yarım kalamaz.

---

## Banka Transferi Örneği

```text
1. Hesaptan 1000 TL düş
2. Karşı hesaba 1000 TL ekle
```

İkinci adım başarısız olursa:

```text
TÜM İŞLEM GERİ ALINIR
```

Buna:

```text
ROLLBACK
```

denir.

---

## SQL Transaction Örneği

```sql
BEGIN TRANSACTION;

UPDATE Hesap
SET Bakiye = Bakiye - 1000
WHERE Id = 1;

UPDATE Hesap
SET Bakiye = Bakiye + 1000
WHERE Id = 2;

COMMIT;
```

Hata olursa:

```sql
ROLLBACK;
```

---

# C — Consistency (Tutarlılık)

Her işlemden sonra veri kuralları korunmalıdır.

### Örnek Kurallar

```text
Yaş negatif olamaz
Email benzersiz olmalı
Bakiye eksiye düşmemeli
```

---

## Constraint Örneği

```sql
CHECK (Yas >= 0)
UNIQUE (Email)
```

---

# I — Isolation (İzolasyon)

Aynı anda çalışan işlemler birbirini etkilemez.

Her işlem tek başına çalışıyormuş gibi davranır.

---

## Örnek

İki kullanıcı aynı ürünü aynı anda satın almaya çalışıyor.

```text
Kullanıcı A -> Ürünü güncelliyor
Kullanıcı B -> Bekliyor
```

İlk işlem bitince:

```sql
COMMIT;
```

olur ve kilit açılır.

---

# D — Durability (Dayanıklılık)

İşlem başarılıysa veri artık kalıcıdır.

Elektrik kesilse bile veri kaybolmaz.

---

## Örnek

```text
Transfer tamamlandı
Sunucu çöktü
Veri hala kayıtlı
```

---

# ACID Özeti

✅ Güçlü tutarlılık

✅ Veri güvenliği

✅ Finans sistemleri için ideal

❌ Büyük dağıtık sistemlerde ölçeklenmesi daha zor

❌ Daha maliyetli

---

# BASE Nedir?

BASE özellikle NoSQL ve büyük dağıtık sistemlerde kullanılır.

BASE açılımı:

| Harf | Açılım |
|---|---|
| B | Basically Available |
| A | Soft State |
| E | Eventual Consistency |

---

# BASE Mantığı

BASE sistemler şunu söyler:

> “Önemli olan sistemin her zaman çalışmasıdır.”

Anlık tutarlılık yerine:

- Ölçeklenebilirlik
- Hız
- Sürekli erişilebilirlik

önceliklidir.

---

# Basically Available

Sistem her zaman cevap verir.

Bazı node’lar düşse bile sistem çalışır.

### Örnek

```text
100.000 sunucudan biri çöktü
Sistem hala aktif
```

---

# Soft State

Sistem geçici olarak farklı veri durumlarında olabilir.

Yani veriler anlık olarak tam senkron olmayabilir.

---

# Eventual Consistency

Veri zamanla tutarlı hale gelir.

İlk anda farklı sunucular farklı veri gösterebilir.

Ama sonunda hepsi aynı olur.

---

## WhatsApp Örneği

Mesaj bazen hemen gitmeyebilir.

Ama birkaç saniye sonra ulaşır.

Bu:

```text
Eventual Consistency
```

örneğidir.

---

## Sosyal Medya Örneği

Instagram like sayısı herkeste aynı anda görünmeyebilir.

```text
Kullanıcı A -> 1000 like
Kullanıcı B -> 998 like
```

Bir süre sonra sistem eşitlenir.

---

# BASE Özeti

✅ Çok yüksek ölçeklenebilirlik

✅ Sürekli erişilebilirlik

✅ Büyük veri sistemleri için ideal

❌ Kısa süreli veri tutarsızlığı olabilir

❌ Finans gibi kritik sistemlerde risklidir

---

# ACID vs BASE Karşılaştırması

| Özellik | ACID | BASE |
|---|---|---|
| Tutarlılık | Güçlü | Nihai |
| Öncelik | Veri doğruluğu | Erişilebilirlik |
| Yapı | SQL | NoSQL |
| Performans | Daha düşük | Daha yüksek |
| Ölçeklenebilirlik | Zor | Kolay |
| Kullanım Alanı | Finans | Sosyal medya |
| Veri Riski | Çok düşük | Geçici tutarsızlık olabilir |

---

# Gerçek Hayat Örnekleri

## ACID Kullanılan Yerler

### Bankacılık

```text
Para transferi
Kredi işlemleri
Ödeme sistemleri
```

### E-Ticaret

```text
Sipariş ödeme işlemleri
Stok düşme işlemleri
```

---

## BASE Kullanılan Yerler

### Sosyal Medya

```text
Like sayıları
Takipçi sayıları
Gönderi akışları
```

### Büyük Veri Sistemleri

```text
Log sistemleri
Analitik platformlar
Öneri sistemleri
```

---

# Modern Sistemler Aslında Hibrit Çalışır

Büyük şirketler genellikle hem ACID hem BASE kullanır.

| Sistem Bölümü | Yaklaşım |
|---|---|
| Ödeme Sistemi | ACID |
| Bildirim Sistemi | BASE |
| Kullanıcı Feed’i | BASE |
| Finans Kayıtları | ACID |

---

# Commit, Rollback ve Lock

## Commit

İşlemi kalıcı hale getirir.

```sql
COMMIT;
```

---

## Rollback

Hata olursa işlemleri geri alır.

```sql
ROLLBACK;
```

---

## Lock

Veri çakışmasını önlemek için geçici kilitleme yapılır.

```text
İlk işlem çalışır
Diğer işlemler bekler
```

---

# Sonuç

CAP Teoremi bize şunu öğretir:

> Dağıtık sistemlerde her şeyi aynı anda kusursuz sağlayamazsın.

Bu yüzden sistem tasarımında öncelik belirlenir.

---

# ACID

- Güçlü tutarlılık
- Güvenilir veri
- Finans sistemleri için ideal

---

# BASE

- Yüksek erişilebilirlik
- Büyük ölçeklenebilirlik
- Dağıtık sistemler için ideal

---

# Kısa Özet

| Kavram | Anlam |
|---|---|
| CAP | Consistency, Availability, Partition Tolerance |
| ACID | Güçlü tutarlılık |
| BASE | Nihai tutarlılık |
| Commit | Kalıcı kaydetme |
| Rollback | Geri alma |
| Isolation | İşlem yalıtımı |
| Eventual Consistency | Nihai veri eşitliği |

---

# Faydalı Kaynak

Video:

```text
https://www.youtube.com/watch?v=CG_-QT2OcNk
```

---

# Lisans

MIT

