class Case{
    linea;
    columna;
    expresion;
    acciones;
    break_flag;
                
    constructor(expresion, acciones, break_flag, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
        this.acciones = acciones;
        this.break_flag = break_flag;
    }

    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent, arbol) {
        
    }

}