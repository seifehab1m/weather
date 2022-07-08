let url = "";
var myHttp = "";
var loc = "cairo"
let userSearchValue = document.querySelector("input")
let btnFind = document.querySelector(".search i")
let date = new Date();
let day ;
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];



btnFind.addEventListener("click", function () {
    search(userSearchValue.value)
});(function () {

    todayTemprature(loc);
})();

function search(userSearchValue) {
    
    loc = userSearchValue
    todayTemprature(loc)
    console.log(days[day]);
}




function sendRequest(url, displayForecastTemp) {
    let myHttp = new XMLHttpRequest();
    myHttp.open('GET', url)
    myHttp.send();
    myHttp.addEventListener('readystatechange', function () {
        if (myHttp.readyState == 4 && myHttp.status == 200) {
            displayForecastTemp(JSON.parse(myHttp.response))

        }

    })

}
function todayTemprature(location) {

    sendRequest(`https://api.weatherapi.com/v1/current.json?key=b73aee4d88ec4d97b7c12221212804&q=${location}`, displaytodayTemprature)
}
function displaytodayTemprature(responseData) {

    day = date.getDay()
    let temp =
        ` <div class="today col-xl-4    ">
   <div class="day  d-flex flex-wrap justify-content-between   ">
       <h6>${days[day]}</h6>
       <h6>${date.getDate() + months[date.getMonth()]}</h6>
   </div>
   <div class="weatherDetails">
       <h4>${responseData.location.name}</h4>

       <div class="weatherNumber position-relative row">
       <h2 class="w-75 col-xl-8 ">${responseData.current.temp_c + "\u00B0" + "C"}</h2>
       <img class="position-absolute translate-middle-y col-xl-4 " src="${responseData.current.condition.icon.replace("//cdn.weatherapi.com/", "")}" alt="">
   </div>
      
       <h6 class="text-primary">${responseData.current.condition.text}</h6>
   </div>
</div>`
    document.getElementById("weatherTemp").innerHTML = temp
    tomorrowTemprature(loc);

}
function tomorrowTemprature(location) {

    sendRequest(`https://api.weatherapi.com/v1/forecast.json?key=b73aee4d88ec4d97b7c12221212804&q=${location}&days=7`, displaytomorrowTemprature)
}

function displaytomorrowTemprature(tommorwRespose) {

    if (day == 6) {
        day = 0;
    }
    tommorwRespose = tommorwRespose.forecast.forecastday[1];
    let temp = ""
    temp = `<div class=" tomorrow col-xl-4  text-center ">
    <div class="tomorrowDay  d-flex flex-wrap justify-content-between   ">
        <h6 class="text-center w-100">${days[day + 1]}</h6>
    </div>
    <img src="${tommorwRespose.day.condition.icon.replace("//cdn.weatherapi.com/", "")}" alt="">
    <div class="weatherDetails-tommorw">
        <h2 class="mt-4">${tommorwRespose.day.maxtemp_c + "\u00B0" + "C"}</h2>
        <h4 >${tommorwRespose.day.mintemp_c + "\u00B0" + "C"}</h4>
        <h6 class="text-primary">${tommorwRespose.day.condition.text}</h6>
    </div>
    </div>`
    document.getElementById("weatherTemp").innerHTML += temp
    AfterTomorrowTemprature(loc)

}

function AfterTomorrowTemprature(location) {

    sendRequest(`https://api.weatherapi.com/v1/forecast.json?key=b73aee4d88ec4d97b7c12221212804&q=${location}&days=7`, displayAfterTomorrowTemprature)
}

function displayAfterTomorrowTemprature(afterTommorwRespose) {

    if (day == 5) {
        day = -2;
    }
    afterTommorwRespose = afterTommorwRespose.forecast.forecastday[2];
    let temp = ""
   

    temp = ` <div class=" after-tomorrow col-xl-4  text-center ">
    <div class="after-tomorrowDay  d-flex flex-wrap justify-content-between   ">
        <h6 class="text-center w-100">${days[day + 2]}</h6>
    </div>
    <img src="${afterTommorwRespose.day.condition.icon.replace("//cdn.weatherapi.com/", "")}" alt="">
    <div class="weatherDetails-afterTommorw">
    <h2 class="mt-4">${afterTommorwRespose.day.maxtemp_c + "\u00B0" + "C"}</h2>
    <h4 >${afterTommorwRespose.day.mintemp_c + "\u00B0" + "C"}</h4>
    <h6 class="text-primary">${afterTommorwRespose.day.condition.text}</h6>
    </div>
  </div>`
    document.getElementById("weatherTemp").innerHTML += temp

}
