class ToNative {
    linea;
    columna;
    func;
    exp;

    constructor(func, exp, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.func = func;
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
        switch (this.func) {
            case 'toInt':
                let toint = parseInt(this.exp.getValorImplicito(ent, arbol))
                if(isNaN(toint)){
                    return 'null'
                }
                return toint
            case 'toDouble':
                let todouble = parseFloat(this.exp.getValorImplicito(ent, arbol))
                if(isNaN(todouble)){
                    return 'null'
                }
                return todouble
            case 'string':
                return this.exp.getValorImplicito(ent, arbol).toString()
            case 'typeof':
                return this.exp.getTipo(ent, arbol)
            default:
                console.log("Error de tipos de datos no permitidos realizando una funcion nativa");
                return { err: 'Tipos de datos no permitidos realizando una funcion nativa' }
        }
    }

    isInt(n){
        return Number(n) === n && n % 1 === 0;
    }
    
}