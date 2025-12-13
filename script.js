let countries = [];

async function init() {
    const res = await fetch('./countries.json');
    countries = await res.json();
    renderAllCountries(countries); 
}

init();

const select = document.getElementById("country");
select.addEventListener("change", () => {
    const region = select.value;
    if (region === "All") {
        renderAllCountries(countries);
        return;
    }
    const filtered = countries.filter(country => country.region === region);
    renderAllCountries(filtered);
});

const searchInput = document.getElementById("search");
searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase().trim();
    const filtered = countries.filter(country =>
        country.name.common.toLowerCase().includes(value)
    );
    renderAllCountries(filtered);
});


function renderAllCountries(list) {
    const container = document.getElementById('countries-container');
    container.innerHTML = '';
    list.forEach((country) => {
        const countryDiv = document.createElement('div');
        countryDiv.className = 'country';
        countryDiv.innerHTML = `
            <h2> 
            <img src="https://flagcdn.com/16x12/${country.cca2.toLowerCase()}.png"> 
            ${country.name.common}
            </h2>
            <p>Capital: ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p>Region: ${country.region}</p>
            <p>Area: ${country.area} km²</p>
            <p>Population: ${country.population.toLocaleString()}</p>
        `;
        container.appendChild(countryDiv);
    });
}

const themeBtn = document.getElementById("theme-toggle");
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});
function filterCountriesByPopulation() {
  const min = parseInt(document.getElementById('min-population').value) || 0;
  const max = parseInt(document.getElementById('max-population').value) || Infinity;

  const filtered = countries.filter(country => {
    return country.population >= min && country.population <= max;
  });

  renderAllCountries(filtered);
}
document.getElementById('filter-btn-population').addEventListener('click', filterCountriesByPopulation);


function filterCountriesByArea() {
  const min = parseInt(document.getElementById('min-area').value) || 0;
  const max = parseInt(document.getElementById('max-area').value) || Infinity;
  const filtered = countries.filter(country => {
    return country.area >= min && country.area <= max;
  });
  renderAllCountries(filtered);
}
document.getElementById('filter-area-btn').addEventListener('click', filterCountriesByArea);

