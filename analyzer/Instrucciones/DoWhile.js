class DoWhile{
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
            //valor de salida
            var Output = ''
            while (true) {
                //si es verdadero
                if(this.condicion.getValorImplicito(ent, arbol)){
                    this.instruccion.forEach(element => {
                        salida = element.ejecutar(ent, arbol)
                        if(typeof salida !== 'undefined') {
                        Output += salida
                        }
                    })
                }else{
                    break
                }      
            }

            return Output
            
        }
        else{
            console.log("Expresión incorrecta para una instruccion condicional")
            return {err: 'Expresión incorrecta para una instruccion condicional'}
        }
    }

}