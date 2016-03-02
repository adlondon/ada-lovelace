$(document).ready(function(){
  weather.init();
});
var weather = {
  init: function(){
    weather.formatForDom();
  },


  getWeatherURL: function(stuff) {
    $.ajax({
      method: 'GET',
      dataType:"jsonp",
      url: "http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=d4bb61d47f0ff2fa54c2fc465d28a37a",
      success: function(data) {
        console.log(data);
        getWeather.addToDom(data, $('.weatherContainer'));
      }
    });
  },


formatForDom: function(){
  weather.addToDom($('.weatherContainer'));
},

addToDom: function($target) {
    $target.html('');
    setInterval(function() {
      var timeput= moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a');
      var htmlstr = "<span class=time>"+ timeput + "</span>";
      $target.html(htmlstr); }, 1000);
  },
};
