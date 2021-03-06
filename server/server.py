import tornado.ioloop
import tornado.web
import jwt
import sys

from datetime import date
import time
import json

from requests import post, get
from apiclient.errors import HttpError
from oauth2client.client import AccessTokenRefreshError

import config
import util

import datetime
import time

ORG = 'harvard-lil'
TABLE_ID = config.G_TABLE_ID

def google_date(timestamp):
    return datetime.datetime.fromtimestamp(timestamp).strftime('%Y-%m-%d')

class AnalyticsHandler(tornado.web.RequestHandler):
    def get(self):
        service = util.initialize_service()
        try:
            # 30 days = 2592000 seconds.
            now = time.time()
            results = service.data().ga().get(
                ids=TABLE_ID,
                start_date=google_date(now - 2592000),
                end_date=google_date(now),
                metrics='ga:visits',
                dimensions='ga:hostname,ga:pagePath,ga:pageTitle',
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

class BlogHandler(tornado.web.RequestHandler):
    def get(self):
        response = get("http://librarylab.law.harvard.edu/blog/dashboard.php")
        ranked = response.json()
        # Wrap this.
        # Wordpress always returns a 404 for some reason...
        #if response.status_code == 200:
        self.write(response.text)
        #else:
        #    raise Exception("Wordpress error.")

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

def timestamp(year, month, day):
    d = date(year, month, day)
    return time.mktime(d.timetuple())

class ScrumHandler(tornado.web.RequestHandler):
    # This could send the scrum/shoe urls...or not.
    def get(self):
        data = [
            {
                "date" : timestamp(2013, 2, 26),
                "count" : 3,
            },
            {
                "date" : timestamp(2013, 2, 28),
                "count" : 5,
            },
            {
                "date" : timestamp(2013, 3, 5),
                "count" : 4,
            },
            {
                "date" : timestamp(2013, 3, 7),
                "count" : 3,
            },
            {
                "date" : timestamp(2013, 3, 12),
                "count" : 2,
            },
            {
                "date" : timestamp(2013, 3, 14),
                "count" : 3,
            },
            {
                "date" : timestamp(2013, 3, 19),
                "count" : 2,
            },
            {
                "date" : timestamp(2013, 3, 21),
                "count" : 1,
            },
            {
                "date" : timestamp(2013, 3, 26),
                "count" : 4,
            },
            {
                "date" : timestamp(2013, 3, 28),
                "count" : 5,
            },
            {
                "date" : timestamp(2013, 4, 2),
                "count" : 4,
            },
            {
                "date" : timestamp(2013, 4, 4),
                "count" : 2,
            },
            {
                "date" : timestamp(2013, 4, 9),
                "count" : 3,
            },
            {
                "date" : timestamp(2013, 4, 11),
                "count" : 5,
            },
            {
                "date" : timestamp(2013, 4, 16),
                "count" : 5,
            },
            {
                "date" : timestamp(2013, 4, 18),
                "count" : 3,
            },
            {
                "date" : timestamp(2013, 4, 23),
                "count" : 0,
            },
            {
                "date" : timestamp(2013, 4, 25),
                "count" : 4,
            },
            {
                "date" : timestamp(2013, 4, 30),
                "count" : 3,
            },
            {
                "date" : timestamp(2013, 5, 2),
                "count" : 4,
            },
            {
                "date" : timestamp(2013, 5, 7),
                "count" : 2,
            },
            {
                "date" : timestamp(2013, 5, 9),
                "count" : 3,
            },
            {
                "date" : timestamp(2013, 5, 14),
                "count" : 2,
            },
            {
                "date" : timestamp(2013, 5, 16),
                "count" : 2,
            },
        ]
        self.write(json.dumps(data))

application = tornado.web.Application([
    (r"/analytics", AnalyticsHandler),
    (r"/blog", BlogHandler),
    (r"/github", GitHubHandler),
    (r"/events/(.*)", tornado.web.StaticFileHandler, {'path' : '../../eventcat'}),
    (r"/scrum", ScrumHandler),
    (r"/(.*)", tornado.web.StaticFileHandler, {'path' : '../'}),
])

if __name__ == "__main__":
    application.listen(8888, address='0.0.0.0')
    tornado.ioloop.IOLoop.instance().start()
