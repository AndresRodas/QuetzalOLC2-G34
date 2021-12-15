class Elseif{
    linea;
    columna;
    expresion;
    acciones;
                
    constructor(expresion, acciones, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.acciones = acciones;
    }

    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent, arbol) {
        if(this.expresion.getTipo(ent, arbol) === 'BOOL'){
            //valor de salida
            // var Output = ''

            if(this.expresion.getValorImplicito(ent, arbol)){

                for(let ins of this.acciones){
                    var salida = ins.ejecutar(ent, arbol)
                    if(salida !== undefined) {
                        if(salida.retorno !== undefined) return salida
                    }
                }
                return true
            }
            return false
        }
        else{
            arbol.setError({
                err: 'El tipo '+this.expresion.getTipo(ent, arbol)+' es incorrecto para una condicional',
                type: 'Semántico',
                amb: ent.identificador,
                line: this.linea,
                col: this.columna
              })
        }
    }

}