class Case{
    linea;
    columna;
    expresion;
    acciones;
    break_flag;

    hijos;
    ast_name;
    ast_id;
                
    constructor(expresion, acciones, break_flag, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.acciones = acciones;
        this.break_flag = break_flag;
        this.ast_id = 0
        this.ast_name = 'Case'
        this.hijos = [expresion].concat(acciones)
    }

    traducir(ent, arbol) {

    }

    ejecutar(ent, arbol) {

    }

}