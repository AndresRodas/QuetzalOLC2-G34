class Asignacion{
    linea;
    columna;
    identificador;
    expresion;
                
    constructor(identificador, expresion, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.expresion = expresion;
        
    }

    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent, arbol) {
        if (ent.existe(this.identificador)) {
            var simbolo = ent.getSimbolo(this.identificador)
            if(simbolo.getTipo(ent, arbol) === this.expresion.getTipo(ent, arbol)){
                var new_valor = this.expresion.getValorImplicito(ent, arbol)
                simbolo.valor = new_valor
                ent.reemplazar(this.identificador, simbolo)
            }
            else{
                console.log("El tipo no coincide con la variable");
                return { err: 'El tipo no coincide con la variable' }
            }

        }
        else{
            console.log("La variable no existe");
            return { err: 'La variable no existe' }
        }
    }
}