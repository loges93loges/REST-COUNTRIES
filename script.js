document.addEventListener('DOMContentLoaded', () => {
    let originalOrder; 
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(countries => {
            countriesData = countries;
            displayCountryCards(countries);
        })
        .catch(error => console.error('Error fetching countries:', error));
    const viewWeatherButton = document.getElementById('viewWeatherButton');
    viewWeatherButton.addEventListener('click', () => {
        toggleWeatherDetailsContainer();
        if (weatherDetailsContainerVisible()) {
            fetchWeatherDetailsForAllCountries(countriesData);
        }
    });
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
        filterCountryCards(searchInput.value.toLowerCase());
    });
});
function toggleWeatherDetailsContainer() {
    const weatherDetailsContainer = document.getElementById('weatherDetailsContainer');
    weatherDetailsContainer.classList.toggle('d-none');
}
function weatherDetailsContainerVisible() {
    const weatherDetailsContainer = document.getElementById('weatherDetailsContainer');
    return !weatherDetailsContainer.classList.contains('d-none');
}
function displayCountryCards(countries) {
    const countryCardsContainer = document.getElementById('countryCardsContainer');
    countryCardsContainer.innerHTML = ''; // Clear existing content

    countries.forEach(country => {
        const card = createCountryCard(country);
        countryCardsContainer.appendChild(card);

        const weatherButton = card.querySelector('.weather-button');
        weatherButton.addEventListener('click', () => {
            fetchWeatherData(country.capital[0])
                .then(weatherData => {
                    updateCardWithWeather(card, weatherData);
                })
                .catch(error => console.error('Error fetching weather data:', error));
        });
    });
}
function createCountryCard(country) {
}
async function fetchWeatherData(city) {
}
function updateCardWithWeather(card, weatherData) {
}
async function fetchWeatherDetailsForAllCountries(countries) {
}
function filterCountryCards(searchQuery) {
    const countryCardsContainer = document.getElementById('countryCardsContainer');
    const cards = countryCardsContainer.getElementsByClassName('card');

    Array.from(cards).forEach(card => {
        const title = card.querySelector('.card-header h1').innerText.toLowerCase();

        if (title.includes(searchQuery)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
function createCountryCard(country) {
const card = document.createElement('div');
card.classList.add('row', 'col-lg-4', 'sm-12');
const population = country.population || 'N/A';
const area = country.area || 'N/A';
const region = country.region || 'N/A';
const nativeName = country.name.nativeName ? country.name.nativeName['common'] || 'N/A' : 'N/A';
card.innerHTML = `
<div class= "card">
<div class="card-header">
    <h1 id= "title" class="text-center">${country.name.common}</h1>
</div>
<img src="${country.flags.svg}" class="card-img-top" alt="Flag">
<div class="card-body">
<div class="card-text">
<strong>Capital:</strong> ${country.capital}<br>
<strong>Region:</strong> ${country.region}<br>
<strong>Country Code:</strong> ${country.cca2}<br>
<strong>Latitude/Longitude:</strong> ${country.latlng.join(', ')}
<br><br>
    <button class="btn btn-primary weather-button">Show Weather</button> 
</div></div></div>
`;
return card;
}
async function fetchWeatherData(city) {
const apiKey = 'd359bbe166ff39b892b62d431367b873';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
try {
const response = await fetch(apiUrl);
const weatherData = await response.json();
return weatherData;
} catch (error) {
console.error('Error fetching weather data:', error);
throw error;
}
}
function updateCardWithWeather(card, weatherData) {
const cardBody = card.querySelector('.card-body');
const temperature = (weatherData.main.temp - 273.15).toFixed(2); 
const weatherInfo = document.createElement('p');
weatherInfo.classList.add('card-text');
weatherInfo.innerHTML = `Temperature: ${temperature}°C`;
cardBody.appendChild(weatherInfo);
}
async function fetchWeatherDetailsForAllCountries(countries) {
const weatherDetailsContainer = document.getElementById('weatherDetailsContainer');
for (const country of countries) {
const weatherData = await fetchWeatherData(country.capital[0]);
const weatherDetails = document.createElement('div');
weatherDetails.classList.add('mb-4');
weatherDetails.innerHTML = `<strong>${country.name.common}:</strong> Temperature: ${(weatherData.main.temp - 273.15).toFixed(2)}°C`;
weatherDetailsContainer.appendChild(weatherDetails);
}
}
