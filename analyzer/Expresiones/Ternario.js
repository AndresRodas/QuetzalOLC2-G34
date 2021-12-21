class Ternario {
    linea;
    columna;
    exp_true;
    exp_false;
    expresion;

    hijos;
    ast_name;
    ast_id;

    constructor(expresion, exp_true, exp_false, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.exp_true = exp_true;
        this.exp_false = exp_false;
        this.expresion = expresion;
        this.ast_id = 0
        this.ast_name = 'Ternario'
        this.hijos = [expresion, exp_true, exp_false]
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
        if (this.expresion.getTipo() === "BOOL"){
            if (this.expresion.getValorImplicito()){
                return this.exp_true.getValorImplicito()
            }
            return this.exp_false.getValorImplicito()
        }
        arbol.setError({
            err: 'Tipo de dato '+this.expresion.getTipo()+' incorrecto para una expresión ternaria',
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