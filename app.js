document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.querySelector('#app_container');
    const location = document.querySelector('#location');
    const weatherImg = document.querySelector('#weather_img');
    const weatherType = document.querySelector('#weather_type');
    const weatherTemp = document.querySelector('#temperature');
    const weatherHumidity = document.querySelector('.humidity_percentage');
    const weatherWind = document.querySelector('.wind_percentage');
    const cloudPercentage = document.querySelector('.cloudy_percentage');
    const searchBtn = document.querySelector('#search_btn');
    const country = document.querySelectorAll('.country');
    const countryName = document.querySelector('.country_name');
    const updateTime = document.querySelector('#time');
    const updateDate = document.querySelector('#date');
    const btn = document.querySelector('#search_btn');


    ////////Current location//////////
    const currentLocation = async (currentInput) => {
        const myToken = `f2af929c656912`;
        const CurrentApi = `https://ipinfo.io/json?token=${myToken}`;
        const response = await fetch(CurrentApi);
        const data = await response.json();
        if(currentInput === undefined){
            weatherApp(data.city);
        }else{
            weatherApp(currentInput)
        }
    }
         ////////day////////////
         const timeUpdate = () => {
            weekDay=[
               "Sunday",
               "Monday",
               "Tuesday",
               "Wednesday",
               "Thursday",
               "Friday",
               "Saturday"];
            return weekDay[new Date().getDay()];
            }

       //////month////////////
       const monthUpdate = () => {
        month=[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"];
        return month[new Date().getMonth()];
        }
          
    const weatherApp = async (cityName) => {
        let city_name = `${cityName}`;
        try{
            const api = `https://api.weatherapi.com/v1/current.json?key=7c736ece839f47e58b2152411221406&q=${city_name}&aqi=no`;
            const response = await fetch(api);
            if(response.status !== 200){
                new Error(`something want wrong! Status code : ${response.status}`)
            }
            const data = await response.json();
            ///////update infos/////////////
            location.innerHTML = `${data.location.name}`;
            weatherImg.src = `${data.current.condition.icon}`;
            weatherType.innerHTML = `${data.current.condition.text}`;
            weatherTemp.innerHTML = `${data.current.temp_c}°C`;
            cloudPercentage.innerHTML = `${data.current.cloud}%`;
            weatherWind.innerHTML = `${data.current.wind_kph}km/h`;
            weatherHumidity.innerHTML = `${data.current.humidity}%`;
            countryName.innerHTML = `${data.location.country}`;

            ///////update time/////////////
            const date = data.location.localtime;
            const d = parseInt(date.substr(8,10));
            const y =  parseInt(date.substr(2,4));
            const time =  date.substr(11);
            updateDate.innerHTML =  `${timeUpdate()} ${d}, ${monthUpdate()} ${y}`;
            updateTime.innerHTML = `${time}`;

            /////background change////////////
            let timeOfDay = 'day';
            const code = data.current.condition.code;
            if(!data.current.is_day){
                timeOfDay = 'night';
            }
            if(code == 1000){
                btn.style.background = 'rgb(110, 9, 241)';
                appContainer.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, .2)),url(./img/${timeOfDay}/clear.jpg)`;
                appContainer.style.transition = `1s linear;`
            }
            else if(code == 1195||
                code == 1243||
                code == 1063){
                btn.style.background = 'rgb(110, 9, 241)';
                appContainer.style.transition = `1s linear;`
                appContainer.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)),url(./img/${timeOfDay}/rainy.jpg)`;
            }
            ///////day//////
            else if(
                code == 1003 ||
                code == 1006 ||
                code == 1009 ||
                code == 1030 ||
                code == 1069 ||
                code == 1087 ||
                code == 1135 ||
                code == 1273 ||
                code == 1276 ||
                code == 1279 ||
                code == 1282 ||
                code == 1246
            ){
                btn.style.background = 'rgb(110, 9, 241)';
                appContainer.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)),url(./img/${timeOfDay}/cloudy.jpg)`;
            }
            ///////night//////
            if(timeOfDay =='night'){
                btn.style.background = 'rgb(27, 2, 95)'
            }
            else if(code == 1002 ||
                code == 1005 ||
                code == 1008 ||
                code == 1029 ||
                code == 1068 ||
                code == 1086 ||
                code == 1134 ||
                code == 1272 ||
                code == 1275 ||
                code == 1278 ||
                code == 1281 
            ){
                btn.style.background = 'rgb(27, 2, 95)';
                appContainer.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)),url(./img/${timeOfDay}/cloudy.jpg)`;
            }
        } catch(error){
            console.log(error);
        }
    }
    /////////search location////////////
    searchBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const locationInput = document.querySelector('#location_input');
        const locationValue = locationInput.value;
        const currentInput = locationInput.value.trim();
        if(locationValue === ''){
            currentLocation();
        }else{
        currentLocation(currentInput);
        }
    })
//////// default country select/////////
country.forEach((country) => { 
    country.addEventListener('click', async (e) => {
        let currentInput = e.target.innerHTML;
        currentLocation(currentInput);
    })
})

    currentLocation();
})