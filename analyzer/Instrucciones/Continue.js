class Continue{
    
    fila;
    columna;
    hijos;
    ast_name;
    ast_id;

    constructor(fila, columna){
        this.fila = fila;
        this.columna = columna; 
        this.ast_id = 0
        this.ast_name = 'Continue'
        this.hijos = []
    }

    ejecutar(ent, arbol){
    }

}