class Switch{
    linea;
    columna;
    expresion;
    lista_case;
    default_case;

    hijos;
    ast_name;
    ast_id;
                
    constructor(expresion, lista_case, default_case, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.lista_case = lista_case;
        this.default_case = default_case;
        this.ast_id = 0
        this.ast_name = 'Switch'
        this.hijos = [expresion].concat(lista_case)
    }

    traducir(ent, arbol) {

    }

    ejecutar(ent, arbol) {

        //recorrer los case
        for (let case_u of this.lista_case) {

            if(case_u.expresion.getValorImplicito(ent, arbol) === this.expresion.getValorImplicito(ent, arbol)){
                
                //crear entorno
                var new_ent = new Entorno(ent, 'SWITCH-CASE')

                for (let accion of case_u.acciones){
                    var salida = accion.ejecutar(new_ent, arbol)
                    if(salida !== undefined) {
                        if(salida.retorno !== undefined) return salida
                    }
                }
                if (case_u.break_flag) return undefined;
            }
        }
        if(this.default_case !== null){
            //crear entorno
            var new_ent = new Entorno(ent, 'SWITCH-DEFAULT')

            for (let default_u of this.default_case){
                var salida = default_u.ejecutar(new_ent, arbol)
                if(salida !== undefined) {
                    if(salida.retorno !== undefined) return salida
                }
            }
        }
        return undefined
    }

}