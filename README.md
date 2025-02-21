# Imaginer AI - Dil Destekli Görsel ve Metin Kayıt Sistemi

## Proje Açıklaması

Imaginer AI, kullanıcıların girdiği metinleri ve görselleri MongoDB'ye kaydeden bir projedir. Kullanıcılar İngilizce veya Türkçe bir metin girdiğinde, sistem bu metni otomatik olarak diğer dile çevirir ve her iki dilde de veritabanına kaydeder. Ayrıca, kullanıcının yüklediği görseller base64 formatında saklanır. 

Bu proje, çok dilli içerik yönetimini kolaylaştırmak ve kullanıcı deneyimini geliştirmek için tasarlanmıştır.

## Özellikler
- Kullanıcı tarafından girilen metin, boşluklara göre kelime kelime ayrılarak MongoDB'de diziler halinde saklanır.
- Metinler, dil desteği sağlayan bir API (Translate API) ile çevrilerek hem İngilizce hem de Türkçe olarak kaydedilir.
- Kullanıcı tarafından yüklenen görseller, base64 formatında veritabanına kaydedilir.
- Next.js API route'ları ile dosya yükleme ve metin işleme gerçekleştirilir.
- Yeni bir image generate edilmek istenildiğinde veritabanındaki kelimeleri kapsayacak şekilde en yakın görsel bulunur ve sunulur.

## Kullanılan Teknolojiler
- **Next.js** - React tabanlı modern web uygulamaları için framework
- **MongoDB** - NoSQL veritabanı
- **Mongoose** - MongoDB için ODM (Object Data Modeling) kütüphanesi
- **Translate API** - Metinlerin otomatik olarak çevrilmesi için kullanıldı
- **Axios** - API isteklerini yönetmek için
- **MUI (Material UI)** - UI bileşenleri
- **Tailwind CSS** - Modern CSS framework

## Kurulum ve Kullanım

### 1. Depoyu Klonlayın
```bash
git clone https://github.com/elifmarali/ImaginerAI
cd ImaginerAI
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```
veya
```bash
yarn install
```

### 3. Ortam Değişkenlerini Ayarlayın
Projede kullanılan API anahtarları ve veritabanı bağlantı bilgileri `.env.local` dosyasında tanımlanmalıdır.

### 4. Geliştirme Ortamında Çalıştırın
```bash
npm run dev
```
veya
```bash
yarn dev
```

### 5. Kullanım

#### Add Data
- Bir metin girerek ve bir görsel yükleyerek `Submit` butonuna tıklayın.
- Sistem, metni çevirecek ve her iki dilde de kaydedecektir.
- Yüklenen görseller, base64 formatında saklanacaktır.

#### Image Generater
- Bir propmt girerek (Türkçe/İngilizce) `Generate` butonuna tıklayın.
- Loading kısmının geçmesini bekleyin.
- Girdiğiniz prompta en uygun olan bir resim var ise resim getirilir.
- Eğer daha önceden veri tabanına benzer bir kayıt atılmadıysa mevcuttaki önerilerde bulunulur.