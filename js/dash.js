require(["eventcat"], function(cat) {
  var org = 'harvard-lil'
  var container = $("#github-activity");
  var data = $.getJSON('http://localhost:8888/github', function(data){
    $.each(data, function(){
      var dict = cat.sentence_dict(this);
      if (dict.img === undefined) {
        dict.img = "github";
      }
      var activity = ich.activity(dict);
      container.append(activity);
      });
  });

  var scrum_data = [0, 0, 0, 1, 2, 3, 4, 5, 5, 5, 0];

  // D3 stuff.
  d3.select("#scrum_graph").text("New paragraph!");
});
