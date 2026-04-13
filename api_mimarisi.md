# Yemek Sepeti — Backend API Mimarisi 🚀

Bu doküman projemizdeki Backend Mimarisinin (**Next.js API Routes**) nasıl organize edildiğini, hangi API'lerin ne işe yaradığını ve nasıl birbirine bağlandıklarını açıklar.

---

## 📌 Genel Standartlar ve Akış

Tüm API uçları aşağıdaki ortak katmanlara sahiptir:

| Katman | Açıklama |
|---|---|
| **Veritabanı** | Her API `await dbConnect()` ile çalışır |
| **Hata Yakalama** | Merkezi `util/errorHandler.js` — her hatada `{ success: false, message }` döner |
| **Veri Doğrulama** | POST/PUT işlemlerinde `Zod` ile gelen veri doğrulanır. Hatalı format → 400 + detaylı mesaj |
| **Kimlik & Rol** | NextAuth `jwt` + `session` callback'leri ile `session.user.role` taşınır |
| **Middleware** | `middleware.js` — `/profile/*` ve `/admin/profile/*` için giriş + rol kontrolü yapar |

---

## 🔐 Kimlik Doğrulama & Yetkilendirme Sistemi

### Nasıl Çalışır?
Sistemde **tek giriş noktası** vardır: `/auth/login`

Kullanıcı giriş yaptıktan sonra sistem `session.user.role` değerine bakarak yönlendirir:

```
role: "user"  → /profile/[id]     (Müşteri profili)
role: "admin" → /admin/profile    (Admin paneli)
```

### Admin Nasıl Belirlenir?
Admin hesabı özel bir kayıt sayfasıyla oluşturulmaz.  
**Best Practice:** Normal kullanıcı gibi kayıt olunur, ardından tek seferlik script çalıştırılır:

```bash
node scripts/make-admin.js elgun.ezmemmedov@mail.ru
```

Ya da MongoDB Atlas üzerinden ilgili kullanıcının `role` alanı `"admin"` olarak güncellenir.

### Korunan Sayfalar (Middleware)
| Sayfa | Kim Erişebilir |
|---|---|
| `/profile/*` | Giriş yapmış herkes |
| `/admin/profile/*` | Sadece `role: "admin"` olan kullanıcı |

---

## 📂 API Endpoint Listesi

### 👤 1. Kullanıcılar (Users) — `/api/users/`

| Method | Endpoint | Açıklama | Erişim |
|---|---|---|---|
| `GET` | `/api/users` | Tüm kullanıcıları listeler | Açık |
| `POST` | `/api/users` | Ham kullanıcı oluşturur (bcrypt yok) | Açık |
| `POST` | `/api/users/register` | Müşteri kaydı — şifre bcrypt ile hashlenir | Açık |
| `GET` | `/api/users/[id]` | Tek kullanıcı detayı | Açık |
| `PUT` | `/api/users/[id]` | Profil güncelleme — Zod doğrulamalı | Açık |

> **Not:** `/api/users` POST ile `/api/users/register` POST farkı:  
> `register` → Müşteri kayıt formu, bcrypt hash, Zod validasyon  
> `users POST` → Admin taraflı ham ekleme (ileride admin token ile korunacak)

---

### 🍔 2. Ürünler (Products) — `/api/products/`

| Method | Endpoint | Açıklama | Erişim |
|---|---|---|---|
| `GET` | `/api/products` | Tüm menü ürünlerini getirir | Açık |
| `POST` | `/api/products` | Yeni ürün ekler — Zod doğrulamalı | 🔒 İleride Admin only |
| `GET` | `/api/products/[id]` | Tek ürün detayı (sepet, ürün sayfası) | Açık |
| `DELETE` | `/api/products/[id]` | Ürün siler | 🔒 İleride Admin only |

---

### 🛒 3. Kategoriler (Categories) — `/api/categories/`

| Method | Endpoint | Açıklama | Erişim |
|---|---|---|---|
| `GET` | `/api/categories` | Tüm kategorileri listeler (Burger, Pizza…) | Açık |
| `POST` | `/api/categories` | Yeni kategori ekler — Zod doğrulamalı | 🔒 İleride Admin only |

---

### 🧾 4. Siparişler (Orders) — `/api/orders/`

| Method | Endpoint | Açıklama | Erişim |
|---|---|---|---|
| `GET` | `/api/orders` | Tüm siparişleri listeler (Admin paneli için) | Açık |
| `POST` | `/api/orders` | Sipariş oluşturur — Zod doğrulamalı | Açık |
| `GET` | `/api/orders/[id]` | Tek sipariş detayı (takip ekranı) | Açık |
| `PUT` | `/api/orders/[id]` | Sipariş durumunu günceller (Hazırlanıyor → Yolda) | 🔒 İleride Admin only |

---

### ~~🔒 5. Admin Auth — `/api/admin/` (Kaldırıldı)~~

> ❌ Bu endpoint artık **kullanılmıyor**. `410 Gone` döner.  
> Eski sistem: statik `ADMIN_TOKEN` cookie ile giriş.  
> Yeni sistem: NextAuth session + `role: "admin"` ile tamamen entegre edildi.

---

## 🗂️ Proje Dosya Yapısı

```
pages/api/
├── auth/
│   └── [...nextauth].js    ← NextAuth: JWT callbacks + rol sistemi
├── users/
│   ├── index.js            ← GET (liste) / POST (ham oluştur)
│   ├── register.js         ← POST (müşteri kayıt, bcrypt)
│   └── [id].js             ← GET / PUT (profil)
├── products/
│   ├── index.js            ← GET / POST
│   └── [id].js             ← GET / DELETE
├── categories/
│   └── index.js            ← GET / POST
├── orders/
│   ├── index.js            ← GET / POST
│   └── [id].js             ← GET / PUT
└── admin/
    └── index.js            ← ❌ Kaldırıldı, 410 döner

middleware.js               ← Route koruması (giriş + rol kontrolü)
util/errorHandler.js        ← Merkezi hata yönetimi
util/dbConnect.js           ← MongoDB bağlantısı
schema/validations.js       ← Tüm Zod şemaları
models/                     ← Mongoose modelleri (User, Product, Category, Order)
scripts/make-admin.js       ← İlk admin atama scripti
```

---

## 🏗️ Gelecek Geliştirmeler

- [ ] `POST /api/products`, `DELETE /api/products/[id]`, `POST /api/categories`, `PUT /api/orders/[id]` endpoint'leri `getServerSession` ile admin rolü kontrolüne alınacak
- [ ] `GET /api/orders` admin-only yapılacak
- [ ] Rate limiting eklenecek (çok fazla istek koruması)

---

## 🚀 Son Yapılan Geliştirmeler (Günün Özeti)

### 1. Zod ile Profil Güncelleme Hataları Giderildi
- Kullanıcı güncelleme endpoint'indeki `.partial()` ve `.refine()` çakışması (Zod'un `.partial() cannot be used on object schemas containing refinements` hatası) çözüldü.
- Sorunu çözmek için `schema/validations.js` dosyası 3 katmana ayrıldı:
  1. `baseUserSchema` (Ortak alanlar)
  2. `userValidationSchema` (Kayıt aşaması için tam doğrulamalı)
  3. `userUpdateValidationSchema` (Profil güncellemesi için partial olan)

### 2. Veritabanı Optimizasyonu
- Mongoose modeli (`models/User.js`) içerisinden `confirmPassword` alanı kaldırıldı. Güvenlik ve veri temizliği açısından bu değerin sadece sunucu tarafı onayında (Zod içinde) tutulup, veritabanına kaydedilmemesi sağlandı.

### 3. Kullanıcı Deneyimi ve Sayfa Hız Optimizasyonları
- Next.js 12 router mimarisine uygun olarak menü içindeki (Header, Logo, vb.) saf `<a>` etiketleri tam SPA uyumlu `<Link>` elementleriyle sarmallandı. 
- SPA özelliklerinin kırılması nedeniyle oluşan "sayfalar arası geçişlerde çok uzun sürme" problemi tamamen yok edildi.
- `getServerSideProps` içerisindeki (Ana Sayfa ve Menü sayfalarında) `axios.get` istekleri ardışık çalışmaktan kurtarılıp **`Promise.all`** ile asenkron ve paralel çalışır duruma getirildi. Sunucu taraflı hız yarı yarıya arttırıldı.
