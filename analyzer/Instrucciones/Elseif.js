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
            var Output = ''

            if(this.expresion.getValorImplicito(ent, arbol)){
                this.acciones.forEach(element => {
                    salida = element.ejecutar(ent, arbol)
                    if(typeof salida !== 'undefined') {
                      Output += salida
                    }
                })
                return Output;
            }
            return undefined

        }
        else{
            onsole.log("Expresión incorrecta para una instruccion condicional")
            return {err: 'Expresión incorrecta para una instruccion condicional'}
        }
    }

}