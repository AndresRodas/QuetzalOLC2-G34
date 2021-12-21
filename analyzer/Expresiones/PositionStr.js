class PositionStr {
    linea;
    columna;
    exp1;
    exp2;

    hijos;
    ast_name;
    ast_id;

    constructor(exp1, exp2, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.exp1 = exp1;
        this.exp2 = exp2;
        this.ast_id = 0
        this.ast_name = 'PositionStr()'
        this.hijos = [exp1, exp2]
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
        if (this.exp1.getTipo(ent, arbol) === 'STRING' && this.exp2.getTipo(ent, arbol) === 'INT'){

            var position = this.exp1.getValorImplicito(ent, arbol)[this.exp2.getValorImplicito(ent, arbol)]
            if (typeof(position) === 'undefined'){
                arbol.setError({
                    err: 'La posición de la cadena es invalida',
                    type: 'Semántico',
                    amb: ent.identificador,
                    line: this.linea,
                    col: this.columna
                  })
                return null
            }
            return position
        }
        arbol.setError({
            err: 'Tipo de dato '+this.exp1.getTipo(ent, arbol)+', '+this.exp2.getTipo(ent, arbol)+' incompatible para una posición',
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