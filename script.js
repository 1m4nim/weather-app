const apiKey = "b32d7fbcb9414c05f45e4a7373c00d69";
const btn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");

btn.addEventListener("click", () => {
  const city = cityInput.value; // ← city をここで取得
  if (!city) {
    weatherInfo.textContent = "都市名を入力してください";
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=ja&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        weatherInfo.textContent = "都市が見つかりません";
      } else {
        const temp = data.main.temp;
        const desc = data.weather[0].description;
        weatherInfo.innerHTML = `
          <strong>${data.name}の天気</strong><br>
          気温：${temp}℃<br>
          状況：${desc}
        `;
      }
    })
    .catch(() => {
      weatherInfo.textContent = "データ取得に失敗しました";
    });
});
