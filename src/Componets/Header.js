import React, { useEffect, useState } from "react";
import Sun from "../weather/sun-cloud.png";
import lupa from "../lupa.png";
import Rain from "../weather/rain.png";
import Snow from "../weather/snow-cloud.png";
import Clouds from "../weather/sun-cloud.png";
import Sad from "../sad.png";
import "../App.css";

function Header() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchButton = document.querySelector('.SearchInput button');

    if (searchButton) {
      searchButton.addEventListener('click', handleSearchClick);
    }

    return () => {
      if (searchButton) {
        searchButton.removeEventListener('click', handleSearchClick);
      }
    };
  }, []);

  const handleSearchClick = () => {
    const APIkey = '7cc087b060f32d2eef7ae68ebe68bff7';
    const city = document.querySelector('.SearchInput input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${APIkey}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('City not found');
        }
        return response.json();
      })
      .then(json => {
        setError(null);
        setWeatherData(json);
      })
      .catch(error => {
        setWeatherData(null);
        setError('City not found');
      });
  };

  return (
    <div className="body">
      <form className={`FormWeather ${error ? 'error' : ''}`}>
        <div className="SearchInput">
          <input type="text" placeholder="Введите ваш город" />
          <button type="button">
            <img src={lupa} alt="Search" />
          </button>
        </div>

        {error && (
          <div className="not-found">
            <div className="box">
              <img src={Sad} alt="Not Found" />
              <p>Извините! Локация не найдена (</p>
            </div>
          </div>
        )}

        {weatherData && (
          <>
            <div className="weather-box">
              <div className="box">
                <div className="info-weather">
                  <div className="weather">
                    <img
                      src={
                        {
                          Clear: Sun,
                          Rain: Rain,
                          Snow: Snow,
                          Clouds: Clouds,
                        }[weatherData.weather[0].main] || Clouds
                      }
                      alt="Weather"
                    />
                    <p className="temperature">
                      {Math.round(weatherData.main.temp)} <span>°C</span>
                    </p>
                    <p className="description">{weatherData.weather[0].description}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="weather-details">
              <div className="humidity">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAdVJREFUWEftls1OFFEQhb+DrEwIhLfAuJAtQXwVSEAzkYVgCD6DRhHCX4JvYtwA6l5ZAU8ALnDhikVJTW5PZnr6zu1GJ2lI97L73LpVp+qcLlGzRzXLhyahVEcahu42Q2a2DBxK+jGoEjN7AswB18CRpJMK+GNJP2P4nhkyMwvAL0BL0ln3QTN7DOwCT3MBPwMvK+KXJZ3mE4sl5LhLYDY7ZGZTwDdgIlLdRcC3iyiB74mfxcwn9B5YAsYC4DdwAIwCz4GH4f0V8Al4ALwoeB/DjxTFl7RWmFBXZcfAZIQJr2xG0nnAPwrMjZfEO9M98SV1iCn0ITPzS/Yjs9LX+3/FJxPKKr2FmqZDEZXUJ2kr2rKUcQ37e36of4X+vpP0tehyM3sGvHZFBR9y5b2V9P1/4AfJ/qOklZwPueIWIyxtSFqtgN+U9KqKDzl2D3BJuow3gIVEy3aA9Qr4dvwb2f+J+ZD7z4cBLGTntoE3wYc2gflEohnefagvflJlZua/h1bkkj6qzcwtwg2y6CnC98RPJhQMz4fX2zVTYXhvhb+RfceE672gNetHs370ryvN+lG02ibXlVI+FLyo6jJ/z9ePYe86ZeLX26nLVDBsTMNQiuHaMfQXDn47NJ2hVgYAAAAASUVORK5CYII=" alt="Humidity" />
                <div className="info-humidity">
                  <span>{weatherData.main.humidity}%</span>
                </div>
                <p>Влажность</p>
              </div>

              <div className="wind">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAl9JREFUWEftlk+ITmEUxn8P5U+UkkJJlIUiDY38SaEoaUgRaiRmZSMWshh7pSyEbFFiiKKxQyEifzbCBokk2RAhfx/3ne5X3ze+ue97v9lMumd53+c95+k5533OFUMsNMT4UBGKdaRSqFIopkDs/P+ZIdtzgW3AImAe8B14CTwGLgPnJP2IKdL/vLRCtscDx4G1kWLPgU5J98qQKkXI9gjgBrAwschXYJmk+4n4ck5t+xiwGbgDPAHmACuBYQUFPwIrJD1shrHdISm0uC+SFbI9CrgArJP0s5bA9lTgKLCmgNRnYAfQI+lPwOVq7+kjIe1vhVAb8ErSh/6FbQ8HTgBbIq15AZwHJmXDvwF4D7RJ+lSaUGwGbIe2XQI6Ytj8PKjcLulRPT65ZSlF8jYcAHZH8N+ALkk9g372icRmA5uApcAMYDLwBXiTKfgA2CvpbbNcAyqUD3EXsCo3vwlASBL85TpwVtLTFIJlME0J2e4EDmWvJ5AYKAwcBLol/SpTtAj7DyHbq4HeiLfU5wxWsLH2nAdLrIGQ7elAmPpnmeHdBsYEpwXC96I4mVnCdklBtYawPQWYOJAxFg617X3ZzNyVdK0GzJ/zVuBI1qKxBawuArskva67OxM4DSyoN9PkltleIulWswu224GrwLiChL+BK1kLw7Avz3wp/BHslBScPClK+ZDt+cBNIKyRlOiVFPsraMhTilC4aXtx5i2nEuYqEA+LM+yx5ChNKCc1ElgfFi0wK9tj04DR2QJ9F/YdcFjSmWQW" alt="Wind" />
                <div className="info-wind">
                  <span>{weatherData.wind.speed} км/ч</span>
                </div>
                <p>Скорость ветра</p>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default Header;
