# all the imports
import os
import sqlite3
from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash
from flask.ext.wtf import Form
from wtforms import StringField, SubmitField
from wtforms.validators import Required
from jinja2 import Environment, PackageLoader, select_autoescape
app = Flask('flaskr')
app.config['SECRET_KEY'] = 'hard to guess string'

env = Environment(
    loader=PackageLoader('flaskr', 'templates'),
    autoescape=select_autoescape(['html', 'xml'])
)
def redirect_url(default='index'):
    return request.args.get('next') or \
           request.referrer or \
           url_for(default)

@app.route("/")
def index():
    return render_template("base.html")

@app.route("/",methods=['POST','GET'])
def my_form_post():
    text = request.form["yuanwen"]
    print(text)
    if request.method == 'POST':
        #处理函数
        # return text
        print(text)
        fanyi1="fanyi1"+text
        fanyi2 = "fanyi2"+text
        zidian="zidian"+text
        templateData = {
            'yuanwen':text,
            'fanyi1':fanyi1,
            'fanyi2':fanyi2,
            'zidian':zidian
        }
        # render_template("base.html",**templateData)
        # template = env.get_template('base.html')
        # template.render(yuanwen=text, fanyi1 = fanyi1, fanyi2 = fanyi2, zidian = zidian)
        return render_template("base.html",yuanwen=text, fanyi1 = fanyi1, fanyi2 = fanyi2, zidian = zidian)
        # return redirect(redirect_url())
if __name__ == '__main__':
    app.run(debug=True)