let countries = [];

async function init() {
  const res = await fetch('./countries.json');
  countries = await res.json();

  renderAllCountries(countries);
}

init();
function renderAllCountries(countries) {
  const container = document.getElementById('countries-container');
  container.innerHTML = '';
    countries.forEach((country) => {
        const countryDiv = document.createElement('div');
        countryDiv.className = 'country';
        countryDiv.innerHTML = `
            <h2>${country.flag} ${country.name.common}</h2>
            <p>Capital: ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p>Region: ${country.region}</p>
            <p>Area: ${country.area} km²</p>
            <p>Population: ${country.population.toLocaleString()}</p>
        `;
        container.appendChild(countryDiv);
    });
}