class PositionStr {
    linea;
    columna;
    exp1;
    exp2;

    constructor(exp1, exp2, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.exp1 = exp1;
        this.exp2 = exp2;
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
        if (this.exp1.getTipo(ent, arbol) === 'STRING' && this.exp2.getTipo(ent, arbol) === 'INT'){

            var position = this.exp1.getValorImplicito(ent, arbol)[this.exp2.getValorImplicito(ent, arbol)]
            if (typeof(position) === 'undefined'){
                return { err: 'La posicion de la cadena no es válida' } 
            }
            return position
        }
        console.log("Error de tipos de datos no permitidos realizando una posicion");
        return { err: 'Tipos de datos no permitidos realizando una posicion' }
    }

    isInt(n){
        return Number(n) === n && n % 1 === 0;
    }
    
}