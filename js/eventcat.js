(function() {

  var KEYS = ['pre_event', 'item', 'item_url', 'post_event', 'description'];

  // Where all the terrible things happen.
  var extract_payload = function(event) {
    var type = event.type;
    var payload = event.payload;
    var dict = {};
    switch(type) {
    case "CommitCommentEvent":
      console.log("CommitCommentEvent not yet implemented");
      break;
    case "CreateEvent":
      // Created a repository, branch, or tag
      dict.pre_action = " created " + payload.ref_type;
      dict.item = payload.ref === null ? "" : " " + payload.ref;
      // This url works for repos and branches, not sure about tags.
      dict.item_url = "https://github.com/" + event.repo.name + (payload.ref === null ? "" : "/tree/" + payload.ref)
      dict.post_action = " at"
      dict.description = payload.description;
      break;
    case "DeleteEvent":
      // Deleted a branch or a tag.
      console.log("DeleteEvent not yet implemented");
      break;
    case "DownloadEvent":
      console.log("DownloadEvent not yet implemented");
      break;
    case "FollowEvent":
      console.log("FollowEvent not yet implemented");
      break;
    case "ForkEvent":
      dict.pre_action = "";
      dict.item = " forked";
      dict.item_url = payload.forkee.html_url;
      dict.post_action = "";
      dict.description = payload.description;
      console.log("ForkEvent not yet implemented");
      break;
    case "ForkApplyEvent":
      console.log("ForkApplyEvent not yet implemented");
      break;
    case "GistEvent":
      console.log("GistEvent not yet implemented");
      break;
    case "GollumEvent":
      console.log("GollumEvent not yet implemented");
      break;
    case "IssueCommentEvent":
      console.log("IssueCommentEvent not yet implemented");
      break;
    case "IssuesEvent":
      console.log("IssuesEvent not yet implemented");
      break;
    case "MemberEvent":
      console.log("MemberEvent not yet implemented");
      break;
    case "PublicEvent":
      console.log("PublicEvent not yet implemented");
      break;
    case "PullRequestEvent":
      console.log("PullRequestEvent not yet implemented");
      break;
    case "PullRequestReviewCommentEvent":
      console.log("PullRequestReviewCommentEvent not yet implemented");
      break;
    case "PushEvent":
      dict.pre_action = "";
      dict.item = " pushed";
      dict.item_url = "https://github.com/" + event.repo.name + "/commits/" + payload.commits[0].sha;
      dict.post_action = " to";
      dict.description = payload.commits[0].message;
      break;
    case "TeamAddEvent":
      // This might need 4 links;
      console.log("TeamAddEvent not yet implemented");
      break;
    case "WatchEvent":
      dict.pre_action = " " + payload.action + " watching";
      break;
    }
    return dict;
  }
  var org = 'harvard-lil'
  var data = $.getJSON('http://localhost:8888/github', function(data){
    $.each(data, function(){
      var dict = extract_payload(this);
      if (this.repo !== undefined && this.actor !== undefined) {
        dict.user = this.actor.login;
        dict.repo = this.repo.name;
      }

//              pre_action : keys.pre_action,
//              post_action : keys.post_action,
          //        dict.item_url = this.payload[keys['type']].['html_url'],
          //dict.item = this.,
      console.log(dict);
    });
  });
})();
