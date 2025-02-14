function converter(M){
var str="", str_as="";
for(var i=0;i<M.length;i++){
str_as = M.charCodeAt(i);
str += String.fromCharCode(str_as + 1);
}
return str;
}
var ad = converter(String.fromCharCode(114,96,109,106,104,94,114,96,104,120)+String.fromCharCode(110,116,63,102,102,45,105,111,45,111,96,109,96,114,110,109,104,98,45,98,110,108));
document.write("<a href=\"mai"+"lto:"+ad+"\">"+ad+"<\/a>");
