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
#        path = os.path.join(os.path.dirname(__file__), 'template/register.html')
        path = os.path.join(os.path.dirname(__file__), 'template/register2.html')
        self.response.out.write(template.render(path, template_values))
    def post(self):
        hospitalId = self.request.get('hospitalId')
        hospitalUrl = self.request.get('hospitalUrl')
        deptId = self.request.get('deptId')
        doctorId = self.request.get('doctorId')
        hospital = self.request.get('Hospital')
        dept = self.request.get('Dept')
        doctor = self.request.get('Doctor')
        time = self.request.get('Time')
        #pic = images.resize(self.request.get("img") , 85, 120)
        template_values = {
            'hospitalId': hospitalId,
            'hospitalUrl': hospitalUrl,
            'deptId': deptId,
            'doctorId': doctorId,
            'hospital': hospital,
            'dept': dept,
            'doctor': doctor,
            'time': time
        }
#        path = os.path.join(os.path.dirname(__file__), 'template/register2.html')
        path = os.path.join(os.path.dirname(__file__), 'template/register.html')
        self.response.out.write(template.render(path, template_values))


application = webapp.WSGIApplication([('/register', MainPage)], debug=True)

def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()
