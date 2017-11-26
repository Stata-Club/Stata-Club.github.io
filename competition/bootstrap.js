window.onload = function() {
  var para = document.createElement("p");
  var txt1 = document.createTextNode("结果这熊孩子转到他爸的屁股后面踢了他爸两脚。");
    var testimg = document.getElementById("title2");
  var imgsrc = testimg.src;
  var changesrc = imgsrc.substring(0,imgsrc.indexOf(".",1)) + "0.jpg"
  para.appendChild(txt1);
  var testdiv = document.getElementById("title1");
  testdiv.appendChild(para);
  testimg.src = changesrc;
}