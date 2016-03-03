$(document).ready(function () {
  page.init();
});

var bandTemplate = {
band: ['<div class="eventItem">',
  '<div class="name"><%= name %></div>',
  '<div class="venue"><%= venue %></div>',
  '<div class="city"><%= city %></div>',
  '<div class="datetime"><%= datetime %></div>',
  '<% if( obj.ticket_status === "available") { %>',
  '<a class ="ticket" target= "blank" href="<%= ticket %>">Get Tickets</a>',
  '<% } %>',
'</div>'
].join(''),
topRow: ['<div class= "topRow">',
  '<div>BAND</div>',
  '<div>VENUE</div>',
  '<div>CITY</div>',
  '<div>DATE</div>',
].join('')
}

var page = {
  init: function () {
    page.styling();
    page.events();
  },

  styling: function () {
    page.getLocation()
  },

  events: function () {
    $('.bandInput').on('submit', function (event) {
      event.preventDefault();
      var enteredCity = $('#cityinput').val().replace(' ', '+');
      var bandUrl = 'http://api.bandsintown.com/events/search?location=' + enteredCity + '&radius=20&format=json&app_id=woody'
      page.getbandData(bandUrl)
    })
  },

  getLocation: function () {
    navigator.geolocation.getCurrentPosition(page.getbandDataOnLoad);
  },
  buildBandLocationUrl: function (coords) {
    console.log("COORDS OF BAND", coords)
    return "http://api.bandsintown.com/events/search?location=" + coords.latitude + "," + coords.longitude + "&radius=20&format=json&app_id=woody"
  },

  getbandDataOnLoad: function (ourCoords) {
    $.ajax({
      method: "GET",
      url: page.buildBandLocationUrl(ourCoords.coords),
      dataType: 'jsonp',
      success: function (data) {
        console.log(data)
        page.addbandData(page.bandDataMap(data))
      },
      error: function (err) {
        console.log(err);
      }
    });
  },

  getbandData: function (bandUrl) {
    $.ajax({
      method: "GET",
      url: bandUrl,
      dataType: 'jsonp',
      success: function (data) {
        console.log(data)
        page.addbandData(page.bandDataMap(data))
      },
      error: function (err) {
        console.log(err);
      }
    });
  },

  addbandData: function (data) {
    var tmpl = _.template(bandTemplate.band);
    var topRowTmpl =  _.template(bandTemplate.topRow);
    $('.events').html('');
    $('.events').append(topRowTmpl());
    _.each(data, function (el)
    {$('.events').append(tmpl(el))})

  },

  bandDataMap: function (arr) {
    return arr.map( function (el) {
      return {
        name: el.artists[0].name,
        venue: el.venue.name,
        city: el.venue.city,
        ticket: el.url,
        ticket_status: el.ticket_status,
        datetime: moment(el.datetime).format("dddd, MMMM Do, h:mm a")
      }
    });
  }
}
