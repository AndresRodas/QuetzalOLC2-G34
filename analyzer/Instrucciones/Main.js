class Main{
    linea;
    columna;
    instrucciones;

    c3d;
    
    hijos;
    ast_id;
    ast_name;
                
    constructor(instrucciones, linea, columna){
        this.linea = linea;
        this.columna = columna;
        this.instrucciones = instrucciones
        this.c3d = ''
        this.hijos = instrucciones
        this.ast_id = 0
        this.ast_name = 'Main()'
    }

    traducir(ent, arbol) {
        
        for (let inst of this.instrucciones) {
            inst.traducir(ent, arbol)
            this.c3d += inst.c3d
            if(Return.prototype.isPrototypeOf(inst)) break;
        }
        arbol.setMainC3D(this.c3d)
    }

    ejecutar(ent, arbol) {
        var new_ent = new Entorno(ent, 'MAIN')
        for (let inst of this.instrucciones) {
            inst.ejecutar(new_ent, arbol)
            if(Return.prototype.isPrototypeOf(inst)) break;
        }
        this.traducir(ent, arbol)
    }

}