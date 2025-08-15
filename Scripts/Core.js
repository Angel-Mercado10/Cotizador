function Procesa_Info(sDiv, sClass) {
    var sRequeridos = Obtener_Requeridos(sDiv, sClass);
    var oReqs = JSON.parse(sRequeridos);
    var bReq;
    if (oReqs != "") {
        bReq = true;
        for (var iR in oReqs) {
            if (oReqs[iR] == "") {
                bReq = false;
                break;
            }
        }
    }
    return bReq;
}

function Obtener_Requeridos(sDiv, sClass) {
    var oDiv = document.getElementById(sDiv);
    var DatosClass = oDiv.getElementsByClassName(sClass);
    var Cadena, Input, Select;
    if (DatosClass !== null) {
        Cadena = "{";
        for (var C = 0; C < DatosClass.length; C++) {
            switch (DatosClass[C].nodeName) {
                case "INPUT":
                case "SELECT":
                case "TEXTAREA":
                    Input = document.getElementById(DatosClass[C].id);
                    var sName = Input.getAttribute("name");
                    switch (sName) {
                        case "CReq":
                            Cadena += '"' + Input.id + '":"' + Input.value + '",';
                            break;
                    }
                    break;
            }
        }
        Cadena += "}";
        Cadena = Cadena.replace(",}", "}");
    } else {
        Error_Solicitud("No es posible recuperar los elementos de la clase " + sClass);
    }
    return Cadena;
}

function Crea_Solicitud() {
    var oAjax;
    if (window.XMLHttpRequest) {
        oAjax = new XMLHttpRequest();
    } else {
        try {
            oAjax = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
            Error_Solicitud("El navegador utilizado no soporta ajax object");
        }
    }
    return oAjax;
};

function Ejecuta_Contenido(sPagina, sParametros, fnRespuesta) {
    var oAjax = Crea_Solicitud();
    oAjax.open("GET", sPagina + "?" + sParametros, false);
    oAjax.send();
    fnRespuesta(oAjax.responseText);
}

function Ejecuta_Contenido_Sinc(sPagina, sParametros) {
    var oAjax = Crea_Solicitud();
    oAjax.open("GET", sPagina + "?" + sParametros, false);
    oAjax.send();
    return oAjax.responseText;
}

function AutorizaId() {
    var oAjax = Crea_Solicitud();
    oAjax.open("POST", oServices.Autoriza, false);
    oAjax.setRequestHeader("Content-type", "application/json");
    var oJAut = {
        Id: sAId
    };
    oAjax.send(JSON.stringify(oJAut));
    return JSON.parse(oAjax.responseText)
};

function Transacciona(sPagina, oParametros, fnRespuesta, fnError) {
    var oTAId = AutorizaId();
    var oAjax = Crea_Solicitud();
    oAjax.onreadystatechange = function () {
        if (oAjax.readyState == 4 && oAjax.status == 200) {
            console.log("Termino"); fnRespuesta(JSON.parse(oAjax.responseText));
        } else {
            console.log("Procesando");
        };
        if (oAjax.readyState == 4 && oAjax.status != 200) { document.body.style.cursor = "default"; fnError(JSON.parse(oAjax.responseText)); };
    };
    oAjax.open("POST", sPagina, true);
    oAjax.setRequestHeader("Content-type", "application/json");
    oAjax.setRequestHeader("Authorization", "FId " + oTAId.ATkn);
    oAjax.setRequestHeader("Id", sAId);
    oAjax.setRequestHeader("Token", sToken);
    if (Object.keys(oParametros).length > 0) {
        oAjax.send(JSON.stringify(oParametros));
    } else {
        oAjax.send();
    };
};

function Transacciona_Sinc(sPagina, oParametros) {
    var oTAId = AutorizaId();
    var oAjax = Crea_Solicitud();

    oAjax.open("POST", sPagina, false);
    oAjax.setRequestHeader("Content-type", "application/json");
    oAjax.setRequestHeader("Authorization", "FId " + oTAId.ATkn);
    oAjax.setRequestHeader("Id", sAId);
    oAjax.setRequestHeader("Token", sToken);
    oAjax.send(JSON.stringify(oParametros));
    return JSON.parse(oAjax.responseText);
};

function AutorizaCS() {
    const dHoy = new Date();
    var dExp = new Date(oToken.expiration);
    if (dExp < dHoy) {
        var oAjax = Crea_Solicitud();
        oAjax.open(oServices_CS.Auth.Metodo, oServices_CS.Auth.Pagina, false);
        oAjax.setRequestHeader("Content-type", "application/json");
        var oJAut = {
            clave: "00118"
            , password: "Febrero*2025"
        };
        oAjax.send(JSON.stringify(oJAut));
        oToken = JSON.parse(oAjax.responseText)
    }
};

function Transacciona_CS(sMetodo, sPagina, oParametros, fnRespuesta, fnError) {
    AutorizaCS();
    var oAjax = Crea_Solicitud();

    oAjax.onreadystatechange = function () {
        if (oAjax.readyState == 4 && oAjax.status == 200) {
            console.log("Termino"); fnRespuesta(JSON.parse(oAjax.responseText));
        } else {
            console.log("Procesando");
        };
        if (oAjax.readyState == 4 && oAjax.status != 200) {
            document.body.style.cursor = "default";
            var sRespuesta = oAjax.responseText;
            if (sRespuesta == "") {
                fnError(sRespuesta);
            } else {
                fnError(JSON.parse(sRespuesta));
            };
        };
    };

    oAjax.open(sMetodo, sPagina, false);
    oAjax.setRequestHeader("Content-type", "application/json");
    oAjax.setRequestHeader("Authorization", "Bearer " + oToken.token);
    oAjax.send(JSON.stringify(oParametros));
};

function Transacciona_CS_Sinc(sMetodo, sPagina, oParametros) {
    AutorizaCS();
    var oAjax = Crea_Solicitud();

    oAjax.open(sMetodo, sPagina, false);
    oAjax.setRequestHeader("Content-type", "application/json");
    oAjax.setRequestHeader("Authorization", "Bearer " + oToken.token);
    oAjax.send(JSON.stringify(oParametros));
    var sRespueta = oAjax.responseText;
    if (sRespueta == "") {
        return sRespueta
    } else {
        return JSON.parse(sRespueta);
    };
};

document.onclick = captura_click;
//Código para el bloqueo de caracteres distintos a letras y numeros
document.onkeypress = captura_teclado;

function captura_click(e) {
    var HaHechoClick;
    var oFecha = new Date();
    var sFecha = ("0" + oFecha.getDate()).slice(-2) + "/" + ("0" + (oFecha.getMonth() + 1)).slice(-2) + "/" + oFecha.getFullYear();
    var sHora = ("0" + oFecha.getHours()).slice(-2) + ":" + ("0" + oFecha.getMinutes()).slice(-2) + ":" + ("0" + oFecha.getSeconds()).slice(-2) + ":" + ("00" + oFecha.getMilliseconds()).slice(-3);
    if (e == null) {
        HaHechoClick = event.srcElement;
    } else {
        HaHechoClick = e.target;
    };
    console.log("Click en : " + HaHechoClick.id + "|" + HaHechoClick.tagName + "|" + sFecha + "|" + sHora);
};
function captura_teclado() {
    //console.log(event.keyCode);
    if (event.keyCode == 13 && iLogin == 0) {
        Carga_Sistema();
    }
    //if (event.keyCode !== 13 && iLogin == 0) {
    //    event.returnValue = true;
    //} else if ((event.keyCode != 32 && event.keyCode < 45) || (event.keyCode > 59 && event.keyCode < 63) || (event.keyCode > 90 && event.keyCode < 95) || (event.keyCode > 122 && event.keyCode != 241)) {
    //    event.returnValue = false;
    //};
};

function Pinta_Error(oRespuesta) {
    if (oRespuesta.Respuesta == false) {
        alert(oRespuesta.MError);
    };
};

function PintaCombo(oValores, sCombo, bVInicial, sTexto, sSetValue) {
    var oSelect = document.getElementById(sCombo);

    oSelect.innerHTML = "";

    if (bVInicial) {
        var oOption = document.createElement("option");
        if (sTexto.length == 0) { sTexto = "Selecciona una opci\u00f3n"; };
        oOption.innerHTML = sTexto;
        oSelect.appendChild(oOption).setAttribute("value", sSetValue);
    }
    if (oValores.Respuesta) {
        for (var iU in oValores.Valores) {
            var oOption = document.createElement("option");
            oOption.innerHTML = oValores.Valores[iU].Texto;
            oSelect.appendChild(oOption).setAttribute("value", oValores.Valores[iU].Valor);
        }
    }
    if (sSetValue.length > 0) {
        oSelect.value = sSetValue;
    } else {
        oSelect.selectIndex = 0
    };
};

/* Especiales DOM */
window.onbeforeunload = function () {
    return false;
};