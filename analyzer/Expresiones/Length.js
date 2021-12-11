class Length {
    linea;
    columna;
    exp;

    constructor(exp, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.exp = exp;
    
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
        if (this.exp.getTipo(ent, arbol) === 'STRING' || this.exp.getTipo(ent, arbol) === 'ARRAY'){
           return this.exp.getValorImplicito(ent, arbol).length 
        }
        console.log("Error de tipos de datos no permitidos realizando un length");
        return { err: 'Tipos de datos no permitidos realizando un length' }
    }

    isInt(n){
        return Number(n) === n && n % 1 === 0;
    }
    
}