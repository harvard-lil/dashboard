define([], function() {
  var self = {};
  self.keys = ['pre_event', 'item', 'item_url', 'post_event', 'description', 'img'];
  var img_map = {
    CommitCommentEvent : ".png",
    CreateEvent : ".png",
    DeleteEvent : ".png",
    DownloadEvent : ".png",
    FollowEvent : ".png",
    ForkEvent : ".png",
    ForkApplyEvent : ".png",
    GistEvent : ".png",
    GollumEvent : ".png",
    IssueCommentEvent : ".png",
    IssuesEvent : ".png",
    MemberEvent : ".png",
    PublicEvent : ".png",
    PullRequestEvent : ".png",
    PullRequestReviewCommentEvent : ".png",
    PushEvent : ".png",
    TeamAddEvent : ".png",
    WatchEvent : ".png"
  };
  self.pad_dict = function(dict) {
    dict.pre_action = " " + dict.pre_action + " ";
    if (dict.item != undefined && dict.post_action != undefined) {
      dict.post_action = " " + dict.post_action + " ";
    }
  };
  // Where all the terrible things happen.
  self.extract_payload = function(event) {
    var type = event.type;
    var payload = event.payload;
    var dict = {};
    switch(type) {
    case "CommitCommentEvent":
      console.log("CommitCommentEvent not yet implemented");
      break;
    case "CreateEvent":
      // Created a repository, branch, or tag
      dict.pre_action = "created " + (payload.ref === null ? "a " : "") + payload.ref_type;
      dict.item = payload.ref === null ? "" : payload.ref;
      // This url works for repos and branches, not sure about tags.
      dict.item_url = "https://github.com/" + event.repo.name + (payload.ref === null ? "" : "/tree/" + payload.ref)
      dict.post_action = "at"
      dict.description = payload.description;
      dict.img = payload.ref === null ? "new_repo" : "fork_repo";
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
      dict.item = "forked";
      dict.item_url = payload.forkee.html_url;
      dict.post_action = "";
      dict.description = payload.description;
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
      dict.pre_action = payload.action + " an";
      dict.item = "issue";
      dict.item_url = payload.issue.html_url;
      dict.post_action = "on";
      dict.descriptionn = payload.issue.title;
      dict.img = undefined;
      break;
    case "MemberEvent":
      dict.pre_action = "";
      dict.item = "";
      dict.item_url = "";
      dict.post_action = "";
      dict.descriptionn = "";
      dict.img = "";
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
      dict.item = "pushed";
      dict.item_url = "https://github.com/" + event.repo.name + "/commits/" + payload.commits[0].sha;
      dict.post_action = "to";
      dict.description = payload.commits[0].message;
      dict.img = "push_repo";
      break;
    case "TeamAddEvent":
      // This might need 4 links;
      console.log("TeamAddEvent not yet implemented");
      break;
    case "WatchEvent":
      dict.pre_action = payload.action + " watching";
      break;
    }
    return dict;
  };

  self.sentence_dict = function(event) {
    var dict = self.extract_payload(event);
    if (event.repo !== undefined && event.actor !== undefined) {
      dict.user = event.actor.login;
      dict.repo = event.repo.name;
      self.pad_dict(dict);
      return dict;
    }
  };

  return self;
});
