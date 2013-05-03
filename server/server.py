import tornado.ioloop
import tornado.web
import jwt
import sys

from requests import post, get
from apiclient.errors import HttpError
from oauth2client.client import AccessTokenRefreshError

import config
import util

ORG = 'harvard-lil'
TABLE_ID = ''

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

class ScrumHandler(tornado.web.RequestHandler):
    # This could send the scrum/shoe urls...or not.
    def get(self):
        data = {
        }

class AnalyticsHandler(tornado.web.RequestHandler):
    def get(self):
        service = util.initialize_service()
        try:
            results = service.data().ga().get(
                ids=TABLE_ID,
                start_date='2012-01-01',
                end_date='2013-05-02',
                metrics='ga:visits',
                dimensions='ga:source,ga:keyword',
                sort='-ga:visits',
                filters='ga:medium==organic',
                start_index='1',
                max_results='25').execute()
            self.write(results)
        except TypeError, error:
            print ('There was an error in constructing your query : %s' % error)
        except HttpError, error:
            print ('Arg, there was an API error : %s : %s' %
                   (error.resp.status, error._get_reason()))
        except AccessTokenRefreshError:
            print ('The credentials have been revoked or expired, please re-run '
                   'the application to re-authorize')

application = tornado.web.Application([
    (r"/analytics", AnalyticsHandler),
    (r"/github", GitHubHandler),
    (r"/events/(.*)", tornado.web.StaticFileHandler, {'path' : '../../eventcat'}),
    (r"/(.*)", tornado.web.StaticFileHandler, {'path' : '../'}),
])

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
