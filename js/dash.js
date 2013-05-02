require(["eventcat"], function(cat) {
  var org = 'harvard-lil'
  var container = $("#github-activity");
  var data = $.getJSON('http://localhost:8888/github', function(data){
    $.each(data, function(){
      var dict = cat.sentence_dict(this);
      var activity = ich.activity(dict);
      container.append(activity);
      });
  });
});
