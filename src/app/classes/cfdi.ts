export class Ingreso implements CFDIIngreso {
    public Impuestos: Impuesto[];
    public Emisor: Emisor;
    public Receptor: Receptor;
    public Conceptos: Concepto[];
    public _Certificado: string;
    public _Fecha: Date;
    public _Folio: string;
    public _LugarExpedicion: string;
    public _Moneda: string;
    public _NoCertificado: string;
    public _Sello: string;
    public _Serie: string;
    public _SubTotal: number;
    public _TipoDeComprobante: "I" | "E" | "T" | "P" | "N";
    public _Total: number;
    public _Version: string;
    public _FormaPago: string | undefined;
    public _MetodoPago: string | undefined;

    constructor(originalcfdiData: any){
        const cfdiData = toIngreso(originalcfdiData);

        this.Conceptos = cfdiData.Conceptos;
        this.Emisor = getEmisor(cfdiData.Emisor);
        this.Impuestos = cfdiData.Impuestos;
       // this.Impuestos[0]._TotalImpuestosTrasladados = (cfdiData.Impuestos[0]._TotalImpuestosTrasladados != null?cfdiData.Impuestos[0]._TotalImpuestosTrasladados:0.00)
        this.Receptor = getReceptor(cfdiData.Receptor);
        this._Certificado = cfdiData._Certificado;
        this._Fecha = cfdiData._Fecha;
        this._Folio = cfdiData._Folio;
        this._LugarExpedicion = cfdiData._LugarExpedicion;
        this._Moneda = cfdiData._Moneda;
        this._NoCertificado = cfdiData._NoCertificado;
        this._Sello = cfdiData._Sello;
        this._Serie = cfdiData._Serie;
        this._SubTotal = cfdiData._SubTotal;
        this._TipoDeComprobante = cfdiData._TipoDeComprobante;
        this._Total = cfdiData._Total;
        this._Version = cfdiData._Version;
        this._FormaPago = cfdiData._FormaPago;
        this._MetodoPago = cfdiData._MetodoPago;
    }

    getClassName() {
        return this.constructor.name;
    }
}

export class Egreso implements CFDIEgreso {
    public CfdiRelacionados: CfdiRelacionados;
    public Impuestos: Impuesto[];
    
    public Emisor: Emisor;
    public Receptor: Receptor;
    public Conceptos: Concepto[];
    public _Certificado: string;
    public _Fecha: Date;
    public _Folio: string;
    public _LugarExpedicion: string;
    public _Moneda: string;
    public _NoCertificado: string;
    public _Sello: string;
    public _Serie: string;
    public _SubTotal: number;
    public _TipoDeComprobante: "I" | "E" | "T" | "P" | "N";
    public _Total: number;
    public _Version: string;
    public _FormaPago: string | undefined;
    public _MetodoPago: string | undefined;

    constructor(originalcfdiData: any){
        const cfdiData = toEgreso(originalcfdiData);

        this.CfdiRelacionados = cfdiData.CfdiRelacionados;
        this.Conceptos = cfdiData.Conceptos;
        this.Emisor = getEmisor(cfdiData.Emisor);
        this.Impuestos = cfdiData.Impuestos;
        //this.Impuestos[0]._TotalImpuestosTrasladados = (cfdiData.Impuestos[0]._TotalImpuestosTrasladados != null?cfdiData.Impuestos[0]._TotalImpuestosTrasladados:0.00)
        this.Receptor = getReceptor(cfdiData.Receptor);
        this._Certificado = cfdiData._Certificado;
        this._Fecha = cfdiData._Fecha;
        this._Folio = cfdiData._Folio;
        this._LugarExpedicion = cfdiData._LugarExpedicion;
        this._Moneda = cfdiData._Moneda;
        this._NoCertificado = cfdiData._NoCertificado;
        this._Sello = cfdiData._Sello;
        this._Serie = cfdiData._Serie;
        this._SubTotal = - cfdiData._SubTotal;
        this._TipoDeComprobante = cfdiData._TipoDeComprobante;
        this._Total = - cfdiData._Total;
        this._Version = cfdiData._Version;
        this._FormaPago = cfdiData._FormaPago;
        this._MetodoPago = cfdiData._MetodoPago
    }

    getClassName() {
        return this.constructor.name;
    }
}

export class Traslado implements CFDITraslado {
    public Complemento: Complemento;
    public Emisor: Emisor;
    public Receptor: Receptor;
    public Conceptos: Concepto[];
    public _Certificado: string;
    public _Fecha: Date;
    public _Folio: string;
    public _LugarExpedicion: string;
    public _Moneda: string;
    public _NoCertificado: string;
    public _Sello: string;
    public _Serie: string;
    public _SubTotal: number;
    public _TipoDeComprobante: "I" | "E" | "T" | "P" | "N";
    public _Total: number;
    public _Version: string;
    public _FormaPago: string | undefined;
    public _MetodoPago: string | undefined;

    constructor(originalcfdiData: any){
        const cfdiData = toTraslado(originalcfdiData);

        this.Complemento = {
            TimbreFiscalDigital: {
                _FechaTimbrado: cfdiData.Complemento.TimbreFiscalDigital._FechaTimbrado,
                _NoCertificadoSAT: cfdiData.Complemento.TimbreFiscalDigital._NoCertificadoSAT,
                _RfcProvCertif: cfdiData.Complemento.TimbreFiscalDigital._RfcProvCertif,
                _SelloCFD: cfdiData.Complemento.TimbreFiscalDigital._SelloCFD,
                _SelloSAT: cfdiData.Complemento.TimbreFiscalDigital._SelloSAT,
                _UUID: cfdiData.Complemento.TimbreFiscalDigital._UUID,
            }
        };
        
        this.Conceptos = cfdiData.Conceptos;
        this.Emisor = getEmisor(cfdiData.Emisor);
        this.Receptor = getReceptor(cfdiData.Receptor);
        this._Certificado = cfdiData._Certificado;
        this._Fecha = cfdiData._Fecha;
        this._Folio = cfdiData._Folio;
        this._LugarExpedicion = cfdiData._LugarExpedicion;
        this._Moneda = cfdiData._Moneda;
        this._NoCertificado = cfdiData._NoCertificado;
        this._Sello = cfdiData._Sello;
        this._Serie = cfdiData._Serie;
        this._SubTotal = cfdiData._SubTotal;
        this._TipoDeComprobante = cfdiData._TipoDeComprobante;
        this._Total = cfdiData._Total;
        this._Version = cfdiData._Version;
        this._FormaPago = cfdiData._FormaPago;
        this._MetodoPago = cfdiData._MetodoPago;
    }

    getClassName() {
        return this.constructor.name;
    }
}

interface CFDIIngreso extends CFDI{
    Impuestos: Impuesto[],
}

interface CFDIEgreso extends CFDI {
    CfdiRelacionados: CfdiRelacionados,
    Impuestos: Impuesto[],
}

interface CFDITraslado extends CFDI {
    Complemento: Complemento,
}

interface CFDI {
    Emisor: Emisor,
    Receptor: Receptor,
    Conceptos: Concepto[],

    _Certificado: string,
    _FormaPago: string | undefined,
    _MetodoPago: string | undefined,
    _Fecha: Date,
    _Folio: string,
    _LugarExpedicion: string,
    _Moneda: string,
    _NoCertificado: string,
    _Sello: string,
    _Serie: string,
    _SubTotal: number
    _TipoDeComprobante: "I" | "E" | "T" | "P" | "N",
    _Total: number,
    _Version: string,
}

interface Emisor {
    _Nombre: string,
    _RegimenFiscal: string,
    _Rfc: string,
}

interface Receptor {
    _DomicilioFiscalReceptor: string,
    _Nombre: string,
    _RegimenFiscalReceptor: string,
    _Rfc: string,
    _UsoCFDI: 
        "G01" | "G02" | "G03" |
        "I01" | "I02" | "I03" | "I04" | "I05" | "I06" | "IO7" |"I08" | 
        "D01" | "D02" | "D03" | "D04" | "D05" | "D06" | "D07" | "D08" | "D09" | "D10" | 
        "P01"
}

interface Concepto {
    Impuestos: Impuesto[],
    _Cantidad: number,
    _ClaveProdServ: string,
    _ClaveUnidad: string,
    _Descripcion: string,
    _Importe: number,
    _NoIdentificacion: string,
    _ObjetoImp: string,
    _Unidad: string,
    _ValorUnitario: string,
}

interface Impuesto {
    Traslados: Translado[];
    _TotalImpuestosTrasladados?: number,
}

interface Translado {
    _Base: string,
    _Importe: string,
    _TipoFactor: string,
    _Impuesto: string,
    _TasaOCuota: string,
}

interface CfdiRelacionados {
    CfdiRelacionado: { UID : string}[];
    _TipoRelacion: string,
}

interface Complemento {
    TimbreFiscalDigital: {
        _FechaTimbrado: Date;
        _NoCertificadoSAT: string,
        _RfcProvCertif: string,
        _SelloCFD: string,
        _SelloSAT: string,
        _UUID: string,
    }
}

export class ReadableCFDI {
    Receptor: string;
    Emisor: string;
    Fecha: string;
    FormaPago: 
        'Efectivo' | 
        'Cheque nominativo' |
        'Transferencia electrónica de fondos' | 
        'Tarjeta de crédito' | 
        'Por definir' | 
        'N/A';
    MetodoPago: 
        'En una sola exhibición' | 
        'En parcialidades o diferido' | 
        'N/A';
    LugarExpedicion: string;
    Subtotal: string;
    Total: string;
    Impuestos: string;
    TipoComprobante: 'Ingreso' | 'Egreso' | 'Traslado';

    constructor(cfdiData: any){
        this.Receptor = cfdiData.Receptor.Nombre;
        this.Emisor = cfdiData.Emisor.Nombre;
        this.Fecha = this.getStringDateM(new Date(cfdiData.Fecha));

        if(cfdiData.FormaPago){
            this.FormaPago = 
                cfdiData.FormaPago == '01' ? 'Efectivo' : 
                cfdiData.FormaPago == '02' ? 'Cheque nominativo' : 
                cfdiData.FormaPago == '03' ? 'Transferencia electrónica de fondos' : 
                cfdiData.formaPago == '04' ? 'Tarjeta de crédito' : 'Por definir';
        } else {
            this.FormaPago = 'N/A';
        }

        if(cfdiData.MetodoPago){
            this.MetodoPago = cfdiData.MetodoPago == 'PUE' ? 'En una sola exhibición' : 'En parcialidades o diferido';
        } else {
            this.MetodoPago = 'N/A';
        }

        this.LugarExpedicion = cfdiData.LugarExpedicion;
        this.Subtotal = parseFloat(cfdiData.SubTotal).toFixed(2);
        this.Total = parseFloat(cfdiData.Total).toFixed(2);
        this.Impuestos = parseFloat(Math.abs(cfdiData.Total - cfdiData.SubTotal).toString()).toFixed(2);

        this.TipoComprobante = cfdiData.TipoDeComprobante == 'I' ? 'Ingreso' : 
            cfdiData.TipoDeComprobante == 'E' ? 'Egreso' : 'Traslado'; 
    }

    private getStringDateM(date: Date) : string{
        let dateFormattedM: string = date.getDay().toString().padStart(2, '0') + '/';

        switch(date.getMonth()){
          case 0: dateFormattedM += 'Enero'; break;
          case 1: dateFormattedM += 'Febrero'; break;
          case 2: dateFormattedM += 'Marzo'; break;
          case 3: dateFormattedM += 'Abril'; break;
          case 4: dateFormattedM += 'Mayo'; break;
          case 5: dateFormattedM += 'Junio'; break;
          case 6: dateFormattedM += 'Julio'; break;
          case 7: dateFormattedM += 'Agosto'; break;
          case 8: dateFormattedM += 'Septiembre'; break;
          case 9: dateFormattedM += 'Octubre'; break;
          case 10: dateFormattedM += 'Noviembre'; break;
          case 11: dateFormattedM += 'Diciembre'; break;
        }

        return dateFormattedM + '/' + date.getFullYear();
    }
}

function toIngreso(cfdiData: any): CFDIIngreso {   
    if(cfdiData.Impuestos){
        if(!cfdiData.Impuestos[0]){
            cfdiData.Impuestos = [cfdiData.Impuestos];
        }

        for(let i = 0; i < cfdiData.Impuestos.length; i++){
            if(cfdiData.Impuestos[i].Traslados){
                if(!cfdiData.Impuestos[i].Traslados[0]){
                    cfdiData.Impuestos[i].Traslados = [ cfdiData.Impuestos[i].Traslados.Traslado ]
                }
            }
        }
    }

    if(cfdiData.Conceptos){
        if(!cfdiData.Conceptos[0]){
            if(!cfdiData.Conceptos.Concepto.length){
                cfdiData.Conceptos = [ cfdiData.Conceptos.Concepto ];
            } else {
                const tmp = cfdiData.Conceptos.Concepto;
                cfdiData.Conceptos = [];
                for(let i = 0; i < tmp.length; i++){
                    cfdiData.Conceptos.push(tmp[i]);
                }
            }
        }
    }
    
    cfdiData.SubTotal = Number.parseFloat(cfdiData.SubTotal);
    cfdiData.Fecha = new Date(cfdiData.Fecha);

    return cfdiData;
}

function toEgreso(cfdiData: any): CFDIEgreso {
    if(cfdiData.Impuestos){
        if(!cfdiData.Impuestos[0]){
            cfdiData.Impuestos = [ cfdiData.Impuestos, ];
        }

        for(let i = 0; i < cfdiData.Impuestos.length; i++){
            if(cfdiData.Impuestos[i]){
                if(!cfdiData.Impuestos[i].Traslados[0]){
                    cfdiData.Impuestos[i].Traslados = [ cfdiData.Impuestos[i].Traslados.Traslado ]
                }   
            }
        }
    }
    
    if(cfdiData.Conceptos){
        if(!cfdiData.Conceptos[0]){
            if(!cfdiData.Conceptos.Concepto.length){
                cfdiData.Conceptos = [ cfdiData.Conceptos.Concepto ];
            } else {
                const tmp = cfdiData.Conceptos.Concepto;
                cfdiData.Conceptos = [];
                for(let i = 0; i < tmp.length; i++){
                    cfdiData.Conceptos.push(tmp[i]);
                }
            }
        }
    }

    if(cfdiData.CfdiRelacionados){
        if(cfdiData.CfdiRelacionados.CfdiRelacionado){
            if(!cfdiData.CfdiRelacionados.CfdiRelacionado[0]){
                cfdiData.CfdiRelacionados.CfdiRelacionado = [ cfdiData.CfdiRelacionados.CfdiRelacionado, ];
            } 
        }
    }

    cfdiData.SubTotal = Number.parseFloat(cfdiData.SubTotal);
    cfdiData.Fecha = new Date(cfdiData.Fecha);

    return cfdiData;
}

function toTraslado(cfdiData: any): CFDITraslado {
    if(cfdiData.Conceptos){
        if(!cfdiData.Conceptos[0]){
            if(!cfdiData.Conceptos.Concepto.length){
                cfdiData.Conceptos = [ cfdiData.Conceptos.Concepto ];
            } else {
                const tmp = cfdiData.Conceptos.Concepto;
                cfdiData.Conceptos = [];
                for(let i = 0; i < tmp.length; i++){
                    cfdiData.Conceptos.push(tmp[i]);
                }
            }
        }
    }

    cfdiData.Fecha = new Date(cfdiData.Fecha);
    cfdiData.SubTotal = Number.parseFloat(cfdiData.SubTotal);
    cfdiData.Complemento.TimbreFiscalDigital.FechaTimbrado = new Date(cfdiData.Complemento.TimbreFiscalDigital.FechaTimbrado);

    return cfdiData;
}


function getReceptor(cfdiData: Receptor): Receptor{
    return {
        _DomicilioFiscalReceptor: cfdiData._DomicilioFiscalReceptor,
        _Nombre: cfdiData._Nombre ? cfdiData._Nombre : 'S/R',
        _RegimenFiscalReceptor: cfdiData._RegimenFiscalReceptor,
        _Rfc: cfdiData._Rfc,
        _UsoCFDI: cfdiData._UsoCFDI,
    }
}

function getEmisor(cfdiData: Emisor): Emisor{
    return {
        _Nombre: cfdiData._Nombre ? cfdiData._Nombre : 'S/E',
        _RegimenFiscal: cfdiData._RegimenFiscal,
        _Rfc: cfdiData._Rfc,
    }
}