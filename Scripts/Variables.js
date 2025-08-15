var oDatos_Grl = {
    Paso1: {
        Modelo: 0
        , Marca: ""
        , Version: ""
        , Transmision: ""
        , Descripcion: ""
        , ClaveClick:""
        , Celular: ""
    }
    , Paso2: {
        Nombre: ""
        , Apellido: ""
        , FNacimiento: ""
        , Correo: ""
        , CP: ""
        , Sexo: ""
        , ATC: ""
    }
    , Paso3: {
        Cia: ""
        , Plan: ""
        , PTotal: ""
        , Folio: ""
        , oCotizacion: {}
    }
    , Paso4: {
        Comprobante: null
        , Identificacion: null
        , MPago: ""
    }
    , Paso5: {
        Motor: ""
        , Serie: ""
        , TCirculacion: null
        , Estado: ""
        , Municipio: ""
        , Colinia: ""
        , Calle: ""
        , Numero: ""
    }
};

var oDatos_Cotizacion = {
    tipoVehiculo: 1,
    tipoPersona: 0,
    sexo: 0,
    edad: 0,
    fechaNacimiento: "",
    cp: "00000",
    modelo: 0,
    marca: "",
    version: "",
    transmision: "",
    claveClick: "",
    descripcion: "",
    tipoSuma: 1,
    //"valorFactura": 0,
    formaPago: 1,
    ////"fechaFactura": "1900-01-01",
    tipoCobertura: 1,
    //"aac": 100000,
    ////"aAg": false,
    ////"asa": false,
    ////"aSu": false,
    //"av": true,
    ////"cade": false,
    //"ded_DM": 5,
    //"ded_RT": 10,
    ////"dpc": false,
    ////"tipoCarga": 0,
    ////"drc": 0,
    ////"eDedPTD": false,
    ////"eDedPTR": false,
    ////"eEs": 0,
    ////"erc": false,
    //"gl": true,
    //"gmo": 300000,
    //"rcb": 3000000,
    ////"rccp": 0,
    ////"rcdt": 0,
    ////"rcef": 0,
    ////"rcExtranjero": false,
    ////"rcr": false,
    ////"rcsr": false,
    ////"rLl": false,
    ////"pdr": false,
    ////"rPa": 0,
    parking: 0
};

var oCotizaciones = {};
var aseguradorasSeleccionadas = [];