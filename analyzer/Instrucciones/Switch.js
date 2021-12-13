class Switch{
    linea;
    columna;
    expresion;
    lista_case;
    default_case;
                
    constructor(expresion, lista_case, default_case, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.lista_case = lista_case;
        this.default_case = default_case;
    }

    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent, arbol) {

        //valor de salida
        var Output = ''

        //recorrer los case
        for (let case_u of this.lista_case) {

            if(case_u.expresion.getValorImplicito(ent, arbol) === this.expresion.getValorImplicito(ent, arbol)){
                
                for (let accion of case_u.acciones){
                    var salida = accion.ejecutar(ent, arbol)
                    if(typeof salida !== 'undefined') {
                      Output += salida
                    }
                }
                if (case_u.break_flag) return Output;
            }
        }
        if(this.default_case !== null){
            for (let default_u of this.default_case){
                var salida = default_u.ejecutar(ent, arbol)
                if(typeof salida !== 'undefined') {
                  Output += salida
                }
            }
        }
        return Output
    }

}