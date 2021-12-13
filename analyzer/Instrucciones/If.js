class If{
    linea;
    columna;
    expresion;
    acciones;
    else_if;
    else_ins;
                
    constructor(expresion, acciones, else_if, else_ins, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.acciones = acciones;
        this.else_if = else_if;
        this.else_ins = else_ins;
    }

    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent, arbol) {
        if(this.expresion.getTipo(ent, arbol) === 'BOOL'){
            //valor de salida
            var Output = ''


            //si es verdadero
            if(this.expresion.getValorImplicito(ent, arbol)){
                this.acciones.forEach(element => {
                    salida = element.ejecutar(ent, arbol)
                    if(typeof salida !== 'undefined') {
                      Output += salida
                    }
                })
                return Output;
            }
            //si es falso se valida si hay elseif
            else if (this.else_if !== null){
                //para cada elseif

                for (let element of this.else_if) {
                    salida = element.ejecutar(ent, arbol)
                    if (salida !== true){
                        if(typeof salida !== 'undefined') {
                            Output += salida
                        }
                        return Output;
                    }
                }

                // this.else_if.forEach(element => { })
            }
            //si es falso se valida si hay else
            if(this.else_ins !== null){
                console.log("entra al esle")
                Output += this.else_ins.ejecutar(ent, arbol)
                return Output
            } 
            
        }
        else{
            console.log("Expresión incorrecta para una instruccion condicional")
            return {err: 'Expresión incorrecta para una instruccion condicional'}
        }
    }

}