// Google places API dan city name e göre placedId çeken kod.
/*
const fs = require('fs');
const fetch = require('node-fetch');

// Google Places API anahtarınız
const apiKey = '';

// Dosyadan þehir isimlerini ve placeId'leri oku
let cities = JSON.parse(fs.readFileSync('places.json'));

// Google Places API isteði için fonksiyon
async function getPlaceId(city) {
    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(city.name)}&inputtype=textquery&fields=place_id&key=${apiKey}`);
        const data = await response.json();
        if (data.status === 'OK') {
            console.log(`${city.name}: ${data.candidates[0].place_id}`);
            city.placeId = data.candidates[0].place_id; // Yeni placeId'yi ekle
        } else {
            console.log(`${city.name}: Place ID bulunamadý.`);
        }
    } catch (error) {
        console.error(`Hata oluþtu: ${error}`);
    }
}

// Her bir þehir için 5 saniyelik gecikme ile istek gönder
async function sendRequests() {
    for (let i = 0; i < cities.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // 5 saniye bekle
        await getPlaceId(cities[i]);
    }
    
    // Güncellenmiþ þehir listesini dosyaya yaz
    fs.writeFileSync('places.json', JSON.stringify(cities, null, 2));
}

// Ýstekleri gönder
sendRequests();

*/
//******************************************************************* */

// Türkçe hataları düzelten script.

const fs = require('fs');
const fetch = require('node-fetch');

// Google Places API anahtarınız
const apiKey = 'AIzaSyB47VWFSvsgogEmQHUFGAjh1TfZFv0EM5E';

// Yer adını çekmek için fonksiyon
async function getPlaceName(placeId) {
    // API isteği için URL oluştur
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;

    try {
        // API'den veriyi çek
        const response = await fetch(url);
        const data = await response.json();
        // Yer adını al
        const placeName = data.result.name;
        return placeName;
    } catch (error) {
        console.error('Hata:', error);
        return null;
    }
}

// places.json dosyasını oku
fs.readFile('places.json', 'utf8', async (err, data) => {
    if (err) {
        console.error('Dosya okunurken hata oluştu:', err);
        return;
    }

    try {
        // JSON verisini parse et
        const places = JSON.parse(data);

        // Her bir placeId için yer adını al
        for (let i = 0; i < places.length; i++) {
            const place = places[i];
            const placeId = place.placeId;

            // Yer adını çek
            const placeName = await getPlaceName(placeId);
            if (placeName) {
                // Yer adını güncelle
                place.name = placeName;
                console.log(`Yeni Yer Adı: ${placeName}`);
            } else {
                console.log(`Yer adı bulunamadı: ${placeId}`);
            }

            // placesId ekleyen döngü
            for (let j = 0; j < placeId.length; j++) {
                const char = placeId[j];
                if (char === '�') {
                    // '�' karakterini 'ğ' ile değiştir
                    placeId[j] = 'ğ';
                } else if (char === '�') {
                    // '�' karakterini 'ı' ile değiştir
                    placeId[j] = 'ı';
                } // Diğer karakter değişiklikleri buraya eklenmeli
            }

            // 3 saniye beklet
            await new Promise(resolve => setTimeout(resolve, 3000));
        }

        // Güncellenmiş veriyi places.json dosyasına yaz
        fs.writeFile('places.json', JSON.stringify(places, null, 2), err => {
            if (err) {
                console.error('Dosya yazılırken hata oluştu:', err);
                return;
            }
            console.log('places.json dosyası güncellendi.');
        });
    } catch (error) {
        console.error('JSON verisi parse edilirken hata oluştu:', error);
    }
});
