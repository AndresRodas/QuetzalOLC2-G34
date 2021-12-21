class Return{
    linea;
    columna;
    expresion;

    hijos;
    ast_name;
    ast_id;

    constructor(expresion, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.ast_id = 0
        this.ast_name = 'Return'
        if (expresion !== null){
            this.hijos = [expresion]
        }
        else{
            this.hijos = []
        }
        
    }

    traducir(ent, arbol) {

    }

    ejecutar(ent, arbol) {
        if (this.expresion !== null){
            return { retorno: this.expresion.getValorImplicito(ent,arbol)}
        }
        return null;
    }

}