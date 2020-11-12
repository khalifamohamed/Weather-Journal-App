/* Global Variables */
// Personal API Key for OpenWeatherMap API

let baseURL = "http://api.openweathermap.org/data/2.5/forecast?zip=";
let apiKey = "2c34751acfc8ad6f20df9b398909a92c"

// Create a new date instance dynamically with JS
let d = new Date();

let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}

// Event listener to add function to existing HTML DOM element

document.getElementById('generate').addEventListener('click', getWeatherData);
/* Function called by event listener */
function getWeatherData(event){
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    console.log(newDate);
    getWeather(baseURL, zipCode, apiKey)
        .then(function(data) {
			// Add data to POST request
			postData('http://localhost:8000/addWData', {temperature: data.list[0].main.temp, date: newDate, user_response: feelings } )
			// Function which updates UI
			.then(function() {
				updateUI()
        })
        
    })
    
}

/* Function to GET Web API Data*/
const getWeather = async(baseURL, zip, key)=>{
    
    const res = await fetch(baseURL + zip + '&APPID=' + key)
    try{
        const data = await res.json();
        return data;
    }catch(error) {
        console.log("error", error);
    }
}
/* Function to POST data */
const postData = async (url = '', data = {})=>{
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    
    try {
        const newEntry = await response.json();
        console.log(newEntry);
        return newEntry;
    }catch(error) {
        console.log("error", error);
    }
}

/* Function to GET Project Data */
const updateUI = async () =>{
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.user_response;
    }catch(error){
        console.log('error', error);
    }
}