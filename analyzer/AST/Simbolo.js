class Simbolo {
    identificador;
    valor;
    tipo;
    linea;
    columna;

    constructor(tipo, identificador, linea, columna, valor){
        this.identificador = identificador;
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;   
        this.valor = valor;
    }
    
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }

    getTipo(ent, arbol) {
        return this.tipo;
    }
    getValorImplicito(ent, arbol) {
        return this.valor;
    }
    
}