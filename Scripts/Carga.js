var iRandom = Math.random();
//Scripts
var sTkn = "Scripts/Token.js?n=" + iRandom;
var sCore = "Scripts/Core.js?n=" + iRandom;
var sApis = "Scripts/Apis.js?n=" + iRandom;
var sVariables = "Scripts/Variables.js?n=" + iRandom;
var sGeneral = "Scripts/Generales.js?n=" + iRandom;
var sZoho = "Scripts/Zoho.js?n=" + iRandom;
//Estilos
var sEstilo1 = "Estilos/Variables.css?n=" + iRandom;
var sEstilo2 = "Estilos/Fuentes.css?n=" + iRandom;
var sEstilo3 = "Estilos/Componentes.css?n=" + iRandom;
var sEstilo4 = "Estilos/Generales.css?n=" + iRandom;
//Pagina Inicio
var sInicio = "Cotizador/Paso2.html?n=" + iRandom;
//var sInicio = "Cotizador/Paso3.html?n=" + iRandom;

var script1 = document.createElement('script');
var script2 = document.createElement('script');
var script3 = document.createElement('script');
var script4 = document.createElement('script');
var script5 = document.createElement('script');
var script6 = document.createElement('script');

var css1 = document.createElement('link');
var css2 = document.createElement('link');
var css3 = document.createElement('link');
var css4 = document.createElement('link');

script1.src = sTkn;
script2.src = sCore;
script3.src = sApis;
script4.src = sVariables;
script5.src = sGeneral;
script6.src = sZoho;

document.head.appendChild(script1);
document.head.appendChild(script2);
document.head.appendChild(script3);
document.head.appendChild(script4);
document.head.appendChild(script5);
document.head.appendChild(script6);

css1.setAttribute("href", sEstilo1);
css1.setAttribute("rel", "stylesheet");
css2.setAttribute("href", sEstilo2);
css2.setAttribute("rel", "stylesheet");
css3.setAttribute("href", sEstilo3);
css3.setAttribute("rel", "stylesheet");
css4.setAttribute("href", sEstilo4);
css4.setAttribute("rel", "stylesheet");

document.head.appendChild(css1);
document.head.appendChild(css2);
document.head.appendChild(css3);
document.head.appendChild(css4);

var oSLogin;
if (window.XMLHttpRequest) { oSLogin = new XMLHttpRequest(); } else { try { oSLogin = new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) { alert('El navegador utilizado no soporta ajax object'); } };
oSLogin.open("GET", sInicio, false);
oSLogin.send();
var sRespuesta = oSLogin.responseText;

document.getElementById('BasePasos').innerHTML += sRespuesta
window.scrollTo(0, 0);

var lpParams = new URLSearchParams(window.location.search);
document.getElementById("txtCorreo").value = lpParams.get("email");
