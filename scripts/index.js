let key = 'fa300f402d5b49d896870327231004'

let form =  document.querySelector('#searchbar');

form.addEventListener('submit', function(e){
    e.preventDefault();
    let input = document.querySelector('#search');
    let value = input.value;
    
    let current = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${value}&aqi=yes`;
    let future = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${value}&days=7&aqi=no&alerts=no`;

    currentWeather(current)
    forcast(future)
    
    form.reset();
})

function currentWeather(url){

    fetch(url)
    .then(response =>response.json())
    .then((data) => {

        // =======> Now <============
        let location = document.querySelector('#loc')
        let nowTemp = document.querySelector('#nowT')
        let nowHumid = document.querySelector('#nowH')
        let nowIcon = document.querySelector('#nowImg')
        let nowTime = document.querySelector('#nowTime')

        location.textContent = data.location.name
        nowTime.innerHTML = `<span class="material-symbols-sharp">schedule</span>${data.location.localtime.split(' ')[1]}`
        nowTemp.textContent = data.current.temp_c + '°C'
        nowHumid.innerHTML = `<span class="material-symbols-sharp">humidity_mid</span> ${data.current.humidity}%`
        nowIcon.src = data.current.condition.icon

        // ======> DETAILED <==========//
        let temp = document.querySelector('#Temp')
        let winds = document.querySelector('#windS')
        let windDeg = document.querySelector('#windD')
        let windDir = document.querySelector('#windR')
        let humidity = document.querySelector('#hum')
        let cloud = document.querySelector('#cloud')
        let uv = document.querySelector('#uv')
        let vis = document.querySelector('#vis')
        let gust = document.querySelector('#gus')
        let co2 = document.querySelector('#co2')
        let ozone = document.querySelector('#o3')
        let no2 = document.querySelector('#no2')
        let mb = document.querySelector('#mb')
        let psi = document.querySelector('#psi')
        let mm = document.querySelector('#mm')

        temp.textContent = data.current.temp_c + '°C'
        winds.textContent = data.current.wind_kph + 'km/h'
        windDeg.textContent = data.current.wind_degree + '°'
        windDir.textContent =  data.current.wind_dir
        humidity.textContent = data.current.humidity + '%' 
        cloud.textContent =  data.current.cloud
        uv.textContent =  data.current.uv
        vis.textContent = data.current.vis_km + ' km'
        gust.textContent = data.current.gust_kph + ' km/h'
        co2.textContent = parseFloat(data.current.air_quality.co).toFixed(2)+' ppm'
        ozone.textContent = parseFloat(data.current.air_quality.o3).toFixed(2)+' ppm'
        no2.textContent = parseFloat(data.current.air_quality.no2).toFixed(2)+' ppm'
        mb.textContent =  data.current.pressure_mb + ' mb'
        psi.textContent = data.current.pressure_in + ' in'
        mm.textContent = data.current.precip_mm + ' mm'

    })
    .catch(error => console.log(error.message));
    
}


let day = document.querySelectorAll('.amHr')
let store = []

for(let hr of day) {
    let tme = hr.querySelector('.hr strong')
    store.push(tme)

    let img = hr.querySelector('img')
    store.push(img)

    let pTemp = hr.querySelector('.hTemp strong')
    store.push(pTemp)
}

let week = document.querySelectorAll('.week')
let storeW = []

for (let wk of week) {
    let wkDay = wk.querySelector('.day').lastChild
    storeW.push(wkDay)

    let wkTemp = wk.querySelector('.temp-day').lastChild
    storeW.push(wkTemp)

    let wkHum = wk.querySelector('.humid-day').lastChild
    storeW.push(wkHum)

    let wkImg = wk.querySelector('img')
    storeW.push(wkImg)
}

function unix2Day(timestamp){
    const date = new Date(timestamp * 1000);
    const formattedDate = date.toLocaleString('en-US', { hour12: false });

	let dt = new Date(formattedDate).getDay()
    let week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur','Fri','Sat']
    
    return week[dt]
}


function forcast(url) {
    fetch(url)
    .then(response => response.json())
    .then((data)=>{
        let maxT = document.querySelector('#maxT')
        let minT = document.querySelector('#minT')        
        let prec = document.querySelector('#prec')

        maxT.textContent = data.forecast.forecastday[0].day.maxtemp_c + '°C'
        minT.textContent = data.forecast.forecastday[0].day.mintemp_c + '°C'
        prec.textContent = data.current.precip_mm + ' mm'

        // ===> HOUR <====//
        let dataHr = data.forecast.forecastday[0].hour      
        let count = 0;

        for (hour of dataHr) {
            store[count++].textContent = hour.time.split(' ')[1]

            store[count++].src = hour.condition.icon

            store[count++].textContent = hour.temp_c + '°C'
        }

        // ====> WEEK <====//
        let weekDay = data.forecast.forecastday
        let stamp = 0, elem =0;

        for (let day of weekDay) {
            if(stamp==0){ 
                stamp++;
                continue
            }
            storeW[elem++].textContent = unix2Day(day.date_epoch)
            storeW[elem++].textContent = day.day.avgtemp_c + '°C'
            storeW[elem++].textContent = day.day.avghumidity + '%'
            storeW[elem++].src = day.day.condition.icon
        }


    })
    .catch(error => console.log(error.message));
}


// let locator = document.getElementById('locate')

// locator.addEventListener('click', () =>{

//     function findNearestCity(latitude, longitude) {
//             var geocoder = new google.maps.Geocoder();
//             var latlng = new google.maps.LatLng(latitude, longitude);

//             geocoder.geocode({'latLng': latlng}, function(results, status) {
//                 if (status == google.maps.GeocoderStatus.OK) {
//                 if (results[0]) {
//                     for (var i = 0; i < results[0].address_components.length; i++) {
//                     var addressType = results[0].address_components[i].types[0];
//                     if (addressType === "locality") {
//                         var cityName = results[0].address_components[i].long_name;
//                         console.log("Nearest city: " + cityName);
//                         break;
//                     }
//                     }
//                 } else {
//                     console.log("No results found");
//                 }
//                 } else {
//                 console.log("Geocoder failed due to: " + status);
//                 }
//             });
//     }

//     const successCallback = (position) => {
//         console.log(position,position.coords.latitude);

//         findNearestCity(position.coords.latitude, position.coords.longitude)

//     };

//     const errorCallback = (error) => {
//     console.log(error);
//     };

//     navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

    

// })

