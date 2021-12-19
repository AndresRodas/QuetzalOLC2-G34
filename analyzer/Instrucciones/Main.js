class Main{
    linea;
    columna;
    instrucciones;
                
    constructor(instrucciones, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.instrucciones = instrucciones
    }

    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent, arbol) {
        var new_ent = new Entorno(ent, 'MAIN')

        for (let inst of this.instrucciones) {
            inst.ejecutar(new_ent, arbol)
            if(Return.prototype.isPrototypeOf(inst)) break;
        }
    }

}