class Parse {
    linea;
    columna;
    tipo;
    cadena;

    hijos;
    ast_name;
    ast_id;

    constructor(tipo, cadena, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.cadena = cadena;
        this.ast_id = 0
        this.ast_name = 'Parse()'
        this.hijos = [{ast_id: 0, ast_name: tipo, hijos: []}].concat(cadena)
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
        if (this.cadena.getTipo(ent, arbol) === 'STRING'){

            switch (this.tipo) {
                case 'INT':
                    return parseInt(this.cadena.getValorImplicito(ent, arbol))
                case 'DOUBLE':
                    return parseFloat(this.cadena.getValorImplicito(ent, arbol))
                case 'BOOL':
                    if (this.cadena.getValorImplicito(ent,arbol).toLowerCase() === 'true' || this.cadena.getValorImplicito(ent,arbol) === '1' )
                    {
                        return true
                    }
                    return false
                default:
                    arbol.setError({
                        err: 'Tipo de dato '+this.tipo+' incompatible para un parseo',
                        type: 'Semántico',
                        amb: ent.identificador,
                        line: this.linea,
                        col: this.columna
                      })
                    return null
                    
            }
        }
        arbol.setError({
            err: 'Tipo de dato '+this.tipo+' incompatible para un parseo',
            type: 'Semántico',
            amb: ent.identificador,
            line: this.linea,
            col: this.columna
          })
        return null
    }

    isInt(n){
        return Number(n) === n && n % 1 === 0;
    }
    
}