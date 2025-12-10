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
            <h2>${country.name.official}</h2>
            <p>Common Name: ${country.name.common}</p>
            <p>Capital: ${country.capital}</p>
            <p>Region: ${country.region}</p>
            <p>Population: ${country.population}</p>
        `;
        container.appendChild(countryDiv);
    });
}