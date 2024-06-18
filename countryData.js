async function setCountryData() {
    const searchParams = new URLSearchParams(window.location.search)
    
    const code = searchParams.get('countryId')

    const country = await getCountry(code)

    console.log(country);
    
    document.getElementById('countryName').innerText = country.name.common
}

async function getCountry(code) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);

        const country = await response.json()

        return country[0]
    } catch (error) {
        console.error('ERROR', error);
    }
}