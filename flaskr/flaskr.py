# all the imports
import os
import sqlite3
from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash, json
from flask.ext.wtf import Form
from wtforms import StringField, SubmitField
from wtforms.validators import Required
from jinja2 import Environment, PackageLoader, select_autoescape
import pickle

app = Flask('flaskr')
app.config['SECRET_KEY'] = 'hard to guess string'
dic = pickle.load(open('./static/cixing.pkl','rb'))

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
    text = request.values.get('yuanwen', '')    #从前端获得原文
    mode = request.values.get('mode')           #若前端为文言文翻译成现代文mode值为0
                                                #若为现代文翻译成文言文mode值为1 
    truedic = {}
    modifytext = '<div id="tooltip" class="tip"></div>'
    for i in text:
        if i in dic.keys():
            truedic[i] = dic[i]
            modifytext = modifytext + '<span class="word">' + i + "</span>"
        else:
            modifytext = modifytext + '<span>' + i + "</span>"
            
            
    #后端传递给前端数据        
    if request.method == 'POST':
        fanyi1 = text                           #fanyi1为输出，在此处赋值为译文
        return json.dumps({'yuanwen':modifytext,'fanyi1':fanyi1,'zidian':truedic})

if __name__ == '__main__':
    app.run()