# Yemek Sepeti (Udemy) Backend API Mimarisi 🚀

Bu doküman projemizdeki Backend Mimarisinin (**Next.js API Routes**) nasıl organize edildiğini, hangi API'lerin ne işe yaradığını ve nasıl birbirine bağlandıklarını açıklar.

## 📌 Genel Standartlar ve Akış

Projede kullanılan tüm API uçları (endpoints) ortak ve güvenli bir düzene oturtulmuştur:
1. **Veritabanı Bağlantısı**: Her API `await dbConnect()` ile çalışır.
2. **Hata Yakalama (Global Error Handler)**: Önceden dağınık olan `console.log(err)` vb. satırlar kaldırılarak tek merkezli bir `/util/errorHandler.js` dosyasına bağlandı. Hatalarda daima standart `success: false` ve `message` dönülür.
3. **Veri Doğrulama (Zod Validation)**: POST ve PUT gibi veri yazma/güncelleme işlemlerinin tamamında gelen veriler Zod ile doğrulanır (örn. Şifre formatı, ismin var olup olmadığı). Başarısız olursa Error Handler sayesinde net hata metinleri gösterilir.

---

## 📂 API Dosya Ağacı ve Görevleri

Bağlantı noktalarının tamamı `pages/api/` altında yer alır:

### 👤 1. Kullanıcılar (Users) Modülü
**/api/users/...**

- **`GET /api/users`** 
  - **Ne Yapar?** Sistemdeki tüm kayıtlı kullanıcıları getirir. 
  - **Kullanım Yeri:** İleride yazılacak Admin panelinde "Kullanıcılar" listesinde kullanılır.

- **`POST /api/users`**
  - **Ne Yapar?** Arka planda şifre hashlama olmadan hızlıca bir "taslak" kullanıcı oluşturmak istendiğimizde (genellikle Admin özel işlemlerinde) kullanılır.
  
- **`POST /api/users/register`** 
  - **Ne Yapar?** Sadece dışarıdan üye olmak isteyen standart **Müşteriler** içindir. Frontend kısmında Üye Kayıt (Register) Formu gönderildiğinde bu API çalışır. Gelen `password` doğrudan kaydedilmez, güvenli bir "bcrypt hash" ile kriptolanıp veritabanına eklenir. Ayrıca iki kere üst üste form gönderimlerinde e-mail bazlı Race Condition oluşmasın diye veritabanı seviyesinde `unique: true` korumasına sahiptir.

- **`GET /api/users/[id]`**
  - **Ne Yapar?** Tek bir kullanıcının (Profil sayfasındaki detayları vs.) bilgilerine erişmek için çalışır.

- **`PUT /api/users/[id]`**
  - **Ne Yapar?** Kullanıcı, "Profilimi Güncelle" sayfasına gidip şifresini/adını vs değiştirdiğinde çalışır.

---

### 🍔 2. Ürünler (Products) Modülü
**/api/products/...**

- **`GET /api/products`**
  - **Ne Yapar?** Restoranın menüsündeki ürünleri getirir (Anasayfa veya Menü sayfası).

- **`POST /api/products`**
  - **Ne Yapar?** Yeni bir burger veya menü ürünü eklendiğinde çalışır (Sadece Admin yetkilileri ileride erişebilecektir). Zod ile ürün fiyatının `string` yerine `number` formatında girilmesi gerektiği denetlenir.

- **`GET /api/products/[id]`**
  - **Ne Yapar?** Bir ürünün detayına tıklandığında, sepete eklerken ürün fiyatı, ek malzemeleri (peynir, ketçap vb) ve resminin yüklenmesi için çalışır.

- **`DELETE /api/products/[id]`**
  - **Ne Yapar?** Bir ürünü sistemden ve menüden temelli silmek için kullanılır.

---

### 🛒 3. Kategoriler (Categories) Modülü
**/api/categories/...**

- **`GET /api/categories`**
  - **Ne Yapar?** Menüde ürün filtremesini sağlayan başlıkları (Burger, Pizza, İçecek) listeler.
- **`POST /api/categories`**
  - **Ne Yapar?** Menüye yeni bir kategori ("Tatlılar" vb.) ekler (Zod ile adı zorunlu kılınmıştır).

---

### 🧾 4. Siparişler (Orders) Modülü
**/api/orders/...**

- **`GET /api/orders`**
  - **Ne Yapar?** Müşterilerin verdiği veya sonlanmış tüm siparişleri Admin paneli için getirir.
- **`POST /api/orders`**
  - **Ne Yapar?** Müşteri sepette ürünleri seçip "Siparişi Tamamla" dediğinde tetiklenir. Zod ile toplam ücret ve sipariş eden kişinin adres/kimlik onayı doğrulanır.

- **`GET /api/orders/[id]`** 
  - **Ne Yapar?** Müşteriye "Sipariş Takibi" yapabilmesi için tek bir faturanın durumunu (`Hazırlanıyor`, `Yolda` vb.) listeler.

---

### 🏗️ Notlar ve Gelecek Geliştirmeler
Tüm bu API uçlarında **Error Handler** yapısı kusursuz bağlanmıştır. Geliştirme aşamasında olduğumuz için Postman üzerinden istek atıp test edilirken şimdilik her şey açık haldedir ancak yakında **Authentication (Giriş/Kimlik Doğrulaması)** ve **Authorization (Yetkilendirme)** ile bu CRUD işlemleri (özellikle POST ve DELETE olanlar) özel Next-Auth koruma katmanlarının arkasına alınacaktır.
