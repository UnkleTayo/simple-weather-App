class ForeCast {
  constructor() {
    this.key = 'onSj18zgYDGGJK9EQ2wEKD8D6JiH4DnK';
    this.weatherURI =
      'https://dataservice.accuweather.com/currentconditions/v1/';
    this.cityURI =
      'https://dataservice.accuweather.com/locations/v1/cities/search';
  }

  async updateCity(city) {
    const cityDets = await this.getCity(city);
    const weather = await this.getWeather(cityDets.Key);

    return { cityDets, weather };
  }

  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;
    const response = await fetch(this.cityURI + query);
    const data = await response.json();

    return data[0];
  }

  async getWeather(id) {
    const query = `${id}?apikey=${this.key}`;

    const response = await fetch(this.weatherURI + query);
    const data = await response.json();

    return data[0];
  }
}

const foreCast = new ForeCast();

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
  // destructuring the properties
  const { cityDets, weather } = data;

  // update details template
  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  // update the night/day & icon images
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);

  let timeSrc = null;
  if (weather.IsDayTime) {
    timeSrc = 'img/day.svg';
  } else {
    timeSrc = 'img/night.svg';
  }
  time.setAttribute('src', timeSrc);

  // remove the d-none class if present
  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }
};

cityForm.addEventListener('submit', (e) => {
  // prevent default action
  e.preventDefault();

  // get city value
  const city = cityForm.city.value.trim();
  console.log(city);

  // Clear the input field
  cityForm.reset();

  // update the ui with new city
  foreCast
    .updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

  // Set Local storage
  localStorage.setItem('city', city);
});

if (localStorage.getItem('city')) {
  foreCast
    .updateCity(localStorage.getItem('city'))
    .then((data) => {
      // update the UI
      updateUI(data);
    })
    .catch((err) => console.log(err));
}
