async function fetchWeather() {
  const cityInput = document.getElementById("cityInput");
  const city = cityInput.value.trim();
  const result = document.getElementById("result-box");
  const cityHead = document.getElementById("city");

  if (!city) {
    result.innerHTML = "<h4>City name is required</h4>";
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/${city}`);
    const data = await response.json();

    if (data.error) {
      result.innerHTML = `<h4>${data.error}</h4>`;
      return;
    }

    result.innerHTML = `
            <p>Main: ${data.weather.main}</p>
            <p>Temperature: ${data.weather.temp}</p>
            <p>Humidity: ${data.weather.humidity}</p>
            <p>Wind Speed: ${data.weather.wind_speed}</p>
          `;

    cityHead.innerHTML = `<h3>${data.name}, ${data.country}</h3>`;
    cityInput.value = "";
  } catch {
    result.innerHTML = "<h4>Failed to fetch data</h4>";
  }
}
