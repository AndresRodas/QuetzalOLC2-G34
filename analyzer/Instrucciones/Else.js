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
        //valor de salida
        var Output = ''

        this.acciones.forEach(element => {
            salida = element.ejecutar(ent, arbol)
            if(typeof salida !== 'undefined') {
                Output += salida
            }
        })
        return Output;
    }

}