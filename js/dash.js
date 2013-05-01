(function(){
  var action_map = {
    IssuesEvent : "opened an issue on",
    CreateEvent : "created repo",
    PushEvent : "pushed to repo",
    ForkEvent : "forked repo",
    DeleteEvent : "deleted repo"
  }
  var org = 'harvard-lil'
  var container = $("#github-activity");
  var data = $.getJSON('http://localhost:8888/github', function(data){
    $.each(data, function(){
      var dict = {
        name : this.actor.login,
        activity : action_map[this.type],
        repo : this.repo.name,
        repo_url : this.repo.url
      };
      var action = ich.action(dict);
      container.append(action);
    });
  });
})();
