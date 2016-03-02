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
  '<a class ="ticket" href="<%= ticket %>">Get Tickets</a>',
  '<% } %>',
'</div>'
].join('')
}

var page = {
  init: function () {
    page.styling();
    page.events();
  },

  styling: function () {

  },

  events: function () {
    $('form').on('submit', function (event) {
      event.preventDefault();
      var enteredCity = $('#cityinput').val().replace(/\s/g,'');
      var bandUrl = 'http://api.bandsintown.com/events/search?location=' + enteredCity + '&radius=20&format=json&app_id=woody'
      page.getbandData(bandUrl)
    })
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
    $('.events').html('');
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
