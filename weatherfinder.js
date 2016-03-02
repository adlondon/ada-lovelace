

// url example for refference http://api.zippopotam.us/US/29414

$(document).ready(function(){
  coordFind.init();
});

var zipFind = {
  init: function(){
    coordFind.events();

  },

  events: function(){
    $('button').on('click', function(event) {
      event.preventDefault();
      var search = $('input[type="text"]').val();
      $('input[type="text"]').val("");
      coordFind.zip(search);
    });
  },

  zip: function(zipCode) {
    $.ajax({
      method: 'GET',
      url: "http://api.zippopotam.us/" + "us" + "/" + zipCode,
      success: function(data) {
        console.log(data);
        coordFind.addToDom(data, $('section'));
      }
    });
  },

  addToDom: function(data,$target) {
    $target.html('');
    var htmlstr = "<p class='coord'>" + "latitude:" + data.places[0]['latitude'] + "," + "longitude"+ data.places[0]['longitude']+"</p>",
    $target.append(htmlstr);
    console.log(htmlstr);
    console.log(data);
  }

};
