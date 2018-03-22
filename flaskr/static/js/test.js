function addpara()
{
    var para = document.createElement('p');
    var textnode = document.createTextNode("nihao");
    para.appendChild(textnode);
    var element = document.getElementById("id");
    element.appendChild(para);
}

