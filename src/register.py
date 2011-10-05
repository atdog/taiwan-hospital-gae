from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext.webapp import template
from google.appengine.ext import db
import os

class Profile(db.Model):
    pid = db.StringProperty()
    pic = db.BlobProperty()
    ptype = db.StringProperty()


class MainPage(webapp.RequestHandler):
    def get(self):
        template_values = {}
        path = os.path.join(os.path.dirname(__file__), 'template/register.html')
        self.response.out.write(template.render(path, template_values))
    def post(self):
        id = self.request.get('id')
        birthday = self.request.get('birthday')
        
        #pic = images.resize(self.request.get("img") , 85, 120)
        template_values = {
            'id': id,
            'birthday': birthday,
        }
        path = os.path.join(os.path.dirname(__file__), 'template/register2.html')
        self.response.out.write(template.render(path, template_values))


application = webapp.WSGIApplication([('/register', MainPage)], debug=True)

def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()
