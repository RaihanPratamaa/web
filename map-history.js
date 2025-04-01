document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi peta dengan koordinat Sumatera Utara
    const map = L.map('history-map').setView([2.5234, 98.7194], 8);

    // Tambahkan layer OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Data situs sejarah
    const historicalSites = [
        {
            name: "Istana Maimun",
            coord: [3.5755, 98.6808],
            type: "istana",
            desc: "Istana Kesultanan Deli yang dibangun pada tahun 1888, menampilkan perpaduan arsitektur Melayu, Islam, Spanyol, India, dan Italia.",
            period: "Kesultanan"
        },
        {
            name: "Rumah Tjong A Fie",
            coord: [3.5857, 98.6792],
            type: "bangunan",
            desc: "Bekas kediaman saudagar Tionghoa yang berpengaruh, dibangun sekitar tahun 1895-1900.",
            period: "Kolonial"
        },
        {
            name: "Makam Raja Sisingamangaraja XII",
            coord: [2.3342, 99.0634],
            type: "makam",
            desc: "Makam pahlawan nasional dan pemimpin perlawanan Batak terhadap kolonialisme Belanda.",
            period: "Perlawanan"
        },
        {
            name: "Benteng Belanda di Pulau Penyengat",
            coord: [2.5796, 98.9109],
            type: "benteng",
            desc: "Benteng peninggalan kolonial Belanda dari abad ke-19.",
            period: "Kolonial"
        },
        {
            name: "Situs Kota Cina",
            coord: [3.6786, 98.6962],
            type: "situs",
            desc: "Situs arkeologi dari abad ke-11 hingga ke-14, bukti perdagangan internasional di pesisir timur Sumatera.",
            period: "Kuno"
        },
        {
            name: "Stasiun Kereta Api Medan",
            coord: [3.5829, 98.6739],
            type: "bangunan",
            desc: "Stasiun kereta api bersejarah yang dibangun pada masa kolonial Belanda (1886).",
            period: "Kolonial"
        },
        {
            name: "Tugu Proklamasi Medan",
            coord: [3.5889, 98.6743],
            type: "monumen",
            desc: "Monumen yang menandai pembacaan proklamasi kemerdekaan di Medan.",
            period: "Kemerdekaan"
        },
        {
            name: "Kampung Adat Lingga",
            coord: [3.2082, 98.3943],
            type: "kampung",
            desc: "Desa tradisional Karo dengan rumah adat dan artifak sejarah.",
            period: "Tradisional"
        }
    ];

    // Custom icons berdasarkan jenis situs sejarah
    const icons = {
        istana: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
        }),
        bangunan: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
        }),
        makam: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
        }),
        benteng: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
        }),
        situs: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
        }),
        monumen: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
        }),
        kampung: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
        })
    };

    // Objek untuk mengelompokkan situs berdasarkan periode sejarah
    const periodGroups = {
        Kuno: L.layerGroup(),
        Kesultanan: L.layerGroup(),
        Kolonial: L.layerGroup(),
        Perlawanan: L.layerGroup(),
        Kemerdekaan: L.layerGroup(),
        Tradisional: L.layerGroup()
    };

    // Tambahkan marker untuk setiap situs sejarah
    historicalSites.forEach(site => {
        const marker = L.marker(site.coord, {icon: icons[site.type]})
            .bindPopup(`
                <strong>${site.name}</strong><br>
                <em>Periode: ${site.period}</em><br>
                ${site.desc}
            `);
            
        // Tambahkan marker ke layer group berdasarkan periode
        periodGroups[site.period].addLayer(marker);
    });

    // Tambahkan semua layer group ke peta
    for (const period in periodGroups) {
        periodGroups[period].addTo(map);
    }

    // Tambahkan kontrol layer untuk filter periode
    const overlayMaps = {
        "Masa Kuno": periodGroups.Kuno,
        "Kesultanan": periodGroups.Kesultanan,
        "Kolonial": periodGroups.Kolonial,
        "Perlawanan": periodGroups.Perlawanan,
        "Kemerdekaan": periodGroups.Kemerdekaan,
        "Tradisional": periodGroups.Tradisional
    };

    L.control.layers(null, overlayMaps).addTo(map);

    // Tambahkan legenda
    const legend = L.control({position: 'bottomright'});
    legend.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'info legend');
        div.style.backgroundColor = 'white';
        div.style.padding = '10px';
        div.style.borderRadius = '5px';
        div.innerHTML = `
            <div style="margin-bottom: 5px;"><strong>Jenis Situs:</strong></div>
            <div style="color: #FFD700; margin-bottom: 5px;">● Istana/Keraton</div>
            <div style="color: #FF0000; margin-bottom: 5px;">● Bangunan Bersejarah</div>
            <div style="color: #000000; margin-bottom: 5px;">● Makam/Kompleks Pemakaman</div>
            <div style="color: #008000; margin-bottom: 5px;">● Benteng</div>
            <div style="color: #0000FF; margin-bottom: 5px;">● Situs Arkeologi</div>
            <div style="color: #FFA500; margin-bottom: 5px;">● Monumen</div>
            <div style="color: #800080;">● Kampung Adat</div>
        `;
        return div;
    };
    legend.addTo(map);

    // Tambahkan fitur pencarian
    const searchControl = L.control({position: 'topleft'});
    searchControl.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'search-control');
        div.innerHTML = `
            <input type="text" id="site-search" placeholder="Cari situs sejarah..." style="padding: 5px; width: 200px; margin: 10px;">
        `;
        return div;
    };
    searchControl.addTo(map);

    // Implementasi fungsi pencarian
    document.getElementById('site-search').addEventListener('input', function(e) {
        const searchText = e.target.value.toLowerCase();
        historicalSites.forEach(site => {
            if (site.name.toLowerCase().includes(searchText)) {
                map.setView(site.coord, 12);
            }
        });
    });
}); 