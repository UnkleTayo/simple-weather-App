const key = 'onSj18zgYDGGJK9EQ2wEKD8D6JiH4DnK';
// Get weather
const getWeather = async (id) => {
  base = 'http://dataservice.accuweather.com/currentconditions/v1/';

  const query = `${id}?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];
};

// Get city Info
const getCity = async (city) => {
  const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];
};
