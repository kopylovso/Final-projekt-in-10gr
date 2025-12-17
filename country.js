const params = new URLSearchParams(window.location.search);
const code = params.get('code');

fetch('/countries/' + code)
  .then(res => res.json())
  .then(country => {
    if (country.error) {
      document.body.innerHTML = '<h1>Country not found</h1>';
      return;
    }
    renderCountry(country);
  });

function renderCountry(country) {
  document.getElementById('country-name').textContent =
    country.name.common;

  document.getElementById('flag').src =
    `https://flagcdn.com/w320/${country.cca2.toLowerCase()}.png`;

  document.getElementById('info').innerHTML = `
    <p><b>Capital:</b> ${country.capital?.[0] || 'N/A'}</p>
    <p><b>Region:</b> ${country.region}</p>
    <p><b>Subregion:</b> ${country.subregion || '—'}</p>
    <p><b>Area:</b> ${country.area} km²</p>
    <p><b>Population:</b> ${country.population.toLocaleString()}</p>
  `;

  const map = L.map('map').setView(country.latlng, 5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  L.marker(country.latlng).addTo(map);
}
