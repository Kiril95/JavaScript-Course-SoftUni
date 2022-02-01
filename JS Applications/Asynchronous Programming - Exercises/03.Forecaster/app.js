const baseUrl = `http://localhost:3030/jsonstore/forecaster`;
let forecastDiv = document.querySelector('#forecast');
let locationField = document.querySelector('#location');
let currentDiv;
let upcomingDiv;
let code = '';

function attachEvents() {
    let weatherBtn = document.querySelector('#submit');
    weatherBtn.addEventListener('click', getForecast);
};

async function getForecast() {
    
    if (locationField.value) {
        const specialSymbols = {
            'Sunny': '&#x2600;',
            'Partly sunny': '&#x26C5;',
            'Overcast': '&#x2601;',
            'Rain': '&#x2614;',
            'Degrees': '&#176;'
        };
       
        try {
            code = await getCode();
            locationField.value = '';

        } catch (error) {
            return clearPanels();
        }

        try {
            let currentForecast = await getTodaysForecast();  // Data
            currentDiv = document.querySelector('#current');
            currentDiv.replaceChildren();  // Remove all info

            let [condition, high, low] = Object.values(currentForecast.forecast);
            forecastDiv.style.display = 'block';

            let headDiv = createElement('div', 'label', "Current conditions", currentDiv);
            let forecastsDiv = createElement('div', 'forecasts', null, currentDiv);

            let symbolSpan = createElement('span', 'condition symbol', null, forecastsDiv);
            symbolSpan.innerHTML = specialSymbols[condition];  // No choise but to use innerHTML

            let conditionSpan = createElement('span', 'condition', null, forecastsDiv);
            let locationSpan = createElement('span', 'forecast-data', currentForecast.name, conditionSpan);
            let temperatureSpan = createElement('span', 'forecast-data', `${low}°/${high}°`, conditionSpan);
            let forecastSpan = createElement('span', 'forecast-data', condition, conditionSpan);

        } catch (error) {
            return clearPanels();
        }

        try {
            let futureForecast = await getUpcomingForecast();  // Data
            upcomingDiv = document.querySelector('#upcoming');
            upcomingDiv.replaceChildren();  // Remove all info

            let headDiv = createElement('div', 'label', "Three-day forecast", upcomingDiv);
            forecastsDiv = createElement('div', 'forecast-info', null, upcomingDiv);

            for (let info of Object.values(futureForecast.forecast)) {
                let upcomingSpan = createElement('span', 'upcoming', null, forecastsDiv);

                let symbolSpan = createElement('span', 'symbol', null, upcomingSpan);
                symbolSpan.innerHTML = specialSymbols[info.condition];

                let temperatureSpan = createElement('span', 'forecast-data', `${info.low}°/${info.high}°`, upcomingSpan);
                let forecastSpan = createElement('span', 'forecast-data', info.condition, upcomingSpan);
            }

        } catch (error) {
            return clearPanels();
        }
    }
}

async function getCode() {
    const response = await fetch(`${baseUrl}/locations`);
    let data = await response.json();
    code = '';

    Object.values(data).forEach(el => {
        if (locationField.value == el.name) {
            code = el.code;
        }
    })
    return code;
}

async function getTodaysForecast() {
    const response = await fetch(`${baseUrl}/today/${code}`);

    return await response.json();
}

async function getUpcomingForecast() {
    const response = await fetch(`${baseUrl}/upcoming/${code}`);

    return await response.json();
}

function clearPanels() {
    forecastDiv.style.display = 'block';
    forecastDiv.replaceChildren();
    let div1 = createElement('div', undefined, undefined, forecastDiv);
    div1.id = 'current';
    let div2 = createElement('div', undefined, undefined, forecastDiv);
    div2.id = 'upcoming';

    let attachError = createElement('div', 'label', "Error", div1);
}

function createElement(type, className, textCon, parent) {
    const element = document.createElement(type);

    if (textCon) {
        element.textContent = textCon;
    }
    if (className) {
        element.className = className;
    }
    if (parent) {
        parent.appendChild(element);
    }

    return element;
}

attachEvents();