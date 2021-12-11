class Parse {
    linea;
    columna;
    tipo;
    cadena;

    constructor(tipo, cadena, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.cadena = cadena;
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
                    console.log("Error de tipos de datos no permitidos realizando un parseo");
                    return { err: 'Tipos de datos no permitidos realizando un parseo' }
            }
        }
        console.log("Error de tipos de datos no permitidos realizando un parseo");
        return { err: 'Tipos de datos no permitidos realizando un parseo' }
    }

    isInt(n){
        return Number(n) === n && n % 1 === 0;
    }
    
}