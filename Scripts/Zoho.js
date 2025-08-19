var oZohoCred = {
    client_id: "",
    client_secret: "",
    refresh_token: "",
};

/**
 * Solicita un access token usando el refresh token configurado.
 */
async function ZohoRefreshToken() {
    var sParams = new URLSearchParams();
    sParams.append("refresh_token", oZohoCred.refresh_token);
    sParams.append("client_id", oZohoCred.client_id);
    sParams.append("client_secret", oZohoCred.client_secret);
    sParams.append("grant_type", "refresh_token");

    var oResp = await fetch(oServices_Zoho.Refresh, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: sParams.toString(),
    });
    var oData = await oResp.json();
    return oData.access_token;
}

/**
 * Crea un registro en Zoho CRM usando oZohoVehiculo por default.
 */
async function ZohoCrearVehiculo(oRegistro) {
    try {
        var sToken = await ZohoRefreshToken();
        var oResp = await fetch(oServices_Zoho.Vehiculos, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Zoho-oauthtoken " + sToken,
            },
            body: JSON.stringify({ data: [oRegistro || oZohoVehiculo] }),
        });
        return await oResp.json();
    } catch (e) {
        console.error("ZohoCrearVehiculo", e);
    }
}

/**
 * Actualiza un registro existente en Zoho CRM.
 */
async function ZohoActualizaVehiculo(id, oRegistro) {
    try {
        var sToken = await ZohoRefreshToken();
        var oResp = await fetch(oServices_Zoho.Vehiculo(id), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Zoho-oauthtoken " + sToken,
            },
            body: JSON.stringify({ data: [oRegistro || oZohoUpdate] }),
        });
        return await oResp.json();
    } catch (e) {
        console.error("ZohoActualizaVehiculo", e);
    }
}

/**
 * Sube un archivo al registro indicado.
 */
async function ZohoSubeArchivo(id, oFile) {
    try {
        var sToken = await ZohoRefreshToken();
        var oForm = new FormData();
        oForm.append("file", oFile);
        var oResp = await fetch(oServices_Zoho.Attach(id), {
            method: "POST",
            headers: { "Authorization": "Zoho-oauthtoken " + sToken },
            body: oForm,
        });
        return await oResp.json();
    } catch (e) {
        console.error("ZohoSubeArchivo", e);
    }
}

