const cityForm = document.querySelector('form');

const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return {
    cityDets,
    weather,
  };
};

cityForm.addEventListener('submit', (e) => {
  // Prevent Default value
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();

  // Update UI with new City
  updateCity(city)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});
