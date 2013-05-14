require(["eventcat"], function(cat) {
  // Github stuff.
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

  // D3 stuff.
  var scrum_data = [2, 2, 0, 1, 2, 3, 4, 5, 5, 5, 0, 3, 4, 5, 2, 5, 3, 4, 2, 4, 1, 1, 1, 5, 4, 3, 4, 3, 4, 4, 4, 5, 5, 5, 2, 3, 2, 2, 2, 4, 4, 3, 2, 5, 4, 3, 2, 2, 4, 4, 3, 3, 4, 5, 3, 3, 2, 4, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 0, 1, 2, 3, 4, 5, 5, 5, 0, 3, 4, 5, 2, 5, 3, 4, 2, 4];

  // We could generate this programatically if needed.
  // I assume a 1 person scrum should probably count as much as a 0 person scrum.
  // Curently these colors are just shuffled versions of the github colors.
  var color_map = {
    0 : "#eee",
    1 : "#eee",
    2 : "#85d6e6",
    3 : "#658cc6",
    4 : "#4044a3",
    5 : "#231e68"
  };

  $("#scrum_graph").width(scrum_data.length * 18);

  d3.select("#scrum_graph").selectAll("div")
    .data(scrum_data)
    .enter()
    .append("div")
    .attr("class", "day")
    .style("background-color", function(d) {
      return color_map[d];
    });

  // Analytics stuff.
  var ana_container = $("#analytic-activity");
  var data = $.getJSON('http://localhost:8888/analytics', function(data){
    $.each(data.rows, function(){
      if (this[1] !== "(not provided)") {
        var dict = {
          name : this[1],
          count : this[2]
        };
        var analytic = ich.analytic(dict);
        ana_container.append(analytic);
      }
    })
  });
  $("#graph_wrapper").scrollLeft($("#scrum_graph").width());

  // Blog stuff.
  var blog_container = $("#blog_rank");
  var data = $.getJSON('http://localhost:8888/blog', function(data){
    for (var key in data) {
      blog_container.append('<div class="activity">' + key + '<div>');
    }
  });
});
