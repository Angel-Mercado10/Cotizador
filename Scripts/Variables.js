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

var oZohoVehiculo = {
    Numero_Motor: null,
    Tipo_de_Venta: "Venta Nueva",
    Transmision: null,
    Numero: null,
    Email: "",
    Aseguradora: null,
    Codigo_Postal: 8100,
    Paso: "1",
    Prima_Total: 9800,
    UTM_Term: null,
    Impuesto: 0,
    Name: "",
    Version: null,
    Apellido: null,
    Serie: null,
    Tipo_Vehiculo: "Autos",
    Anio: "2024",
    Fecha_Nacimiento: null,
    UTM_Content: null,
    Modelo: null,
    UTM_Medium: null,
    CotizacionDescargada: null,
    Colonia: null,
    UTM_Campaign: null,
    Cilindrada: null,
    Estado: null,
    JsonComparador: null,
    Genero: "Masculino",
    Prima_Neta: 0,
    Derecho: 0,
    Lista_de_seleccion_1: "Contactar",
    JsonCotizacion: null,
    Forma_de_Pago: null,
    Municipio: null,
    Documento_Identificacion: null,
    Segmento: "Baja",
    Marca: "Bajaj",
    Cobertura: null,
    Calle: null,
    Placa: "placa",
    UTM_Source: null
};

var oZohoUpdate = {
    Lista_de_seleccion_1: "Cotizado"
};
