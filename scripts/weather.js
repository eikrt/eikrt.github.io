async function fetchWeatherTurku() {
    const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=60.27&longitude=22.16&current=temperature_2m,wind_speed_10m&wind_speed_unit=ms&hourly=precipitation");
    const w = await res.json();
    return w;
}
async function showWeather() {
        const weather = await fetchWeatherTurku();
        console.log(weather)
        const table = document.getElementById("weatherTable");
        var row1 = table.insertRow(1)
        var row2 = table.insertRow(2)
        var row3 = table.insertRow(3)
        var tempCellHeader = row1.insertCell();
        tempCellHeader.innerHTML = "Temp. °C";
        var tempCell = row1.insertCell();
        tempCell.innerHTML = weather.current.temperature_2m; 
        var windCellHeader = row2.insertCell();
        windCellHeader.innerHTML = "Wind m/s";
        var windCell = row2.insertCell();
        windCell.innerHTML = weather.current.wind_speed_10m; 
        var rainCellHeader = row3.insertCell();
        rainCellHeader.innerHTML = "Rain mm";
        var rainCell = row3.insertCell();
        rainCell.innerHTML = weather.hourly.precipitation[0]; 


}
showWeather();
