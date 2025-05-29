

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");

const card = document.querySelector(".card");


const apikey = "4343ca66f20861bcda3d764fccff5741";

weatherForm.addEventListener("submit" , async (event) =>{

    event.preventDefault(); //to prevent the forms from refreshing the page
    
    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.log(error);
            displayError(error);
        }
    }
    else{
        displayError("please enter the city");
    }
})

async function getWeatherData(city){

    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;


    const response  = await fetch(apiurl);

    console.log(response);

    if(!response.ok){
        throw new Error("could not fetch weather data");
    }
    return await response.json();
}

function displayWeatherInfo(data){
   const {name : city , main : {temp ,humidity},weather :[{description , id}]} = data;

   card.textContent = "";
   card.style.display = "flex";

   const cityDisplay = document.createElement("h1");
   const tempDisplay = document.createElement("p");
   const humidityDisplay = document.createElement("p");
   const descDisplay = document.createElement("p");
   const weatherEmoji = document.createElement("p");


   cityDisplay.textContent = city;
   tempDisplay.textContent =`${(temp - 273.15).toFixed(1)}°C`;
   humidityDisplay.textContent = `Humidity : ${humidity}%`;
   descDisplay.textContent = description;
   weatherEmoji.textContent = getWeatherEmoji(id);


   cityDisplay.classList.add("cityDisplay");
   tempDisplay.classList.add("tempDisplay");
   humidityDisplay.classList.add("humidityDisplay");
   descDisplay.classList.add(".descDisplay");
   weatherEmoji.classList.add("weatheEmoji");


   card.appendChild(cityDisplay);
   card.appendChild(tempDisplay);
   card.appendChild(humidityDisplay);
   card.appendChild(descDisplay);
   card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){
    switch(true){
        case(weatherId >=200 && weatherId <300 ):
            return "🌩️";
        case(weatherId >=300 && weatherId <400 ):
            return "🌧️";
        
        case(weatherId >=500 && weatherId <600 ):
            return "🌧️";
        case(weatherId >=600 && weatherId <700 ):
            return "❄️";
        
        case(weatherId === 800):
            return "🌞";
        case(weatherId >=801 && weatherId <810 ):
            return "☁️  ";
        default:
            return "❓";
        
    }
}

function displayError(message){
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
