$(document).ready(function(){
  news.init();
});

var newsTemplates = {
  news: [
    '<div class="newsItems"><a target="blank" href="<%= url %>" class="newsUrl">',
    '<% if(obj.photo === ""){ %>',
    '<img src="nytimesphoto.png" class="newsPhoto">',
    '<% } else { %>',
    '<img src="<%= photo %>" class="newsPhoto"/>',
    '<% } %>',
    '<p class="newsTitle"><%= title %></p></a>',
    '</div>'
  ].join("")
}

var news = {
  url:"http://api.nytimes.com/svc/news/v3/content/all/all/72.json?limit=5&offset=1&api-key=b061fb1c637afb2ade33c04a44be6787%3A17%3A74589446",
  init: function(){
    news.styling();
    news.events();
  },
  styling: function(){
    news.getNews(news.url)
  },
  events: function(){
    $('.newsSearch').on('submit', function(element){
      event.preventDefault();
      var searchText = $('#newsInput').val();
      var searchUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchText + "&sort=newest&api-key=e8a2b78a735a4f12b513e5a3b5416155:3:74589446";
      console.log('URL SEARCH', searchUrl);
      news.getNewsLoad(searchUrl)
    })
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

  getNewsLoad: function(searchUrl){
    console.log("Here is the news you have searched for");
    $.ajax({
      url: searchUrl,
      method: "GET",
      success: function(searchResponseFromAPI){
        console.log("search response here", searchResponseFromAPI)
        var searchStuff = searchResponseFromAPI.response.docs.map(news.buildNewsSearchData);
        console.log("CLEAN ME",searchStuff);
        news.addNewsToDom(searchStuff);
      }
    });
  },

  addNewsToDom: function(newsArr) {
    var tmplNews = _.template(newsTemplates.news);
    $('.news').prepend('');
    _.each(newsArr, function(element){
      console.log(element);
      $('.news').append(tmplNews(element));
    })
  },

  buildNewsData: function(el){
    return el.map(function(arr){
      return {
        title: arr.title,
        url: arr.url,
        photo: arr.thumbnail_standard
      };
    })
  },

  buildNewsSearchData: function(el){
    var headl = "";
    var photoUrl = "";
    var webUrl = ""
    if(el.headline) {
      headl = el.headline.main;
    }
    if(el.multimedia[3]) {
      photoUrl = el.multimedia[3].url;
    }
    if(el.web_url) {
      webUrl = el.web_url
    }
      return {
        title: headl,
        url: webUrl,
        photo: photoUrl
      };
  }

};
