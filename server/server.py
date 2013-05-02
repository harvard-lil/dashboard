import tornado.ioloop
import tornado.web
import jwt
import config

from requests import post, get

ORG = 'harvard-lil'

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")

class GitHubHandler(tornado.web.RequestHandler):
    def get(self):
        args = {
            "client_id" : config.GH_ID,
            "client_secret" : config.GH_SECRET
            }
        response = get("https://api.github.com/orgs/" + ORG + "/events", params=args)
        if response.status_code == 200:
            self.write(response.text)
        else:
            raise Exception("Github error.")

class AnalyticsHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello world.")

application = tornado.web.Application([
    (r"/analytics", AnalyticsHandler),
    (r"/github", GitHubHandler),
    (r"/events/(.*)", tornado.web.StaticFileHandler, {'path' : '../../eventcat'}),
    (r"/(.*)", tornado.web.StaticFileHandler, {'path' : '../'}),
])

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
