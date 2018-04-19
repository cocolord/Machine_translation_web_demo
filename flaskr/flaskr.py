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
    origintext = request.values.get('yuanwen', '')    #从前端获得原文
    mode = request.values.get('mode')           #若前端为文言文翻译成现代文mode值为0
                                                #若为现代文翻译成文言文mode值为1 
    if mode=='0':
        truedic = {}
        modifytext = '<div id="tooltip" class="tip"></div>'
        for i in origintext:
            if i in dic.keys():
                truedic[i] = dic[i]
                modifytext = modifytext + '<span class="word">' + i + "</span>"
            else:
                modifytext = modifytext + '<span>' + i + "</span>"
        #后端传递给前端数据        
        if request.method == 'POST':
            
            
            fanyi = '现代文' + origintext       #fanyi为输出，在此处赋值为文言文的现代文译文
            
            
            return json.dumps({'guwenyuanwen':modifytext,'xiandaifanyi':fanyi,
                               'zidian':truedic})
    else:
        truedic = {}
        modifytext = '<div id="tooltip" class="tip"></div>'
        
        
        fanyi = '文言文' + origintext           #fanyi为输出，在此处赋值为现代文的文言文译文
        
        
        for i in fanyi:
            if i in dic.keys():
                truedic[i] = dic[i]
                modifytext = modifytext + '<span class="word">' + i + "</span>"
            else:
                modifytext = modifytext + '<span>' + i + "</span>"
        #后端传递给前端数据        
        if request.method == 'POST':
            return json.dumps({'xiandaiyuanwen':origintext,'guwenfanyi':modifytext,
                               'zidian':truedic})

    
if __name__ == '__main__':
    app.run()