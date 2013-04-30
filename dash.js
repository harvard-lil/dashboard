(function(){
  var action_map = {
    IssuesEvent : "opened an issue on",
    CreateEvent : "created repo",
    PushEvent : "pushed to repo",
    ForkEvent : "forked repo"
  }
  var org = 'harvard-lil'
  var container = $("#github-module");
  var data = $.getJSON('https://api.github.com/orgs/' + org + '/events', function(data){
    $.each(data, function(){
      var dict = {
        name : this.actor.login,
        activity : action_map[this.type],
        repo : this.repo.name
      };
      var action = ich.action(dict);
      container.append(action);
    });
  });
})();
