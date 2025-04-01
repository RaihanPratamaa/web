document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi peta dengan koordinat Sumatera Utara
    const map = L.map('map-placeholder').setView([2.5234, 98.7194], 8);

    // Tambahkan layer OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Data lokasi penting
    const locations = [
        {
            name: "Bandara Internasional Kualanamu",
            coord: [3.6422, 98.8850],
            type: "transport",
            desc: "Bandara internasional utama Sumatera Utara"
        },
        {
            name: "Bandara Silangit",
            coord: [2.2595, 98.9914],
            type: "transport",
            desc: "Gerbang udara menuju Danau Toba"
        },
        {
            name: "Danau Toba",
            coord: [2.6036, 98.8317],
            type: "destination",
            desc: "Danau vulkanik terbesar di dunia"
        },
        {
            name: "Kota Medan",
            coord: [3.5952, 98.6722],
            type: "city",
            desc: "Ibukota Provinsi Sumatera Utara"
        },
        {
            name: "Berastagi",
            coord: [3.1944, 98.5089],
            type: "destination",
            desc: "Kota wisata dengan Gunung Sibayak"
        },
        {
            name: "Pulau Samosir",
            coord: [2.5897, 98.8265],
            type: "destination",
            desc: "Pulau budaya di tengah Danau Toba"
        },
        {
            name: "Bukit Lawang",
            coord: [3.5497, 98.1231],
            type: "destination",
            desc: "Pusat konservasi orangutan"
        },
        {
            name: "Parapat",
            coord: [2.6634, 98.9430],
            type: "destination",
            desc: "Kota wisata tepi Danau Toba"
        }
    ];

    // Custom icons untuk marker
    const icons = {
        transport: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
        }),
        destination: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
        }),
        city: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
        })
    };

    // Tambahkan marker untuk setiap lokasi
    locations.forEach(loc => {
        const marker = L.marker(loc.coord, {icon: icons[loc.type]})
            .bindPopup(`
                <strong>${loc.name}</strong><br>
                ${loc.desc}
            `)
            .addTo(map);
    });

    // Tambahkan legenda
    const legend = L.control({position: 'bottomright'});
    legend.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'info legend');
        div.style.backgroundColor = 'white';
        div.style.padding = '10px';
        div.style.borderRadius = '5px';
        div.innerHTML = `
            <div style="margin-bottom: 5px;"><strong>Legenda:</strong></div>
            <div style="color: blue; margin-bottom: 5px;">● Transportasi</div>
            <div style="color: green; margin-bottom: 5px;">● Destinasi Wisata</div>
            <div style="color: red;">● Kota Utama</div>
        `;
        return div;
    };
    legend.addTo(map);

    // Tambahkan kontrol zoom
    L.control.zoom({
        position: 'bottomright'
    }).addTo(map);

    // Tambahkan fitur pencarian lokasi
    const searchControl = L.control({position: 'topleft'});
    searchControl.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'search-control');
        div.innerHTML = `
            <input type="text" id="location-search" placeholder="Cari lokasi..." style="padding: 5px; width: 200px; margin: 10px;">
        `;
        return div;
    };
    searchControl.addTo(map);

    // Implementasi fungsi pencarian
    document.getElementById('location-search').addEventListener('input', function(e) {
        const searchText = e.target.value.toLowerCase();
        locations.forEach(loc => {
            if (loc.name.toLowerCase().includes(searchText)) {
                map.setView(loc.coord, 12);
            }
        });
    });
}); 