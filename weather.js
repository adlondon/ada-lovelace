$(document).ready(function () {
  pages.init();
});


var weatherTemplate ={
  weather: ['<div class="weatherInfo">',
      '<p class="cityName"><%= name %></p>',
      '<p class="temp"><%= temp %></p>',
      '<p class="description"><%= description %></p>',
    '</div>'
  ].join('')
};

var pages = {
  init: function () {
    pages.getLocation();
  },


  getLocation: function () {
    navigator.geolocation.getCurrentPosition(pages.getWeatherData);
  },

  getWeatherData: function (ourCoords) {
    console.log("COORDS", ourCoords);
    $.ajax({
      method: "GET",
      url: pages.buildForecastUrl(ourCoords.coords),
      dataType: "jsonp",
      success: function (data) {

        console.log("SUCCESS", data);
        pages.addWeatherToDom(pages.buildWeatherData(data))
      }
    })
  },

  addWeatherToDom: function (data) {
    var weatherTmpl = _.template(weatherTemplate.weather);
    $('.weatherContainer').html('');
    $('.weatherContainer').html(weatherTmpl(data));
  },



// addToDom: function($target) {
//     $target.html('');
//     setInterval(function() {
//       var timeput= moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a');
//       var htmlstr = "<span class=time>"+ timeput + "</span>";
//       $target.html(htmlstr); }, 1000);

  buildWeatherData: function (el) {
    console.log("ARRRRRR", el)
      return {
        name: el.name,
        temp: el.main.temp,
        description: el.weather[0].description
      };
  },


buildForecastUrl: function (coords) {
return "http://api.openweathermap.org/data/2.5/weather?lat=" + coords.latitude + "&lon=" + coords.longitude + "&APPID=d4bb61d47f0ff2fa54c2fc465d28a37a";
}
}
