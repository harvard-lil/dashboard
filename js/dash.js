(function(){
  var action_map = {
    CommitCommentEvent : {
      item_type : "",
      pre_action : "",
      action_item : "",
      post_action : ""
      "#",
    },
    CreateEvent : {
      item_type : "",
      pre_action : "",
      action_item : "",
      post_action : ""
      "created repo",
    },
    DeleteEvent : {
      item_type : "",
      pre_action : "",
      action_item : "",
      post_action : ""
      "deleted repo",
    },
    DownloadEvent : {
      item_type : "",
      pre_action : "",
      action_item : "",
      post_action : ""
      "#",
    },
    FollowEvent : {
      item_type : "",
      pre_action : "",
      action_item : "",
      post_action : ""
      "followed repo",
    },
    ForkEvent : {
      item_type : "",
      pre_action : "",
      action_item : "",
      post_action : ""
      "forked repo",
    },
    ForkApplyEvent : {
      item_type : "",
      pre_action : "",
      action_item : "",
      post_action : ""
      "#",
    },
    GistEvent : {
      item_type : "",
      pre_action : "",
      action_item : "",
      post_action : ""
      "#",
    },
    GollumEvent : {
      item_type : "",
      pre_action : "",
      action_item : "",
      post_action : ""
      "#",
    },
    IssueCommentEvent : {
      item_type : "",
      pre_action : "",
      action_item : "",
      post_action : ""
      "#",
    },
    IssuesEvent : {
      item_type : "",
      pre_action : "",
      action_item : "",
      post_action : ""
      'opened an issue on',
    },
    MemberEvent : {
      item_type : "",
      pre_action : "",
      action_item : "",
      post_action : ""
      "#",
    },
    PublicEvent : {
      item_type : "",
      pre_action : "",
      action_item : "",
      post_action : ""
      "#",
    },
    PullRequestEvent : {
      item_type : "",
      pre_action : "",
      action_item : "",
      post_action : ""
      "#",
    },
    PullRequestReviewCommentEvent : {
      item_type : "",
      pre_action : "",
      action_item : "",
      post_action : ""
      "#",
    },
    PushEvent : {
      item_type : "",
      pre_action : "pushed to ",
      action_item : "repo",
      post_action : ""
    },
    TeamAddEvent : {
      item_type : "",
      pre_action : "",
      action_item : "",
      post_action : ""
    },
    WatchEvent : {
      item_type : "",
      pre_action : "",
      action_item : "",
      post_action : ""
    },
  }
  var org = 'harvard-lil'
  var container = $("#github-activity");
  var data = $.getJSON('http://localhost:8888/github', function(data){
    $.each(data, function(){
      var keys = action_map[this.type]
      var dict = {
        user : this.actor.login,
        pre_action : "!",
        activity_url : this.payload[keys['type']].['html_url'],
        activity : this.,
        post_action : "!",
        repo : this.repo.name,
        repo_url : this.repo.url
      };
      var activity = ich.activity(dict);
      container.append(activity);
    });
  });
})();
