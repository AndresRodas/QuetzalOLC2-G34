class Log {
    linea;
    columna;
    exp;

    hijos;
    ast_name;
    ast_id;

    constructor(exp, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.exp = exp;
        this.ast_id = 0
        this.ast_name = 'Log()'
        this.hijos = [exp]
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
        if (this.exp.getTipo(ent, arbol) === 'INT' || this.exp.getTipo(ent, arbol) === 'DOUBLE'){
            return Math.log10(this.exp.getValorImplicito(ent,arbol))
        }
        arbol.setError({
            err: 'El tipo de dato '+this.exp.getTipo(ent, arbol)+' es incompatible para un logaritmo',
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