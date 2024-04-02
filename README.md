# google-places-api-city-matcher
Given city names match PlaceID Using Google Places API.

# Google Places API City Matcher

Bu proje, Google Places API kullanarak şehir isimlerini yer kimlikleri (place ID) ile eşleştiren bir araçtır.

## Nasıl Çalışır?

- Proje, Node.js ortamında çalışır.
- `places.json` dosyasından şehir isimlerini ve yer kimliklerini okur.
- Her bir şehir için Google Places API'ye bir istek gönderir.
- API'den dönen yer kimliklerini, orijinal şehir listesine ekler.
- Güncellenmiş şehir listesini `places.json` dosyasına kaydeder.

## Kurulum

1. Projeyi klonlayın:

git clone https://github.com/muhammedaliuyanik/google-places-api-city-matcher.git

2. Proje dizinine gidin:

cd google-places-api-city-matcher

3. Gerekli paketleri yükleyin:

npm install

4. Google Places API anahtarınızı `index.js` dosyasında `YOUR_API_KEY` olarak belirtilen yere ekleyin.

## Kullanım

Projeyi çalıştırmak için terminal veya komut istemcisinde aşağıdaki komutu çalıştırın:

node index.js
