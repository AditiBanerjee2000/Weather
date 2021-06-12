const api='944454133679e77b0f619e925f6b82b1';//api key
const iconImage=document.getElementById('icon');
const sunRise=document.getElementById('sunR');
const sunSet=document.getElementById('sunS');
const loc=document.getElementById('location');
const c=document.getElementById('centi');
const f=document.getElementById('farh');
const descrip=document.getElementById('desc');

//event listener which fires up when page 'loads'
window.addEventListener('load',() =>{
    let long;
    let lat;
    if(navigator.geolocation){  //navigator object
        navigator.geolocation.getCurrentPosition((position)=>{  //using getCurrentPosition method of geolocation property
           long=position.coords.longitude; //storing values of latitude and longitude in variables
           lat=position.coords.latitude;

           const base=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}`; //api url
           console.log(base);
          //using 'fetch' to call and get data from api service(base)
           fetch(base).then((response)=>{
               return response.json(); //response is converted into json format to use it in the app
           })
           .then((data) =>{
            const { temp } = data.main;
            const place = data.name;
            const { description, icon } = data.weather[0];
            const { sunrise, sunset } = data.sys;
            const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

            const centigrade=(temp/10);
            const fahrenheit = (centigrade * 9) / 5 + 32;

          // Converting Epoch(Unix) time to GMT
    
          const sunriseGMT = new Date(sunrise * 1000);
          const sunsetGMT = new Date(sunset * 1000);

          iconImage.src=iconUrl;//storing openWeather's weather icon
          loc.textContent=`${place}`;
          descrip.textContent=`${description}`;
          sunRise.textContent=`${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`; //converts GMT time and date to local
          sunSet.textContent=`${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
          c.textContent=`${centigrade.toFixed(2)}\xB0C`; //toFixed for displaying temp upto 2 decimal places only
          f.textContent=`${fahrenheit.toFixed(2)}\xB0F`;
  
            })
    
});

}
})
//for fetching weather from city name
const button=document.getElementById('submit');
const city=document.getElementById('input');

button.addEventListener('click', displayWeather);
function displayWeather(weather){
        const base=`http://api.openweathermap.org/data/2.5/weather?q=`+city.value+`&appid=${api}`; //api url
           console.log(base);
          //using 'fetch' to call and get data from api service(base)
           fetch(base).then((response)=>{
               return response.json(); //response is converted into json format to use it in the app
           })
           .then((data) =>{

           const { temp } = data.main;
           const place = data.name;
           const { description, icon } = data.weather[0];
           const { sunrise, sunset } = data.sys;
           const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

           const centigrade=(temp/10);
           const fahrenheit = (centigrade * 9) / 5 + 32;

         // Converting Epoch(Unix) time to GMT
         
         const sunriseGMT = new Date(sunrise * 1000);
         const sunsetGMT = new Date(sunset * 1000);

         iconImage.src=iconUrl;//storing openWeather's weather icon
         loc.textContent=`${place}`;
         descrip.textContent=`${description}`;
         sunRise.textContent=`${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`; //converts GMT time and date to local
         sunSet.textContent=`${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
         c.textContent=`${centigrade.toFixed(2)}\xB0C`; //toFixed for displaying temp upto 2 decimal places only
         f.textContent=`${fahrenheit.toFixed(2)}\xB0F`;  //object destructuring
    
        })
    }
    
        city.addEventListener('keyup',function(name){
            if(name.key=="Enter"){
                displayWeather();
            }
           })