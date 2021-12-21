class AccesoStruct {
    linea;
    columna;
    identificador;
    hijos;
    ast_name;
    ast_id;

    constructor(identificador, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.ast_id = 0
        this.ast_name = 'AccessStruct'
        for(let id of identificador){
            this.hijos.push({ast_name: id, ast_id: 0, hijos: []})
            this.hijos.push({ast_name: '.', ast_id: 0, hijos: []})
        }
    }
    
    traducir(ent, arbol) {
    }

    getTipo(ent, arbol) {
        const valor = this.getValorImplicito(ent, arbol);
        if (typeof(valor) === 'boolean')
        {
            return 'BOOL';
        }
        else if (typeof(valor) === 'string')
        {
            return 'STRING';
        }
        else if (typeof(valor) === 'number')
        {
            if(this.isInt(Number(valor))){
                return 'INT';
            }
           return 'DOUBLE';
        }
        else if (typeof(valor) === 'object')
        {
            return 'ARRAY';
        }
        else if(valor === null){
            return 'NULL';
        }
            
        return 'VOID';
    }

    getValorImplicito(ent, arbol) {
        var ent_val = ent
            for( let id of this.identificador){
                if (ent_val.existe(id)) {
                    var simbolo = ent_val.getSimbolo(id)
                    //si el valor es un entorno
                    if ( Entorno.prototype.isPrototypeOf(simbolo.valor)     ){
                        ent_val = simbolo.valor
                    }
                    else{
                        return simbolo.valor
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
        return null
    }

    isInt(n){
        return Number(n) === n && n % 1 === 0;
    }
    
}