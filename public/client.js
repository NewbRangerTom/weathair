let lat, lon;
const button = document.getElementById("submit");

button.addEventListener("click", async (event) => {
    const data = { lat, lon };
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    const response = await fetch("/api", options);
    const json = await response.json();
    console.log(json);
});

if ("geolocation" in navigator) {
    console.log("geolocation available");
    navigator.geolocation.getCurrentPosition(async (position) => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      document.getElementById("lati").textContent = lat;
      document.getElementById("long").textContent = lon;

      const weather_url = `/weather/${lat},${lon}`;
      const weather_response = await fetch(weather_url);
      const current_weather = await weather_response.json();
      document.getElementById("name").textContent = current_weather.name;
      document.getElementById("descrip").textContent = current_weather.weather[0].description;
      document.getElementById("temp").textContent = current_weather.main.temp;
      document.getElementById("humid").textContent = current_weather.main.humidity;
      console.log(current_weather);

      const air_qual_url = `/air_qual/${lat},${lon}`;
      const air_qual_response = await fetch(air_qual_url);
      const current_air_qual = await air_qual_response.json();
      console.log(current_air_qual);
    });
  } else {
    console.log("geolocation not available");
  }