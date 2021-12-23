class AsignacionStruct{
    linea;
    columna;
    identificador;
    expresion;

    hijos;
    ast_name;
    ast_id;
                
    constructor(identificador, expresion, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.expresion = expresion;
        this.ast_id = 0
        this.ast_name = 'AsigStruct'
        this.hijos = []
        for(let id of identificador){
            this.hijos.push({ast_name: id, ast_id: 0, hijos: []})
        }
        this.hijos.push(expresion)
    }

    traducir(ent, arbol) {

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
        this.traducir(ent, arbol)
    }
}