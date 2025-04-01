document.addEventListener('DOMContentLoaded', function() {
    // Initialize map
    const map = L.map('contact-map').setView([3.5952, 98.6722], 13);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add marker for office location
    const officeMarker = L.marker([3.5952, 98.6722]).addTo(map);
    
    // Add popup to marker
    officeMarker.bindPopup(`
        <strong>Dinas Kebudayaan & Pariwisata Sumatera Utara</strong><br>
        Jl. Jenderal Sudirman No. 123<br>
        Medan, Sumatera Utara
    `).openPopup();
    
    // Add Tourist Information Centers to map
    const ticLocations = [
        {
            name: "TIC Bandara Kualanamu",
            coords: [3.6422, 98.8850],
            info: "Area Kedatangan Internasional & Domestik"
        },
        {
            name: "TIC Parapat (Danau Toba)",
            coords: [2.6634, 98.9430],
            info: "Dekat Pelabuhan Tigaraja"
        },
        {
            name: "TIC Berastagi",
            coords: [3.1944, 98.5089],
            info: "Pusat Kota Berastagi"
        }
    ];
    
    // Add TIC markers with custom icon
    const ticIcon = L.divIcon({
        html: '<i class="fas fa-info-circle" style="color:#ff4081;font-size:24px;"></i>',
        className: 'tic-icon',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });
    
    ticLocations.forEach(tic => {
        const marker = L.marker(tic.coords, {icon: ticIcon}).addTo(map);
        marker.bindPopup(`
            <strong>${tic.name}</strong><br>
            ${tic.info}
        `);
    });
}); 