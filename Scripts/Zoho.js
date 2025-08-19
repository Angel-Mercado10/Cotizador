var oZohoCred = {
    client_id: "",
    client_secret: "",
    refresh_token: ""
};

function ZohoRefreshToken() {
    var oAjax = new XMLHttpRequest();
    var sParams = "refresh_token=" + oZohoCred.refresh_token +
        "&client_id=" + oZohoCred.client_id +
        "&client_secret=" + oZohoCred.client_secret +
        "&grant_type=refresh_token";
    oAjax.open("POST", oServices_Zoho.Refresh, false);
    oAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    oAjax.send(sParams);
    var oResp = JSON.parse(oAjax.responseText);
    return oResp.access_token;
}

function ZohoCrearVehiculo(oRegistro) {
    var sToken = ZohoRefreshToken();
    var oAjax = new XMLHttpRequest();
    oAjax.open("POST", oServices_Zoho.Vehiculos, false);
    oAjax.setRequestHeader("Content-Type", "application/json");
    oAjax.setRequestHeader("Authorization", "Zoho-oauthtoken " + sToken);
    oAjax.send(JSON.stringify({ data: [oRegistro] }));
    return JSON.parse(oAjax.responseText);
}

function ZohoActualizaVehiculo(id, oRegistro) {
    var sToken = ZohoRefreshToken();
    var oAjax = new XMLHttpRequest();
    oAjax.open("PUT", oServices_Zoho.Vehiculo(id), false);
    oAjax.setRequestHeader("Content-Type", "application/json");
    oAjax.setRequestHeader("Authorization", "Zoho-oauthtoken " + sToken);
    oAjax.send(JSON.stringify({ data: [oRegistro] }));
    return JSON.parse(oAjax.responseText);
}

function ZohoSubeArchivo(id, oFile) {
    var sToken = ZohoRefreshToken();
    var oAjax = new XMLHttpRequest();
    oAjax.open("POST", oServices_Zoho.Attach(id), false);
    oAjax.setRequestHeader("Authorization", "Zoho-oauthtoken " + sToken);
    var oForm = new FormData();
    oForm.append("file", oFile);
    oAjax.send(oForm);
    return JSON.parse(oAjax.responseText);
}

