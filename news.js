$(document).ready(function(){
  news.init();
});

var newsTemplates = {
  news: [
    '<div class="newsItems"><a target="blank" href="<%= url %>" class="newsUrl">',
    '<p class="newsTitle"><%= title %></p>',
    '<img src="<%= photo %>" class="newsPhoto"/></a>',
    '</div>'
  ].join("")
}

var news = {
  url:"http://api.nytimes.com/svc/news/v3/content/all/world/72.json?limit=5&offset=8&api-key=b061fb1c637afb2ade33c04a44be6787%3A17%3A74589446",
  init: function(){
    news.styling();
    news.events();
  },
  styling: function(){

  },
  events: function(){
    news.getNews(news.url)
  },
  getNews: function(element){
    console.log("Here is the news", element);
    $.ajax({
      url: news.url,
      method: "GET",
      success: function(responseFromNewsAPI){
        console.log("response here", responseFromNewsAPI)
        var cleanStuff = news.buildNewsData(responseFromNewsAPI.results);
        news.addNewsToDom(cleanStuff);
      }
    });
  },

buildNewsData: function(arr){
  return arr.map(function(el){
    return {
      title: el.title,
      url: el.url,
      photo: el.thumbnail_standard
    };
  })

},
  addNewsToDom: function(newsArr) {
    var tmpl = _.template(newsTemplates.news);
    $('.news').html('');
    _.each(newsArr, function(el){
      console.log(el);
      $('.news').append(tmpl(el));
    })
  }
};
