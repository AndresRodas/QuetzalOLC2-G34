class While{
    linea;
    columna;
    condicion;
    instruccion;

    constructor(condicion, instruccion, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.condicion = condicion;
        this.instruccion = instruccion;
    }

    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent, arbol) {
        if(this.condicion.getTipo(ent, arbol) === 'BOOL'){              //VERIFICA SI ES VERDADERA LA CONDICION

            while (true) {
                //si es verdadero
                if(this.condicion.getValorImplicito(ent, arbol)){
                    this.instruccion.forEach(element => {
                        var salida = element.ejecutar(ent, arbol)
                        if(salida !== undefined) {
                            if(salida.retorno !== undefined) return salida
                        }
                    })
                }else{
                    break
                }      
            }

            return undefined
            
        }
        else{
            arbol.setError({
                err: 'El tipo '+this.condicion.getTipo(ent, arbol)+' es incorrecto para un ciclo while',
                type: 'Semántico',
                amb: ent.identificador,
                line: this.linea,
                col: this.columna
              })
        }
    }

}