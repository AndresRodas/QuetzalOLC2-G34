class Else{
    linea;
    columna;
    acciones;
                
    constructor(acciones, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.acciones = acciones;
    }

    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
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