class Return{
    linea;
    columna;
    expresion;
                
    constructor(expresion, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
    }

    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent, arbol) {
        if (this.expresion !== null){
            return { retorno: this.expresion.getValorImplicito(ent,arbol)}
        }
        return null;
    }

}