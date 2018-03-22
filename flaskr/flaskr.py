# all the imports
import os
import sqlite3
from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash
from flask_wtf import Form
from wtforms import StringField, SubmitField
from wtforms.validators import Required
app = Flask('flaskr')

@app.route("/",methods=['POST','GET'])
def index():
    demoCSS=url_for("static",filename="stylesheet.css")
    # return render_template("test.html")
    #no = print(request.form.get('yuanwen'))
    return render_template("demo.html",demoCSS=demoCSS)

if __name__ == '__main__':
    app.run(debug=True)