import { click } from "@testing-library/user-event/dist/click";

import Sun from "../src/weather/sun.png"

import Rain from "../src/weather/rain.png"

import Snow from "../src/weather/snow-cloud.png"

import Clouds from "../src/weather/sun-cloud.png"




const container = document.querySelector('.FormWeather');
const search = document.querySelector('.SearchInput button');
const weather = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');

search.addEventListener('click', () => {

    const APIkey = '7cc087b060f32d2eef7ae68ebe68bff7';

    const city = document.querySelector('.SearchInput input').value;

    if(city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`).then(responce => responce.json()).then(json => {
         
        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');
        
        switch (json.weather[0]) {
            case 'Clear':
                    image.src = {Sun};
                break; 
            case 'Rain':
                    image.src = {Rain};
                 break;
            case 'Snow':
                    image.src = {Snow};
                 break;
            case 'Clouds':
                    image.src = {Clouds};
                 break;
            default:
                image.scr = {Clouds};
        }
        

    });
    

});

