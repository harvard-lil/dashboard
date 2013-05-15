require(["eventcat"], function(cat) {
  // Github stuff.
  var org = 'harvard-lil'
  var container = $("#github-activity");
  var data = $.getJSON('/github', function(data){
    $.each(data, function(){
      var dict = cat.sentence_dict(this);
      if (dict.img === undefined) {
        dict.img = "github";
      }
      var activity = ich.activity(dict);
      container.append(activity);
      });
    $("a:empty").hide();
  });

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


  // D3 stuff.
  var scrum_data = $.getJSON('/scrum', function(data){
    $("#scrum_graph").width(scrum_data.length * 18);

    // Tuesday : 2
    // Thursday : 4

    var last_scrum = data[data.length - 1];
    var last_date = last_scrum.date;
    last_scrum.date_text = new Date(last_scrum.date * 1000).toDateString()

    var last_cap = ich.scrum_cap(last_scrum);

    var pic = $("#shoe_cam_image");
    var cap = $("#caption");

    cap.html(last_cap);
    pic.attr("src", "img/shoe_cam/" + last_date + ".jpg");

    d3.select("#scrum_graph").selectAll("div")
      .data(data)
      .enter()
      .append("div")
      .attr("class", "day")
      .style("background-color", function(d, i) {
        return color_map[d.count];
      })
      .style("margin-left", function(d, i) {
        var date = new Date(d.date * 1000);
        var day = date.getDay();
        if (day === 2) {
          return "20px";
        }
        else {
          return "0px";
        }
      })
      .on("mouseover", function(d){
        pic.attr("src", "img/shoe_cam/" + d.date + ".jpg");
        d.date_text = new Date(d.date * 1000).toDateString();
        var cur_cap = ich.scrum_cap(d);
        cap.html(cur_cap);
      })
    .on("mouseleave", function(d){
        pic.attr("src", "img/shoe_cam/" + last_date + ".jpg");
      cap.html(last_cap);
    });

  });

  // Analytics stuff.
  var ana_container = $("#analytic-activity");
  var data = $.getJSON('/analytics', function(data){
    $.each(data.rows, function(){
      if (this[1] !== "(not provided)") {
        var dict = {
          url : this[0],
          path : this[1],
          name : this[2],
          count : this[3]
        };
        var analytic = ich.analytic(dict);
        ana_container.append(analytic);
      }
    });
    var start_date = data.query['start-date'];
    var end_date = data.query['end-date'];
    console.log(start_date);
    console.log(end_date);
  });
  $("#graph_wrapper").scrollLeft($("#scrum_graph").width());

  // Blog stuff.
  var blog_container = $("#blog_rank");
  var data = $.getJSON('/blog', function(data){
    for (var key in data) {
      blog_container.append('<div class="activity">' + key + '<div>');
    }
  });
});
