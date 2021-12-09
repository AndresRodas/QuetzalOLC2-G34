class Print{
    linea;
    columna;
    expresion;
    salto;
                
    constructor(exp, linea, columna, salto){
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
        this.salto = salto;
    }

    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent, arbol) {
        const valor = this.expresion.getValorImplicito(ent, arbol);

        if(valor.err !== undefined){
            console.log('>> Error, no se pueden imprimir valores nulos');
            return '>> Error: ' + valor.err
        }
        if(this.salto){
            return valor.toString()+'\n'
        }
        return valor.toString()

    }

}