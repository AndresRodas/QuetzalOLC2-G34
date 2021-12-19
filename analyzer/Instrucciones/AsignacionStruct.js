class AsignacionStruct{
    linea;
    columna;
    identificador;
    expresion;
                
    constructor(identificador, expresion, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.expresion = expresion;
        
    }

    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent, arbol) {
        var ent_val = ent
        for( let id of this.identificador){
            if (ent_val.existe(id)) {
                var simbolo = ent_val.getSimbolo(id)
                //si el valor es un entorno
                if ( Entorno.prototype.isPrototypeOf(simbolo.valor)     ){
                    ent_val = simbolo.valor
                }
                else{
                    var new_valor = this.expresion.getValorImplicito(ent, arbol)
                    simbolo.valor = new_valor
                    ent.reemplazar(id, simbolo)
                }
            }
            else{
                arbol.setError({
                    err: 'La variable '+id+' no existe en el Struct actual',
                    type: 'Semántico',
                    amb: ent.identificador,
                    line: this.linea,
                    col: this.columna
                    })
            }
        }
    }
}