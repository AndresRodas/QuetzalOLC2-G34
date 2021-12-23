class Else{
    linea;
    columna;
    acciones;

    hijos;
    ast_name;
    ast_id;
                
    constructor(acciones, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.acciones = acciones;
        this.ast_id = 0
        this.ast_name = 'Else'
        this.hijos = acciones
    }

    traducir(ent, arbol) {
        var tmp = '', c3d = '', lv = '', lf = '';
        //acciones if
        for(let acc of this.acciones){
            acc.traducir(ent, arbol)
        }
    }

    ejecutar(ent, arbol) {
        for(let inst of this.acciones){
            var salida = inst.ejecutar(ent, arbol)
            if(salida !== undefined) {
                if(salida.retorno !== undefined) return salida
            }
        }
        return undefined
    }

}