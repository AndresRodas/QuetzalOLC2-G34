class PFOR{
    linea;
    columna;
    condicion;
    instruccion;
    incremento;
    inicializar;

    constructor(inicializar, condicion, instruccion,incremento, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.condicion = condicion;
        this.incremento = incremento;
        this.inicializar = inicializar;
        this.instruccion = instruccion;
    }

    traducir(ent, arbol) {

    }

    ejecutar(ent, arbol) {
        nuevaTabla = null
        try{
            if (this.inicializar.getTipo(ent,arbol)){                   //INICIALIZARCION DE DECLARACION
                variablex = this.inicializar.ejecutar(ent, arbol)
            }else{        
                variablex = this.inicializar.ejecutar(ent,arbol)       //INICIALIZACION DE ASIGNACION
    
            }

        }catch(e){
            return variablex
        }
    

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