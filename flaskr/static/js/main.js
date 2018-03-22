// 获得输入的文字
function getInput()
{
    var a=document.getElementById("inputText").value;
    if(a.empty())
        return;
    return a;
}
function show()
{
    var a=document.getElementById("inputText").value;
    // alert(a);
    // document.getElementsByClassName("couplet-hd").style.display = 'block';
    // var i = document.getElementsByClassName("couplet-hd");
    var i1 = document.getElementById("display1");
    var i2 = document.getElementById("display2");
    var i3 = document.getElementById("display3");
    var i4 = document.getElementById("display4");
    var i5 = document.getElementById("middle")
    if(i1.style.display=="none"){
        i1.style.display = "";
    }
    if(i2.style.display=="none"){
        i2.style.display = "";
    }
    if(i3.style.display=="none"){
        i3.style.display = "";
    }
    if(i4.style.display=="none"){
        i4.style.display = "";
    }
    if(i5.style.display=="none"){
        i5.style.display = "";
    }
    document.getElementById('yuanwen').innerText = a;
    document.getElementById('jiqifanyi').innerText = a;
    document.getElementById('shenjingwangluo').innerText = a;
    document.getElementById('zidian').innerText = a;
    return a;
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
    if (event.keyCode==13)  //回车键的键值为13
        show();
    return ;
}

// function scrollBG(maxSize) {				//这个函数就是滚动背景的核心
//     backgroundOffset = backgroundOffset + 1;			//将背景偏移加1点
//     if (backgroundOffset > maxSize) backgroundOffset = 0;		//如果偏移量超过了最大值则回零
//     bgObject.style.backgroundPosition = "0 " + backgroundOffset;	//设定背景的偏移量，使其生效
// }
//
// function VerticalSlide()
// {
//     var backgroundOffset = 0;				//背景图片的偏移量
//     var bgObject = eval('document.body');				//得到文挡本身的对象
//     var ScrollTimer = window.setInterval("scrollBG(1800)", 64);	//设定每次移动背景之间的间隔
// }