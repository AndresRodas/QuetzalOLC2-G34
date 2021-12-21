class SubStr {
    linea;
    columna;
    exp1;
    exp2;
    exp3;

    hijos;
    ast_name;
    ast_id;


    constructor(exp1, exp2, exp3, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.exp1 = exp1;
        this.exp2 = exp2;
        this.exp3 = exp3
        this.ast_id = 0
        this.ast_name = 'SubStr()'
        this.hijos = [exp1, exp2, exp3]
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
        if (this.exp1.getTipo(ent, arbol) === 'STRING' && this.exp2.getTipo(ent, arbol) === 'INT' && this.exp3.getTipo(ent, arbol) === 'INT'){
            var chain = this.exp1.getValorImplicito(ent, arbol)
            var num1 = this.exp2.getValorImplicito(ent,arbol)
            var num2 = this.exp3.getValorImplicito(ent,arbol)
            var sub_str = ''

            if( num1 < 0 || num1 >= chain.length || num2 < 0 || num2 >= chain.length || num1 >= num2){
                arbol.setError({
                    err: 'Indices '+num1+', '+num2+' fuera de rango',
                    type: 'Semántico',
                    amb: ent.identificador,
                    line: this.linea,
                    col: this.columna
                  })
                return null
            }
 
            for (let index = num1; index <= num2; index++) {
                sub_str += chain[index];
            }
            return sub_str
            
        }
        arbol.setError({
            err: 'Tipos de dato '+this.exp1.getTipo(ent, arbol)+', '+this.exp2.getTipo(ent, arbol)+' y '+this.exp3.getTipo(ent, arbol)+' incompatibles para la función substring',
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