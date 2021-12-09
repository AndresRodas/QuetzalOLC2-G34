class Ternario {
    linea;
    columna;
    exp_true;
    exp_false;
    expresion;

    constructor(expresion, exp_true, exp_false, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.exp_true = exp_true;
        this.exp_false = exp_false;
        this.expresion = expresion;
    }

    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
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
        console.log('Expresion ternaria incorrecta')
        return { err: 'Expresion ternaria incorrecta' }
        
    }

    isInt(n){
        return Number(n) === n && n % 1 === 0;
    }
}