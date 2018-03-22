# all the imports
import os
import sqlite3
from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash
from flask.ext.wtf import Form
from wtforms import StringField, SubmitField
from wtforms.validators import Required
app = Flask('flaskr')
app.config['SECRET_KEY'] = 'hard to guess string'
# @app.route("/",methods=['GET','POST'])
# def index():
#     form = MockCreate()
#     text= form['text']
#     demoCSS=url_for("static",filename="stylesheet.css")
#     yuanwen = request.form['yuanwen']
#     print(yuanwen)
#     return render_template("demo.html",demoCSS=demoCSS)


@app.route("/")
def index():
    fanyi1 = "fanyi1"
    fanyi2 = "fanyi2"
    zidian = "zidian"
    return render_template("base.html",fanyi1=fanyi1,fanyi2=fanyi2,zidian=zidian)

@app.route("/",methods=['POST','GET'])
def my_form_post():
    text = request.form["yuanwen"]
    print(text)
    if request.method == 'POST':
        #处理函数
        # return text
        print(text)
        fanyi1="fanyi1"
        fanyi2 = "fanyi2"
        zidian="zidian"
        templateData = {
            'yuanwen':text,
            'fanyi1':fanyi1,
            'fanyi2':fanyi2,
            'zidian':zidian
        }
        return render_template("base.html",**templateData)
if __name__ == '__main__':
    app.run(debug=True)