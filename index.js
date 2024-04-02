const fs = require('fs');
const fetch = require('node-fetch');

// Dosyadan þehir isimlerini ve placeId'leri oku
let cities = JSON.parse(fs.readFileSync('places.json'));

// Google Places API isteði için fonksiyon
async function getPlaceId(city) {
    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(city.name)}&inputtype=textquery&fields=place_id&key=AIzaSyB47VWFSvsgogEmQHUFGAjh1TfZFv0EM5E`);
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
