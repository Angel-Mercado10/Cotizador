
function Valida_CP(oCaja) {
    if (oCaja.value != "") {
        Transacciona_CS(oServices_CS.Valida_CP.Metodo, oServices_CS.Valida_CP.Pagina + oCaja.value, {}, Pinta_Valida_CP, Pinta_Valida_CP);
    };
};

function Pinta_Valida_CP(oRes_CP) {
    if (oRes_CP.idedo) {
        document.getElementById("txtCPostal").className = "Caja_1 Caja_Correcto";
    } else {
        document.getElementById("txtCPostal").className = "Caja_1 Caja_Error";
        document.getElementById("txtCPostal").setAttribute("placeholder", document.getElementById("txtCPostal").value);
        document.getElementById("txtCPostal").value = "";
    };
    document.getElementById("loader").style.display = "none";
};

function Selecciona_Sexo(sSexo) {
    if (sSexo == "Masculino") {
        document.getElementById("txtSexo").value = sSexo;
        document.getElementById("Div_Boton_Masculino").className = "Boton_2_L Boton_Activo";
        document.getElementById("Div_Boton_Femenino").className = "Boton_2_R";
    };
    if (sSexo == "Femenino") {
        document.getElementById("txtSexo").value = sSexo;
        document.getElementById("Div_Boton_Femenino").className = "Boton_2_R Boton_Activo";
        document.getElementById("Div_Boton_Masculino").className = "Boton_2_L";
    };
};

function Pinta_ATC(oCheck) {
    if (oCheck.checked) {
        document.getElementById("txtATC").value = "Acepto";
    } else {
        document.getElementById("txtATC").value = "";
    };
};

function Valida_Paso2() {
    if (Procesa_Info("Div_Paso2", "Caja_1")) {
        document.getElementById("Btn_Continuar_P2").className = "Boton_1 Boton_Activo";
        document.getElementById("Btn_Continuar_P2").setAttribute("onclick", "Carga_Paso3();");
    } else {
        document.getElementById("Btn_Continuar_P2").className = "Boton_1";
        document.getElementById("Btn_Continuar_P2").setAttribute("onclick", "");
    }
}

function Carga_Paso3() {
    document.getElementById("loader").style.display = "block";

    oDatos_Grl.Paso1.Modelo = 2012;
    oDatos_Grl.Paso1.Marca = "JEEP";
    oDatos_Grl.Paso1.Version = "GRAND CHEROKEE";
    oDatos_Grl.Paso1.Transmision = "AUT";
    oDatos_Grl.Paso1.Descripcion = "LIMITED PREMIUM 57L 4X2 AUT";
    oDatos_Grl.Paso1.ClaveClick = "AUTRESJEEPGRANOKEE-09142";
    oDatos_Grl.Paso1.Celular = "5560337463";

    oDatos_Grl.Paso2.Nombre = document.getElementById("txtNombre").value;
    oDatos_Grl.Paso2.Apellido = document.getElementById("txtApellido").value;
    oDatos_Grl.Paso2.FNacimiento = "05/10/1984" //document.getElementById("txtFNacimiento").value;
    oDatos_Grl.Paso2.Correo = document.getElementById("txtCorreo").value;
    oDatos_Grl.Paso2.CP = "55710" //document.getElementById("txtCPostal").value;
    oDatos_Grl.Paso2.Sexo = "Masculino" //document.getElementById("txtSexo").value;
    oDatos_Grl.Paso2.ATC = document.getElementById("txtATC").value;

    setTimeout(function () { Ejecuta_Contenido("Cotizador/Paso3.html", "n=" + Math.random(), Pinta_Paso3) }, 1000); 
};

function Pinta_Paso3(sRespuesta) {
    document.getElementById('BasePasos').innerHTML = sRespuesta;
    document.getElementById("lblMarca").innerHTML = oDatos_Grl.Paso1.Marca;
    document.getElementById("lblModelo").innerHTML = oDatos_Grl.Paso1.Modelo;
    Trae_Datos_Cotizacion();
    Trae_Cotizacion_Amplia()
};

function Trae_Cotizacion_Amplia() {
    document.getElementById("loader").style.display = "block";
    document.getElementById("txtPlan").value = "Amplia";
    document.getElementById("Btn_Amp").className = "Boton_3 Boton_Activo";
    document.getElementById("Btn_Lim").className = "Boton_3";
    document.getElementById("Btn_Rc").className = "Boton_3";
    document.getElementById("Div_Cards").innerHTML = "";
    document.getElementById("Total_Opciones").innerHTML = 0;
    Trae_Cobertura_Amplia();
    setTimeout(Carga_Cotizacion, 500); 
};

function Trae_Cotizacion_Limitda() {
    document.getElementById("loader").style.display = "block";
    document.getElementById("txtPlan").value = "Limitada";
    document.getElementById("Btn_Amp").className = "Boton_3";
    document.getElementById("Btn_Lim").className = "Boton_3 Boton_Activo";
    document.getElementById("Btn_Rc").className = "Boton_3";
    document.getElementById("Div_Cards").innerHTML = "";
    document.getElementById("Total_Opciones").innerHTML = 0;
    Trae_Cobertura_Limitada();
    setTimeout(Carga_Cotizacion, 500);
};

function Trae_Cotizacion_Rc() {
    document.getElementById("loader").style.display = "block";
    document.getElementById("txtPlan").value = "Responsabilidad Civil";
    document.getElementById("Btn_Amp").className = "Boton_3";
    document.getElementById("Btn_Lim").className = "Boton_3";
    document.getElementById("Btn_Rc").className = "Boton_3 Boton_Activo";
    document.getElementById("Div_Cards").innerHTML = "";
    document.getElementById("Total_Opciones").innerHTML = 0;
    Trae_Cobertura_Rc();
    setTimeout(Carga_Cotizacion, 500);
};

function Carga_Cotizacion() {
    Transacciona_CS(oServices_CS.Qualitas_Cotizacion.Metodo, oServices_CS.Qualitas_Cotizacion.Pagina, oDatos_Cotizacion, Pinta_Cotizacion, Pinta_Error)
    Transacciona_CS(oServices_CS.Banorte_Cotizacion.Metodo, oServices_CS.Banorte_Cotizacion.Pagina, oDatos_Cotizacion, Pinta_Cotizacion, Pinta_Error)
    Transacciona_CS(oServices_CS.Chubb_Cotizacion.Metodo, oServices_CS.Chubb_Cotizacion.Pagina, oDatos_Cotizacion, Pinta_Cotizacion, Pinta_Error)
    Transacciona_CS(oServices_CS.Mapfre_Cotizacion.Metodo, oServices_CS.Mapfre_Cotizacion.Pagina, oDatos_Cotizacion, Pinta_Cotizacion, Pinta_Error)
};

function Trae_Datos_Cotizacion() {
    oDatos_Cotizacion.tipoVehiculo = 1;
    oDatos_Cotizacion.tipoPersona = 0;
    oDatos_Cotizacion.sexo = oDatos_Grl.Paso2.Sexo;
    oDatos_Cotizacion.edad = 0;
    oDatos_Cotizacion.fechaNacimiento = oDatos_Grl.Paso2.FNacimiento;
    oDatos_Cotizacion.cp = oDatos_Grl.Paso2.CP;
    oDatos_Cotizacion.modelo = oDatos_Grl.Paso1.Modelo;
    oDatos_Cotizacion.marca = oDatos_Grl.Paso1.Marca;
    oDatos_Cotizacion.version = oDatos_Grl.Paso1.Version;
    oDatos_Cotizacion.transmision = oDatos_Grl.Paso1.Transmision;
    oDatos_Cotizacion.claveClick = oDatos_Grl.Paso1.ClaveClick;
    oDatos_Cotizacion.descripcion = oDatos_Grl.Paso1.Descripcion;
    oDatos_Cotizacion.tipoSuma = 1;
    oDatos_Cotizacion.formaPago = 1;
};

function Trae_Cobertura_Amplia() {
    oDatos_Cotizacion.tipoCobertura = 1;
    oDatos_Cotizacion.aac = 100000;
    oDatos_Cotizacion.av = true;
    oDatos_Cotizacion.ded_DM = 5;
    oDatos_Cotizacion.ded_RT = 10;
    oDatos_Cotizacion.gl = true;
    oDatos_Cotizacion.gmo = 300000;
    oDatos_Cotizacion.rcdt = 1000000;
    oDatos_Cotizacion.parking = 0
};

function Trae_Cobertura_Limitada() {
    oDatos_Cotizacion.tipoCobertura = 2;
    oDatos_Cotizacion.aac = 0;
    oDatos_Cotizacion.av = true;
    oDatos_Cotizacion.ded_DM = 0;
    oDatos_Cotizacion.ded_RT = 10;
    oDatos_Cotizacion.gl = true;
    oDatos_Cotizacion.gmo = 300000;
    oDatos_Cotizacion.rcdt = 1000000;
    oDatos_Cotizacion.parking = 0
};

function Trae_Cobertura_Rc() {
    oDatos_Cotizacion.tipoCobertura = 3;
    oDatos_Cotizacion.aac = 0;
    oDatos_Cotizacion.av = false;
    oDatos_Cotizacion.ded_DM = 0;
    oDatos_Cotizacion.ded_RT = 0;
    oDatos_Cotizacion.gl = true;
    oDatos_Cotizacion.gmo = 0;
    oDatos_Cotizacion.rcdt = 1000000;
    oDatos_Cotizacion.parking = 0
};


function Pinta_Cotizacion(oCotizacion) {
    if (!oCotizacion || !oCotizacion.cia) {
        console.error("Respuesta de cotización inválida:", oCotizacion);
        return; 
    }

   
    oCotizaciones[oCotizacion.cia.toUpperCase()] = oCotizacion;

    var sRecomendacion = "Recomendada";
    if (oCotizacion.cia.toUpperCase() == "QUALITAS") { sRecomendacion = "Mayor descuento"; };
    if (oCotizacion.cia.toUpperCase() == "CHUBB") { sRecomendacion = "En oferta"; };
    if (oCotizacion.cia.toUpperCase() == "HDI") { sRecomendacion = "Sugerido"; };

    var sHtml = Ejecuta_Contenido_Sinc("Cotizador/Card_Cotizacion.html", "n=" + Math.random());
    sHtml = sHtml.replace(/{PTotal}/gi, new Intl.NumberFormat().format(parseFloat(oCotizacion.primas.primaTotal).toFixed(2)));
    sHtml = sHtml.replace(/{Cia}/gi, oCotizacion.cia);
    sHtml = sHtml.replace(/{Folio}/gi, oCotizacion.folioCotizacion);
    sHtml = sHtml.replace(/{Recomendacion}/gi, sRecomendacion);
    sHtml = sHtml.replace(/{Cobertura1}/gi, oCotizacion.coberturas[0].descripcion);
    sHtml = sHtml.replace(/{Cobertura2}/gi, oCotizacion.coberturas[1].descripcion);
    sHtml = sHtml.replace(/{Cobertura3}/gi, oCotizacion.coberturas[2].descripcion);

    var oCard = document.createElement("div");
    oCard.innerHTML = sHtml;
    document.getElementById("Div_Cards").appendChild(oCard);
    document.getElementById("Total_Opciones").innerHTML = parseInt(document.getElementById("Total_Opciones").innerHTML) + 1;
    document.getElementById("loader").style.display = "none";
};


function Cargar_Detalle(sCia) {
    var oCotizacion = oCotizaciones[sCia.toUpperCase()];
    if (!oCotizacion) return;

    document.getElementById("lblTPop").innerHTML = "Detalle";
    document.getElementById("mdlDC").style.display = "flex"; 

    var sHtml = "";
    for (var i = 0; i < oCotizacion.coberturas.length; i++) {
        var oCob = oCotizacion.coberturas[i];
        sHtml += "<div class='fila-datos'>";
        sHtml += "<div>" + oCob.descripcion + "</div>";
        sHtml += "<div>" + new Intl.NumberFormat().format(oCob.sumaAsegurada) + "</div>";
        sHtml += "<div>" + (oCob.deducible ? oCob.deducible + '%' : 'N/A') + "</div>";
        sHtml += "</div>";
    }

    document.getElementById("Div_CPop").innerHTML = `
        <div class="fila-encabezado">
            <div>Cobertura</div>
            <div>Suma Asegurada</div>
            <div>Deducible</div>
        </div>
        ${sHtml}
    `;
}


function Carga_Paso4(sCia, sPTotal, sFolio) {
    oDatos_Grl.Paso3.Cia = sCia;
    oDatos_Grl.Paso3.Plan = document.getElementById("txtPlan").value;
    oDatos_Grl.Paso3.PTotal = sPTotal;
    oDatos_Grl.Paso3.Folio = sFolio;
    oDatos_Grl.Paso3.oCotizacion = oCotizaciones[sCia.toUpperCase()];

    Ejecuta_Contenido("Cotizador/Paso4.html", "n=" + Math.random(), Pinta_Paso4);
};




document.addEventListener("change", function (e) {
    if (e.target.classList.contains("chkComparar")) {
        var cia = e.target.getAttribute("data-cia");
        if (e.target.checked) {
            if (!aseguradorasSeleccionadas.includes(cia)) {
                aseguradorasSeleccionadas.push(cia);
            }
        } else {
            aseguradorasSeleccionadas = aseguradorasSeleccionadas.filter(function (c) { return c !== cia });
        }
        var contenedor = document.getElementById("btnCompararContainer");
        if (contenedor) {
            contenedor.style.display = aseguradorasSeleccionadas.length >= 2 ? "block" : "none";
        }
    }
});


function CerrarModalComparar() {
    document.getElementById("mdlComparar").style.display = 'none';
}


function AbrirModalComparar() {
    var contenedorTabla = document.getElementById("tablaComparacionContainer");
    contenedorTabla.innerHTML = ""; 

    if (aseguradorasSeleccionadas.length < 2) {
        alert("Selecciona al menos 2 aseguradoras para comparar.");
        return;
    }

 
    var coberturasAComparar = [
        "DAÑOS MATERIALES", "ROBO TOTAL", "RESPONSABILIDAD CIVIL DAÑOS A TERCEROS",
        "GASTOS MÉDICOS OCUPANTES", "ASISTENCIA JURÍDICA", "ASISTENCIA VEHICULAR"
    ];

    var htmlFinal = "";


    var filaLogosHTML = '<div class="fila-comparador"><div class="celda-titulo"></div>';
    for (var i = 0; i < aseguradorasSeleccionadas.length; i++) {
        var ciaNombre = aseguradorasSeleccionadas[i];
        filaLogosHTML += `<div class="celda-header"><img src="https://mx.clickseguros.lat/Imagenes/ClickSeguros/Aseguradoras/Color/${ciaNombre}_cot.png" alt="${ciaNombre}"/></div>`;
    }
    filaLogosHTML += '</div>';
    htmlFinal += filaLogosHTML;


    var filaPreciosHTML = '<div class="fila-comparador"><div class="celda-titulo">Precio Anual</div>';
    for (var i = 0; i < aseguradorasSeleccionadas.length; i++) {
        var ciaNombre = aseguradorasSeleccionadas[i];
        var cotizacion = oCotizaciones[ciaNombre.toUpperCase()];
        var precio = new Intl.NumberFormat().format(parseFloat(cotizacion.primas.primaTotal).toFixed(2));
        filaPreciosHTML += `<div class="celda-precio">$ ${precio}</div>`;
    }
    filaPreciosHTML += '</div>';
    htmlFinal += filaPreciosHTML;

    
    for (var i = 0; i < coberturasAComparar.length; i++) {
        var nombreCobertura = coberturasAComparar[i];
        var filaCoberturaHTML = `<div class="fila-comparador"><div class="celda-titulo">${nombreCobertura}</div>`;

      
        for (var j = 0; j < aseguradorasSeleccionadas.length; j++) {
            var ciaNombre = aseguradorasSeleccionadas[j];
            var cotizacion = oCotizaciones[ciaNombre.toUpperCase()];
            var valorEncontrado = "No Incluido"; 

           
            for (var k = 0; k < cotizacion.coberturas.length; k++) {
                if (cotizacion.coberturas[k].descripcion.toUpperCase() === nombreCobertura.toUpperCase()) {
                    valorEncontrado = new Intl.NumberFormat().format(cotizacion.coberturas[k].sumaAsegurada);
                    break; 
                }
            }
            filaCoberturaHTML += `<div class="celda-dato">${valorEncontrado}</div>`;
        }
        filaCoberturaHTML += '</div>';
        htmlFinal += filaCoberturaHTML;
    }

 
    contenedorTabla.innerHTML = htmlFinal;
    document.getElementById("mdlComparar").style.display = 'flex';
}




function Pinta_Paso4(sRespuesta) {
    document.getElementById("BasePasos").innerHTML = sRespuesta;
    document.getElementById("lblPlan").innerHTML = oDatos_Grl.Paso3.Plan;
    document.getElementById("lblPCob1").innerHTML = oDatos_Grl.Paso3.oCotizacion.coberturas[0].descripcion;
    document.getElementById("lblPCob2").innerHTML = oDatos_Grl.Paso3.oCotizacion.coberturas[1].descripcion;
    document.getElementById("lblPCob3").innerHTML = oDatos_Grl.Paso3.oCotizacion.coberturas[2].descripcion;
    document.getElementById("lblPT1").innerHTML = oDatos_Grl.Paso3.PTotal;
    document.getElementById("lblPT2").innerHTML = oDatos_Grl.Paso3.PTotal;

    document.getElementById("lblDPersonales").innerHTML = oDatos_Grl.Paso2.Nombre + " " + oDatos_Grl.Paso2.Apellido;
    document.getElementById("lblDcontacto").innerHTML = oDatos_Grl.Paso1.Celular + " " + oDatos_Grl.Paso2.Correo;
    document.getElementById("lblDVehiculos").innerHTML = `${oDatos_Grl.Paso1.Modelo} ${oDatos_Grl.Paso1.Marca} ${oDatos_Grl.Paso1.Version} ${oDatos_Grl.Paso1.Transmision} ${oDatos_Grl.Paso1.Descripcion}`;
};

function Selecciona_MPago(sMPago) {
    document.getElementById("txtMPago").value = sMPago;
    if (sMPago == "Tarjeta de crédito") {
        document.getElementById("Div_Btn_TC").className = "Boton_4 Boton_Activo";
        document.getElementById("Div_Btn_TD").className = "Boton_4";
        document.getElementById("Div_Btn_TB").className = "Boton_4";
    };
    if (sMPago == "Tarjeta débito") {
        document.getElementById("Div_Btn_TC").className = "Boton_4";
        document.getElementById("Div_Btn_TD").className = "Boton_4 Boton_Activo";
        document.getElementById("Div_Btn_TB").className = "Boton_4";
    };
    if (sMPago == "Transferencia bancaria") {
        document.getElementById("Div_Btn_TC").className = "Boton_4";
        document.getElementById("Div_Btn_TD").className = "Boton_4";
        document.getElementById("Div_Btn_TB").className = "Boton_4 Boton_Activo";
    };
};

function Carga_Comprobante() {
    var oFiles = document.getElementById("flComprobante").files;
    if (oFiles.length > 0) {
        var oFile = oFiles[0];
        if (oFile.size < 8000000) {
            document.getElementById("txtComprobante").value = oFile.name;
            document.getElementById("lblFlComprobante").className = "Boton_1 Boton_Activo";
        } else {
            alert("El archivo es demasiado grande.");
            document.getElementById("txtComprobante").value = "";
            document.getElementById("lblFlComprobante").className = "Boton_1";
        };
    };
};

function Carga_Identificacion() {
    var oFiles = document.getElementById("flIdentificacion").files;
    if (oFiles.length > 0) {
        var oFile = oFiles[0];
        if (oFile.size < 8000000) {
            document.getElementById("txtIdentificacion").value = oFile.name;
            document.getElementById("lblFlIdentificacion").className = "Boton_1 Boton_Activo";
        } else {
            alert("El archivo es demasiado grande.");
            document.getElementById("txtIdentificacion").value = "";
            document.getElementById("lblFlIdentificacion").className = "Boton_1";
        };
    };
};

function Valida_Paso4() {
    if (Procesa_Info("Div_Paso4", "Caja_1")) {
        document.getElementById("Btn_Continuar_P4").className = "Boton_1 Boton_Activo";
        document.getElementById("Btn_Continuar_P4").setAttribute("onclick", "Carga_Paso5();");
    } else {
        document.getElementById("Btn_Continuar_P4").className = "Boton_1";
        document.getElementById("Btn_Continuar_P4").setAttribute("onclick", "");
    }
}

function Carga_Paso5() {
    oDatos_Grl.Paso4.MPago = document.getElementById("txtMPago").value;
    oDatos_Grl.Paso4.Comprobante = document.getElementById("flComprobante").files[0];
    oDatos_Grl.Paso4.Identificacion = document.getElementById("flIdentificacion").files[0];

    Ejecuta_Contenido("Cotizador/Paso5.html", "n=" + Math.random(), Pinta_Paso5);
};

function Pinta_Paso5(sRespuesta) {
    document.getElementById("BasePasos").innerHTML = sRespuesta;
};

function Valida_Paso5() {
    if (Procesa_Info("Div_Paso5", "Caja_1")) {
        document.getElementById("Btn_Continuar_P5").className = "Boton_1 Boton_Activo";
        document.getElementById("Btn_Continuar_P5").setAttribute("onclick", "Carga_Paso6();");
    } else {
        document.getElementById("Btn_Continuar_P5").className = "Boton_1";
        document.getElementById("Btn_Continuar_P5").setAttribute("onclick", "");
    }
};

function Carga_TCirculacion() {
    var oFiles = document.getElementById("flTCirculacion").files;
    if (oFiles.length > 0) {
        var oFile = oFiles[0];
        if (oFile.size < 8000000) {
            document.getElementById("txtTCirculacion").value = oFile.name;
            document.getElementById("lblFlTCirculacion").className = "Boton_1 Boton_Activo";
        } else {
            alert("El archivo es demasiado grande.");
            document.getElementById("txtTCirculacion").value = "";
            document.getElementById("lblFlTCirculacion").className = "Boton_1";
        };
    };
};

function Carga_Paso6() {
    oDatos_Grl.Paso5.Motor = document.getElementById("txtMotor").value;
    oDatos_Grl.Paso5.Serie = document.getElementById("txtSerie").value;
    oDatos_Grl.Paso5.TCirculacion = document.getElementById("flTCirculacion").files[0];
    oDatos_Grl.Paso5.Estado = document.getElementById("txtEstado").value;
    oDatos_Grl.Paso5.Municipio = document.getElementById("txtMunicipio").value;
    oDatos_Grl.Paso5.Colonia = document.getElementById("cmbColonia").value;
    oDatos_Grl.Paso5.Calle = document.getElementById("txtCalle").value;
    oDatos_Grl.Paso5.Numero = document.getElementById("txtNumero").value;

    Ejecuta_Contenido("Cotizador/Paso6.html", "n=" + Math.random(), Pinta_Paso6);
};

function Pinta_Paso6(sRespuesta) {
    document.getElementById("BasePasos").innerHTML = sRespuesta;
    document.getElementById("lblCob1").innerHTML = oDatos_Grl.Paso3.oCotizacion.coberturas[0].descripcion;
    document.getElementById("lblCob2").innerHTML = oDatos_Grl.Paso3.oCotizacion.coberturas[1].descripcion;
    document.getElementById("lblCob3").innerHTML = oDatos_Grl.Paso3.oCotizacion.coberturas[2].descripcion;
};

function GeneraLigaCotizador() {
    var base = "https://cotizar.asegurateya.com/";
    var params = [];
    params.push("email=" + encodeURIComponent(oDatos_Grl.Paso2.Correo));
    params.push("telefono=" + encodeURIComponent(oDatos_Grl.Paso1.Celular));
    params.push("year=" + oDatos_Grl.Paso1.Modelo);
    params.push("make=" + encodeURIComponent(oDatos_Grl.Paso1.Marca));
    params.push("version=" + encodeURIComponent(oDatos_Grl.Paso1.Version));
    params.push("transmission=" + encodeURIComponent(oDatos_Grl.Paso1.Transmision));
    params.push("description=" + encodeURIComponent(oDatos_Grl.Paso1.Descripcion));
    params.push("clave=" + encodeURIComponent(oDatos_Grl.Paso1.ClaveClick));
    return base + "?" + params.join("&");
}
