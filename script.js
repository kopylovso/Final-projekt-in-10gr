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
            <h2>${country.flag} ${country.name.common}</h2>
            <p>Capital: ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p>Region: ${country.region}</p>
            <p>Area: ${country.area} km²</p>
            <p>Population: ${country.population.toLocaleString()}</p>
        `;
        container.appendChild(countryDiv);
    });
}
