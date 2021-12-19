class Print{
    linea;
    columna;
    expresiones;
    salto;
                
    constructor(expresiones, linea, columna, salto){
        this.expresiones = expresiones;
        this.linea = linea;
        this.columna = columna;
        this.salto = salto;
    }

    traducir(ent, arbol) {
        //aqui se va a realizar la impresion en 3d
        throw new Error("Method not implemented.");
    }

    ejecutar(ent, arbol) {
        var out_string = ''
        for (let exp of this.expresiones){
            const valor = exp.getValorImplicito(ent, arbol);
            if (valor !== null && valor !== undefined) out_string += valor.toString() + ' '
        }
        arbol.setPrints(out_string, this.salto)
        console.log(ent)
    }
}