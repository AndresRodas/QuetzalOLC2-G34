class SubStr {
    linea;
    columna;
    exp1;
    exp2;
    exp3;

    constructor(exp1, exp2, exp3, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.exp1 = exp1;
        this.exp2 = exp2;
        this.exp3 = exp3
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
        if (this.exp1.getTipo(ent, arbol) === 'STRING' && this.exp2.getTipo(ent, arbol) === 'INT' && this.exp3.getTipo(ent, arbol) === 'INT'){
            var chain = this.exp1.getValorImplicito(ent, arbol)
            var num1 = this.exp2.getValorImplicito(ent,arbol)
            var num2 = this.exp3.getValorImplicito(ent,arbol)
            var sub_str = ''

            if( num1 < 0 || num1 >= chain.length || num2 < 0 || num2 >= chain.length || num1 >= num2){
                console.log("Indices fuera del rango");
                return { err: 'Indices fuera del rango' }
            }
 
            for (let index = num1; index <= num2; index++) {
                sub_str += chain[index];
            }
            return sub_str
            
        }
        console.log("Error de tipos de datos no permitidos realizando un substring");
        return { err: 'Tipos de datos no permitidos realizando un substring' }
    }

    isInt(n){
        return Number(n) === n && n % 1 === 0;
    }
    
}