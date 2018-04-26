var modevalue = 0;
var truedic = {}
function getInput()
{
    var a=document.getElementById("inputText").value;
    if(a.empty())
        return;
    return a;
}

function show()
{
    var text = $('#inputText').val();
    if(text.length==0)
    {
        return;
    }
    document.getElementById("result").style.display = "";
    var jsondata = {
        'yuanwen':text,
        'mode':modevalue
    }
    if(modevalue==1)
    {
        $.ajax({
            url: '/',
            data: jsondata,
            type: 'POST',
            success: function(response){
            //console.log(response);
            //console.log("mode 1");
            var returnjson = eval("("+response+")");
            document.getElementById("yuanwen").innerHTML = returnjson.xiandaiyuanwen;
            document.getElementById("jiqifanyi").innerHTML = returnjson.guwenfanyi;
            //document.getElementById("shenjingwangluo").innerText = returnjson.fanyi2;
            truedic = returnjson.zidian;
            mouseaction();
            //console.log(modevalue);
            }
        });
    }
    else
    {
        $.ajax({
            url: '/',
            data: jsondata,
            type: 'POST',
            success: function(response){
            //console.log(response);
            //console.log("mode 0");
            var returnjson = eval("("+response+")");
            var yuanwen = returnjson.guwenyuanwen;
            document.getElementById("yuanwen").innerHTML = yuanwen;
            document.getElementById("jiqifanyi").innerHTML = returnjson.xiandaifanyi;
            //document.getElementById("shenjingwangluo").innerText = returnjson.fanyi2;
            truedic = returnjson.zidian;
            mouseaction();
            //console.log(modevalue);
            }
        });
    }

}

function changemode()
{
    var curmode = document.getElementById("mode1").innerText;
    if(curmode=='文言文')
    {
        document.getElementById("mode1").innerText = '现代文';
        document.getElementById("mode2").innerText = '文言文';
        document.getElementById("inputText").setAttribute("placeholder","请输入现代文");
        document.body.style.background = "url(static/background1.jpg)";
        document.body.style.backgroundRepeat="repeat-y";
        document.body.style.backgroundSize="100% 100%";
        document.body.style.backgroundAttachment = "fixed";
        document.getElementById("result").style.display = "none";
        modevalue = 1;
    }
    else
    {
        document.getElementById("mode1").innerText = '文言文';
        document.getElementById("mode2").innerText = '现代文';
        document.getElementById("inputText").setAttribute("placeholder","请输入文言文");
        document.body.style.background = "url(static/background2.jpg)";
        document.body.style.backgroundSize="100% 100%";
        document.body.style.backgroundRepeat="no-repeat";
        document.body.style.backgroundAttachment = "fixed";
        document.getElementById("result").style.display = "none";
        modevalue = 0;
    }
}


function str_to_html(str) {
    var html = '';
    if (!!str) {
        for (var i = 0; i < str.length; i++) {
            html += '<span>' + str.charAt(i) + '</span>';
        }
    }
    document.getElementById('wenyanwen').innerText = html;
    document.getElementById('xiandaiwen').innerText = html;
}

function KeySearch()
{
    if (event.keyCode==13)
        show();
    return ;
}


function mousePosition(ev){   
    ev = ev || window.event;   
    if(ev.pageX || ev.pageY){   
        return {x:ev.pageX, y:ev.pageY};   
    }   
    return {   
        x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,   
        y:ev.clientY + document.body.scrollTop - document.body.clientTop   
    };   
}  


function mouseaction()
{
    $(".word").mouseover(function(e){  
        var mousePos = mousePosition(e);  
        var  xOffset = 20;  
        var  yOffset = 20;  
        var dict = truedic;
        if(modevalue==1)
        {
            xOffset = xOffset - 740;
        }
        $(this).attr("id","select");
        //console.log(dict);
        for(var key in dict)
        {
            if(this.innerText==key)
            {
                $("#tooltip").append('<pre>' + dict[key] + '</pre>');
                var tipheight = $("#tooltip").height();
                console.log(tipheight);
                console.log(window.innerHeight);
                if(mousePos.y - yOffset < window.innerHeight - tipheight)
                {
                    $("#tooltip").css("display","block").css("position","absolute").css("top",(mousePos.y - yOffset - 5) + "px").css("left",(mousePos.x + xOffset) + "px"); 
                }
                else
                {
                    $("#tooltip").css("display","block").css("position","absolute").css("top",(window.innerHeight - tipheight - 20) + "px").css("left",(mousePos.x + xOffset) + "px"); 
                }
                break;
            }
        }   

    });  
    $(".word").mouseout(function(){  
        $(this).attr("id","noneselect");
        $("#tooltip").empty();  
        $("#tooltip").css("display","none");  
    }); 
}