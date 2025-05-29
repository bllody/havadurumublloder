const apiKey = "63b8ccd19123cd0323453c77b60ef3c9"; // OpenWeatherMap API key

function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Şehir gir!");

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=tr&units=metric`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.cod !== 200) {
        document.getElementById("weatherResult").innerHTML = "Şehir bulunamadı.";
        return;
      }

      const weather = data.weather[0].main.toLowerCase();
      const temp = data.main.temp;
      const desc = data.weather[0].description;

      document.getElementById("weatherResult").innerHTML = `
        ${city.toUpperCase()} | ${desc} | ${temp}°C
      `;

      changeBackground(weather);
    })
    .catch(() => {
      document.getElementById("weatherResult").innerHTML = "Veri alınamadı.";
    });
}

function changeBackground(weather) {
  const video = document.getElementById("bg-video");
  const source = video.querySelector("source");

  let src = "clear.mp4";
  if (weather.includes("cloud")) src = "clouds.mp4";
  else if (weather.includes("rain")) src = "rain.mp4";
  else if (weather.includes("snow")) src = "snow.mp4";
  else if (weather.includes("thunder")) src = "thunderstorm.mp4";
  else if (weather.includes("clear")) src = "clear.mp4";

  source.src = src;
  video.load();
  video.play().catch(e => console.log("Video oynatılmadı:", e));
}
