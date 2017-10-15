#!/usr/bin/env python

import os

import jinja2
import webapp2

from google.appengine.ext import ndb

import json
import time

import logging

template_dir = os.path.join(os.path.dirname(__file__),'templates')
jinja_env = jinja2.Environment(loader = jinja2.FileSystemLoader(template_dir),
                               autoescape = False)

def render_str(template, **params):
    t = jinja_env.get_template(template)
    return t.render(params)

class Handler(webapp2.RequestHandler):
    def write(self, *a, **kw):
        self.response.out.write(*a, **kw)

    def render(self, template, **kw):
        self.response.out.write(render_str(template, **kw))

    def initialize(self, *a, **kw):
        webapp2.RequestHandler.initialize(self, *a, **kw)
        if self.request.url.endswith('.json'):
            self.format = 'json'
        else:
            self.format = 'html'

class MainHandler(Handler):
    def get(self):
        # this is the line you will change
        self.render('main-2.html')

class GreetingHandler(Handler):
    def get(self, name):
        self.write("Hello, %s" % (name))

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/greet/(.*)', GreetingHandler)
    ], debug=True)
