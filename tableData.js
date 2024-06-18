let currentPage = 1;
const rowsPerPage = 10;
let countries = [];

async function getCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        
        countries = await response.json();

        displayPage(currentPage);
        updatePageIndicator();
    } catch (error) {
        console.error('ERROR', error);
    }
}

function displayPage(page) {
    const tableBody = document.getElementById('countryTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageCountries = countries.slice(start, end);

    pageCountries.forEach(country => {
        const row = tableBody.insertRow();

        const nameCell = row.insertCell(0);
        nameCell.textContent = country.name.common;

        const capitalCell = row.insertCell(1);
        capitalCell.textContent = country.capital ? country.capital[0] : 'N/A';

        const regionCell = row.insertCell(2);
        regionCell.textContent = country.region;

        const populationCell = row.insertCell(3);
        populationCell.textContent = country.population.toLocaleString();

        const timezoneCell = row.insertCell(4);
        timezoneCell.textContent = country.timezones[0];

        const actionCell = row.insertCell(5);
        const viewButton = document.createElement('button');
        viewButton.textContent = 'View';
        viewButton.classList.add('btn', 'btn-secondary', 'btn-sm');
        viewButton.onclick = () => viewCountry(country);
        actionCell.appendChild(viewButton);
    });
}

function viewCountry(country) {

    // Get the current URL as a string
    const currentUrl = window.location.href;

    // Replace "index" with "country"
    const modifiedUrl = currentUrl.replace("index", "country");
    
    const url = new URL(modifiedUrl);

    url.searchParams.append('countryId', `${country.ccn3}`);
    window.location.href = url.toString();
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayPage(currentPage);
        updatePageIndicator();
    }
}

function nextPage() {
    if ((currentPage * rowsPerPage) < countries.length) {
        currentPage++;
        displayPage(currentPage);
        updatePageIndicator();
    }
}

function updatePageIndicator() {
    document.getElementById('pageIndicator').textContent = `Page ${currentPage}`;
}
